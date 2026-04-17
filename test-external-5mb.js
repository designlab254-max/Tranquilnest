import fs from 'fs';

async function testUpload() {
  const formData = new FormData();
  const buffer = Buffer.alloc(5 * 1024 * 1024, 'a');
  const fileBlob = new Blob([buffer]);
  formData.append('image', fileBlob, 'large.jpg');

  try {
    const res = await fetch('https://ais-dev-y7fnihnmo46ryjrh3fj3sg-301774062227.europe-west1.run.app/api/upload', {
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
