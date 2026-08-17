import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Minus, Plus } from 'lucide-react';
import { metronome } from '../utils/audioMetronome';

interface MetronomeToolProps {
  initialBpm?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const MetronomeTool: React.FC<MetronomeToolProps> = ({ initialBpm = 100, isOpen, onClose }) => {
  const [bpm, setBpm] = useState<number>(initialBpm);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeBeat, setActiveBeat] = useState<number>(-1);
  const [tapTimes, setTapTimes] = useState<number[]>([]);

  useEffect(() => {
    if (initialBpm && initialBpm > 40 && initialBpm < 240) {
      setBpm(initialBpm);
      metronome.setBpm(initialBpm);
    }
  }, [initialBpm]);

  useEffect(() => {
    metronome.setOnBeat((beat) => {
      setActiveBeat(beat);
    });

    return () => {
      metronome.stop();
    };
  }, []);

  const handleToggle = () => {
    const active = metronome.toggle(bpm);
    setIsPlaying(active);
    if (!active) setActiveBeat(-1);
  };

  const updateBpm = (newBpm: number) => {
    const clamped = Math.max(40, Math.min(240, newBpm));
    setBpm(clamped);
    metronome.setBpm(clamped);
  };

  const handleTapTempo = () => {
    const now = Date.now();
    const recent = tapTimes.filter((t) => now - t < 3000);
    const updated = [...recent, now];
    setTapTimes(updated);

    if (updated.length >= 2) {
      const intervals = [];
      for (let i = 1; i < updated.length; i++) {
        intervals.push(updated[i] - updated[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      updateBpm(calculatedBpm);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-[#080808] border border-[#222] rounded-sm p-4 shadow-2xl mb-6 text-[#F0F0F0] max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-200 font-mono">
      <div className="flex items-center justify-between border-b border-[#222] pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-sm bg-[#CCFF00] shadow-[0_0_8px_rgba(204,255,0,0.6)] animate-pulse" />
          <h4 className="font-bold text-xs uppercase tracking-widest text-white">RHYTHM METRONOME // CADENCE TEST</h4>
        </div>
        <button
          onClick={onClose}
          className="text-[10px] text-[#777] hover:text-[#CCFF00] px-2 py-0.5 bg-[#141414] border border-[#262626] rounded-sm cursor-pointer"
        >
          CLOSE
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* BPM Display & Stepper */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateBpm(bpm - 5)}
            className="w-8 h-8 rounded-sm bg-[#141414] hover:bg-[#1E1E1E] flex items-center justify-center text-[#CCC] font-bold border border-[#2A2A2A] cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <div className="text-center min-w-[80px]">
            <span className="text-3xl font-extrabold text-[#CCFF00] tracking-tight">{bpm}</span>
            <span className="text-[10px] text-[#666] block uppercase font-bold">BPM</span>
          </div>
          <button
            onClick={() => updateBpm(bpm + 5)}
            className="w-8 h-8 rounded-sm bg-[#141414] hover:bg-[#1E1E1E] flex items-center justify-center text-[#CCC] font-bold border border-[#2A2A2A] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual 4-Beat indicators */}
        <div className="flex items-center space-x-2">
          {[0, 1, 2, 3].map((b) => (
            <div
              key={b}
              className={`w-6 h-6 rounded-sm border transition-all duration-75 flex items-center justify-center text-[10px] font-bold ${
                activeBeat === b
                  ? 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-[0_0_12px_rgba(204,255,0,0.7)] scale-110'
                  : 'bg-[#121212] border-[#262626] text-[#555]'
              }`}
            >
              {b + 1}
            </div>
          ))}
        </div>

        {/* Play & Tap Buttons */}
        <div className="flex items-center space-x-2">
          <button
            id="btn-metronome-play"
            onClick={handleToggle}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-sm font-bold text-xs shadow-md transition-all cursor-pointer ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-[#CCFF00] hover:bg-[#bceb00] text-black shadow-[0_0_12px_rgba(204,255,0,0.25)]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>STOP</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={handleTapTempo}
            className="px-3 py-1.5 rounded-sm text-xs font-bold bg-[#141414] hover:bg-[#1E1E1E] text-[#CCC] border border-[#2A2A2A] active:scale-95 transition-all cursor-pointer"
            title="Klik berulang kali mengikuti ketukan lagu untuk mendeteksi BPM"
          >
            TAP
          </button>
        </div>
      </div>
    </div>
  );
};

