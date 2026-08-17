import { SongPreset } from '../types';

export const GENRE_CATEGORIES: { name: string; genres: { name: string; tag: string; desc: string }[] }[] = [
  {
    name: 'Indonesian & Nusantara',
    genres: [
      { name: 'Pop Indonesia 2000an', tag: 'indonesian pop rock, 2000s nostalgic band, emotional acoustic guitar, melly goeslaw sheila on 7 style', desc: 'Nuansa melodi mendayu khas band legendaris Indonesia era 2000an' },
      { name: 'Dangdut Koplo Ambyar', tag: 'dangdut koplo, energetic kendang rampak, suling bambu, modern synth drop, ambyar javanese pop, 140 bpm', desc: 'Ketukan kendang koplo dinamis dipadu lirik galau/ambyar bertenaga' },
      { name: 'Pop Dangdut Modern', tag: 'modern indonesian pop dangdut, catchy brass, electronic kendang, happy cheerful vocal, radio friendly', desc: 'Perpaduan pop ceria dengan sentuhan kendang modern yang danceable' },
      { name: 'Pop Melayu / Slow Rock 90s', tag: '90s slow rock melayu, soaring high pitch male vocal, distorted emotional guitar solo, dramatic strings', desc: 'Gaya legendaris slow rock Melayu (Slam, Exist, Search, Iklim)' },
      { name: 'Indie Folk Nusantara', tag: 'indonesian indie folk, fingerstyle acoustic guitar, poetic storytelling, soft gentle male vocal, rain ambience', desc: 'Gaya Fourtwnty, Fiersa Besari, Payung Teduh yang syahdu' },
      { name: 'Campursari Modern', tag: 'modern campursari, gamelan pelog slendro fusion, synth bass, traditional javanese vocal, dory harsa style', desc: 'Alunan gamelan dan campursari masa kini yang elegan' },
      { name: 'Pop Sunda Akustik / Degung', tag: 'sundanese pop, kacapi suling, soothing acoustic guitar, mellow female vocal, traditional west java vibe', desc: 'Harmoni alat musik bambu Sunda dengan pop akustik lembut' },
      { name: 'Nasyid / Religi Islami Modern', tag: 'modern islamic pop, uplifting acoustic guitars, choral vocal harmonies, cinematic strings, heartwarming spiritual vibe', desc: 'Lagu bernuansa islami, ramadhan, atau syukur yang menyentuh hati' },
      { name: 'Indonesia Timur Reggae / RNB', tag: 'timur indonesia beat, tropical island reggae, catchy rap adlibs, joyous group harmony, autotuned vocal, upbeat summer', desc: 'Irama riang khas Indonesia Timur ala Papua / Ambon / NTT' },
    ]
  },
  {
    name: 'Pop & EDM',
    genres: [
      { name: 'Modern Electropop', tag: 'catchy electropop, punchy kick, lush synth pads, bright vocal chops, radio hit, 124 bpm', desc: 'Pop elektronik modern dengan hook yang sangat nempel' },
      { name: 'Future Bass / Melodic EDM', tag: 'melodic future bass, supersaw drop, emotional piano intro, massive sidechained drop, euphoric build-up', desc: 'EDM emosional dengan drop megah ala Illenium & The Chainsmokers' },
      { name: 'Synthwave / Retro 80s', tag: '80s synthwave, analog synth arpeggios, gated reverb drums, neon nostalgic vibe, cyberpunk, 110 bpm', desc: 'Nuansa retro futuristik tahun 80-an dengan drum punchy' },
      { name: 'K-Pop High-Energy Anthem', tag: 'k-pop girl group anthem, explosive brass drop, fierce rap verse, dynamic vocal belting, glossy production', desc: 'K-Pop berenergi tinggi dengan struktur dinamis & dance break' },
      { name: 'Hyperpop & Glitch Pop', tag: 'hyperpop, pitched-up autotune vocal, distorted 808s, chaotic glitch synths, fast tempo, high energy', desc: 'Eksperimental pop berkecepatan tinggi dengan tekstur glitchy' },
      { name: 'Tropical House Chill', tag: 'tropical house, airy marimba plucks, smooth saxophone, warm bass, sunset beach vibes, 105 bpm', desc: 'Irama santai musim panas ala Kygo dengan melodi tropis' },
    ]
  },
  {
    name: 'Rock & Metal',
    genres: [
      { name: 'Pop Punk Revival', tag: '2000s pop punk, fast driving drums, distorted power chords, bratty energetic vocal, blink-182 style, 170 bpm', desc: 'Pop punk tempo cepat penuh semangat dan hook gitar ikonik' },
      { name: 'Alternative Indie Rock', tag: 'indie rock, jangly guitars, driving bassline, raw emotive vocal, garage band energy, anthemic chorus', desc: 'Gaya band rock indie dengan sound gitar organik dan vokal ekspresif' },
      { name: 'Japanese Anime J-Rock', tag: 'anime opening j-rock, technical melodic guitar solos, slap bass, high speed double bass pedal, dramatic key change', desc: 'Lagu tema anime dengan tempo cepat, melodi heroik, dan aransemen kaya' },
      { name: 'Modern Metalcore', tag: 'metalcore, djent heavy low-tuned guitar riffs, crushing breakdown, aggressive screams and clean melodic chorus', desc: 'Kombinasi riff berat, breakdown menggelegar, dan chorus merdu' },
      { name: 'Classic Hard Rock', tag: 'classic 70s hard rock, bluesy pentatonic guitar solo, rasp rock vocal, heavy acoustic drum kit, vintage overdrive', desc: 'Hard rock klasik dengan karakter distorsi vintage dan solo meliuk' },
    ]
  },
  {
    name: 'Hip-Hop, RnB & Drill',
    genres: [
      { name: 'Indonesian Hip-Hop Trap', tag: 'indonesian hip hop, heavy booming 808 bass, crisp fast hi-hats, confident flow, urban jakarta street vibe', desc: 'Beat trap modern dengan bass nendang dan lirik bertenaga' },
      { name: 'UK / NY Drill Beat', tag: 'drill beat, sliding distorted 808s, dark aggressive piano melody, syncopated snare, fast rhythmic cadence', desc: 'Irama drill gelap khas dengan bass 808 meluncur' },
      { name: '90s Boom Bap Lofi', tag: '90s golden era boom bap, dusty vinyl crackle, jazz piano chops, relaxed smooth flow, soulful vocal samples', desc: 'Hip-hop klasik bernuansa jazz santai dan beat hangat' },
      { name: 'Smooth Contemporary R&B', tag: 'contemporary r&b, silky smooth vocal runs, warm rhodes piano, 808 slow jam, sensual romantic vibe', desc: 'R&B modern yang syahdu dengan vokal lembut dan piano elektrik' },
      { name: 'Drift Phonk / Brazilian Phonk', tag: 'drift phonk, aggressive cowbell melody, distorted memphis vocal chops, heavy bass, car racing night vibe', desc: 'Genre phonk viral dengan melodi cowbell agresif dan bass kencang' },
    ]
  },
  {
    name: 'Acoustic, Jazz & Ambient',
    genres: [
      { name: 'Cozy Lofi Bedroom Pop', tag: 'lofi bedroom pop, mellow acoustic guitar, soft whispery female vocals, subtle rain sounds, dreamy nostalgia', desc: 'Lagu akustik santai dengan nuansa hangat untuk teman belajar/kerja' },
      { name: 'Bossa Nova & Cafe Jazz', tag: 'smooth bossa nova, nylon acoustic guitar chords, gentle brushed drums, upright bass, intimate whisper vocal', desc: 'Irama jazz Brasil yang menenangkan seperti di kafe senja' },
      { name: 'Cinematic Orchestral Ballad', tag: 'epic cinematic ballad, sweeping orchestra, grand piano, dramatic crescendo, soaring heartfelt vocal', desc: 'Balada megah dengan orkestra lengkap ala soundtrack film' },
      { name: 'Reggae Roots & Dub', tag: 'roots reggae, offbeat clean guitar skank, deep thumping bassline, brass horns section, peaceful positive vibration', desc: 'Reggae santai penuh kedamaian dengan brass section yang ceria' },
    ]
  }
];

