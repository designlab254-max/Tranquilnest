import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import multer from 'multer';
import { Pool } from 'pg';
import fs from 'fs';

// Database connection
// We are hardcoding the verified working URL because the environment variable was mangled
let dbUrl = 'postgresql://postgres.tyvextdjuliluhhrrska:TRANQUILNEST%402026@aws-1-eu-west-3.pooler.supabase.com:6543/postgres';

console.log(`[SERVER] Database URL: ${dbUrl ? dbUrl.split('@')[1] || 'Set' : 'NOT SET (Using local JSON storage)'}`);

const pool = new Pool({
  connectionString: dbUrl,
  ...(dbUrl && { ssl: { rejectUnauthorized: false } }),
  connectionTimeoutMillis: 5000, // 5 seconds timeout
});

const DATA_FILE = path.join(process.cwd(), 'data.json');

// Helper to read/write local data
async function getLocalData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return null;
}

async function saveLocalData(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Initialize database tables
async function initDb() {
  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log('Created uploads directory');
  }

  if (!dbUrl) {
    console.warn('[SERVER] DATABASE_URL not set. Using local data.json for persistence.');
    if (!fs.existsSync(DATA_FILE)) {
      const { rooms, menuItems } = await import('./src/data.ts');
      const settings = {
        hotel_icon: 'https://images.unsplash.com/photo-1551219059-b5f8e7acee56?auto=format&fit=crop&w=200&q=80',
        hotel_avatar: 'N',
        hero_background: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
      };
      await saveLocalData({ rooms, menuItems, settings });
      console.log('[SERVER] Initialized data.json with default data');
    }
    return;
  }

  try {
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        key VARCHAR(50) PRIMARY KEY,
        value TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS rooms (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        long_description TEXT,
        price DECIMAL(12, 2) NOT NULL,
        image_url TEXT,
        features TEXT[],
        size VARCHAR(50),
        bed VARCHAR(50),
        amenities TEXT[],
        is_best_seller BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS sub_categories (
        id SERIAL PRIMARY KEY,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(category_id, name)
      );

      CREATE TABLE IF NOT EXISTS menu_items (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        price DECIMAL(12, 2) NOT NULL,
        category VARCHAR(100),
        category_id INTEGER REFERENCES categories(id),
        sub_category_id INTEGER REFERENCES sub_categories(id),
        image_url TEXT,
        allergens TEXT[],
        calories INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Ensure category column exists if table was already created
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='menu_items' AND column_name='category') THEN
          ALTER TABLE menu_items ADD COLUMN category VARCHAR(100);
        END IF;
      END $$;
    `);
    
    // Seed Settings
    const settingsCount = await pool.query('SELECT COUNT(*) FROM settings');
    if (parseInt(settingsCount.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO settings (key, value) VALUES 
        ('hotel_icon', 'https://images.unsplash.com/photo-1551219059-b5f8e7acee56?auto=format&fit=crop&w=200&q=80'),
        ('hotel_avatar', 'N'),
        ('hero_background', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80')
      `);
      console.log('Default settings seeded');
    }

    // Seed Rooms
    const roomsCount = await pool.query('SELECT COUNT(*) FROM rooms');
    if (parseInt(roomsCount.rows[0].count) === 0) {
      const { rooms } = await import('./src/data.ts');
      for (const room of rooms) {
        await pool.query(
          'INSERT INTO rooms (id, name, description, long_description, price, image_url, features, size, bed, amenities, is_best_seller) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
          [room.id, room.name, room.description, room.longDescription, room.price, room.image, room.features, room.size, room.bed, room.amenities, room.isBestSeller]
        );
      }
      console.log('Default rooms seeded');
    }

    // Seed Categories
    const categoriesCount = await pool.query('SELECT COUNT(*) FROM categories');
    if (parseInt(categoriesCount.rows[0].count) === 0) {
      await pool.query("INSERT INTO categories (name) VALUES ('Main Course'), ('Appetizers'), ('Desserts'), ('Drinks')");
      console.log('Default categories seeded');
    }

    // Seed Menu Items
    const menuCount = await pool.query('SELECT COUNT(*) FROM menu_items');
    if (parseInt(menuCount.rows[0].count) === 0) {
      const { menuItems } = await import('./src/data.ts');
      const categoriesRes = await pool.query('SELECT id, name FROM categories');
      const catMap = Object.fromEntries(categoriesRes.rows.map(c => [c.name, c.id]));

      for (const item of menuItems) {
        await pool.query(
          'INSERT INTO menu_items (id, name, description, price, category_id, image_url, allergens) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [item.id, item.name, item.description, item.price, catMap[item.category], item.image, item.allergens]
        );
      }
      console.log('Default menu items seeded');
    }
    
    console.log('Database tables initialized and seeded');
  } catch (err) {
    console.error('Database initialization failed:', err);
  }
}
initDb();

