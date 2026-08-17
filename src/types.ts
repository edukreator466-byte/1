export interface SunoGenerationRequest {
  topic: string;
  genre: string;
  subGenre?: string;
  mood: string;
  language: 'id' | 'en' | 'jw' | 'su' | 'ja' | 'es' | 'mixed' | string;
  vocalStyle: string;
  tempo?: string;
  instruments?: string[];
  structure?: 'standard' | 'edm' | 'ballad' | 'rap' | 'dangdut' | 'rock' | 'custom';
  customInstructions?: string;
  sunoVersion?: 'v3.5' | 'v4' | 'v3';
  includeGuitarSolo?: boolean;
  rhymeScheme?: string;
}

export interface SunoSongResult {
  id: string;
  title: string;
  styleOfMusicPrompt: string; // The exact prompt for Suno's "Style of Music" box
  stylePromptBreakdown: {
    primaryGenre: string;
    subGenres: string[];
    moodAndVibe: string[];
    vocalType: string;
    keyInstruments: string[];
    tempoBpm: string;
    productionVibe: string;
  };
  lyrics: string; // Structured with Suno metatags like [Verse 1], [Chorus], etc.
  lyricSections: {
    tag: string;
    lines: string[];
  }[];
  sunoTips: string[];
  language: string;
  createdAt: number;
  tags: string[];
}

export interface SongPreset {
  id: string;
  title: string;
  category: 'Indonesian' | 'Pop & EDM' | 'Rock & Metal' | 'Hip-Hop & RnB' | 'Acoustic & Folk' | 'Regional & Traditional' | 'Anime & Gaming';
  description: string;
  topic: string;
  genre: string;
  mood: string;
  vocalStyle: string;
  language: string;
  tempo: string;
  instruments: string[];
  structure: 'standard' | 'edm' | 'ballad' | 'rap' | 'dangdut' | 'rock';
  icon: string;
}
