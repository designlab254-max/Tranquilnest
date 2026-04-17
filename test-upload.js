import fs from 'fs';

async function testUpload() {
  const formData = new FormData();
  const fileBlob = new Blob([fs.readFileSync('package.json')]);
  formData.append('image', fileBlob, 'package.json');

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
