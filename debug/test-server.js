const { exec } = require('child_process');
const http = require('http');

const PORT = 3000;

// Start browser-sync
const bs = exec(`npx browser-sync start --server --files '**/*.html,**/*.css,**/*.js,**/*.json' --port ${PORT} --no-open --no-ui`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error starting server: ${error}`);
        process.exit(1);
    }
});

console.log(`BrowserSync started (PID: ${bs.pid})`);

// Wait a few seconds for server to start
setTimeout(() => {
    const req = http.get(`http://localhost:${PORT}/`, (res) => {
        console.log(`Server responded with status: ${res.statusCode}`);
        if (res.statusCode === 200) {
            console.log('✅ Server is running');
            // Test debug script
            http.get(`http://localhost:${PORT}/debug/debug-panel.js`, (res2) => {
                console.log(`Debug script status: ${res2.statusCode}`);
                if (res2.statusCode === 200) {
                    console.log('✅ Debug script is accessible');
                } else {
                    console.error('❌ Debug script not found');
                }
                // Kill server
                bs.kill();
                process.exit(0);
            }).on('error', (err) => {
                console.error('Failed to fetch debug script:', err);
                bs.kill();
                process.exit(1);
            });
        } else {
            console.error('❌ Server returned non‑200');
            bs.kill();
            process.exit(1);
        }
    }).on('error', (err) => {
        console.error('Failed to connect to server:', err);
        bs.kill();
        process.exit(1);
    });
    req.setTimeout(5000, () => {
        console.error('Request timeout');
        bs.kill();
        process.exit(1);
    });
}, 3000);