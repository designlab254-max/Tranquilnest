import { Pool } from 'pg';

const regions = [
  'aws-0-us-east-1',
  'aws-0-us-west-1',
  'aws-0-us-west-2',
  'aws-0-eu-central-1',
  'aws-0-eu-west-1',
  'aws-0-eu-west-2',
  'aws-0-eu-west-3',
  'aws-0-ap-southeast-1',
  'aws-0-ap-southeast-2',
  'aws-0-ap-northeast-1',
  'aws-0-ap-northeast-2',
  'aws-0-ap-south-1',
  'aws-0-sa-east-1',
  'aws-0-ca-central-1'
];

async function testRegion(region) {
  const dbUrl = `postgresql://postgres.tyvextdjuliluhhrrska:TRANQUIL%402026@${region}.pooler.supabase.com:6543/postgres`;
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 3000,
  });

  try {
    await pool.query('SELECT 1');
    console.log(`✅ SUCCESS in region: ${region}`);
    return dbUrl;
  } catch (err) {
    // console.log(`❌ Failed in ${region}: ${err.message}`);
    return null;
  } finally {
    await pool.end();
  }
}

async function run() {
  console.log('Scanning regions for the correct pooler...');
  const promises = regions.map(r => testRegion(r));
  const results = await Promise.all(promises);
  const success = results.find(r => r !== null);
  
  if (success) {
    console.log('\nFOUND WORKING URL:');
    console.log(success);
  } else {
    console.log('\nNo regions worked.');
  }
}

run();
