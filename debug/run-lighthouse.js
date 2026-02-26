const { exec, spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const PORT = 3000;
const LH_OUTPUT = 'lighthouse-report.json';

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
            console.log('✅ Server is running, running Lighthouse...');
            // Run Lighthouse
            const lh = spawn('npx', ['lighthouse', `http://localhost:${PORT}`, '--output', 'json', '--output-path', LH_OUTPUT, '--chrome-flags', '--headless'], { stdio: 'inherit' });
            lh.on('close', (code) => {
                console.log(`Lighthouse exited with code ${code}`);
                if (code === 0) {
                    console.log('✅ Lighthouse audit completed');
                    // Read and parse the report
                    try {
                        const data = JSON.parse(fs.readFileSync(LH_OUTPUT, 'utf8'));
                        const categories = data.categories;
                        console.log('\n--- Lighthouse Scores ---');
                        Object.keys(categories).forEach(key => {
                            console.log(`${categories[key].title}: ${categories[key].score * 100}`);
                        });
                        // Determine if scores >= 90
                        const passed = Object.keys(categories).every(key => categories[key].score >= 0.9);
                        if (passed) {
                            console.log('✅ All scores ≥90');
                        } else {
                            console.log('❌ Some scores below 90');
                        }
                    } catch (err) {
                        console.error('Failed to read Lighthouse report:', err);
                    }
                } else {
                    console.error('❌ Lighthouse audit failed');
                }
                // Kill server
                bs.kill();
                process.exit(code === 0 ? 0 : 1);
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
    req.setTimeout(10000, () => {
        console.error('Request timeout');
        bs.kill();
        process.exit(1);
    });
}, 3000);