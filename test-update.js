import fetch from 'node-fetch';

async function testUpdate() {
  try {
    const res = await fetch('http://localhost:3000/api/settings/amenity_accommodation_image', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'test' })
    });

    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Body:', text);
  } catch (err) {
    console.error('Error:', err);
  }
}

testUpdate();
