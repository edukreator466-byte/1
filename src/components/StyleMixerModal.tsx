import React, { useState } from 'react';
import { X, Sparkles, Plus, Check, Music, Copy, RefreshCw, Wand2 } from 'lucide-react';
import { GENRE_CATEGORIES, VOCAL_STYLES, MOOD_OPTIONS } from '../data/sunoData';

interface StyleMixerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyStyle: (stylePrompt: string) => void;
  initialStyle?: string;
}

const INSTRUMENT_TAGS = [
  'acoustic guitar', 'distorted electric guitar', 'piano', 'rhodes keyboard',
  'kendang rampak', 'suling bambu', 'gamelan', '808 sub bass', 'synth lead',
  'supersaw synth', 'brass horns section', 'saxophone solo', 'punchy drum kit',
  'strings orchestra', 'marimba plucks', 'cowbell melody', 'kacapi'
];

const PRODUCTION_TAGS = [
  'clean studio mix', 'lo-fi vinyl crackle', 'stadium reverb', 'punchy modern bass',
  'retro 80s gated reverb', 'ambient rain sound', 'heavy sidechain compression',
  'radio friendly polish', 'live concert atmosphere', 'warm tape saturation'
];

export const StyleMixerModal: React.FC<StyleMixerModalProps> = ({
  isOpen,
  onClose,
  onApplyStyle,
  initialStyle = '',
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    if (initialStyle) {
      return initialStyle.split(',').map((t) => t.trim()).filter(Boolean);
    }
    return ['indonesian pop rock', 'emotional male vocal', 'acoustic guitar', 'melancholic', '78 bpm'];
  });
  const [customTag, setCustomTag] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    const cleanTag = tag.trim().toLowerCase();
    if (selectedTags.some((t) => t.toLowerCase() === cleanTag)) {
      setSelectedTags(selectedTags.filter((t) => t.toLowerCase() !== cleanTag));
    } else {
      setSelectedTags([...selectedTags, cleanTag]);
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTag.trim()) {
      toggleTag(customTag.trim());
      setCustomTag('');
    }
  };

  const currentPrompt = selectedTags.join(', ');
  const charCount = currentPrompt.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    onApplyStyle(currentPrompt);
    onClose();
  };

  const handleClear = () => {
    setSelectedTags([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#080808] border border-[#222] rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-[#F0F0F0] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#222] flex items-center justify-between bg-[#0D0D0D]">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-[#CCFF00] rounded-sm flex items-center justify-center">
              <Wand2 className="w-4 h-4 text-black" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-white">SUNO STYLE MIXER &amp; TAG ARCHITECT</h3>
              <p className="text-[10px] font-mono text-[#666]">
                Assemble genre matrix, vocal dynamics, acoustics, and studio production tags
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-sm bg-[#141414] hover:bg-[#222] border border-[#2A2A2A] flex items-center justify-center text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Prompt Live Preview Card */}
        <div className="p-5 bg-[#0A0A0A] border-b border-[#222] font-mono">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#777] uppercase tracking-wider">
              01 // LIVE STYLE PROMPT PREVIEW:
            </span>
            <div className="flex items-center space-x-2">
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border ${
                  charCount <= 120
                    ? 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]/30'
                    : charCount <= 200
                    ? 'bg-[#1A1A1A] text-[#DDD] border-[#333]'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {charCount} CHARACTERS (Suno ideal: &le;120c)
              </span>
              {selectedTags.length > 0 && (
                <button
                  onClick={handleClear}
                  className="text-[10px] text-[#777] hover:text-rose-400 uppercase underline cursor-pointer"
                >
                  RESET ALL
                </button>
              )}
            </div>
          </div>

          <div className="p-3.5 bg-[#0D0D0D] border border-[#222] rounded-sm font-mono text-xs text-[#CCFF00] min-h-[50px] flex items-center justify-between gap-3">
            <span className="break-words font-medium">
              {currentPrompt || (
                <span className="text-[#555] italic">Select tags below to assemble Suno music prompt...</span>
              )}
            </span>
            {currentPrompt && (
              <button
                onClick={handleCopy}
                className="shrink-0 px-2.5 py-1.5 bg-[#141414] hover:bg-[#222] text-[#CCC] hover:text-white rounded-sm text-xs font-mono font-bold flex items-center space-x-1 border border-[#2A2A2A] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#CCFF00]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tag Selector Categories */}
        <div className="p-5 overflow-y-auto space-y-5 max-h-[50vh] font-mono">
          {/* Custom Tag Input */}
          <form onSubmit={handleAddCustom} className="flex gap-2">
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Ketik tag kustom (cth: kendang koplo modern, 140 bpm, dirty autotune)..."
              className="flex-1 px-3 py-2 bg-[#0D0D0D] border border-[#262626] rounded-sm text-xs font-mono text-[#F0F0F0] placeholder-[#555] focus:outline-none focus:border-[#CCFF00]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#141414] hover:bg-[#1E1E1E] text-[#CCFF00] border border-[#2A2A2A] hover:border-[#CCFF00]/50 font-bold rounded-sm text-xs flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD TAG</span>
            </button>
          </form>

          {/* Genres */}
          <div>
            <h4 className="font-bold text-[10px] text-[#777] uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
              <Music className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>GENRES &amp; ROOT STYLES</span>
            </h4>
            <div className="space-y-3">
              {GENRE_CATEGORIES.map((cat) => (
                <div key={cat.name} className="bg-[#0D0D0D] p-3 rounded-sm border border-[#222]">
                  <span className="text-[10px] font-bold text-[#666] uppercase block mb-2">{cat.name}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.genres.map((g) => {
                      const isSelected = selectedTags.some((t) => t.toLowerCase() === g.name.toLowerCase());
                      return (
                        <button
                          key={g.name}
                          onClick={() => toggleTag(g.name)}
                          className={`text-[11px] px-2.5 py-1 rounded-sm border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#CCFF00] text-black font-extrabold border-[#CCFF00] shadow-[0_0_8px_rgba(204,255,0,0.3)]'
                              : 'bg-[#141414] hover:bg-[#1C1C1C] text-[#AAA] hover:text-[#FFF] border-[#262626]'
                          }`}
                          title={g.desc}
                        >
                          {g.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vocal Style */}
          <div>
            <h4 className="font-bold text-[10px] text-[#777] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>VOCAL TIMBRE &amp; PROFILE</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {VOCAL_STYLES.map((v) => {
                const isSelected = selectedTags.some((t) => t.toLowerCase() === v.tag.toLowerCase());
                return (
                  <button
                    key={v.label}
                    onClick={() => toggleTag(v.tag)}
                    className={`text-[11px] px-2.5 py-1 rounded-sm border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#CCFF00] text-black font-extrabold border-[#CCFF00] shadow-[0_0_8px_rgba(204,255,0,0.3)]'
                        : 'bg-[#141414] hover:bg-[#1C1C1C] text-[#AAA] hover:text-[#FFF] border-[#262626]'
                    }`}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instruments */}
          <div>
            <h4 className="font-bold text-[10px] text-[#777] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Music className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>ACOUSTICS &amp; INSTRUMENTATION</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {INSTRUMENT_TAGS.map((inst) => {
                const isSelected = selectedTags.some((t) => t.toLowerCase() === inst.toLowerCase());
                return (
                  <button
                    key={inst}
                    onClick={() => toggleTag(inst)}
                    className={`text-[11px] px-2.5 py-1 rounded-sm border transition-all font-mono cursor-pointer ${
                      isSelected
                        ? 'bg-[#CCFF00] text-black font-extrabold border-[#CCFF00] shadow-[0_0_8px_rgba(204,255,0,0.3)]'
                        : 'bg-[#141414] hover:bg-[#1C1C1C] text-[#AAA] hover:text-[#FFF] border-[#262626]'
                    }`}
                  >
                    {inst}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Production Vibes */}
          <div>
            <h4 className="font-bold text-[10px] text-[#777] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>STUDIO ATMOSPHERE &amp; PRODUCTION</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {PRODUCTION_TAGS.map((prod) => {
                const isSelected = selectedTags.some((t) => t.toLowerCase() === prod.toLowerCase());
                return (
                  <button
                    key={prod}
                    onClick={() => toggleTag(prod)}
                    className={`text-[11px] px-2.5 py-1 rounded-sm border transition-all font-mono cursor-pointer ${
                      isSelected
                        ? 'bg-[#CCFF00] text-black font-extrabold border-[#CCFF00] shadow-[0_0_8px_rgba(204,255,0,0.3)]'
                        : 'bg-[#141414] hover:bg-[#1C1C1C] text-[#AAA] hover:text-[#FFF] border-[#262626]'
                    }`}
                  >
                    {prod}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222] bg-[#0D0D0D] flex items-center justify-between font-mono">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold bg-[#141414] hover:bg-[#1E1E1E] text-[#888] hover:text-white border border-[#262626] rounded-sm transition-colors cursor-pointer"
          >
            CANCEL
          </button>
          <button
            onClick={handleApply}
            disabled={!currentPrompt}
            className="px-6 py-2 text-xs font-extrabold bg-[#CCFF00] hover:bg-[#bceb00] disabled:opacity-40 text-black rounded-sm shadow-[0_0_12px_rgba(204,255,0,0.3)] transition-all cursor-pointer"
          >
            APPLY TO GENERATOR ({selectedTags.length} TAGS)
          </button>
        </div>
      </div>
    </div>
  );
};

