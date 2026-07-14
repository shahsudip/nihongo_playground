const fs = require('fs');

const allRaw = fs.readFileSync('all_raw.txt', 'utf8');
const lines = allRaw.split('\n');

const test10VocabLines = lines.slice(5584, 5943);
fs.writeFileSync('test10_vocab_raw.txt', test10VocabLines.join('\n'));
console.log('Saved test10_vocab_raw.txt');
