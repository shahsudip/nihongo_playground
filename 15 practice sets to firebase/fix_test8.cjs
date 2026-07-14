const fs = require('fs');

const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
const dbData = JSON.parse(jsonStr);

const set8Vocab = dbData.sets[7].sections['vocabulary-kanji'].questions;

function removeUnderline(text) {
    if (!text) return text;
    return text.replace(/<u>/g, '').replace(/<\/u>/g, '');
}

for (let i = 0; i < set8Vocab.length; i++) {
    const q = set8Vocab[i];
    
    // First remove any existing underlines
    q.questionText = removeUnderline(q.questionText);
    if (q.options) {
        q.options = q.options.map(o => removeUnderline(o));
    }
    
    // Questions 1-14: Hardcode underlines
    if (i === 0) q.questionText = q.questionText.replace('飛んで', '<u>飛んで</u>');
    if (i === 1) q.questionText = q.questionText.replace('無料', '<u>無料</u>');
    if (i === 2) q.questionText = q.questionText.replace('通行', '<u>通行</u>');
    if (i === 3) q.questionText = q.questionText.replace('疲れて', '<u>疲れて</u>');
    if (i === 4) q.questionText = q.questionText.replace('面', '<u>面</u>');
    if (i === 5) q.questionText = q.questionText.replace('知恵', '<u>知恵</u>');
    if (i === 6) q.questionText = q.questionText.replace('多様', '<u>多様</u>');
    if (i === 7) q.questionText = q.questionText.replace('到着', '<u>到着</u>');
    if (i === 8) q.questionText = q.questionText.replace('ふまん', '<u>ふまん</u>');
    if (i === 9) q.questionText = q.questionText.replace('けんちく', '<u>けんちく</u>');
    if (i === 10) q.questionText = q.questionText.replace('もどって', '<u>もどって</u>');
    if (i === 11) q.questionText = q.questionText.replace('みとめる', '<u>みとめる</u>'); // User tagged 'こうそく' by mistake
    if (i === 12) q.questionText = q.questionText.replace('こうがい', '<u>こうがい</u>');
    if (i === 13) q.questionText = q.questionText.replace('やちん', '<u>やちん</u>');
    
    // Questions 26-30: Hardcode underlines
    if (i === 25) q.questionText = q.questionText.replace('わがまま', '<u>わがまま</u>');
    if (i === 26) q.questionText = q.questionText.replace('全然', '<u>全然</u>');
    if (i === 27) q.questionText = q.questionText.replace('もうけた', '<u>もうけた</u>');
    if (i === 28) q.questionText = q.questionText.replace('どんどん', '<u>どんどん</u>'); // User tagged '質問' by mistake
    if (i === 29) q.questionText = q.questionText.replace('アドバイス', '<u>アドバイス</u>');
}

fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(dbData, null, 2)};\n`);
console.log('Successfully fixed Test 8!');
