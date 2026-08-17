import { handleEnhanceStyle } from '../server/sunoEngine.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const result = await handleEnhanceStyle(body);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('API enhance-style error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
