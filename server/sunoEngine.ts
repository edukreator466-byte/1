import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey.trim(),
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export function generateProceduralSunoSong(params: {
  topic: string;
  genre?: string;
  mood?: string;
  language?: string;
  vocalStyle?: string;
  tempo?: string;
  instruments?: string[];
  structure?: string;
  customInstructions?: string;
  sunoVersion?: string;
  includeGuitarSolo?: boolean;
}) {
  const {
    topic,
    genre = 'Indonesian Pop Rock',
    mood = 'Melancholic',
    language = 'id',
    vocalStyle = 'Emotional male vocal',
    tempo = '80 BPM',
    instruments = ['Acoustic Guitar', 'Electric Guitar Solo'],
    includeGuitarSolo = true,
  } = params;

  const cleanTopic = topic.trim().replace(/^["']|["']$/g, '');
  const titleWords = cleanTopic.split(/\s+/).slice(0, 4);
  const formattedTitle = titleWords.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  const title = formattedTitle || 'Harmoni Jiwa';

  const genreLower = genre.toLowerCase();
  const vocalLower = vocalStyle.toLowerCase();
  const moodLower = mood.toLowerCase();
  const instList = instruments.length > 0 ? instruments.map(i => i.toLowerCase()).join(', ') : 'acoustic guitar, drums';
  const soloTag = includeGuitarSolo ? 'melodic guitar solo, ' : '';

  const styleOfMusicPrompt = `${genreLower}, ${vocalLower}, ${soloTag}${instList}, ${moodLower}, ${tempo.toLowerCase()}`
    .replace(/,\s*,/g, ',')
    .slice(0, 140);

  let lyrics = '';
  let lyricSections: { tag: string; lines: string[] }[] = [];

  if (language === 'jw') {
    lyricSections = [
      {
        tag: '[Intro]',
        lines: ['(Petikan akustik lembut)', '(Kendang mlebu alus)']
      },
      {
        tag: '[Verse 1]',
        lines: [
          `Wengi iki nyimpen kangen ${cleanTopic}`,
          'Kelingan esemmu sing tau ngisi ati',
          'Mlaku dhewe neng dalan peteng iki',
          'Ngenteni kowe sing ra bakal bali'
        ]
      },
      {
        tag: '[Pre-Chorus]',
        lines: [
          'Gusti, kuatno atiku nompo lelakon iki',
          'Senajan perih kudu tak ikhlasne seko ati'
        ]
      },
      {
        tag: '[Chorus]',
        lines: [
          `Kabeh crito babagan ${cleanTopic}`,
          'Saiki mung dadi kenangan abadi',
          'Udan wengi iki ngancani tangisku',
          'Mugo kowe ayem bahagia neng kono'
        ]
      },
      {
        tag: includeGuitarSolo ? '[Guitar Solo - Emotive Melodic]' : '[Instrumental Break]',
        lines: ['(Melodi gitar nangis ngambang)', '(Suling & kendang munggah tempo)']
      },
      {
        tag: '[Verse 2]',
        lines: [
          'Sepi rasane yen tanpo sliramu',
          'Dongo suci iki terus tak kirim kanggo awakmu'
        ]
      },
      {
        tag: '[Bridge]',
        lines: [
          'Yen pancen dalane kudu pisah',
          'Tak simpen tresno iki sakjroning dhadha'
        ]
      },
      {
        tag: '[Chorus - High Energy]',
        lines: [
          `Kabeh crito babagan ${cleanTopic}`,
          'Saiki mung dadi kenangan abadi',
          'Udan wengi iki ngancani tangisku',
          'Mugo kowe ayem bahagia neng kono'
        ]
      },
      {
        tag: '[Outro]',
        lines: [
          `Ikhlas lahir batin... ${cleanTopic}...`,
          'Matur suwun kabeh kenangan endah iki...'
        ]
      },
      {
        tag: '[Fade Out]',
        lines: ['(Petikan gitar alon-alon mati)']
      },
      {
        tag: '[End]',
        lines: []
      }
    ];
  } else if (language === 'en') {
    lyricSections = [
      {
        tag: '[Intro]',
        lines: ['(Gentle melodic riff)', '(Atmospheric bassline & subtle beat)']
      },
      {
        tag: '[Verse 1]',
        lines: [
          `Shadows dancing underneath the midnight sky`,
          `Thinking about ${cleanTopic} as the hours fly by`,
          'Every step I take reminds me of your grace',
          'Lost in the echoes of another time and place'
        ]
      },
      {
        tag: '[Pre-Chorus]',
        lines: [
          'Hear the heartbeat rising through the dark',
          'We ignited something from a single spark'
        ]
      },
      {
        tag: '[Chorus]',
        lines: [
          `Cause tonight we are searching for ${cleanTopic}`,
          'Through the storm and the pouring rain',
          'Hold my hand and we will never fade away',
          'Living forever inside this melody'
        ]
      },
      {
        tag: includeGuitarSolo ? '[Guitar Solo - Soaring Virtuoso]' : '[Instrumental Break]',
        lines: ['(High-gain soaring lead guitar solo with stereo reverb)']
      },
      {
        tag: '[Verse 2]',
        lines: [
          'Neon reflections glowing on the empty street',
          'Finding our rhythm in this synchronized beat'
        ]
      },
      {
        tag: '[Bridge]',
        lines: [
          'And if tomorrow takes us worlds apart',
          'You will remain right here inside my heart'
        ]
      },
      {
        tag: '[Chorus - Double Chorus]',
        lines: [
          `Cause tonight we are searching for ${cleanTopic}`,
          'Through the storm and the pouring rain',
          'Hold my hand and we will never fade away',
          'Living forever inside this melody'
        ]
      },
      {
        tag: '[Outro]',
        lines: [
          `Never fade away... ${cleanTopic}...`,
          'Until the morning light breaks through...'
        ]
      },
      {
        tag: '[Fade Out]',
        lines: ['(Soft acoustic strumming fades)']
      },
      {
        tag: '[End]',
        lines: []
      }
    ];
  } else {
    // Indonesian
    lyricSections = [
      {
        tag: '[Intro]',
        lines: ['(Petikan gitar akustik yang jernih dan mendayu)', '(Ketukan drum masuk perlahan)']
      },
      {
        tag: '[Verse 1]',
        lines: [
          `Di keheningan malam kutatap bayang ${cleanTopic}`,
          'Lampu-lampu kota berpendar dalam sepi',
          'Secangkir rindu kian mendingin di meja',
          'Membawa kenangan tentangmu kembali berbicara'
        ]
      },
      {
        tag: '[Pre-Chorus]',
        lines: [
          'Detak waktu seakan berhenti di sini',
          'Menyimpan rasa yang tak pernah mampu kubagi'
        ]
      },
      {
        tag: '[Chorus]',
        lines: [
          `Dan biarkan semua tentang ${cleanTopic}`,
          'Abadi mengalun di dalam setiap nada',
          'Walau jarak dan waktu memisahkan kita',
          'Cinta ini kan tetap hidup selamanya'
        ]
      },
      {
        tag: includeGuitarSolo ? '[Guitar Solo - Melodic Emosional]' : '[Instrumental Drop]',
        lines: ['(Melodi gitar elektrik meninggi penuh dinamika emosi)', '(Harmoni bass dan drum menghentak bertenaga)']
      },
      {
        tag: '[Verse 2]',
        lines: [
          'Langkah kaki membawaku menyusuri kenangan',
          'Tersenyum getir menatap sisa harapan'
        ]
      },
      {
        tag: '[Bridge]',
        lines: [
          'Kala badai datang menerjang rasa ini',
          'Kutahu hatimu kan selalu ada di sisi'
        ]
      },
      {
        tag: '[Chorus - Full Energy]',
        lines: [
          `Dan biarkan semua tentang ${cleanTopic}`,
          'Abadi mengalun di dalam setiap nada',
          'Walau jarak dan waktu memisahkan kita',
          'Cinta ini kan tetap hidup selamanya'
        ]
      },
      {
        tag: '[Outro]',
        lines: [
          `Tetap hidup selamanya... tentang ${cleanTopic}...`,
          'Di setiap hembusan nafasku...'
        ]
      },
      {
        tag: '[Fade Out]',
        lines: ['(Gitar akustik memudar perlahan)']
      },
      {
        tag: '[End]',
        lines: []
      }
    ];
  }

  lyrics = lyricSections
    .map(sec => `${sec.tag}\n${sec.lines.join('\n')}`)
    .join('\n\n')
    .trim();

  return {
    id: 'suno-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    title,
    styleOfMusicPrompt,
    stylePromptBreakdown: {
      primaryGenre: genre,
      subGenres: [genre, `${mood} vibes`],
      moodAndVibe: [mood, 'Atmospheric'],
      vocalType: vocalStyle,
      keyInstruments: instruments,
      tempoBpm: tempo,
      productionVibe: 'Clean studio mix, crisp mastering'
    },
    lyrics,
    lyricSections,
    sunoTips: [
      'Gunakan Custom Mode di Suno.com untuk hasil presisi',
      'Paste lirik lengkap termasuk tanda kurung siku [Verse], [Chorus], dll',
      'Atur Style of Music ke baris prompt di atas agar aransemen sinkron'
    ],
    language,
    createdAt: Date.now(),
    tags: [genre, mood, tempo]
  };
}

export async function handleGenerateSong(body: any) {
  const {
    topic,
    genre = 'Indonesian Pop Rock',
    mood = 'Melancholic',
    language = 'id',
    vocalStyle = 'Emotional male vocal',
    tempo = '80 BPM',
    instruments = [],
    structure = 'standard',
    customInstructions = '',
    sunoVersion = 'v3.5',
    includeGuitarSolo = true,
  } = body || {};

  if (!topic) {
    throw new Error('Topic / tema lagu harus diisi.');
  }

  const ai = getAiClient();

  if (!ai) {
    return generateProceduralSunoSong({
      topic,
      genre,
      mood,
      language,
      vocalStyle,
      tempo,
      instruments,
      structure,
      customInstructions,
      sunoVersion,
      includeGuitarSolo,
    });
  }

  try {
    const langMap: Record<string, string> = {
      id: 'Bahasa Indonesia (Puitis, menyentuh hati, rima bersajak indah)',
      en: 'English (Catchy, lyrical, rich rhyme scheme)',
      jw: 'Bahasa Jawa (Campuran Ngoko/Kromo halus khas campursari / dangdut pop ambyar)',
      su: 'Bahasa Sunda (Halus, merdu, khas pop sunda)',
      ja: 'Japanese (Khas anime j-rock / j-pop)',
      es: 'Spanish (Latin rhythm, passionate phrasing)',
      mixed: 'Campuran Bahasa Indonesia & English (Modern bilingual pop/hip-hop)',
    };

    const languageInstruction = langMap[language] || language;

    const systemPrompt = `You are a master music producer and lyricist specializing in crafting viral, high-quality songs specifically engineered for SUNO AI (v3, v3.5, and v4).
You understand Suno AI's prompt engine deeply:
1. Suno responds exceptionally well to structured metatags enclosed in square brackets:
   - [Intro]
   - [Verse 1], [Verse 2]
   - [Pre-Chorus]
   - [Chorus] (very catchy, memorable hooks, balanced rhythm)
   - [Guitar Solo], [Kendang Solo], [Drop], [Saxophone Solo] or [Instrumental Break]
   - [Bridge] (creates emotional climax)
   - [Chorus - Double Energy] or [Harmonized Chorus]
   - [Outro]
   - [Fade Out] or [End]
2. Lyrics must have natural syllable cadence, poetic rhyming (AABB, ABAB, or tight rhythmic scheme), emotive storytelling, and vivid imagery.
3. For the "Style of Music" box in Suno:
   - Suno has optimal character bounds (~120-150 characters for v3.5/v4).
   - The style prompt must be a clean, comma-separated list of keywords: Primary Genre, Subgenre/Influences, Key Instruments, Vocal Type & Delivery, Mood/Vibe, Tempo/BPM, and Production Vibe (e.g. "indonesian pop rock, emotional male vocal, melodic acoustic guitar, soaring electric solo, melancholic, 78 bpm").
4. Respond in valid JSON matching the requested schema.`;

    const userPrompt = `Generate a complete Suno AI song and music style prompt with the following details:
- Song Topic/Story: "${topic}"
- Musical Genre: ${genre}
- Mood / Atmosphere: ${mood}
- Target Language: ${languageInstruction}
- Vocal Style: ${vocalStyle}
- Target Tempo: ${tempo}
- Selected Instruments: ${instruments.join(', ') || 'Auto-select best fitting instruments'}
- Song Structure Template: ${structure}
- Include Solo/Drop: ${includeGuitarSolo ? 'Yes' : 'No'}
- Target Suno Version: ${sunoVersion}
- Additional Custom Instructions: ${customInstructions || 'None'}

Please produce:
1. Catchy title.
2. An ultra-optimized "styleOfMusicPrompt" tailored for Suno AI's "Style of Music" field.
3. Complete formatted lyrics with proper Suno brackets like [Intro], [Verse 1], [Pre-Chorus], [Chorus], [Verse 2], [Guitar Solo]/[Solo], [Bridge], [Chorus], [Outro], [End].
4. Breakdown of the style prompt components.
5. Specific actionable tips for best Suno AI generation results.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Catchy song title' },
            styleOfMusicPrompt: {
              type: Type.STRING,
              description: 'Optimized comma-separated style tags for Suno AI (under 150 chars)',
            },
            stylePromptBreakdown: {
              type: Type.OBJECT,
              properties: {
                primaryGenre: { type: Type.STRING },
                subGenres: { type: Type.ARRAY, items: { type: Type.STRING } },
                moodAndVibe: { type: Type.ARRAY, items: { type: Type.STRING } },
                vocalType: { type: Type.STRING },
                keyInstruments: { type: Type.ARRAY, items: { type: Type.STRING } },
                tempoBpm: { type: Type.STRING },
                productionVibe: { type: Type.STRING },
              },
              required: ['primaryGenre', 'vocalType', 'tempoBpm'],
            },
            lyrics: {
              type: Type.STRING,
              description: 'The complete lyrics text with square bracket metatags',
            },
            lyricSections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  tag: { type: Type.STRING, description: 'e.g. [Intro], [Verse 1], [Chorus]' },
                  lines: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['tag', 'lines'],
              },
            },
            sunoTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3-4 practical tips for generating this song in Suno',
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3-6 short discovery tags',
            },
          },
          required: ['title', 'styleOfMusicPrompt', 'lyrics', 'stylePromptBreakdown', 'lyricSections', 'sunoTips'],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error('Empty response from AI model');
    const parsed = JSON.parse(text);

    return {
      id: 'suno-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      title: parsed.title || 'Untitled Suno Song',
      styleOfMusicPrompt: parsed.styleOfMusicPrompt || genre,
      stylePromptBreakdown: parsed.stylePromptBreakdown || {
        primaryGenre: genre,
        subGenres: [],
        moodAndVibe: [mood],
        vocalType: vocalStyle,
        keyInstruments: instruments,
        tempoBpm: tempo,
        productionVibe: 'Clean studio production',
      },
      lyrics: parsed.lyrics || '',
      lyricSections: parsed.lyricSections || [],
      sunoTips: parsed.sunoTips || ['Gunakan Custom Mode di Suno', 'Paste lirik lengkap dengan tanda kurung siku'],
      language,
      createdAt: Date.now(),
      tags: parsed.tags || [genre, mood],
    };
  } catch (err) {
    return generateProceduralSunoSong({
      topic,
      genre,
      mood,
      language,
      vocalStyle,
      tempo,
      instruments,
      structure,
      customInstructions,
      sunoVersion,
      includeGuitarSolo,
    });
  }
}

export async function handleRefineLyrics(body: any) {
  const { currentLyrics, stylePrompt, instruction, language = 'id' } = body || {};
  if (!currentLyrics || !instruction) {
    throw new Error('Lirik saat ini dan instruksi perbaikan diperlukan.');
  }

  const ai = getAiClient();
  if (!ai) {
    let updatedLyrics = currentLyrics;
    if (instruction.toLowerCase().includes('rap') || instruction.toLowerCase().includes('drill')) {
      updatedLyrics = currentLyrics.replace(
        /\[Bridge\]/,
        `[Rap Verse - Fast Flow, Tight Rhyme]\nMic check, detak ritme mengalir deras\nKata-kata tajam tak akan pernah terhempas\n[Bridge]`
      );
    } else if (instruction.toLowerCase().includes('solo') || instruction.toLowerCase().includes('gitar')) {
      updatedLyrics = currentLyrics.replace(
        /\[Chorus\]/,
        `[Guitar Solo - Soaring Electric Lead]\n(Melodi gitar memuncak dramatis)\n\n[Chorus]`
      );
    } else {
      updatedLyrics = `${currentLyrics}\n\n[Outro - Enhanced Climax]\n(Semua instrumen bermain dengan dinamika penuh)`;
    }

    return {
      updatedLyrics,
      updatedStylePrompt: stylePrompt || '',
      summaryOfChanges: `Penyesuaian diterapkan berdasarkan instruksi: "${instruction}"`,
    };
  }

  try {
    const systemPrompt = `You are an expert Suno AI song polishing assistant.
You will receive existing Suno lyrics and style prompt, and a specific user modification instruction.
Modify and improve the lyrics while strictly preserving all necessary Suno metatags like [Verse 1], [Chorus], [Bridge], [Outro], [End].
Output valid JSON.`;

    const userPrompt = `Current Lyrics:
${currentLyrics}

Current Suno Style Prompt:
${stylePrompt || 'N/A'}

Language: ${language}
Modification Instruction: "${instruction}"

Please return the updated lyrics and updated style prompt if modified.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            updatedLyrics: { type: Type.STRING },
            updatedStylePrompt: { type: Type.STRING },
            summaryOfChanges: { type: Type.STRING },
          },
          required: ['updatedLyrics', 'updatedStylePrompt', 'summaryOfChanges'],
        },
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (err) {
    return {
      updatedLyrics: currentLyrics + `\n\n[Bridge - Extended Climax]\n(Melodi emosional memuncak harmonis)`,
      updatedStylePrompt: stylePrompt,
      summaryOfChanges: `Lirik diperbarui sesuai instruksi: ${instruction}`,
    };
  }
}

export async function handleEnhanceStyle(body: any) {
  const { rawStyle = 'Pop', artistRef, targetMood = 'Uplifting', tempo = '120 BPM' } = body || {};
  const ai = getAiClient();

  const base = rawStyle.split(',')[0].trim();
  const fallbackVariations = [
    {
      title: 'High-Energy Radio Edit',
      stylePrompt: `${base}, driving beat, punchy drums, ${tempo}, modern radio mix`,
      characterCount: `${base}, driving beat, punchy drums, ${tempo}, modern radio mix`.length,
      description: 'Fokus pada dinamika beat yang menghentak dan cocok untuk radio/streaming.',
    },
    {
      title: 'Acoustic & Raw Emotional',
      stylePrompt: `acoustic ${base}, intimate vocal, fingerstyle guitar, warm ambient reverb, ${tempo}`,
      characterCount: `acoustic ${base}, intimate vocal, fingerstyle guitar, warm ambient reverb, ${tempo}`.length,
      description: 'Nuansa organik dengan instrumen akustik intim dan vokal berjiwa.',
    },
    {
      title: 'Cinematic Atmosphere',
      stylePrompt: `cinematic ${base}, atmospheric synth pads, soaring vocal, epic build, ${tempo}`,
      characterCount: `cinematic ${base}, atmospheric synth pads, soaring vocal, epic build, ${tempo}`.length,
      description: 'Lapisan synth megah dan transisi dramatis untuk efek emosional mendalam.',
    },
  ];

  if (!ai) {
    return { variations: fallbackVariations };
  }

  try {
    const userPrompt = `Create 3 distinct variations of optimized "Style of Music" prompts for Suno AI based on:
- Base description / genre: "${rawStyle || 'Pop'}"
- Artist / Band inspiration: "${artistRef || 'None'}"
- Mood / Atmosphere: "${targetMood || 'Uplifting'}"
- Desired tempo: "${tempo || '120 BPM'}"

Format requirements for Suno AI:
- Keep each under 120 characters if possible.
- Use precise keywords: genre, instruments, vocal tone, mood, bpm.
- Don't include filler words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: userPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            variations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  stylePrompt: { type: Type.STRING },
                  characterCount: { type: Type.INTEGER },
                  description: { type: Type.STRING },
                },
                required: ['title', 'stylePrompt', 'characterCount', 'description'],
              },
            },
          },
          required: ['variations'],
        },
      },
    });

    return JSON.parse(response.text || '{"variations":[]}');
  } catch (err) {
    return { variations: fallbackVariations };
  }
}
