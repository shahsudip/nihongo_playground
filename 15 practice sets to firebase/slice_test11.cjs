const fs = require('fs');

const allRaw = fs.readFileSync('all_raw.txt', 'utf8');
const lines = allRaw.split('\n');

const test11Lines = lines.slice(6236, 6855);
fs.writeFileSync('test11_raw.txt', test11Lines.join('\n'));
console.log('Saved test11_raw.txt');
