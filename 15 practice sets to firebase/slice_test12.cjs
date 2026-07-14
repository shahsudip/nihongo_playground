const fs = require('fs');

const allRaw = fs.readFileSync('all_raw.txt', 'utf8');
const lines = allRaw.split('\n');

const test12Lines = lines.slice(6860, 7515);
fs.writeFileSync('test12_raw.txt', test12Lines.join('\n'));
console.log('Saved test12_raw.txt');
