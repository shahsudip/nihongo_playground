const fs = require('fs');

const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
const dbData = JSON.parse(jsonStr);

const set9Vocab = dbData.sets[8].sections['vocabulary-kanji'].questions;

function removeUnderline(text) {
    if (!text) return text;
    return text.replace(/<u>/g, '').replace(/<\/u>/g, '');
}

for (let i = 0; i < set9Vocab.length; i++) {
    const q = set9Vocab[i];
    
    // First remove any existing underlines
    q.questionText = removeUnderline(q.questionText);
    if (q.options) {
        q.options = q.options.map(o => removeUnderline(o));
    }
    
    // Fix typo in Q13
    if (i === 12) {
        q.questionText = q.questionText.replace('いちしき', 'ちしき');
    }
    
    // Questions 1-14: Hardcode underlines
    if (i === 0) q.questionText = q.questionText.replace('飾って', '<u>飾って</u>');
    if (i === 1) q.questionText = q.questionText.replace('各自', '<u>各自</u>');
    if (i === 2) q.questionText = q.questionText.replace('湖', '<u>湖</u>');
    if (i === 3) q.questionText = q.questionText.replace('鳴いて', '<u>鳴いて</u>');
    if (i === 4) q.questionText = q.questionText.replace('屋上', '<u>屋上</u>');
    if (i === 5) q.questionText = q.questionText.replace('通過', '<u>通過</u>');
    if (i === 6) q.questionText = q.questionText.replace('歯', '<u>歯</u>');
    if (i === 7) q.questionText = q.questionText.replace('回転', '<u>回転</u>');
    if (i === 8) q.questionText = q.questionText.replace('きそく', '<u>きそく</u>');
    if (i === 9) q.questionText = q.questionText.replace('ゆうじょう', '<u>ゆうじょう</u>');
    if (i === 10) q.questionText = q.questionText.replace('あんだ', '<u>あんだ</u>');
    if (i === 11) q.questionText = q.questionText.replace('おもに', '<u>おもに</u>');
    if (i === 12) q.questionText = q.questionText.replace('ちしき', '<u>ちしき</u>'); // Fixed typo
    if (i === 13) q.questionText = q.questionText.replace('せわ', '<u>せわ</u>');
    
    // Questions 26-30: Hardcode underlines
    if (i === 25) q.questionText = q.questionText.replace('再会', '<u>再会</u>');
    if (i === 26) q.questionText = q.questionText.replace('はらはらする', '<u>はらはらする</u>');
    if (i === 27) q.questionText = q.questionText.replace('はずして', '<u>はずして</u>');
    if (i === 28) q.questionText = q.questionText.replace('アクセス', '<u>アクセス</u>');
    if (i === 29) q.questionText = q.questionText.replace('正直', '<u>正直</u>');
}

fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(dbData, null, 2)};\n`);
console.log('Successfully fixed Test 9!');
