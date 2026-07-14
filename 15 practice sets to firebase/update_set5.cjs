const fs = require('fs');

const text = fs.readFileSync('set5_vocab_part.txt', 'utf8');

const qs = [];
let lines = text.split('\n').map(l => l.trim()).filter(l => l);
let currentQ = null;

for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    if (l.includes('Answer List') || l.includes('Pure list')) break;
    
    let optM = l.match(/^1\.\s+(.+?)[　\s]+2\.\s+(.+?)[　\s]+3\.\s+(.+?)[　\s]+4\.\s+(.+?)/);
    let m = null;
    if (!optM) {
        let possibleQ = l.match(/^(\d+)\.\s+(.*)/);
        if (possibleQ) {
            let qNum = parseInt(possibleQ[1]);
            // If it's a number but we already have options, it's a new question
            if (qNum > 4 || (currentQ === null) || (currentQ && currentQ.options.length === 4)) {
                m = possibleQ;
            }
        }
        if (!m) m = l.match(/^\*\*(\d+)\*\*/);
    }
    
    if (m && !l.includes('a.')) {
        if (currentQ && currentQ.options.length > 0) qs.push(currentQ);
        currentQ = {
            questionText: m[2] ? m[2] : "",
            options: []
        };
        if (!m[2] && i + 1 < lines.length && lines[i+1].match(/^[1234]\.\s+/)) {
            currentQ.questionText = "（　　）";
        }
    } else if (currentQ) {
        if (optM) currentQ.options.push(optM[1], optM[2], optM[3], optM[4]);
        else if (l.match(/^[1234]\.\s+/)) currentQ.options.push(l.replace(/^[1234]\.\s+/, ''));
        else if (currentQ.options.length === 0 && !l.includes('問題') && !l.includes('---')) currentQ.questionText += "\n" + l;
    }
}
if (currentQ && currentQ.options.length > 0) qs.push(currentQ);

for (let q of qs) {
    q.questionText = q.questionText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
const dbData = JSON.parse(jsonStr);

// FIX TEST 1
for (let q of dbData.sets[0].sections['vocabulary-kanji'].questions) {
    if (q.questionText) {
        q.questionText = q.questionText.replace(/<u>/g, '<strong>').replace(/<\/u>/g, '</strong>');
    }
    if (q.options) {
        q.options = q.options.map(o => o.replace(/<u>/g, '<strong>').replace(/<\/u>/g, '</strong>'));
    }
}

// FIX TEST 5
const set5Vocab = dbData.sets[4].sections['vocabulary-kanji'].questions;
let matched = 0;
for (let q of qs) {
    let cleanUserText = q.questionText.replace(/<strong>/g, '').replace(/<\/strong>/g, '').trim();
    if (!cleanUserText || cleanUserText === '（　　）') continue;
    
    for (let dbQ of set5Vocab) {
        let cleanDbText = dbQ.questionText.replace(/<strong>/g, '').replace(/<\/strong>/g, '').trim();
        if (cleanDbText.startsWith(cleanUserText) || cleanUserText.startsWith(cleanDbText)) {
            dbQ.questionText = q.questionText;
            matched++;
            break;
        }
    }
}

console.log(`Matched and updated ${matched} questions in Set 5.`);

fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(dbData, null, 2)};\n`);
