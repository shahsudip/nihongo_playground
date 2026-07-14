const fs = require('fs');

const allRaw = fs.readFileSync('all_raw.txt', 'utf8');
const lines = allRaw.split('\n');

const test9Lines = lines.slice(4908, 5580);
fs.writeFileSync('test9_raw.txt', test9Lines.join('\n'));
console.log('Saved test9_raw.txt');
