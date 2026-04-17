import fetch from 'node-fetch';

async function testGet() {
  try {
    const res = await fetch('http://localhost:3000/api/settings');
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Body:', text.substring(0, 100));
  } catch (err) {
    console.error('Error:', err);
  }
}

testGet();
