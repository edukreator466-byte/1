import React, { useState } from 'react';
import { X, BookOpen, Copy, Check, Sparkles, Tag, Music, AlertCircle } from 'lucide-react';
import { SUNO_METATAGS, SUNO_TIPS } from '../data/sunoData';

interface SunoCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertTag?: (tag: string) => void;
}

export const SunoCheatSheetModal: React.FC<SunoCheatSheetModalProps> = ({
  isOpen,
  onClose,
  onInsertTag,
}) => {
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'metatags' | 'tips' | 'vocal' | 'styleBox'>('metatags');

  if (!isOpen) return null;

  const handleCopy = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#080808] border border-[#222] rounded-sm w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl text-[#F0F0F0] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#222] flex items-center justify-between bg-[#0D0D0D]">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-[#CCFF00] rounded-sm flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-black" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-white">SUNO AI CHEAT SHEET &amp; TAG DIRECTORY</h3>
              <p className="text-[10px] font-mono text-[#666]">
                Official syntax, metatags, vocal directives &amp; style formulas
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

        {/* Tab Navigation */}
        <div className="flex border-b border-[#222] px-5 bg-[#0A0A0A] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('metatags')}
            className={`py-3 px-3 text-[11px] font-mono uppercase tracking-wider border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'metatags'
                ? 'border-[#CCFF00] text-[#CCFF00] font-bold'
                : 'border-transparent text-[#777] hover:text-[#CCC]'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>METATAGS</span>
          </button>
          <button
            onClick={() => setActiveTab('styleBox')}
            className={`py-3 px-3 text-[11px] font-mono uppercase tracking-wider border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'styleBox'
                ? 'border-[#CCFF00] text-[#CCFF00] font-bold'
                : 'border-transparent text-[#777] hover:text-[#CCC]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>STYLE OF MUSIC FORMULA</span>
          </button>
          <button
            onClick={() => setActiveTab('vocal')}
            className={`py-3 px-3 text-[11px] font-mono uppercase tracking-wider border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'vocal'
                ? 'border-[#CCFF00] text-[#CCFF00] font-bold'
                : 'border-transparent text-[#777] hover:text-[#CCC]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>VOCAL CADENCE</span>
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`py-3 px-3 text-[11px] font-mono uppercase tracking-wider border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'tips'
                ? 'border-[#CCFF00] text-[#CCFF00] font-bold'
                : 'border-transparent text-[#777] hover:text-[#CCC]'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>ANTI-LOOPING</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 max-h-[60vh]">
          {activeTab === 'metatags' && (
            <div>
              <p className="text-xs text-[#AAA] mb-4 bg-[#0D0D0D] p-3 rounded-sm border border-[#222] font-mono">
                💡 <strong className="text-white">SYNTAX:</strong> Sisipkan tag dalam kurung siku <code className="text-[#CCFF00] font-bold">[Verse 1]</code> pada baris terpisah sebelum bait lirik. Mesin Suno v3.5 &amp; v4 akan memetakan aransemen sesuai tag ini.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SUNO_METATAGS.map((item) => (
                  <div
                    key={item.tag}
                    className="p-3 bg-[#0D0D0D] hover:bg-[#121212] rounded-sm border border-[#222] hover:border-[#CCFF00]/60 flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-[#CCFF00] bg-[#141414] px-2 py-0.5 rounded-sm border border-[#333]">
                          {item.tag}
                        </span>
                        <span className="text-[9px] font-mono uppercase font-bold text-[#666]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#888] mt-1 font-sans">{item.desc}</p>
                    </div>

                    <div className="flex items-center space-x-1">
                      {onInsertTag && (
                        <button
                          onClick={() => onInsertTag(item.tag)}
                          className="text-[10px] font-mono font-bold px-2 py-1 bg-[#1A1A1A] hover:bg-[#CCFF00] hover:text-black text-[#CCFF00] rounded-sm border border-[#333] cursor-pointer transition-colors"
                        >
                          INSERT
                        </button>
                      )}
                      <button
                        onClick={() => handleCopy(item.tag)}
                        className="p-1.5 bg-[#141414] hover:bg-[#222] rounded-sm text-[#888] hover:text-white border border-[#262626] transition-colors cursor-pointer"
                        title="Salin Tag"
                      >
                        {copiedTag === item.tag ? (
                          <Check className="w-3.5 h-3.5 text-[#CCFF00]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'styleBox' && (
            <div className="space-y-4 text-xs text-[#AAA] font-mono">
              <div className="bg-[#0D0D0D] p-4 rounded-sm border border-[#222] space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-sm bg-[#CCFF00]"></span>
                  <span>STRUKTUR IDEAL &quot;STYLE OF MUSIC&quot; SUNO</span>
                </h4>
                <p className="text-[#888]">
                  Suno memproses keywords berbasis token yang dipisahkan koma. Hindari kalimat narasi panjang.
                </p>
                <div className="bg-[#050505] p-3 rounded-sm font-mono text-[11px] text-[#CCFF00] border border-[#1F1F1F]">
                  [Genre Utama], [Subgenre/Nuansa], [Instrumen Utama], [Karakter Vokal], [Mood/Suasana], [Tempo/BPM]
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-[#0D0D0D] rounded-sm border border-[#222]">
                  <h5 className="font-bold text-xs uppercase text-white mb-1.5">Pop Rock Indonesia:</h5>
                  <p className="font-mono text-[#CCFF00] bg-[#050505] p-2 rounded-sm text-[11px] border border-[#1C1C1C]">
                    indonesian pop rock, 2000s band, emotional male vocal, melodic acoustic guitar, dramatic electric solo, melancholic, 78 bpm
                  </p>
                </div>
                <div className="p-3 bg-[#0D0D0D] rounded-sm border border-[#222]">
                  <h5 className="font-bold text-xs uppercase text-white mb-1.5">Dangdut Koplo Ambyar:</h5>
                  <p className="font-mono text-[#CCFF00] bg-[#050505] p-2 rounded-sm text-[11px] border border-[#1C1C1C]">
                    dangdut koplo, javanese pop ambyar, energetic kendang rampak, suling bambu, modern synth hook, 138 bpm
                  </p>
                </div>
                <div className="p-3 bg-[#0D0D0D] rounded-sm border border-[#222]">
                  <h5 className="font-bold text-xs uppercase text-white mb-1.5">Future Bass EDM:</h5>
                  <p className="font-mono text-[#CCFF00] bg-[#050505] p-2 rounded-sm text-[11px] border border-[#1C1C1C]">
                    melodic future bass, supersaw drop, airy female pop vocal, massive sidechained sub bass, euphoric build-up, 145 bpm
                  </p>
                </div>
                <div className="p-3 bg-[#0D0D0D] rounded-sm border border-[#222]">
                  <h5 className="font-bold text-xs uppercase text-white mb-1.5">Indie Folk Senja:</h5>
                  <p className="font-mono text-[#CCFF00] bg-[#050505] p-2 rounded-sm text-[11px] border border-[#1C1C1C]">
                    indonesian indie folk, fingerstyle acoustic guitar, poetic storytelling, soft gentle male vocal, rain ambience, 85 bpm
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vocal' && (
            <div className="space-y-3 text-xs text-[#AAA] font-mono">
              <div className="p-3.5 bg-[#0D0D0D] rounded-sm border border-[#222] space-y-2">
                <h4 className="font-bold text-xs uppercase text-white">01 // JEDA BERNYANYI &amp; NAFAS</h4>
                <p className="text-[#888]">
                  Gunakan tanda koma <code className="text-[#CCFF00]">,</code> untuk jeda ketukan singkat, dan elipsis <code className="text-[#CCFF00]">...</code> atau baris kosong untuk jeda nafas lebih panjang.
                </p>
                <div className="bg-[#050505] p-2.5 rounded-sm font-mono text-[11px] text-[#DDD] border border-[#1F1F1F]">
                  Kucoba bertahan... walau perih ini, tak kunjung hilang.
                </div>
              </div>

              <div className="p-3.5 bg-[#0D0D0D] rounded-sm border border-[#222] space-y-2">
                <h4 className="font-bold text-xs uppercase text-white">02 // DIRECTIVE TAG VOKAL</h4>
                <ul className="list-disc list-inside space-y-1 text-[#888]">
                  <li><code className="text-[#CCFF00]">[Verse 1 - Soft Whispering]</code>: Bait pertama dinyanyikan lembut berbisik.</li>
                  <li><code className="text-[#CCFF00]">[Chorus - Soaring Belt &amp; High Energy]</code>: Reff vokal bertenaga tinggi.</li>
                  <li><code className="text-[#CCFF00]">[Bridge - Dramatic Key Change]</code>: Modulasi nada klimaks.</li>
                  <li><code className="text-[#CCFF00]">[Ad-lib: (Buka titik joss!)]</code>: Teriakan / sahutan vokal latar.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-3">
              {SUNO_TIPS.map((t, idx) => (
                <div key={idx} className="p-3.5 bg-[#0D0D0D] rounded-sm border border-[#222]">
                  <h4 className="font-mono font-bold text-xs uppercase text-white mb-1 flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-sm bg-[#1A1A1A] text-[#CCFF00] border border-[#333] flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{t.title}</span>
                  </h4>
                  <p className="text-xs text-[#888] pl-6 font-sans leading-relaxed">{t.tip}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222] bg-[#0D0D0D] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-mono font-bold bg-[#141414] hover:bg-[#1E1E1E] text-white border border-[#2A2A2A] rounded-sm transition-colors cursor-pointer"
          >
            CLOSE GUIDE
          </button>
        </div>
      </div>
    </div>
  );
};

