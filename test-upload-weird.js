import fs from 'fs';

async function testUpload() {
  const formData = new FormData();
  const buffer = Buffer.alloc(1024, 'a');
  const fileBlob = new Blob([buffer]);
  formData.append('image', fileBlob, 'weird name with spaces & symbols!.jpg');

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
