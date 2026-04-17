import type { VercelRequest, VercelResponse } from '@vercel/node';
import multer from 'multer';
import { pool } from './db.js';
import path from 'path';

// Define the upload configuration with explicit memory storage
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

  try {
    // 1. Run Multer
    await new Promise<void>((resolve, reject) => {
      upload.single('image')(req as any, res as any, (err: any) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: 'No file received' });
    }

    // 2. Prepare Database
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;

    // 3. Insert into Database
    await pool.query(
      'INSERT INTO uploaded_files (filename, mime_type, data) VALUES ($1, $2, $3)',
      [filename, file.mimetype, file.buffer]
    );

    // 4. Send success
    return res.status(200).json({ imageUrl: `/uploads/${filename}` });

  } catch (err) {
    // If the server crashes here, the browser WILL get a 500 error response
    console.error('SERVER-SIDE UPLOAD ERROR:', err);
    return res.status(500).json({ 
      error: 'Upload aborted', 
      details: err instanceof Error ? err.message : 'Unknown error' 
    });
  }
}
