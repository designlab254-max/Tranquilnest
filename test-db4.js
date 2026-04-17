import { Pool } from 'pg';

// Testing with URL encoding for the @ symbol in the password
const dbUrl = 'postgresql://postgres:TRANQUILNEST%402026@db.tyvextdjuliluhhrrska.supabase.co:5432/postgres';

const pool = new Pool({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});

async function test() {
  console.log('Testing connection with URL encoded password...');
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
