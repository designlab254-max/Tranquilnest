import type { VercelRequest, VercelResponse } from '@vercel/node';
import multer from 'multer';
import { pool } from './db.js';
import path from 'path';

// Memory storage to handle files for Vercel V2 functions
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } 
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Wrap multer middleware for Vercel
  await new Promise<void>((resolve, reject) => {
    upload.single('image')(req as any, res as any, (err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });

  const file = (req as any).file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename = uniqueSuffix + path.extname(file.originalname);

  try {
    console.log('Attempting to upload file...');
    await pool.query(
      'INSERT INTO uploaded_files (filename, mime_type, data) VALUES ($1, $2, $3)',
      [filename, file.mimetype, file.buffer]
    );
    console.log('Successfully saved file to DB:', filename);
    const imageUrl = `/uploads/${filename}`;
    res.json({ imageUrl });
  } catch (dbErr) {
    console.error('FAILED TO SAVE IMAGE TO DATABASE. Error details:', dbErr);
    res.status(500).json({ error: 'Failed to save image to database', details: String(dbErr) });
  }
}
