const fs = require('fs');

const data = JSON.parse(fs.readFileSync('current_firebase_dump.json', 'utf8'));

for (let i = 7; i < 15; i++) {
    const set = data.sets[i];
    console.log(`\n--- SET ${i + 1} ---`);
    const vocab = set.sections['vocabulary-kanji'].questions;
    console.log("Q1:", vocab[0].questionText);
    console.log("Q14:", vocab[13].questionText);
    console.log("Q15:", vocab[14].questionText);
    console.log("Q26:", vocab[25].questionText);
    
    const q31 = vocab.find(q => q.id === 31);
    if (q31) {
        console.log("Q31 options:", q31.options);
    } else {
        console.log("Q31 options: Not found");
    }

    const grammar = set.sections['grammar-reading'].questions;
    const q19 = grammar.find(q => q.id === 19);
    if (q19 && q19.passageText) {
        console.log("Q19 Passage Start:", q19.passageText.substring(0, 100).replace(/\n/g, '\\n'));
    }
}