export const VOCAL_STYLES = [
  { label: 'Pria Emosional & Menghayati', tag: 'emotional male vocal, passionate storytelling' },
  { label: 'Pria Serak / Raspy Rock', tag: 'raspy rock male vocal, powerful belt, grit' },
  { label: 'Wanita Merdu & Lembut (Airy)', tag: 'soft airy female vocal, soothing angelic tone' },
  { label: 'Wanita Powerfull & Belting', tag: 'powerful female belt, dynamic range, diva vocals' },
  { label: 'Duet Pria & Wanita (Dual Duet)', tag: 'harmonized male and female duet, alternating verses' },
  { label: 'Rap Cepat & Percaya Diri', tag: 'fast rhythmic rap flow, confident cadence, autotune adlibs' },
  { label: 'Vokal Berbisik / Whispering', tag: 'intimate whisper vocals, close-mic ASMR feel' },
  { label: 'Paduan Suara / Choir Megah', tag: 'epic choral backing choir, gospel harmonies' },
  { label: 'Cengkok Dangdut / Melayu Khas', tag: 'traditional indonesian vocal ornaments, cengkok melayu' },
  { label: 'Autotune Modern Trap / Hyperpop', tag: 'heavy modern melodic autotune, futuristic vocal effects' }
];

export const MOOD_OPTIONS = [
  { label: 'Patah Hati & Galau (Heartbroken)', tag: 'melancholic, heartbreaking, sorrowful, tearful' },
  { label: 'Jatuh Cinta & Romantis (Sweet Love)', tag: 'romantic, sweet, heartwarming, tender, deeply in love' },
  { label: 'Bersemangat & Membara (Hype & Energetic)', tag: 'energetic, hype, adrenaline, powerful, driving rhythm' },
  { label: 'Santai & Menenangkan (Chill & Cozy)', tag: 'chill, cozy, laid-back, serene, peaceful vibes' },
  { label: 'Nostalgia Senja & Kenangan (Nostalgic)', tag: 'nostalgic, bittersweet, reflective, golden hour memories' },
  { label: 'Misterius & Gelap (Dark & Moody)', tag: 'dark, atmospheric, suspenseful, moody, eerie' },
  { label: 'Lucu & Ceria (Humorous & Funky)', tag: 'playful, witty, quirky, funny, upbeat bouncy feel' },
  { label: 'Spiritual & Penuh Syukur (Inspiring)', tag: 'spiritual, uplifting, hopeful, deeply emotional gratitude' },
];

