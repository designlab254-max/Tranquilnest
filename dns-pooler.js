import dns from 'dns';
dns.lookup('aws-0-eu-central-1.pooler.supabase.com', (err, address, family) => {
  console.log('aws-0-eu-central-1 address: %j family: IPv%s', address, family);
});
