import React, { useState } from 'react';
import { Sparkles, Sliders, Mic, Globe, RefreshCw, Layers, ArrowRight } from 'lucide-react';
import { SunoGenerationRequest } from '../types';
import { VOCAL_STYLES, MOOD_OPTIONS } from '../data/sunoData';

interface GeneratorFormProps {
  formData: SunoGenerationRequest;
  setFormData: React.Dispatch<React.SetStateAction<SunoGenerationRequest>>;
  onGenerate: () => void;
  isLoading: boolean;
  onOpenStyleMixer: () => void;
}

const TOPIC_SUGGESTIONS = [
  'Mengenang cinta pertama saat gerimis di stasiun kereta',
  'Semangat bangkit dari kegagalan kerja dan mengejar impian',
  'Pesta dangdut koplo malam minggu melupakan rasa lelah',
  'Rasa rindu yang tak tersampaikan pada seseorang di seberang pulau',
  'Petualangan malam mengendarai motor di bawah lampu kota',
  'Doa dan rasa syukur mendalam atas kehidupan',
  'Kisah cinta lucu yang bermula dari salah kirim pesan WhatsApp'
];

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  formData,
  setFormData,
  onGenerate,
  isLoading,
  onOpenStyleMixer,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleTopicSuggestion = (sug: string) => {
    setFormData((prev) => ({ ...prev, topic: sug }));
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, tempo: `${val} BPM` }));
  };

  const currentBpmNumber = parseInt(formData.tempo || '90', 10) || 90;

  return (
    <div className="bg-[#080808] border border-[#222] rounded-sm p-5 sm:p-6 shadow-2xl space-y-5 text-[#F0F0F0]">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-[#222] pb-3.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-5 h-5 bg-[#CCFF00] rounded-sm flex items-center justify-center">
            <span className="font-mono text-black font-extrabold text-[10px]">01</span>
          </div>
          <div>
            <h2 className="font-mono font-bold text-xs uppercase tracking-widest text-white">INPUT PARAMETERS</h2>
            <p className="text-[10px] font-mono text-[#666]">Suno arrangement &amp; lyric prompt synthetics</p>
          </div>
        </div>

        <button
          onClick={onOpenStyleMixer}
          className="text-[11px] font-mono font-bold px-2.5 py-1 bg-[#141414] hover:bg-[#1A1A1A] text-[#CCFF00] border border-[#333] hover:border-[#CCFF00] rounded-sm flex items-center space-x-1.5 transition-all cursor-pointer"
          title="Buka peracik tag style"
        >
          <Sliders className="w-3 h-3 text-[#CCFF00]" />
          <span>STYLE MIXER</span>
        </button>
      </div>

      {/* 1. Song Topic / Story */}
      <div className="space-y-2">
        <label className="block font-mono text-[10px] uppercase tracking-widest text-[#666]">
          01 // TEMA CERITA &amp; KONSEP LAGU <span className="text-[#CCFF00]">*</span>
        </label>
        <textarea
          id="input-topic"
          rows={3}
          value={formData.topic}
          onChange={(e) => setFormData((prev) => ({ ...prev, topic: e.target.value }))}
          placeholder="Cth: Mengenang kenangan indah di kota Bandung bersama mantan saat hujan sore, lirik puitis dan menyentuh hati..."
          className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#2A2A2A] rounded-sm text-xs sm:text-sm text-[#F0F0F0] placeholder-[#555] focus:outline-none focus:border-[#CCFF00] transition-colors leading-relaxed font-sans"
        />

        {/* Quick Topic Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-mono text-[#666] shrink-0 uppercase">
            QUICK:
          </span>
          {TOPIC_SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleTopicSuggestion(sug)}
              className="text-[10px] font-mono px-2 py-0.5 bg-[#121212] hover:bg-[#1C1C1C] text-[#888] hover:text-[#CCFF00] border border-[#262626] hover:border-[#CCFF00]/60 rounded-sm whitespace-nowrap transition-colors"
            >
              {sug.slice(0, 26)}...
            </button>
          ))}
        </div>
      </div>

      {/* 2. Genre & Language Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Genre Selector */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#666]">
            02 // GENRE &amp; GAYA MUSIK
          </label>
          <input
            id="input-genre"
            type="text"
            value={formData.genre}
            onChange={(e) => setFormData((prev) => ({ ...prev, genre: e.target.value }))}
            placeholder="Cth: Indonesian Pop Rock 2000s, Dangdut Koplo..."
            className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#2A2A2A] rounded-sm text-xs font-mono text-[#F0F0F0] placeholder-[#555] focus:outline-none focus:border-[#CCFF00]"
          />
        </div>

        {/* Language Selector */}
        <div className="space-y-1.5">
          <label className="block font-mono text-[10px] uppercase tracking-widest text-[#666] flex items-center space-x-1">
            <Globe className="w-3 h-3 text-[#CCFF00]" />
            <span>03 // BAHASA LIRIK</span>
          </label>
          <select
            id="select-language"
            value={formData.language}
            onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value }))}
            className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#2A2A2A] rounded-sm text-xs font-mono text-[#F0F0F0] focus:outline-none focus:border-[#CCFF00]"
          >
            <option value="id">Bahasa Indonesia (Puitis &amp; Berima)</option>
            <option value="jw">Bahasa Jawa (Campursari / Koplo Ambyar)</option>
            <option value="su">Bahasa Sunda (Pop Sunda Merdu)</option>
            <option value="en">English (Catchy Pop / Global RnB)</option>
            <option value="mixed">Bilingual (Indo-English Pop)</option>
            <option value="ja">Japanese (Anime J-Rock / J-Pop)</option>
            <option value="es">Spanish (Latin Rhythm / Reggaeton)</option>
          </select>
        </div>
      </div>

      {/* 3. Mood & Atmosphere Chips */}
      <div className="space-y-2">
        <label className="block font-mono text-[10px] uppercase tracking-widest text-[#666]">
          04 // MOOD &amp; ATMOSFER LAGU
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {MOOD_OPTIONS.map((m) => {
            const isSelected = formData.mood.toLowerCase().includes(m.label.toLowerCase().split(' ')[0]);
            return (
              <button
                key={m.label}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, mood: m.label }))}
                className={`p-2 rounded-sm text-left border transition-all ${
                  isSelected
                    ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-bold shadow-[0_0_10px_rgba(204,255,0,0.2)]'
                    : 'bg-[#111] hover:bg-[#181818] text-[#888] hover:text-[#CCC] border-[#262626] hover:border-[#444]'
                }`}
              >
                <span className="block truncate font-mono text-[11px] uppercase">{m.label.split('(')[0]}</span>
                <span className={`text-[9px] block truncate font-mono ${isSelected ? 'text-black/70' : 'text-[#555]'}`}>
                  {m.label.split('(')[1]?.replace(')', '') || ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Vocal Style Selection */}
      <div className="space-y-2">
        <label className="block font-mono text-[10px] uppercase tracking-widest text-[#666] flex items-center space-x-1">
          <Mic className="w-3 h-3 text-[#CCFF00]" />
          <span>05 // KARAKTER VOKAL</span>
        </label>
        <select
          id="select-vocal-style"
          value={formData.vocalStyle}
          onChange={(e) => setFormData((prev) => ({ ...prev, vocalStyle: e.target.value }))}
          className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#2A2A2A] rounded-sm text-xs font-mono text-[#F0F0F0] focus:outline-none focus:border-[#CCFF00]"
        >
          {VOCAL_STYLES.map((v) => (
            <option key={v.label} value={v.tag}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      {/* 5. Tempo & Structure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tempo Slider */}
        <div className="space-y-1.5 bg-[#0D0D0D] p-3 rounded-sm border border-[#222]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#666]">TEMPO:</span>
            <span className="font-mono text-[#CCFF00] font-bold">{formData.tempo || '90 BPM'}</span>
          </div>
          <input
            type="range"
            min="60"
            max="180"
            step="2"
            value={currentBpmNumber}
            onChange={handleBpmChange}
            className="w-full accent-[#CCFF00] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-[#555] font-mono">
            <span>60 (Slow)</span>
            <span>100 (Mid)</span>
            <span>140 (Koplo/EDM)</span>
            <span>180 (Fast)</span>
          </div>
        </div>

        {/* Structure Template */}
        <div className="space-y-1.5 bg-[#0D0D0D] p-3 rounded-sm border border-[#222]">
          <label className="block font-mono text-[10px] uppercase tracking-wider text-[#666]">
            STRUKTUR ARANSEMEN:
          </label>
          <select
            value={formData.structure}
            onChange={(e) => setFormData((prev) => ({ ...prev, structure: e.target.value as any }))}
            className="w-full px-2.5 py-1.5 bg-[#141414] border border-[#2A2A2A] rounded-sm text-xs font-mono text-[#F0F0F0] focus:outline-none focus:border-[#CCFF00]"
          >
            <option value="standard">Standard Band (Verse - Chorus - Solo - Bridge)</option>
            <option value="ballad">Slow Ballad Emosional (Intro - PreChorus - Double Chorus)</option>
            <option value="dangdut">Dangdut Koplo (Intro - Kendang Solo - Reff - Coda)</option>
            <option value="edm">EDM Festival (Build-up - Big Drop - Break)</option>
            <option value="rap">Hip Hop / Drill (Hook - Long Verse - Fast Cadence)</option>
            <option value="rock">High-Energy Rock (Riff - Fast Chorus - Guitar Solo)</option>
          </select>
        </div>
      </div>

      {/* Advanced Settings Accordion */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-[11px] font-mono text-[#777] hover:text-[#CCFF00] flex items-center space-x-1.5 font-medium py-1 cursor-pointer"
        >
          <Layers className="w-3 h-3 text-[#CCFF00]" />
          <span>{showAdvanced ? '[-] SEMBUNYIKAN OPSI LANJUTAN' : '[+] TAMPILKAN OPSI LANJUTAN (SOLO, INSTRUKSI KHUSUS)'}</span>
        </button>

        {showAdvanced && (
          <div className="mt-3 p-4 bg-[#0D0D0D] rounded-sm border border-[#222] space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="check-solo"
                checked={formData.includeGuitarSolo}
                onChange={(e) => setFormData((prev) => ({ ...prev, includeGuitarSolo: e.target.checked }))}
                className="w-4 h-4 rounded-sm accent-[#CCFF00]"
              />
              <label htmlFor="check-solo" className="text-xs font-mono text-[#AAA] select-none cursor-pointer">
                Sertakan Solo Instrumen (<code className="text-[#CCFF00]">[Guitar Solo]</code>, <code className="text-[#CCFF00]">[Kendang Solo]</code>)
              </label>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#666]">
                Instruksi Tambahan AI:
              </label>
              <input
                type="text"
                value={formData.customInstructions || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, customInstructions: e.target.value }))}
                placeholder="Cth: Buat rima akhir baris konsisten AABB, selipkan kata Jawa 'Tresno', reff sangat catchy..."
                className="w-full px-3 py-1.5 bg-[#141414] border border-[#2A2A2A] rounded-sm text-xs font-mono text-[#DDD] placeholder-[#555] focus:outline-none focus:border-[#CCFF00]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Primary Submit Button */}
      <button
        id="btn-generate-suno"
        type="button"
        onClick={onGenerate}
        disabled={isLoading || !formData.topic.trim()}
        className="w-full py-4 px-6 rounded-sm font-mono font-extrabold text-xs tracking-wider uppercase bg-[#CCFF00] hover:bg-[#bceb00] disabled:opacity-40 text-black shadow-[0_0_20px_rgba(204,255,0,0.25)] flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-[0.99]"
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin text-black" />
            <span>SYNTHESIZING LYRICS &amp; STYLE...</span>
          </>
        ) : (
          <>
            <span>GENERATE SUNO TRACK STEMS</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </>
        )}
      </button>
    </div>
  );
};

