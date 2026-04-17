import dns from 'dns';
dns.lookup('db.tyvextdjuliluhhrrska.supabase.co', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
