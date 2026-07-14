const fs = require('fs');

const allRaw = fs.readFileSync('all_raw.txt', 'utf8');
const lines = allRaw.split('\n');

const test13Lines = lines.slice(7518, 8185);
fs.writeFileSync('test13_raw.txt', test13Lines.join('\n'));
console.log('Saved test13_raw.txt');
