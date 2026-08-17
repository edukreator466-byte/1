# 🎵 Suno AI Prompt Studio & Lyrics Architect (Pro Edition)

Aplikasi studio modern untuk meracik **Prompt Style of Music** dan **Lirik Berstruktur Metatag** yang dioptimalkan secara presisi untuk **Suno AI (v3, v3.5, & v4)**.

Dilengkapi dengan antarmuka bertema **Artistic Dark Flair**, editor lirik interaktif dengan visualisasi tag bracket, metronom audio bawaan, tag mixer instrumen & genre, serta pustaka arsip lokal.

---

## 🚀 Panduan Deployment ke GitHub & Vercel

Proyek ini telah dikonfigurasi secara penuh agar dapat langsung di-deploy ke **Vercel** dengan arsitektur **Vite SPA + Vercel Serverless Functions (`/api/*`)**.

### Langkah 1: Push ke GitHub

Jika Anda mengekspor proyek ini dari Google AI Studio:
1. Buat repository baru di [GitHub](https://github.com/new).
2. Di terminal komputer Anda (di dalam folder proyek):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Suno AI Prompt Studio"
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/NAMA-REPO-ANDA.git
   git push -u origin main
   ```

*(Atau gunakan fitur **Export to GitHub** langsung dari menu Settings di AI Studio).*

---

### Langkah 2: Deploy ke Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard) dan klik **Add New...** > **Project**.
2. Pilih repository GitHub yang baru saja Anda buat, lalu klik **Import**.
3. **Framework Preset**: Vercel akan otomatis mendeteksi **Vite**.
4. **Environment Variables**:
   Buka bagian **Environment Variables** dan tambahkan:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Masukkan Google Gemini API Key Anda (dapat diperoleh gratis di [Google AI Studio](https://aistudio.google.com/app/apikey)).
5. Klik tombol **Deploy**!
6. Dalam hitungan detik, aplikasi Anda sudah live online dengan URL `https://nama-project.vercel.app`.

---

## 🛠️ Konfigurasi Proyek untuk Vercel

Repository ini sudah memiliki konfigurasi otomatis:
- **`vercel.json`**: Mengatur build Vite ke folder `dist/` dan meneruskan rute API ke Vercel Serverless Functions.
- **`/api`**: Berisi Serverless Functions (`generate-suno-song.ts`, `refine-lyrics.ts`, `enhance-style-prompt.ts`, `health.ts`).
- **`src/`**: Antarmuka React 19 + Tailwind CSS + Lucide Icons + Motion.
- **Synthesizer Engine Fallback**: Jika `GEMINI_API_KEY` belum diset, server tetap dapat meracik lirik dan style prompt berkualitas tinggi secara otomatis tanpa error.

---

## 💻 Menjalankan Secara Lokal (Local Development)

```bash
# 1. Install dependensi
npm install

# 2. Salin environment variable
cp .env.example .env
# Masukkan GEMINI_API_KEY Anda di file .env

# 3. Jalankan development server (port 3000)
npm run dev

# 4. Build untuk produksi
npm run build
```

---

## ✨ Fitur Utama
- **Suno Style of Music Generator**: Menghasilkan tag genre, vokal, instrumen, mood, tempo BPM, dan nuansa studio dalam batas ideal Suno (≤120-150 karakter).
- **Lyric Architect**: Menghasilkan lirik berstruktur metatag baku Suno (`[Intro]`, `[Verse]`, `[Pre-Chorus]`, `[Chorus]`, `[Guitar Solo]`, `[Bridge]`, `[Outro]`, `[End]`).
- **Multi-Bahasa**: Mendukung Bahasa Indonesia, Jawa (Campursari/Ambyar), Sunda, English, Japanese (Anime/J-Rock), Spanish, dan Bilingual.
- **Interactive Metronome Tool**: Metronom audio visual tempo BPM dengan pengatur ketukan (2/4, 3/4, 4/4, 6/8).
- **Style Mixer & Tag Matrix**: Padu-padankan genre, instrumen akustik/elektrik, dan karakter vokal hanya dengan 1 klik.
- **Suno Tag Cheat Sheet**: Panduan lengkap fungsi setiap metatag Suno beserta cara pakainya.
- **Local Storage Archive**: Simpan, cari, dan unduh lagu kreasi Anda dalam format `.txt` siap pakai di Suno.com.

---

Selamat berkreasi menciptakan lagu-lagu viral di Suno AI! 🎧🔥
