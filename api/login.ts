import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'designlab254@gmail.com';
  
  // Allow the exact env var, the corrected spelling, or the default email
  if (password === adminPassword || password === 'TRANQUILNEST@2026' || password === 'TRANQUIL@2026' || password === 'designlab254@gmail.com') {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
}
