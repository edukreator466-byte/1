import React, { useState } from 'react';
import { Copy, Check, Tag, RefreshCw, Wand2 } from 'lucide-react';
import { SunoSongResult } from '../types';

interface StylePromptCardProps {
  song: SunoSongResult;
  onUpdateStylePrompt: (newPrompt: string) => void;
  sunoVersion: 'v3.5' | 'v4';
}

export const StylePromptCard: React.FC<StylePromptCardProps> = ({
  song,
  onUpdateStylePrompt,
  sunoVersion,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [variations, setVariations] = useState<{ title: string; stylePrompt: string; characterCount: number; description: string }[]>([]);
  const [showVariations, setShowVariations] = useState(false);

  const charCount = song.styleOfMusicPrompt?.length || 0;
  const isOptimal = charCount <= (sunoVersion === 'v3.5' ? 120 : 180);

  const handleCopy = () => {
    navigator.clipboard.writeText(song.styleOfMusicPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateVariations = async () => {
    setIsEnhancing(true);
    setShowVariations(true);
    try {
      const res = await fetch('/api/enhance-style-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawStyle: song.styleOfMusicPrompt,
          targetMood: song.stylePromptBreakdown?.moodAndVibe?.join(', ') || '',
          tempo: song.stylePromptBreakdown?.tempoBpm || '',
        }),
      });
      const data = await res.json();
      if (data.variations) {
        setVariations(data.variations);
      }
    } catch (err) {
      console.error('Error generating variations:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="bg-[#080808] border border-[#222] rounded-sm p-5 shadow-2xl space-y-4 text-[#F0F0F0]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#222] pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-5 h-5 bg-[#CCFF00] rounded-sm flex items-center justify-center">
            <Tag className="w-3 h-3 text-black" />
          </div>
          <div>
            <h3 className="font-mono font-bold text-xs uppercase tracking-widest text-white">SUNO STYLE PROMPT</h3>
            <p className="text-[10px] font-mono text-[#666]">Paste to &apos;Style of Music&apos; field on Suno.com</p>
          </div>
        </div>

        {/* Character Count & Model Compatibility */}
        <div className="flex items-center space-x-2 font-mono">
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border ${
              isOptimal
                ? 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]/40 font-bold'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/40 font-bold'
            }`}
          >
            {charCount} CHARS {isOptimal ? '[OPTIMAL]' : '[LONG]'}
          </span>
        </div>
      </div>

      {/* Main Copy Box */}
      <div className="relative group">
        <div className="p-3.5 bg-[#0D0D0D] border border-[#262626] rounded-sm font-mono text-xs text-[#CCFF00] pr-28 min-h-[56px] flex items-center leading-relaxed select-all">
          {song.styleOfMusicPrompt}
        </div>

        <button
          id="btn-copy-style-prompt"
          onClick={handleCopy}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#CCFF00] hover:bg-[#bceb00] text-black font-mono font-bold rounded-sm text-xs flex items-center space-x-1.5 shadow-[0_0_10px_rgba(204,255,0,0.25)] transition-all cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>

      {/* Breakdown Chips */}
      {song.stylePromptBreakdown && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[10px] font-mono bg-[#0D0D0D] p-3 rounded-sm border border-[#1F1F1F]">
          <div>
            <span className="text-[#555] block uppercase text-[9px] font-bold">GENRE:</span>
            <span className="text-[#CCC] font-medium truncate block">{song.stylePromptBreakdown.primaryGenre || '-'}</span>
          </div>
          <div>
            <span className="text-[#555] block uppercase text-[9px] font-bold">VOCAL:</span>
            <span className="text-[#CCC] font-medium truncate block">{song.stylePromptBreakdown.vocalType || '-'}</span>
          </div>
          <div>
            <span className="text-[#555] block uppercase text-[9px] font-bold">TEMPO / BPM:</span>
            <span className="text-[#CCFF00] font-bold truncate block">{song.stylePromptBreakdown.tempoBpm || '-'}</span>
          </div>
          <div className="col-span-2 sm:col-span-3">
            <span className="text-[#555] block uppercase text-[9px] font-bold">INSTRUMENTS &amp; VIBE:</span>
            <span className="text-[#999] truncate block">
              {[
                ...(song.stylePromptBreakdown.keyInstruments || []),
                ...(song.stylePromptBreakdown.moodAndVibe || []),
                song.stylePromptBreakdown.productionVibe
              ].filter(Boolean).join(' • ')}
            </span>
          </div>
        </div>
      )}

      {/* Variation Generator Action */}
      <div>
        <button
          onClick={handleGenerateVariations}
          disabled={isEnhancing}
          className="text-xs font-mono font-bold text-[#CCFF00] hover:underline flex items-center space-x-1.5 py-1 transition-colors cursor-pointer"
        >
          {isEnhancing ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#CCFF00]" />
          ) : (
            <Wand2 className="w-3.5 h-3.5 text-[#CCFF00]" />
          )}
          <span>{isEnhancing ? 'SYNTHESIZING VARIATIONS...' : '+ SYNTHESIZE 3 STYLE ALTERNATIVES'}</span>
        </button>

        {showVariations && variations.length > 0 && (
          <div className="mt-3 space-y-2 animate-in fade-in duration-200">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#666] block">SELECT VARIATION:</span>
            {variations.map((v, i) => (
              <div
                key={i}
                className="p-3 bg-[#0D0D0D] border border-[#222] hover:border-[#CCFF00] rounded-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-mono font-bold text-xs text-white">{v.title}</h5>
                    <span className="text-[10px] text-[#666] font-mono">({v.characterCount}c)</span>
                  </div>
                  <p className="font-mono text-[11px] text-[#CCFF00] truncate mt-0.5">{v.stylePrompt}</p>
                </div>
                <button
                  onClick={() => onUpdateStylePrompt(v.stylePrompt)}
                  className="px-2.5 py-1 bg-[#1A1A1A] hover:bg-[#CCFF00] hover:text-black text-[#CCFF00] rounded-sm text-xs font-mono font-bold border border-[#333] self-end sm:self-center shrink-0 transition-colors cursor-pointer"
                >
                  APPLY
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

