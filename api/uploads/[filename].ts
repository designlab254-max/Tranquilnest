import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pool } from '../db.js'; // Ensure path matches flattened structure

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { filename } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await pool.query('SELECT mime_type, data FROM uploaded_files WHERE filename = $1', [filename]);
    if (result.rows.length === 0) {
      return res.status(404).send('Not found');
    }
    
    const file = result.rows[0];
    res.setHeader('Content-Type', file.mime_type);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.send(file.data);
  } catch (err) {
    console.error('Failed to serve image:', err);
    res.status(500).send('Server Error');
  }
}
 
