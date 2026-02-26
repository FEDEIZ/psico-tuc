const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

// Extract JSON-LD scripts
const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let match;
let errors = 0;
while ((match = regex.exec(html)) !== null) {
    const jsonStr = match[1].trim();
    try {
        JSON.parse(jsonStr);
        console.log('✅ Valid JSON-LD');
    } catch (e) {
        console.error('❌ Invalid JSON-LD:', e.message);
        console.error('Snippet:', jsonStr.substring(0, 200));
        errors++;
    }
}

if (errors === 0) {
    console.log('All schema markup JSON-LD is valid.');
    process.exit(0);
} else {
    console.log(`Found ${errors} invalid JSON-LD blocks.`);
    process.exit(1);
}