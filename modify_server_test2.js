import fs from 'fs';
const serverSrc = fs.readFileSync('server.ts', 'utf-8')
  .replace('const PORT = 3000;', 'const PORT = 3003;');
fs.writeFileSync('server_prod_test.ts', serverSrc);
