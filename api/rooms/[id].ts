import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pool } from '../db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, price, description, long_description, image_url, image, features, size, bed, amenities, is_best_seller } = req.body;
    const finalImageUrl = image_url || image;

    try {
      await pool.query(
        'UPDATE rooms SET name = $1, price = $2, description = $3, long_description = $4, image_url = $5, features = $6, size = $7, bed = $8, amenities = $9, is_best_seller = $10 WHERE id = $11',
        [name, price, description, long_description, finalImageUrl, features, size, bed, amenities, is_best_seller, id]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM rooms WHERE id = $1', [id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
