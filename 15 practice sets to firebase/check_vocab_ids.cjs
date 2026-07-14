const fs = require('fs');

const data = JSON.parse(fs.readFileSync('current_firebase_dump.json', 'utf8'));

for (let i = 7; i < 15; i++) {
    const set = data.sets[i];
    console.log(`\n--- SET ${i + 1} ---`);
    const vocab = set.sections['vocabulary-kanji'].questions;
    console.log(`Vocab questions count: ${vocab.length}`);
    let ids = vocab.map(q => q.id).join(', ');
    console.log(`Vocab IDs: ${ids}`);

    for (let q of vocab) {
        if (q.id >= 31 && q.id <= 35) {
            console.log(`Q${q.id} text: ${q.questionText}`);
            console.log(`Q${q.id} options:`, q.options);
        }
    }
}
