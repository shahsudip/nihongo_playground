const fs = require('fs');

const data = JSON.parse(fs.readFileSync('current_firebase_dump.json', 'utf8'));

for (let i = 7; i < 15; i++) {
    const set = data.sets[i];
    console.log(`\n--- SET ${i + 1} ---`);
    
    // Check Q31-35 options
    const vocab = set.sections['vocabulary-kanji'].questions;
    let combinedOptions = false;
    for (let j = 30; j < 35; j++) {
        const q = vocab[j];
        if (q && q.options && q.options.length === 1) {
            console.log(`Vocab index ${j} (ID: ${q.id}) has combined options:`, q.options[0]);
            combinedOptions = true;
        } else if (q && q.options && q.options.length > 1) {
            // Check if options[0] looks combined
            if (q.options[0].includes(' 2 ') || q.options[0].includes(' 3 ')) {
                console.log(`Vocab index ${j} (ID: ${q.id}) has weird options:`, q.options);
                combinedOptions = true;
            }
        }
    }
    if (!combinedOptions) {
        console.log('Vocab Q31-35 options are separated.');
    }

    // Check Grammar Q19 passage text
    const grammar = set.sections['grammar-reading'].questions;
    // Grammar Q19 is at index 18
    const q19 = grammar[18];
    if (q19 && q19.passageText) {
        let lines = q19.passageText.split('\n');
        console.log(`Grammar Q19 Passage Start: ${lines[0].substring(0, 50)}`);
        if (lines.length > 1) {
            console.log(`   Line 2: ${lines[1].substring(0, 50)}`);
        }
    }
}
