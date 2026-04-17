import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pool } from '../db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { key } = req.query;

  if (req.method === 'PUT') {
    const { value } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value RETURNING *',
        [key, value]
      );
      res.json({ success: true, setting: result.rows[0] });
    } catch (err) {
      console.error('Update failed for key:', key, err);
      res.status(500).json({ error: 'Update failed', details: err instanceof Error ? err.message : String(err) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
