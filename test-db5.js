import { Pool } from 'pg';

// Testing with the S typo just in case
const dbUrl = 'postgresql://postgres:TRSNQUILNEST%402026@db.tyvextdjuliluhhrrska.supabase.co:5432/postgres';

const pool = new Pool({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});

async function test() {
  console.log('Testing connection with URL encoded password (S typo)...');
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Success:', res.rows);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

test();
