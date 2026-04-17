import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DATABASE_URL;
if (dbUrl) {
  const url = new URL(dbUrl);
  console.log('Host:', url.hostname);
  console.log('Port:', url.port);
}