export const SUNO_METATAGS = [
  { tag: '[Intro]', desc: 'Bagian awal lagu / pembuka instrumen', category: 'Structure' },
  { tag: '[Verse 1]', desc: 'Bait pertama untuk membangun cerita', category: 'Structure' },
  { tag: '[Pre-Chorus]', desc: 'Jembatan menuju reff, menaikkan intensitas', category: 'Structure' },
  { tag: '[Chorus]', desc: 'Puncak lagu / Reff utama yang paling catchy', category: 'Structure' },
  { tag: '[Verse 2]', desc: 'Bait kedua melanjutkan alur lirik', category: 'Structure' },
  { tag: '[Guitar Solo]', desc: 'Solo gitar melodi di tengah lagu', category: 'Solo' },
  { tag: '[Kendang Solo]', desc: 'Solo ketukan kendang koplo dinamis', category: 'Solo' },
  { tag: '[Saxophone Solo]', desc: 'Solo saksofon lembut atau berenergi', category: 'Solo' },
  { tag: '[Synth Solo]', desc: 'Solo instrumen synthesizer elektrik', category: 'Solo' },
  { tag: '[Bridge]', desc: 'Bagian klimaks / transisi dengan nada berbeda', category: 'Structure' },
  { tag: '[Drop]', desc: 'Dentuman bass / drop EDM yang masif', category: 'EDM' },
  { tag: '[Build-Up]', desc: 'Eskalasi tempo dan energi sebelum Drop', category: 'EDM' },
  { tag: '[Chorus - Epic Key Change]', desc: 'Reff terakhir dengan nada naik lebih tinggi', category: 'Vocal FX' },
  { tag: '[Whisper]', desc: 'Gaya bernyanyi berbisik dekat mikrofon', category: 'Vocal FX' },
  { tag: '[Spoken Word]', desc: 'Narasi atau monolog tanpa bernyanyi', category: 'Vocal FX' },
  { tag: '[Vocal Ad-lib]', desc: 'Improvisasi vokal / teriakan / sahutan latar', category: 'Vocal FX' },
  { tag: '[Harmonized Chorus]', desc: 'Reff dinyanyikan berlapis harmoni vokal', category: 'Vocal FX' },
  { tag: '[Instrumental Break]', desc: 'Jeda instrumen tanpa vokal', category: 'Structure' },
  { tag: '[Outro]', desc: 'Bagian penutup lagu', category: 'Structure' },
  { tag: '[Fade Out]', desc: 'Suara musik perlahan mengecil sampai hening', category: 'Structure' },
  { tag: '[End]', desc: 'Tanda Suno untuk mengakhiri lagu seketika', category: 'Structure' },
];

