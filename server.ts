import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import {
  handleGenerateSong,
  handleRefineLyrics,
  handleEnhanceStyle,
} from './server/sunoEngine.js';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // 1. Generate Suno Song (Lyrics + Style of Music Prompt)
  app.post('/api/generate-suno-song', async (req, res) => {
    try {
      const result = await handleGenerateSong(req.body);
      res.json(result);
    } catch (err: any) {
      console.error('Error generating song in server:', err);
      res.status(500).json({ error: err?.message || 'Gagal membuat lagu' });
    }
  });

  // 2. Refine Lyrics or Style (AI revision tool)
  app.post('/api/refine-lyrics', async (req, res) => {
    try {
      const result = await handleRefineLyrics(req.body);
      res.json(result);
    } catch (err: any) {
      console.error('Error refining lyrics in server:', err);
      res.status(500).json({ error: err?.message || 'Gagal menyempurnakan lirik' });
    }
  });

  // 3. Quick Style Prompt Enhancer
  app.post('/api/enhance-style-prompt', async (req, res) => {
    try {
      const result = await handleEnhanceStyle(req.body);
      res.json(result);
    } catch (err: any) {
      console.error('Error enhancing style in server:', err);
      res.status(500).json({ error: err?.message || 'Gagal meningkatkan style prompt' });
    }
  });

  // Setup Vite / Static handling
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Suno Lyrics & Style Generator Server running at http://localhost:${PORT}`);
  });
}

startServer();
