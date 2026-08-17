import React, { useState } from 'react';
import { X, Sparkles, Wand2, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SunoSongResult } from '../types';

interface RefineLyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: SunoSongResult;
  onApplyRefinement: (updatedLyrics: string, updatedStylePrompt?: string) => void;
}

const PRESET_INSTRUCTIONS = [
  'Perkuat rima akhir baris (AABB/ABAB) agar lebih berirama dan catchy',
  'Tambahkan bait Rap / Drill cepat di tengah lagu',
  'Buat lirik Chorus lebih menyentuh hati dan mudah diingat penonton',
  'Selipkan ungkapan bahasa daerah (Jawa/Sunda) yang mendalam',
  'Tambahkan bagian [Bridge - Dramatic Key Change] dengan emosi memuncak',
  'Sederhanakan kalimat agar pelafalan vokal Suno tidak belibet'
];

export const RefineLyricsModal: React.FC<RefineLyricsModalProps> = ({
  isOpen,
  onClose,
  song,
  onApplyRefinement,
}) => {
  const [instruction, setInstruction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewLyrics, setPreviewLyrics] = useState<string | null>(null);
  const [previewStyle, setPreviewStyle] = useState<string | null>(null);
  const [changeSummary, setChangeSummary] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRefine = async () => {
    if (!instruction.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/refine-lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentLyrics: song.lyrics,
          stylePrompt: song.styleOfMusicPrompt,
          instruction: instruction.trim(),
          language: song.language || 'id',
        }),
      });

      const data = await res.json();
      if (data.updatedLyrics) {
        setPreviewLyrics(data.updatedLyrics);
        setPreviewStyle(data.updatedStylePrompt || song.styleOfMusicPrompt);
        setChangeSummary(data.summaryOfChanges || 'Lirik berhasil diperbarui.');
      }
    } catch (err) {
      console.error('Error refining lyrics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (previewLyrics) {
      onApplyRefinement(previewLyrics, previewStyle || undefined);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#080808] border border-[#222] rounded-sm w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl text-[#F0F0F0] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#222] flex items-center justify-between bg-[#0D0D0D]">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-[#CCFF00] rounded-sm flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-white">AI LYRICS POLISHING &amp; REFINEMENT</h3>
              <p className="text-[10px] font-mono text-[#666]">
                Targeted structural revisions, cadence tuning, and rhyme enhancement
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

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 max-h-[60vh] font-mono">
          {/* Quick Preset Buttons */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#888] uppercase block">
              QUICK REFINEMENT PRESETS:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_INSTRUCTIONS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInstruction(p)}
                  className={`text-left p-2.5 rounded-sm border text-xs transition-all cursor-pointer ${
                    instruction === p
                      ? 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00] font-bold'
                      : 'bg-[#0D0D0D] hover:bg-[#141414] text-[#AAA] border-[#222]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Instruction input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#888] uppercase block">
              CUSTOM PROMPT DIRECTIVE:
            </label>
            <textarea
              rows={2}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Cth: Buat lirik bait kedua menceritakan tentang perpisahan di bandara, lalu tambahkan solo gitar melodi..."
              className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#262626] rounded-sm text-xs text-[#F0F0F0] placeholder-[#555] focus:outline-none focus:border-[#CCFF00]"
            />
          </div>

          <button
            onClick={handleRefine}
            disabled={isLoading || !instruction.trim()}
            className="w-full py-2.5 bg-[#CCFF00] hover:bg-[#bceb00] disabled:opacity-40 text-black font-extrabold rounded-sm text-xs font-mono flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(204,255,0,0.25)]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>PROCESSING REFINEMENT...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>EXECUTE AI POLISHING</span>
              </>
            )}
          </button>

          {/* Preview Changes */}
          {previewLyrics && (
            <div className="mt-4 p-4 bg-[#0D0D0D] rounded-sm border border-[#CCFF00]/40 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-[#CCFF00] text-xs font-bold font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>SUMMARY: {changeSummary}</span>
              </div>

              <div className="max-h-48 overflow-y-auto bg-[#050505] p-3 rounded-sm border border-[#222] font-mono text-xs text-[#DDD] whitespace-pre-wrap">
                {previewLyrics}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222] bg-[#0D0D0D] flex items-center justify-between font-mono">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold bg-[#141414] hover:bg-[#1E1E1E] text-[#888] hover:text-white border border-[#262626] rounded-sm transition-colors cursor-pointer"
          >
            CANCEL
          </button>

          {previewLyrics && (
            <button
              onClick={handleApply}
              className="px-6 py-2 text-xs font-extrabold bg-[#CCFF00] hover:bg-[#bceb00] text-black rounded-sm transition-colors shadow-[0_0_12px_rgba(204,255,0,0.3)] cursor-pointer"
            >
              APPLY TO EDITOR
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

