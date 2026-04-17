import { Pool } from 'pg';

// We use the same connection logic as before
const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres.tyvextdjuliluhhrrska:TRANQUILNEST%402026@aws-1-eu-west-3.pooler.supabase.com:6543/postgres';

export const pool = new Pool({
  connectionString: dbUrl,
  ...(dbUrl && { ssl: { rejectUnauthorized: false } }),
  connectionTimeoutMillis: 5000,
});
