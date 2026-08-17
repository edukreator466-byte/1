class AudioMetronome {
  private audioCtx: AudioContext | null = null;
  private isRunning: boolean = false;
  private bpm: number = 100;
  private beatsPerBar: number = 4;
  private currentBeat: number = 0;
  private timerId: number | null = null;
  private nextNoteTime: number = 0;
  private lookahead: number = 25.0; // milliseconds
  private scheduleAheadTime: number = 0.1; // seconds
  private onBeatCallback: ((beat: number) => void) | null = null;

  private initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setBpm(newBpm: number) {
    this.bpm = Math.max(40, Math.min(240, newBpm));
  }

  public getBpm(): number {
    return this.bpm;
  }

  public setOnBeat(callback: (beat: number) => void) {
    this.onBeatCallback = callback;
  }

  private nextNote() {
    const secondsPerBeat = 60.0 / this.bpm;
    this.nextNoteTime += secondsPerBeat;
    this.currentBeat = (this.currentBeat + 1) % this.beatsPerBar;
  }

  private scheduleNote(beatNumber: number, time: number) {
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    // Higher pitch on beat 1 (downbeat)
    const isDownbeat = beatNumber === 0;
    osc.frequency.value = isDownbeat ? 1000 : 600;
    osc.type = 'sine';

    gain.gain.setValueAtTime(isDownbeat ? 0.8 : 0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(time);
    osc.stop(time + 0.05);

    if (this.onBeatCallback) {
      const delayMs = Math.max(0, (time - this.audioCtx.currentTime) * 1000);
      setTimeout(() => {
        if (this.isRunning && this.onBeatCallback) {
          this.onBeatCallback(beatNumber);
        }
      }, delayMs);
    }
  }

  private scheduler() {
    if (!this.audioCtx || !this.isRunning) return;

    while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.currentBeat, this.nextNoteTime);
      this.nextNote();
    }

    this.timerId = window.setTimeout(() => this.scheduler(), this.lookahead);
  }

  public start(bpm?: number) {
    this.initContext();
    if (this.isRunning) return;

    if (bpm) this.setBpm(bpm);
    this.isRunning = true;
    this.currentBeat = 0;
    if (this.audioCtx) {
      this.nextNoteTime = this.audioCtx.currentTime + 0.05;
    }
    this.scheduler();
  }

  public stop() {
    this.isRunning = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.onBeatCallback) {
      this.onBeatCallback(-1);
    }
  }

  public toggle(bpm?: number): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start(bpm);
      return true;
    }
  }

  public isActive(): boolean {
    return this.isRunning;
  }
}

export const metronome = new AudioMetronome();