export const POPULAR_PRESETS: SongPreset[] = [
  {
    id: 'preset-indo-pop-2000s',
    title: 'Pop Galau 2000an (Nostalgia Band)',
    category: 'Indonesian',
    description: 'Balada pop-rock emosional khas Sheila on 7, Peterpan, atau Kerispatih dengan rima lirik mendalam.',
    topic: 'Mengenang mantan kekasih saat hujan di kota tua dan rasa rindu yang belum usai',
    genre: 'indonesian pop rock, 2000s nostalgia band, acoustic guitar strum, melodic bassline, emotional piano',
    mood: 'melancholic, bittersweet, heartfelt longing, nostalgic',
    vocalStyle: 'emotional male vocal, soft verse with powerful heartfelt chorus belting',
    language: 'id',
    tempo: '78 BPM, 4/4 time',
    instruments: ['Akustik Gitar', 'Piano Klasik', 'Gitar Listrik Melodi', 'Drum Organik'],
    structure: 'ballad',
    icon: '🎸'
  },
  {
    id: 'preset-dangdut-ambyar',
    title: 'Dangdut Koplo Ambyar',
    category: 'Indonesian',
    description: 'Irama kendang koplo rancak campur pop Jawa kekinian ala Denny Caknan & Guyon Waton.',
    topic: 'Ditinggal nikah sama pacar demi pria mapan, tapi dibawa joget biar gak stres',
    genre: 'dangdut koplo, javanese pop ambyar, energetic kendang rampak, suling bambu, synth hook, 138 bpm',
    mood: 'sad lyrics with upbeat energetic dance beat, ambyar spirit',
    vocalStyle: 'javanese male vocal with heartfelt cengkok and cheerful crowd adlibs',
    language: 'jw',
    tempo: '138 BPM, energetic koplo groove',
    instruments: ['Kendang Rampak', 'Suling Bambu', 'Brass Keyboard', 'Bass Synth'],
    structure: 'dangdut',
    icon: '🪘'
  },
  {
    id: 'preset-indie-fourtwnty',
    title: 'Indie Folk Kopi Senja',
    category: 'Acoustic & Folk',
    description: 'Akustik tenang, filosofi hidup, dan harmoni santai ala Fourtwnty / Payung Teduh.',
    topic: 'Menikmati secangkir kopi hangat saat senja, merenungi arti kebebasan dan waktu',
    genre: 'indonesian indie folk, fingerstyle nylon acoustic guitar, poetic storytelling, mellow rain ambience, soft shaker',
    mood: 'peaceful, philosophical, cozy, calming chill',
    vocalStyle: 'soft gentle male vocal, intimate whispering delivery',
    language: 'id',
    tempo: '85 BPM, relaxed swing',
    instruments: ['Gitar Akustik Nylon', 'Shaker / Cajon', 'Melodica', 'Suara Hujan'],
    structure: 'standard',
    icon: '☕'
  },
  {
    id: 'preset-slow-rock-melayu',
    title: 'Slow Rock 90s Melayu (Search/Slam)',
    category: 'Rock & Metal',
    description: 'Melodi mendayu, distorsi tebal, dan solo gitar menyayat hati khas slow rock Malaysia/Indonesia 90an.',
    topic: 'Pengorbanan cinta sejati yang tak pernah dihargai hingga tetes darah penghabisan',
    genre: '90s slow rock melayu, soaring high pitch male vocal, distorted weeping guitar solo, dramatic strings, heavy drums',
    mood: 'dramatic, deeply emotional, tragic romance, epic passion',
    vocalStyle: 'soaring high-pitch male vocal, emotional vibrato',
    language: 'id',
    tempo: '72 BPM, slow heavy rock ballad',
    instruments: ['Gitar Listrik Solo Melodi', 'Keyboard Strings', 'Heavy Snare Drum', 'Overdrive Distortion'],
    structure: 'rock',
    icon: '⚡'
  },
  {
    id: 'preset-future-bass-edm',
    title: 'Future Bass EDM Festival',
    category: 'Pop & EDM',
    description: 'EDM modern dengan intro piano lembut, vokal chops, dan supersaw drop meledak-ledak.',
    topic: 'Bangkit dari kegelapan, merayakan kebersamaan di bawah cahaya lampu kota',
    genre: 'melodic future bass, supersaw chords, pitch-bent vocal chops, massive sidechain 808 drop, euphoric build up, 145 bpm',
    mood: 'euphoric, triumphant, energetic, uplifting anthem',
    vocalStyle: 'airy female pop vocal soaring into high notes on the build up',
    language: 'en',
    tempo: '145 BPM, electronic dance beat',
    instruments: ['Supersaw Synthesizer', 'Sidechained Sub-Bass', 'Vocal Chops', 'Build-up Snare Roll'],
    structure: 'edm',
    icon: '🎧'
  },
  {
    id: 'preset-anime-opening-jrock',
    title: 'Anime Opening J-Rock Anthem',
    category: 'Anime & Gaming',
    description: 'Soundtrack anime Shonen tempo cepat dengan solo gitar meliuk dan kunci nada modulasi heroik.',
    topic: 'Pertarungan pantang menyerah demi melindungi sahabat dan masa depan',
    genre: 'anime opening j-rock, fast double-time drums, intricate melodic guitar solos, slap bass, dramatic emotional chorus, 180 bpm',
    mood: 'heroic, unstoppable, passionate, emotional surge',
    vocalStyle: 'energetic Japanese male/female rock vocal with high belt register',
    language: 'ja',
    tempo: '180 BPM, fast driving j-rock',
    instruments: ['Lead Electric Guitar', 'Slap Bass', 'Double Kick Drums', 'Cinematic Strings'],
    structure: 'rock',
    icon: '🔥'
  },
  {
    id: 'preset-modern-phonk',
    title: 'Drift Phonk / Brazilian Night Bass',
    category: 'Hip-Hop & RnB',
    description: 'Beat cowbell agresif, bass distorsi berat, dan vokal potongan gelap untuk nuansa balapan malam.',
    topic: 'Penguasa jalanan malam hari, kecepatan tanpa batas dan percaya diri tak tertandingi',
    genre: 'drift phonk, distorted cowbell melody, heavy sub 808 bass, dark chopped vocal samples, aggressive nocturnal vibe, 130 bpm',
    mood: 'aggressive, confident, dark adrenaline, nighttime drive',
    vocalStyle: 'deep pitched vocal flow, memphis rap chops',
    language: 'en',
    tempo: '130 BPM, heavy phonk groove',
    instruments: ['Distorted Cowbell', 'Reese Bass / 808', 'Trap Snare', 'Tape Pitch Effect'],
    structure: 'rap',
    icon: '🏎️'
  },
  {
    id: 'preset-islamic-sholawat',
    title: 'Religi Sholawat / Nasyid Akustik Modern',
    category: 'Regional & Traditional',
    description: 'Harmoni vokal hangat, petikan gitar lembut, dan pujian spiritual yang menyejukkan sanubari.',
    topic: 'Kerinduan pada baginda Rasulullah SAW dan doa permohonan ampunan hidup',
    genre: 'modern islamic acoustic pop, fingerstyle acoustic guitar, soaring choral harmonies, gentle frame drum riq, serene spiritual atmosphere',
    mood: 'serene, spiritual, peaceful, deeply touching devotion',
    vocalStyle: 'warm soothing male lead with layered choral background harmony',
    language: 'id',
    tempo: '75 BPM, contemplative rhythm',
    instruments: ['Gitar Akustik', 'Rebana / Riq', 'Strings Orkestra', 'Piano Halus'],
    structure: 'ballad',
    icon: '🌙'
  }
];

