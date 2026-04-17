import { Pool } from 'pg';

const dbUrl = process.env.DATABASE_URL;
console.log('Current DATABASE_URL:', dbUrl ? dbUrl.replace(/:[^:@]+@/, ':***@') : 'NOT SET');

if (!dbUrl) {
  console.log('No DATABASE_URL found.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});

async function test() {
  console.log('Testing connection with current DATABASE_URL...');
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
