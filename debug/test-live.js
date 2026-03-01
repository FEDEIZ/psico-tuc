const { spawn } = require('child_process');
const http = require('http');

const server = spawn('npx', ['live-server', '--port=3000', '--quiet'], { stdio: 'inherit' });

setTimeout(() => {
  http.get('http://localhost:3000', (res) => {
    console.log(`Server responded with status: ${res.statusCode}`);
    if (res.statusCode === 200) {
      console.log('✅ Server is running');
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (data.includes('Consultantes')) {
          console.log('✅ Found "Consultantes" in page');
        } else {
          console.log('❌ "Consultantes" not found');
        }
        if (data.includes('Mi Formación')) {
          console.log('✅ Found "Mi Formación" in page');
        } else {
          console.log('❌ "Mi Formación" not found');
        }
        server.kill();
        process.exit(0);
      });
    } else {
      console.error('❌ Server returned non‑200');
      server.kill();
      process.exit(1);
    }
  }).on('error', (err) => {
    console.error('Failed to connect to server:', err);
    server.kill();
    process.exit(1);
  });
}, 2000);