import fs from 'fs';

async function testPut() {
  try {
    const res = await fetch('https://ais-dev-y7fnihnmo46ryjrh3fj3sg-301774062227.europe-west1.run.app/api/settings/hotel_avatar', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'T' })
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text.substring(0, 100));
  } catch (err) {
    console.error(err);
  }
}

testPut();
