import React, { useState } from 'react';
import { ChevronRight, Disc3 } from 'lucide-react';
import { POPULAR_PRESETS } from '../data/sunoData';
import { SongPreset } from '../types';

interface PresetGalleryProps {
  onSelectPreset: (preset: SongPreset) => void;
}

export const PresetGallery: React.FC<PresetGalleryProps> = ({ onSelectPreset }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Indonesian', 'Pop & EDM', 'Rock & Metal', 'Hip-Hop & RnB', 'Acoustic & Folk', 'Anime & Gaming'];

  const filtered = selectedCategory === 'All'
    ? POPULAR_PRESETS
    : POPULAR_PRESETS.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#080808] border border-[#222] rounded-sm p-4 sm:p-5 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-5 h-5 bg-[#CCFF00] rounded-sm flex items-center justify-center">
            <Disc3 className="w-3.5 h-3.5 text-black" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white">CURATED PRESETS</h3>
            <p className="text-[10px] font-mono text-[#666]">Instant neural formulas for Suno AI synthesis</p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#CCFF00] text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.2)]'
                  : 'bg-[#111] text-[#777] hover:text-[#CCC] border border-[#222] hover:border-[#444]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filtered.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className="group text-left p-3.5 bg-[#0D0D0D] hover:bg-[#121212] border border-[#222] hover:border-[#CCFF00] rounded-sm transition-all duration-150 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">{preset.icon}</span>
                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 bg-[#1A1A1A] text-[#CCFF00] border border-[#333] rounded-sm">
                  {preset.language.toUpperCase()}
                </span>
              </div>
              <h4 className="font-serif italic font-bold text-sm text-white group-hover:text-[#CCFF00] transition-colors line-clamp-1">
                {preset.title}
              </h4>
              <p className="text-[11px] text-[#777] mt-1 line-clamp-2 leading-relaxed font-sans">
                {preset.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1C1C1C] flex items-center justify-between text-[10px] font-mono text-[#888] font-medium">
              <span className="truncate max-w-[120px] text-[#AAA]">{preset.tempo}</span>
              <span className="flex items-center space-x-1 text-[#CCFF00] group-hover:translate-x-0.5 transition-transform font-bold">
                <span>LOAD</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

