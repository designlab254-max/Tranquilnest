import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DATABASE_URL;
console.log('URL:', dbUrl ? 'Set' : 'Not set');

const pool = new Pool({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 2000,
  query_timeout: 2000,
  statement_timeout: 2000
});

async function test() {
  console.log('Testing connection...');
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
