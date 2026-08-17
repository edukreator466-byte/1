import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { GeneratorForm } from './components/GeneratorForm';
import { PresetGallery } from './components/PresetGallery';
import { StylePromptCard } from './components/StylePromptCard';
import { LyricsEditor } from './components/LyricsEditor';
import { MetronomeTool } from './components/MetronomeTool';
import { SunoCheatSheetModal } from './components/SunoCheatSheetModal';
import { SavedSongsModal } from './components/SavedSongsModal';
import { StyleMixerModal } from './components/StyleMixerModal';
import { RefineLyricsModal } from './components/RefineLyricsModal';
import { SunoGenerationRequest, SunoSongResult, SongPreset } from './types';
import { getSavedSongs, saveSong, deleteSavedSong } from './utils/storage';
import { POPULAR_PRESETS } from './data/sunoData';
import { Sparkles, Music, Check, Zap, HelpCircle, Activity, Radio } from 'lucide-react';

const INITIAL_DEMO_SONG: SunoSongResult = {
  id: 'demo-initial-1',
  title: 'Hujan di Sudut Kota',
  styleOfMusicPrompt: 'indonesian pop rock, 2000s nostalgia band, emotional male vocal, melodic acoustic guitar, soaring electric solo, melancholic, 78 bpm',
  stylePromptBreakdown: {
    primaryGenre: 'Indonesian Pop Rock',
    subGenres: ['2000s Band', 'Pop Melayu Revival'],
    moodAndVibe: ['Melancholic', 'Nostalgic', 'Heartfelt'],
    vocalType: 'Emotional male vocal with powerful chorus belting',
    keyInstruments: ['Gitar Akustik', 'Gitar Listrik Melodi', 'Piano Klasik', 'Drum Organik'],
    tempoBpm: '78 BPM',
    productionVibe: 'Clean nostalgic band production with warm reverb',
  },
  lyrics: `[Intro]
(Petikan gitar akustik lembut dengan alunan piano sendu)

[Verse 1]
Malam kembali basah di sudut jalan ini
Lampu-lampu kota berpendar dalam sepi
Kutatapi secangkir kopi yang kian mendingin
Membawa bayangmu terhembus lembut angin

[Pre-Chorus]
Masih terasa hangat genggaman jemarimu
Saat kau bisikkan janji masa lalu
Namun waktu berlari tanpa sempat mengerti
Kini tersisa cerita di relung hati

[Chorus]
Hujan di sudut kota... mengingatkanku padamu
Tentang peluk yang pernah menghangatkan ragaku
Kucoba melupakan, kucoba merelakan
Namun rindumu masih mengalir... di setiap rintik malam

[Verse 2]
Kutapaki jejak langkah yang pernah kita ukir
Di bawah payung merah di tepian jalan parkir
Kini sendiri kuterjang rintik yang menyapa
Menyembunyikan air mata yang tak sempat kau rasa

[Pre-Chorus]
Masih terasa hangat genggaman jemarimu
Saat kau bisikkan janji masa lalu
Namun waktu berlari tanpa sempat mengerti
Kini tersisa cerita di relung hati

[Chorus]
Hujan di sudut kota... mengingatkanku padamu
Tentang peluk yang pernah menghangatkan ragaku
Kucoba melupakan, kucoba merelakan
Namun rindumu masih mengalir... di setiap rintik malam

[Guitar Solo]
(Solo gitar listrik meliuk emosional dengan distorsi lembut khas pop rock 2000an)

[Bridge - High Emotion]
Biarlah hujan menghapus luka yang tersimpan
Walau bayangmu abadi dalam ingatan...
Ooo... dalam ingatan...

[Chorus - Double Energy]
Hujan di sudut kota... mengingatkanku padamu!
Tentang peluk yang pernah menghangatkan ragaku!
Kucoba melupakan, kucoba merelakan
Namun rindumu masih mengalir... di setiap rintik malam...

[Outro]
(Alunan petikan gitar perlahan memudar)
Rindumu masih mengalir...
Hingga fajar menjelang...

[Fade Out]
[End]`,
  lyricSections: [],
  sunoTips: [
    'Di Suno, aktifkan Custom Mode dan paste lirik lengkap dengan tanda kurung siku [Verse 1], [Chorus], dll.',
    'Kotak "Style of Music" sudah dioptimalkan di bawah 120 karakter untuk kualitas vokal dan aransemen terbaik di Suno v3.5 & v4.',
    'Gunakan tag [Guitar Solo] dan [Chorus - Double Energy] untuk transisi dinamika yang bertenaga.'
  ],
  language: 'id',
  createdAt: Date.now() - 1000 * 60 * 60 * 2,
  tags: ['Pop Rock', 'Nostalgia Band', 'Galau', '2000an'],
};

