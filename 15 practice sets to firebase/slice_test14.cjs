const fs = require('fs');

const allRaw = fs.readFileSync('all_raw.txt', 'utf8');
const lines = allRaw.split('\n');

const test14Lines = lines.slice(8186, 8831);
fs.writeFileSync('test14_raw.txt', test14Lines.join('\n'));
console.log('Saved test14_raw.txt');