async function startServer() {
  const app = express();
  const PORT = 3001;

  app.use(express.json());
  const uploadsPath = path.resolve(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadsPath));
  console.log(`[SERVER] Serving uploads from: ${uploadsPath}`);

  // Multer setup for image uploads
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
    console.log('[SERVER] Created uploads directory');
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
  });

  // Login endpoint
  app.post('/api/login', (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || 'designlab254@gmail.com';
    
    // Allow the exact env var, the corrected spelling, or the default email
    if (password === adminPassword || password === 'TRANQUILNEST@2026' || password === 'TRANQUIL@2026' || password === 'designlab254@gmail.com') {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  });

  // Get all rooms
  app.get('/api/rooms', async (req, res) => {
    if (!dbUrl) {
      const data = await getLocalData();
      return res.json(data?.rooms || []);
    }
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
  });

  // Get all menu items
  app.get('/api/menu', async (req, res) => {
    if (!dbUrl) {
      const data = await getLocalData();
      return res.json(data?.menuItems || []);
    }
    try {
      const result = await pool.query(`
        SELECT m.*, c.name as category_name, s.name as sub_category_name 
        FROM menu_items m
        LEFT JOIN categories c ON m.category_id = c.id
        LEFT JOIN sub_categories s ON m.sub_category_id = s.id
        ORDER BY m.created_at DESC
      `);
      const mapped = result.rows.map(m => ({
        ...m,
        category: m.category || m.category_name || 'Main Course',
        image: m.image_url
      }));
      res.json(mapped);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  // Update a room
  app.put('/api/rooms/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description, image_url, image } = req.body;
    const finalImageUrl = image_url || image;

    if (!dbUrl) {
      const data = await getLocalData();
      if (data) {
        data.rooms = data.rooms.map((r: any) => 
          r.id === id ? { ...r, name, price, description, image: finalImageUrl } : r
        );
        await saveLocalData(data);
        return res.json({ success: true });
      }
      return res.status(500).json({ error: 'Local data not found' });
    }
    try {
      await pool.query(
        'UPDATE rooms SET name = $1, price = $2, description = $3, image_url = $4 WHERE id = $5',
        [name, price, description, finalImageUrl, id]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Update failed' });
    }
  });

  // Update a menu item
  app.put('/api/menu/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description, image_url, image, category } = req.body;
    const finalImageUrl = image_url || image;

    if (!dbUrl) {
      const data = await getLocalData();
      if (data) {
        data.menuItems = data.menuItems.map((m: any) => 
          m.id === id ? { ...m, name, price, description, image: finalImageUrl, category: category || m.category } : m
        );
        await saveLocalData(data);
        return res.json({ success: true });
      }
      return res.status(500).json({ error: 'Local data not found' });
    }
    try {
      await pool.query(
        'UPDATE menu_items SET name = $1, price = $2, description = $3, image_url = $4, category = $5 WHERE id = $6',
        [name, price, description, finalImageUrl, category, id]
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Update failed' });
    }
  });

  // Add a room
  app.post('/api/rooms', async (req, res) => {
    const { name, price, description, image_url, image } = req.body;
    const finalImageUrl = image_url || image;
    const id = Date.now().toString();

    if (!dbUrl) {
      const data = await getLocalData();
      if (data) {
        const newRoom = { id, name, price, description, image: finalImageUrl, features: [], amenities: [] };
        data.rooms.push(newRoom);
        await saveLocalData(data);
        return res.json({ success: true, room: newRoom });
      }
      return res.status(500).json({ error: 'Local data not found' });
    }
    try {
      const result = await pool.query(
        'INSERT INTO rooms (id, name, price, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, name, price, description, finalImageUrl]
      );
      res.json({ success: true, room: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Creation failed' });
    }
  });

  // Add a menu item
  app.post('/api/menu', async (req, res) => {
    const { name, price, description, image_url, image, category } = req.body;
    const finalImageUrl = image_url || image;
    const id = Date.now().toString();

    if (!dbUrl) {
      const data = await getLocalData();
      if (data) {
        const newItem = { id, name, price, description, image: finalImageUrl, category: category || 'Main' };
        data.menuItems.push(newItem);
        await saveLocalData(data);
        return res.json({ success: true, item: newItem });
      }
      return res.status(500).json({ error: 'Local data not found' });
    }
    try {
      const result = await pool.query(
        'INSERT INTO menu_items (id, name, price, description, image_url, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id, name, price, description, finalImageUrl, category || 'Main']
      );
      res.json({ success: true, item: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Creation failed' });
    }
  });

  // Delete a room
  app.delete('/api/rooms/:id', async (req, res) => {
    const { id } = req.params;
    if (!dbUrl) {
      const data = await getLocalData();
      if (data) {
        data.rooms = data.rooms.filter((r: any) => r.id !== id);
        await saveLocalData(data);
        return res.json({ success: true });
      }
      return res.status(500).json({ error: 'Local data not found' });
    }
    try {
      await pool.query('DELETE FROM rooms WHERE id = $1', [id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Delete failed' });
    }
  });

  // Delete a menu item
  app.delete('/api/menu/:id', async (req, res) => {
    const { id } = req.params;
    if (!dbUrl) {
      const data = await getLocalData();
      if (data) {
        data.menuItems = data.menuItems.filter((m: any) => m.id !== id);
        await saveLocalData(data);
        return res.json({ success: true });
      }
      return res.status(500).json({ error: 'Local data not found' });
    }
    try {
      await pool.query('DELETE FROM menu_items WHERE id = $1', [id]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Delete failed' });
    }
  });

  // Settings Endpoints
  app.get('/api/settings', async (req, res) => {
    if (!dbUrl) {
      const data = await getLocalData();
      return res.json(data?.settings || {});
    }
    try {
      const result = await pool.query('SELECT * FROM settings');
      const settings = result.rows.reduce((acc, row) => {
        acc[row.key] = row.value;
        return acc;
      }, {});
      res.json(settings);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.put('/api/settings/:key', async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;

    if (!dbUrl) {
      const data = await getLocalData();
      if (data) {
        data.settings[key] = value;
        await saveLocalData(data);
        return res.json({ success: true, setting: { key, value } });
      }
      return res.status(500).json({ error: 'Local data not found' });
    }
    console.log(`Updating setting: ${key} = ${value}`);
    try {
      const result = await pool.query(
        'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value RETURNING *',
        [key, value]
      );
      console.log('Update result:', result.rows[0]);
      
      // Log all settings to verify state
      const allSettings = await pool.query('SELECT * FROM settings');
      console.log('[SERVER] Current settings in DB:', allSettings.rows);

      res.json({ success: true, setting: result.rows[0] });
    } catch (err) {
      console.error('Update failed for key:', key, err);
      res.status(500).json({ error: 'Update failed', details: err instanceof Error ? err.message : String(err) });
    }
  });

  app.get('/api/debug/file/:name', (req, res) => {
    const filePath = path.join(uploadsPath, req.params.name);
    res.json({ 
      exists: fs.existsSync(filePath),
      path: filePath,
      cwd: process.cwd()
    });
  });

  // Image Upload Endpoint
  app.post('/api/upload', (req, res) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        console.error('[SERVER] Upload error:', err);
        return res.status(500).json({ 
          error: 'Upload failed', 
          details: err instanceof Error ? err.message : String(err) 
        });
      }
      
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const imageUrl = `/uploads/${req.file.filename}`;
      console.log('[SERVER] Upload success:', imageUrl);
      res.json({ imageUrl });
    });
  });

  // Vite middleware for development
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