export default function App() {
  const [formData, setFormData] = useState<SunoGenerationRequest>({
    topic: 'Mengenang mantan kekasih saat hujan di sudut kota dengan rasa rindu mendalam',
    genre: 'Indonesian Pop Rock 2000s',
    mood: 'Melancholic (Patah Hati & Galau)',
    language: 'id',
    vocalStyle: 'emotional male vocal, passionate storytelling',
    tempo: '78 BPM',
    instruments: ['Gitar Akustik', 'Gitar Listrik Melodi', 'Piano', 'Drum Organik'],
    structure: 'standard',
    customInstructions: '',
    sunoVersion: 'v3.5',
    includeGuitarSolo: true,
  });

  const [currentSong, setCurrentSong] = useState<SunoSongResult>(INITIAL_DEMO_SONG);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [savedSongs, setSavedSongs] = useState<SunoSongResult[]>([]);
  const [sunoVersion, setSunoVersion] = useState<'v3.5' | 'v4'>('v3.5');
  const [isMetronomeOpen, setIsMetronomeOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);
  const [isSavedSongsOpen, setIsSavedSongsOpen] = useState<boolean>(false);
  const [isStyleMixerOpen, setIsStyleMixerOpen] = useState<boolean>(false);
  const [isRefineModalOpen, setIsRefineModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = getSavedSongs();
    if (saved.length > 0) {
      setSavedSongs(saved);
    } else {
      // Seed initial demo
      saveSong(INITIAL_DEMO_SONG);
      setSavedSongs([INITIAL_DEMO_SONG]);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleGenerate = async () => {
    if (!formData.topic.trim()) {
      showToast('Harap masukkan tema / ide lagu.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-suno-song', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sunoVersion,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Gagal membuat lagu');
      }

      const songData: SunoSongResult = await res.json();
      setCurrentSong(songData);
      showToast('Lirik & Style Suno berhasil dibuat!');
    } catch (err: any) {
      console.error('Error in generation:', err);
      showToast('ERR: ' + (err.message || 'Terjadi kesalahan saat memproses generator.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: SongPreset) => {
    setFormData((prev) => ({
      ...prev,
      topic: preset.topic,
      genre: preset.genre.split(',')[0],
      mood: preset.mood,
      vocalStyle: preset.vocalStyle,
      language: preset.language,
      tempo: preset.tempo,
      structure: preset.structure,
    }));
    showToast(`PRESET LOADED: "${preset.title}"`);
  };

  const handleSaveCurrentSong = () => {
    const updated = saveSong(currentSong);
    setSavedSongs(updated);
    showToast('TRACK SAVED TO ARCHIVE');
  };

  const handleDeleteSong = (id: string) => {
    const updated = deleteSavedSong(id);
    setSavedSongs(updated);
    showToast('TRACK PURGED FROM ARCHIVE');
  };

  const handleUpdateLyrics = (newLyrics: string) => {
    setCurrentSong((prev) => ({ ...prev, lyrics: newLyrics }));
  };

  const handleUpdateStylePrompt = (newPrompt: string) => {
    setCurrentSong((prev) => ({ ...prev, styleOfMusicPrompt: newPrompt }));
    showToast('STYLE PROMPT UPDATED');
  };

  const handleApplyRefinement = (updatedLyrics: string, updatedStyle?: string) => {
    setCurrentSong((prev) => ({
      ...prev,
      lyrics: updatedLyrics,
      styleOfMusicPrompt: updatedStyle || prev.styleOfMusicPrompt,
    }));
    showToast('AI POLISHING APPLIED');
  };

  const isCurrentSongSaved = savedSongs.some((s) => s.id === currentSong.id);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] font-sans selection:bg-[#CCFF00]/30 selection:text-white flex flex-col justify-between">
      {/* Top Navbar */}
      <div>
        <Navbar
          onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
          onOpenSavedSongs={() => setIsSavedSongsOpen(true)}
          onToggleMetronome={() => setIsMetronomeOpen(!isMetronomeOpen)}
          isMetronomeActive={isMetronomeOpen}
          savedCount={savedSongs.length}
          sunoVersion={sunoVersion}
          setSunoVersion={setSunoVersion}
        />

        {/* Main Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Metronome Tool Drawer (collapsible) */}
          <MetronomeTool
            isOpen={isMetronomeOpen}
            initialBpm={parseInt(currentSong.stylePromptBreakdown?.tempoBpm || '100', 10) || 100}
            onClose={() => setIsMetronomeOpen(false)}
          />

          {/* Preset Gallery Carousel */}
          <PresetGallery onSelectPreset={handleSelectPreset} />

          {/* Studio Workspace: 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Generator Form (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <GeneratorForm
                formData={formData}
                setFormData={setFormData}
                onGenerate={handleGenerate}
                isLoading={isLoading}
                onOpenStyleMixer={() => setIsStyleMixerOpen(true)}
              />

              {/* Quick How-To Card */}
              <div className="bg-[#080808] border border-[#222] rounded-sm p-4 font-mono text-xs text-[#888] space-y-2">
                <h4 className="font-bold text-white flex items-center space-x-1.5 uppercase text-[11px] tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>SUNO WORKFLOW // INTEGRATION GUIDE</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 pl-0.5 text-[11px] text-[#777]">
                  <li>Buka <strong className="text-white">Suno.com &gt; Create</strong> lalu aktifkan toggle <strong className="text-[#CCFF00]">Custom</strong>.</li>
                  <li>Salin baris <strong className="text-white">Style of Music</strong> ke kolom Style di Suno.</li>
                  <li>Salin blok <strong className="text-white">Lirik &amp; Metatag</strong> lengkap ke kolom Lyrics.</li>
                  <li>Klik tombol <strong className="text-[#CCFF00]">Create</strong> di Suno dan dengarkan aransemen AI!</li>
                </ol>
              </div>
            </div>

            {/* Right Column: Output & Studio Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Style of Music Prompt Box */}
              <StylePromptCard
                song={currentSong}
                onUpdateStylePrompt={handleUpdateStylePrompt}
                sunoVersion={sunoVersion}
              />

              {/* Lyrics Studio & Editor */}
              <LyricsEditor
                song={currentSong}
                onUpdateLyrics={handleUpdateLyrics}
                onOpenRefine={() => setIsRefineModalOpen(true)}
                onSaveSong={handleSaveCurrentSong}
                isSaved={isCurrentSongSaved}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Live Studio Ticker Footer Bar */}
      <footer className="mt-12 border-t border-[#1C1C1C] bg-[#050505] py-3 px-4 sm:px-8 text-[10px] font-mono text-[#555] flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1 text-[#CCFF00]">
            <Radio className="w-3 h-3 animate-pulse" />
            <span className="font-bold uppercase tracking-wider">STUDIO ENGINE READY</span>
          </span>
          <span className="text-[#333]">|</span>
          <span className="text-[#777]">TARGET: SUNO {sunoVersion} ARCHITECTURE</span>
          <span className="text-[#333]">|</span>
          <span className="text-[#777]">CADENCE: {currentSong.stylePromptBreakdown?.tempoBpm || '78 BPM'}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-[#666]">ARTISTIC FLAIR // DARK EDITION</span>
          <span className="text-[#CCFF00] font-bold">#CCFF00</span>
        </div>
      </footer>

      {/* Modals */}
      <SunoCheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        onInsertTag={(tag) => {
          handleUpdateLyrics(currentSong.lyrics + '\n\n' + tag + '\n');
          showToast(`TAG INSERTED: ${tag}`);
          setIsCheatSheetOpen(false);
        }}
      />

      <SavedSongsModal
        isOpen={isSavedSongsOpen}
        onClose={() => setIsSavedSongsOpen(false)}
        songs={savedSongs}
        onSelectSong={(song) => {
          setCurrentSong(song);
          showToast(`LOADED: "${song.title}"`);
        }}
        onDeleteSong={handleDeleteSong}
      />

      <StyleMixerModal
        isOpen={isStyleMixerOpen}
        onClose={() => setIsStyleMixerOpen(false)}
        onApplyStyle={(newStyle) => {
          setFormData((prev) => ({ ...prev, genre: newStyle }));
          handleUpdateStylePrompt(newStyle);
        }}
        initialStyle={currentSong.styleOfMusicPrompt}
      />

      <RefineLyricsModal
        isOpen={isRefineModalOpen}
        onClose={() => setIsRefineModalOpen(false)}
        song={currentSong}
        onApplyRefinement={handleApplyRefinement}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0D0D0D] border border-[#CCFF00]/60 text-white px-4 py-2.5 rounded-sm shadow-[0_0_15px_rgba(204,255,0,0.2)] flex items-center space-x-2 text-xs font-mono font-bold animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-2 h-2 rounded-sm bg-[#CCFF00]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

