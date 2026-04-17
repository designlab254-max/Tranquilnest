import fs from 'fs';

async function testUpload() {
  const formData = new FormData();
  // Create a 40MB buffer
  const buffer = Buffer.alloc(40 * 1024 * 1024, 'a');
  const fileBlob = new Blob([buffer]);
  formData.append('image', fileBlob, 'large.jpg');

  try {
    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text.substring(0, 100));
  } catch (err) {
    console.error(err);
  }
}

testUpload();
