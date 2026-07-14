const fs = require('fs');

const rawFiles = {
    7: 'set8_raw.txt',
    8: 'test9_raw.txt',
    9: 'test10_vocab_raw.txt', 
    10: 'set11_raw.txt',
    11: 'set12_raw.txt',
    12: 'set13_raw.txt',
    13: 'set14_raw.txt',
    14: 'set15_raw.txt'
};

const data = JSON.parse(fs.readFileSync('current_firebase_dump.json', 'utf8'));

for (let i = 7; i < 15; i++) {
    const vocab = data.sets[i].sections['vocabulary-kanji'].questions;
    let rawText = '';
    if (rawFiles[i] && fs.existsSync(rawFiles[i])) {
        rawText = fs.readFileSync(rawFiles[i], 'utf8');
    } else {
        continue;
    }

    let missing = [];
    for (let j of [...Array(14).keys(), ...Array(5).keys().map(x => x + 25)]) {
        let q = vocab[j];
        if (q && !q.questionText.includes('<u>')) {
            let qNum = j + 1;
            let regex = new RegExp(`(?:^|\\n)(?:\\*\\*)?${qNum}\\.(?:\\*\\*)?\\s*(.*?)(?=\\n(?:\\s*(?:\\*\\*)?\\d+\\.(?:\\*\\*)?|\\s*$))`, 's');
            let qMatch = rawText.match(regex);
            
            if (qMatch) {
                let sentence = qMatch[1];
                let boldMatch = sentence.match(/(?:\*\*|<u>|__)(.*?)(?:\*\*|<\/u>|__)/);
                if (boldMatch) {
                    missing.push(`Set ${i+1} Q${qNum}: ${boldMatch[1]}`);
                } else {
                    missing.push(`Set ${i+1} Q${qNum}: NO BOLD in "${sentence.substring(0, 30).trim()}"`);
                }
            } else {
                missing.push(`Set ${i+1} Q${qNum}: NO SENTENCE MATCH`);
            }
        }
    }
    if(missing.length > 0) {
        console.log(`\n--- Set ${i+1} ---`);
        console.log(missing.join('\n'));
    }
}
