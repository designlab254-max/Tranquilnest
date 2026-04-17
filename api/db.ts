import { Pool } from 'pg';

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("DATABASE_URL is not set in environment variables!");
}

export const pool = new Pool({
  connectionString: dbUrl || 'postgresql://postgres.tyvextdjuliluhhrrska:TRANQUILNEST%402026@aws-1-eu-west-3.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});
