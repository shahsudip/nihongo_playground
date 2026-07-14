const fs = require('fs');

const text = fs.readFileSync('test4_vocab_1_14.txt', 'utf8');

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
            if (qNum > 4 || (currentQ === null) || (currentQ && currentQ.options.length === 4)) {
                m = possibleQ;
            }
        }
        if (!m) m = l.match(/^\*\*(\d+)\*\*/);
    }
    
    if (m && !l.includes('a.')) {
        if (currentQ && currentQ.options.length > 0) qs.push(currentQ);
        currentQ = {
            id: parseInt(m[1]),
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
    q.questionText = q.questionText.replace(/\*\*([^*]+)\*\*/g, '<u>$1</u>');
}

const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
const dbData = JSON.parse(jsonStr);

const set4Vocab = dbData.sets[3].sections['vocabulary-kanji'].questions;

function removeUnderline(text) {
    if (!text) return text;
    return text.replace(/<u>/g, '').replace(/<\/u>/g, '');
}

for (let i = 0; i < set4Vocab.length; i++) {
    const q = set4Vocab[i];
    
    // Questions 1-14: Replace with parsed text
    if (i < 14) {
        const parsedQ = qs.find(pq => pq.id === (i + 1));
        if (parsedQ) {
            q.questionText = parsedQ.questionText;
        }
    }
    // Questions 15-25: Remove all underlines (fill-in-the-blank)
    else if (i >= 14 && i < 25) {
        q.questionText = removeUnderline(q.questionText);
        if (q.options) {
            q.options = q.options.map(o => removeUnderline(o));
        }
    }
    // Questions 26-30: Hardcoded underlines
    else if (i >= 25 && i < 30) {
        q.questionText = removeUnderline(q.questionText);
        if (q.questionText.includes('おとなしい')) {
            q.questionText = q.questionText.replace('おとなしい', '<u>おとなしい</u>');
        } else if (q.questionText.includes('ごろごろしています')) {
            q.questionText = q.questionText.replace('ごろごろしています', '<u>ごろごろしています</u>');
        } else if (q.questionText.includes('いいかげんな')) {
            q.questionText = q.questionText.replace('いいかげんな', '<u>いいかげんな</u>');
        } else if (q.questionText.includes('新しい職')) {
            q.questionText = q.questionText.replace('職', '<u>職</u>');
        } else if (q.questionText.includes('もともと')) {
            q.questionText = q.questionText.replace('もともと', '<u>もともと</u>');
        }
    }
    // Questions 31-35: Remove underlines from options and text
    else if (i >= 30 && i < 35) {
        q.questionText = removeUnderline(q.questionText);
        if (q.options) {
            q.options = q.options.map(o => removeUnderline(o));
        }
    }
}

fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(dbData, null, 2)};\n`);
console.log('Successfully fixed Test 4 Vocab underlines!');
