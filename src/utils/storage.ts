import { SunoSongResult } from '../types';

const STORAGE_KEY = 'suno_saved_songs_v1';

export function getSavedSongs(): SunoSongResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading saved songs from localStorage:', err);
    return [];
  }
}

export function saveSong(song: SunoSongResult): SunoSongResult[] {
  try {
    const existing = getSavedSongs();
    const filtered = existing.filter((s) => s.id !== song.id);
    const updated = [song, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving song to localStorage:', err);
    return [];
  }
}

export function deleteSavedSong(id: string): SunoSongResult[] {
  try {
    const existing = getSavedSongs();
    const updated = existing.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting song:', err);
    return [];
  }
}

export function exportSongAsText(song: SunoSongResult): string {
  return `=== SUNO AI SONG SPECIFICATION ===
TITLE: ${song.title}
SUNO STYLE OF MUSIC: ${song.styleOfMusicPrompt}
LANGUAGE: ${song.language}
CREATED: ${new Date(song.createdAt).toLocaleString()}

--- SUNO STYLE BREAKDOWN ---
Primary Genre: ${song.stylePromptBreakdown?.primaryGenre || '-'}
Mood/Vibe: ${(song.stylePromptBreakdown?.moodAndVibe || []).join(', ')}
Vocal Type: ${song.stylePromptBreakdown?.vocalType || '-'}
Tempo: ${song.stylePromptBreakdown?.tempoBpm || '-'}
Instruments: ${(song.stylePromptBreakdown?.keyInstruments || []).join(', ')}
Production: ${song.stylePromptBreakdown?.productionVibe || '-'}

--- LYRICS (READY FOR SUNO) ---
${song.lyrics}

--- SUNO TIPS ---
${(song.sunoTips || []).map((t, i) => `${i + 1}. ${t}`).join('\n')}
`;
}