export const SUNO_TIPS = [
  {
    title: 'Gunakan Tanda Kurung [Tag] untuk Struktur',
    tip: 'Suno AI membaca [Verse 1], [Chorus], [Bridge], [Guitar Solo], [Drop], [Outro] sebagai instruksi aransemen musik. Selalu letakkan di baris terpisah.'
  },
  {
    title: 'Style of Music: Utamakan Genre + Instrumen + Vokal',
    tip: 'Di kotak Style of Music Suno, batasi sekitar 100–120 karakter kunci: "indonesian pop rock, emotional male vocal, acoustic guitar, nostalgic, 85 bpm". Hindari kalimat panjang tidak penting.'
  },
  {
    title: 'Gunakan Tanda Koma & Titik untuk Jeda Vokal',
    tip: 'Jika ingin vokal memberi jeda napas atau ketukan, beri tanda koma (,) atau titik (...). Suno akan merespons tanda baca sebagai ritme bernyanyi.'
  },
  {
    title: 'Kombinasikan Bahasa & Cengkok Lokal',
    tip: 'Untuk Dangdut Koplo atau Campursari, sisipkan kata seruan khas seperti [Ad-lib: Hak e hak e!] atau [Ad-lib: Buka titik jos!] untuk menambah keaslian aransemen.'
  },
  {
    title: 'Hindari Perulangan Looping',
    tip: 'Gunakan tag [Outro] diikuti [Fade Out] atau [End] di baris paling akhir lirik agar lagu berakhir rapi dan tidak mengulang-ulang chorus terus-menerus.'
  }
];
