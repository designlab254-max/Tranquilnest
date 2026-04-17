import fs from 'fs';

async function testUpload() {
  try {
    const res = await fetch('http://localhost:3000/api/nonexistent', {
      method: 'POST',
      body: 'test'
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text.substring(0, 100));
  } catch (err) {
    console.error(err);
  }
}

testUpload();
