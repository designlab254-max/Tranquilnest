import fs from 'fs';

async function testUpload() {
  const formData = new FormData();
  const buffer = Buffer.alloc(100 * 1024, 'a'); // 100KB
  const fileBlob = new Blob([buffer]);
  formData.append('image', fileBlob, 'small.jpg');

  try {
    const res = await fetch('https://ais-dev-y7fnihnmo46ryjrh3fj3sg-301774062227.europe-west1.run.app/api/upload', {
      method: 'POST',
      body: formData
    });
    console.log('Status:', res.status);
    console.log('Redirected:', res.redirected);
    console.log('URL:', res.url);
  } catch (err) {
    console.error(err);
  }
}

testUpload();
