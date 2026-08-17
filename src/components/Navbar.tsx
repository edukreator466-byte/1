import React from 'react';
import { BookOpen, Bookmark, Timer, Activity, Disc3 } from 'lucide-react';

interface NavbarProps {
  onOpenCheatSheet: () => void;
  onOpenSavedSongs: () => void;
  onToggleMetronome: () => void;
  isMetronomeActive: boolean;
  savedCount: number;
  sunoVersion: 'v3.5' | 'v4';
  setSunoVersion: (v: 'v3.5' | 'v4') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCheatSheet,
  onOpenSavedSongs,
  onToggleMetronome,
  isMetronomeActive,
  savedCount,
  sunoVersion,
  setSunoVersion,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0D0D0D] border-b border-[#222] text-[#F0F0F0] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3.5">
          <div className="w-7 h-7 bg-[#CCFF00] rounded-sm flex items-center justify-center shadow-[0_0_12px_rgba(204,255,0,0.35)]">
            <Disc3 className="w-4 h-4 text-black animate-spin [animation-duration:8s]" />
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="font-mono font-bold tracking-tighter text-base sm:text-lg text-white">
                SONO_FORGE <span className="text-[#CCFF00]">v4.0</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 bg-[#1A1A1A] text-[#CCFF00] font-mono text-[10px] rounded-sm border border-[#333] tracking-widest uppercase">
                NEURAL-LYRIC-X
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#666] hidden md:block tracking-tight">
              Suno AI Lyric Architect &amp; Style Prompt Synthesizer
            </p>
          </div>
        </div>

        {/* Telemetry & Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Target Suno Version Selector */}
          <div className="flex items-center bg-[#111] p-1 rounded-sm border border-[#222] text-xs font-mono">
            <span className="text-[#666] px-1.5 text-[10px] hidden sm:inline uppercase tracking-wider">TARGET:</span>
            <button
              id="btn-version-v35"
              onClick={() => setSunoVersion('v3.5')}
              className={`px-2.5 py-1 rounded-sm transition-all text-xs font-mono font-bold cursor-pointer ${
                sunoVersion === 'v3.5'
                  ? 'bg-[#CCFF00] text-black shadow-sm'
                  : 'text-[#888] hover:text-white'
              }`}
            >
              v3.5 (120c)
            </button>
            <button
              id="btn-version-v4"
              onClick={() => setSunoVersion('v4')}
              className={`px-2.5 py-1 rounded-sm transition-all text-xs font-mono font-bold cursor-pointer ${
                sunoVersion === 'v4'
                  ? 'bg-[#CCFF00] text-black shadow-sm'
                  : 'text-[#888] hover:text-white'
              }`}
            >
              v4 Pro
            </button>
          </div>

          {/* Rhythm Metronome Button */}
          <button
            id="btn-nav-metronome"
            onClick={onToggleMetronome}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded-sm border transition-all cursor-pointer ${
              isMetronomeActive
                ? 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.2)]'
                : 'bg-[#141414] hover:bg-[#1A1A1A] text-[#AAA] border-[#2A2A2A] hover:border-[#444]'
            }`}
            title="Metronome / Rhythm Clicker untuk tes ketukan lagu"
          >
            <Timer className={`w-3.5 h-3.5 ${isMetronomeActive ? 'text-[#CCFF00]' : ''}`} />
            <span className="hidden sm:inline">RHYTHM</span>
          </button>

          {/* Saved Songs Library */}
          <button
            id="btn-nav-saved-songs"
            onClick={onOpenSavedSongs}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded-sm bg-[#141414] hover:bg-[#1A1A1A] text-[#AAA] hover:text-[#F0F0F0] border border-[#2A2A2A] hover:border-[#444] transition-all cursor-pointer"
            title="Koleksi Lagu Tersimpan"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span className="hidden sm:inline">VAULT</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#CCFF00] text-black font-bold font-mono rounded-sm text-[10px]">
                {savedCount}
              </span>
            )}
          </button>

          {/* Suno Cheat Sheet Button */}
          <button
            id="btn-nav-cheatsheet"
            onClick={onOpenCheatSheet}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono font-bold rounded-sm bg-[#CCFF00] text-black hover:bg-[#b8e600] transition-all cursor-pointer shadow-[0_0_12px_rgba(204,255,0,0.25)]"
          >
            <BookOpen className="w-3.5 h-3.5 text-black" />
            <span className="tracking-tight">GUIDE</span>
          </button>
        </div>
      </div>
    </header>
  );
};

