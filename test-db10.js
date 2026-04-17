import { Pool } from 'pg';

const dbUrl = 'postgresql://postgres.tyvextdjuliluhhrrska:TRANQUIL%402026@aws-0-eu-central-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});

async function test() {
  console.log('Testing connection with pooler and TRANQUIL@2026...');
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
