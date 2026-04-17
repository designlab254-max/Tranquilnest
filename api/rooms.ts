import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pool } from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM rooms ORDER BY created_at DESC');
      const mapped = result.rows.map(r => ({
        ...r,
        longDescription: r.long_description,
        image: r.image_url,
        isBestSeller: r.is_best_seller
      }));
      res.json(mapped);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  } else if (req.method === 'POST') {
    const { id, name, description, longDescription, price, image, features, size, bed, amenities, isBestSeller } = req.body;
    try {
      await pool.query(
        'INSERT INTO rooms (id, name, description, long_description, price, image_url, features, size, bed, amenities, is_best_seller) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        [id, name, description, longDescription, price, image, features, size, bed, amenities, isBestSeller]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
