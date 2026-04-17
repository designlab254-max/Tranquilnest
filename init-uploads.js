import { Pool } from 'pg';

const dbUrl = 'postgresql://postgres.tyvextdjuliluhhrrska:TRANQUILNEST%402026@aws-1-eu-west-3.pooler.supabase.com:6543/postgres';
const pool = new Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS uploaded_files (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) UNIQUE NOT NULL,
      mime_type VARCHAR(100) NOT NULL,
      data BYTEA NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Uploads table created');
  process.exit(0);
}
init().catch(console.error);
