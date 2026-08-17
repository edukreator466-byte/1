import React, { useState } from 'react';
import { X, Trash2, Download, Copy, Check, Music, ArrowRight, Search, Calendar, FileText } from 'lucide-react';
import { SunoSongResult } from '../types';
import { exportSongAsText } from '../utils/storage';

interface SavedSongsModalProps {
  isOpen: boolean;
  onClose: () => void;
  songs: SunoSongResult[];
  onSelectSong: (song: SunoSongResult) => void;
  onDeleteSong: (id: string) => void;
}

export const SavedSongsModal: React.FC<SavedSongsModalProps> = ({
  isOpen,
  onClose,
  songs,
  onSelectSong,
  onDeleteSong,
}) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.styleOfMusicPrompt.toLowerCase().includes(search.toLowerCase()) ||
      s.lyrics.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopySong = (song: SunoSongResult) => {
    const text = exportSongAsText(song);
    navigator.clipboard.writeText(text);
    setCopiedId(song.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadTxt = (song: SunoSongResult) => {
    const text = exportSongAsText(song);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${song.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_suno.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#080808] border border-[#222] rounded-sm w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl text-[#F0F0F0] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#222] flex items-center justify-between bg-[#0D0D0D]">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-[#CCFF00] text-black flex items-center justify-center rounded-sm">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-white">SAVED ARCHIVE // SONG LIBRARY</h3>
              <p className="text-[10px] font-mono text-[#666]">
                {songs.length} TRACKS PERSISTED IN LOCAL MEMORY
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

        {/* Search Bar */}
        <div className="p-4 border-b border-[#222] bg-[#0A0A0A]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#666] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul lagu, genre, atau kata kunci lirik..."
              className="w-full pl-10 pr-4 py-2 bg-[#0D0D0D] border border-[#222] rounded-sm text-xs font-mono text-[#F0F0F0] placeholder-[#555] focus:outline-none focus:border-[#CCFF00] transition-colors"
            />
          </div>
        </div>

        {/* List of Songs */}
        <div className="p-5 overflow-y-auto space-y-3 max-h-[55vh] font-mono">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#555]">
              <Music className="w-12 h-12 mx-auto mb-2 opacity-20 text-[#CCFF00]" />
              <p className="text-xs font-bold uppercase tracking-wider text-[#777]">BELUM ADA LAGU TERSIMPAN</p>
              <p className="text-[10px] mt-1 text-[#555]">
                Generate lagu lalu klik &quot;SAVE&quot; untuk menyimpannya di sini.
              </p>
            </div>
          ) : (
            filtered.map((song) => (
              <div
                key={song.id}
                className="p-4 bg-[#0D0D0D] hover:bg-[#121212] border border-[#222] hover:border-[#CCFF00]/40 rounded-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-serif font-bold text-base text-white truncate italic">{song.title}</h4>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-[#1A1A1A] text-[#CCFF00] border border-[#333] rounded-sm">
                      {song.language?.toUpperCase() || 'ID'}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-[#CCFF00] truncate bg-[#050505] px-2 py-1 rounded-sm border border-[#1F1F1F]">
                    {song.styleOfMusicPrompt}
                  </p>

                  <div className="flex items-center space-x-3 text-[10px] text-[#666]">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(song.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span>•</span>
                    <span>{song.lyrics?.split('\n').filter((l) => l.trim()).length || 0} LINES</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-1.5 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => {
                      onSelectSong(song);
                      onClose();
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-[#CCFF00] hover:bg-[#bceb00] text-black font-extrabold rounded-sm text-xs transition-colors shadow-[0_0_10px_rgba(204,255,0,0.2)] cursor-pointer"
                    title="Buka lagu ini di Editor"
                  >
                    <span>OPEN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleCopySong(song)}
                    className="p-1.5 bg-[#141414] hover:bg-[#222] border border-[#2A2A2A] rounded-sm text-[#888] hover:text-white transition-colors cursor-pointer"
                    title="Salin Semua Spesifikasi Suno"
                  >
                    {copiedId === song.id ? (
                      <Check className="w-3.5 h-3.5 text-[#CCFF00]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDownloadTxt(song)}
                    className="p-1.5 bg-[#141414] hover:bg-[#222] border border-[#2A2A2A] rounded-sm text-[#888] hover:text-white transition-colors cursor-pointer"
                    title="Download sebagai file .txt"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteSong(song.id)}
                    className="p-1.5 bg-[#141414] hover:bg-rose-950/50 text-rose-400 border border-rose-900/30 rounded-sm transition-colors cursor-pointer"
                    title="Hapus dari koleksi"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222] bg-[#0D0D0D] flex justify-end font-mono">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-[#141414] hover:bg-[#1E1E1E] text-white border border-[#2A2A2A] rounded-sm transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

