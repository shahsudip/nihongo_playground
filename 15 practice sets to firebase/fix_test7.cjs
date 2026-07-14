const fs = require('fs');

const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
const dbData = JSON.parse(jsonStr);

const set7Vocab = dbData.sets[6].sections['vocabulary-kanji'].questions;

function removeUnderline(text) {
    if (!text) return text;
    return text.replace(/<u>/g, '').replace(/<\/u>/g, '');
}

for (let i = 0; i < set7Vocab.length; i++) {
    const q = set7Vocab[i];
    
    // First remove any existing underlines
    q.questionText = removeUnderline(q.questionText);
    if (q.options) {
        q.options = q.options.map(o => removeUnderline(o));
    }
    
    // Questions 1-14: Hardcode underlines
    if (i === 0) q.questionText = q.questionText.replace('倒れて', '<u>倒れて</u>');
    if (i === 1) q.questionText = q.questionText.replace('植物', '<u>植物</u>');
    if (i === 2) q.questionText = q.questionText.replace('知人', '<u>知人</u>');
    if (i === 3) q.questionText = q.questionText.replace('積んだ', '<u>積んだ</u>');
    if (i === 4) q.questionText = q.questionText.replace('迷惑', '<u>迷惑</u>');
    if (i === 5) q.questionText = q.questionText.replace('地域', '<u>地域</u>');
    if (i === 6) q.questionText = q.questionText.replace('庭', '<u>庭</u>');
    if (i === 7) q.questionText = q.questionText.replace('交代', '<u>交代</u>');
    if (i === 8) q.questionText = q.questionText.replace('あんいな', '<u>あんいな</u>');
    if (i === 9) q.questionText = q.questionText.replace('こうぞう', '<u>こうぞう</u>');
    if (i === 10) q.questionText = q.questionText.replace('ひろって', '<u>ひろって</u>');
    if (i === 11) q.questionText = q.questionText.replace('あまる', '<u>あまる</u>');
    if (i === 12) q.questionText = q.questionText.replace('けいけん', '<u>けいけん</u>');
    if (i === 13) q.questionText = q.questionText.replace('どうさ', '<u>どうさ</u>');
    
    // Questions 26-30: Hardcode underlines
    if (i === 25) q.questionText = q.questionText.replace('めずらしい', '<u>めずらしい</u>');
    if (i === 26) q.questionText = q.questionText.replace('まとめた', '<u>まとめた</u>');
    if (i === 27) q.questionText = q.questionText.replace('貸した', '<u>貸した</u>');
    if (i === 28) q.questionText = q.questionText.replace('合う', '<u>合う</u>');
    if (i === 29) q.questionText = q.questionText.replace('おかしな', '<u>おかしな</u>');
}

fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(dbData, null, 2)};\n`);
console.log('Successfully fixed Test 7!');
