import dns from 'dns';
dns.resolveCname('db.tyvextdjuliluhhrrska.supabase.co', (err, addresses) => {
  console.log(err || addresses);
});
