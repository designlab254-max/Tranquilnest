import type { VercelRequest, VercelResponse } from '@vercel/node';
import multer from 'multer';
import { pool } from './db.js';
import path from 'path';

const upload = multer({ storage: multer.memoryStorage() });

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  await new Promise<void>((resolve, reject) => {
    upload.single('image')(req as any, res as any, (err: any) => err ? reject(err) : resolve());
  });

  const file = (req as any).file;
  if (!file) return res.status(400).json({ error: 'No file' });

  try {
    // Force a simple query first to ensure the DB allows writing
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    
    // Using buffer directly
    await pool.query(
      'INSERT INTO uploaded_files (filename, mime_type, data) VALUES ($1, $2, $3)',
      [filename, file.mimetype, file.buffer]
    );
    
    res.json({ imageUrl: `/uploads/${filename}` });
  } catch (err) {
    console.error('CRITICAL UPLOAD ERROR:', err);
    res.status(500).json({ error: 'DB Insert Failed', details: String(err) });
  }
}
