import React, { useState, useRef } from 'react';
import { Copy, Check, Sparkles, Download, Bookmark, Plus, FileText, CheckCircle2 } from 'lucide-react';
import { SunoSongResult } from '../types';
import { exportSongAsText } from '../utils/storage';

interface LyricsEditorProps {
  song: SunoSongResult;
  onUpdateLyrics: (newLyrics: string) => void;
  onOpenRefine: () => void;
  onSaveSong: () => void;
  isSaved: boolean;
}

const QUICK_TAGS = [
  '[Verse 1]', '[Pre-Chorus]', '[Chorus]', '[Verse 2]',
  '[Guitar Solo]', '[Kendang Solo]', '[Bridge]', '[Drop]',
  '[Chorus - Double Energy]', '[Whisper]', '[Outro]', '[End]'
];

export const LyricsEditor: React.FC<LyricsEditorProps> = ({
  song,
  onUpdateLyrics,
  onOpenRefine,
  onSaveSong,
  isSaved,
}) => {
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [copiedBundle, setCopiedBundle] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopyLyrics = () => {
    navigator.clipboard.writeText(song.lyrics);
    setCopiedLyrics(true);
    setTimeout(() => setCopiedLyrics(false), 2000);
  };

  const handleCopyAllBundle = () => {
    const bundle = `TITLE: ${song.title}
STYLE OF MUSIC: ${song.styleOfMusicPrompt}

LYRICS:
${song.lyrics}`;
    navigator.clipboard.writeText(bundle);
    setCopiedBundle(true);
    setTimeout(() => setCopiedBundle(false), 2000);
  };

  const handleInsertTag = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onUpdateLyrics(song.lyrics + '\n\n' + tag + '\n');
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = song.lyrics;

    const before = current.substring(0, start);
    const after = current.substring(end);

    const prefix = before.endsWith('\n') || before.length === 0 ? '' : '\n\n';
    const suffix = '\n';

    const updated = before + prefix + tag + suffix + after;
    onUpdateLyrics(updated);

    setTimeout(() => {
      textarea.focus();
      const newCursor = start + prefix.length + tag.length + suffix.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 50);
  };

  const handleDownload = () => {
    const text = exportSongAsText(song);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${song.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_suno.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const lines = (song.lyrics || '').split('\n');
  const lineCount = lines.length;

  return (
    <div className="bg-[#080808] border border-[#222] rounded-sm p-5 sm:p-6 shadow-2xl space-y-4 text-[#F0F0F0] flex flex-col h-full">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#222] pb-4">
        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#666]">02 // COMPOSITION:</span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-[#1A1A1A] text-[#CCFF00] border border-[#333] rounded-sm shrink-0">
              {song.language?.toUpperCase() || 'ID'}
            </span>
          </div>
          <h2 className="font-serif italic font-bold text-2xl text-white truncate tracking-tight mt-0.5">{song.title}</h2>
          <p className="font-mono text-[10px] text-[#666] mt-0.5">
            Suno formatted with metatag arranged neural structure
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center flex-wrap gap-2">
          {/* AI Refine Button */}
          <button
            id="btn-refine-lyrics"
            onClick={onOpenRefine}
            className="px-3 py-1.5 bg-[#141414] hover:bg-[#1A1A1A] text-[#CCFF00] border border-[#333] hover:border-[#CCFF00] rounded-sm text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>AI REFINE</span>
          </button>

          {/* Save to library */}
          <button
            id="btn-save-song"
            onClick={onSaveSong}
            className={`px-3 py-1.5 rounded-sm text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer border ${
              isSaved
                ? 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]'
                : 'bg-[#141414] hover:bg-[#1A1A1A] text-[#AAA] border-[#2A2A2A] hover:border-[#444]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#CCFF00] text-[#CCFF00]' : ''}`} />
            <span>{isSaved ? 'SAVED' : 'SAVE'}</span>
          </button>

          {/* Download TXT */}
          <button
            onClick={handleDownload}
            className="p-1.5 bg-[#141414] hover:bg-[#1A1A1A] text-[#AAA] hover:text-white border border-[#2A2A2A] hover:border-[#444] rounded-sm transition-colors cursor-pointer"
            title="Download file .txt"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Copy Lyrics */}
          <button
            id="btn-copy-lyrics"
            onClick={handleCopyLyrics}
            className="px-3 py-1.5 bg-[#141414] hover:bg-[#1A1A1A] text-[#DDD] hover:text-white border border-[#2A2A2A] rounded-sm text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            {copiedLyrics ? <Check className="w-3.5 h-3.5 text-[#CCFF00]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLyrics ? 'COPIED' : 'COPY LYRICS'}</span>
          </button>

          {/* Copy All-in-One Suno Bundle */}
          <button
            id="btn-copy-bundle"
            onClick={handleCopyAllBundle}
            className="px-3.5 py-1.5 bg-[#CCFF00] hover:bg-[#bceb00] text-black rounded-sm text-xs font-mono font-extrabold flex items-center space-x-1.5 shadow-[0_0_12px_rgba(204,255,0,0.25)] transition-all cursor-pointer active:scale-[0.99]"
          >
            {copiedBundle ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-black" />}
            <span>{copiedBundle ? 'COPIED' : 'COPY SUNO BUNDLE'}</span>
          </button>
        </div>
      </div>

      {/* Quick Tag Inserter Toolbar */}
      <div className="bg-[#0D0D0D] p-2.5 rounded-sm border border-[#222] space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#666] font-bold flex items-center space-x-1 uppercase">
            <Plus className="w-3 h-3 text-[#CCFF00]" />
            <span>INSERT METATAG:</span>
          </span>
          <span className="text-[#555]">{lineCount} LINES</span>
        </div>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto max-h-16 scrollbar-none">
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleInsertTag(tag)}
              className="text-[10px] font-mono px-2 py-0.5 bg-[#141414] hover:bg-[#1E1E1E] text-[#999] hover:text-[#CCFF00] rounded-sm border border-[#2A2A2A] hover:border-[#CCFF00]/60 transition-all cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Editable Lyrics Area */}
      <div className="relative flex-1 min-h-[360px] bg-[#0D0D0D] rounded-sm border border-[#262626] overflow-hidden flex flex-col">
        <textarea
          id="textarea-lyrics"
          ref={textareaRef}
          value={song.lyrics}
          onChange={(e) => onUpdateLyrics(e.target.value)}
          placeholder="Lirik lagu Suno akan tampil di sini..."
          className="w-full flex-1 p-4 bg-transparent text-[#F0F0F0] font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-none selection:bg-[#CCFF00]/30 selection:text-white overflow-y-auto"
        />
      </div>

      {/* Footer Info / Suno Tips */}
      {song.sunoTips && song.sunoTips.length > 0 && (
        <div className="p-3 bg-[#0D0D0D] rounded-sm border border-[#222] text-[11px] font-mono text-[#888] space-y-1">
          <span className="text-[#CCFF00] font-bold block uppercase text-[10px]">
            TIPS SUNO STUDIO:
          </span>
          <ul className="list-disc list-inside space-y-0.5 text-[#777]">
            {song.sunoTips.map((tip, i) => (
              <li key={i} className="truncate">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

