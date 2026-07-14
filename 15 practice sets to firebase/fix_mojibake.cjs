const fs = require('fs');
const { execSync } = require('child_process');

// Read the old file from git natively with utf8
const oldDataStr = execSync('git show HEAD:src/data/practice_sets_data.js', { encoding: 'utf8' });
const jsonStrOld = oldDataStr.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
const oldDb = JSON.parse(jsonStrOld);

const oldTest1Vocab = oldDb.sets[0].sections['vocabulary-kanji'].questions;

// Read the current file
const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
const jsonStrCurrent = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
const currentDb = JSON.parse(jsonStrCurrent);

const currentTest1Vocab = currentDb.sets[0].sections['vocabulary-kanji'].questions;

// Fix 18-25
for (let i = 17; i < 25; i++) {
    currentTest1Vocab[i] = oldTest1Vocab[i];
}

// Fix 31-35
for (let i = 30; i < 35; i++) {
    currentTest1Vocab[i] = oldTest1Vocab[i];
    // Also remove any underline from options, as per the new style
    if (currentTest1Vocab[i].options) {
        currentTest1Vocab[i].options = currentTest1Vocab[i].options.map(o => o.replace(/<u>/g, '').replace(/<\/u>/g, ''));
    }
}

fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(currentDb, null, 2)};\n`);
console.log('Successfully fixed mojibake in Test 1!');
