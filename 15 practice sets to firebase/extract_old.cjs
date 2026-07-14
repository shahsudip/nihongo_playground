const fs = require('fs');
const buffer = fs.readFileSync('old_data.js');
let str = buffer.toString('utf16le');
if (str.charCodeAt(0) === 0xFEFF) {
    str = str.slice(1);
}
const jsonStr = str.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

const test1 = data.sets[0];
const vocab = test1.sections['vocabulary-kanji'].questions;
fs.writeFileSync('old_test1_vocab.json', JSON.stringify(vocab, null, 2));
