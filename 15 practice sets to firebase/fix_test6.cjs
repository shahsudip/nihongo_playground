const fs = require('fs');

const text = fs.readFileSync('test6_vocab_paste.txt', 'utf8');

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


const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
const dbData = JSON.parse(jsonStr);

const set6Vocab = dbData.sets[5].sections['vocabulary-kanji'].questions;

function removeUnderline(text) {
    if (!text) return text;
    return text.replace(/<u>/g, '').replace(/<\/u>/g, '');
}

for (let i = 0; i < set6Vocab.length; i++) {
    const q = set6Vocab[i];
    
    // Questions 1-14: Replace with parsed text AND hardcode underlines
    if (i < 14) {
        const parsedQ = qs.find(pq => pq.id === (i + 1));
        if (parsedQ) {
            q.questionText = parsedQ.questionText;
        }
        // Add underlines
        if (i === 0) q.questionText = q.questionText.replace('壊れ', '<u>壊れ</u>');
        if (i === 1) q.questionText = q.questionText.replace('各地', '<u>各地</u>');
        if (i === 2) q.questionText = q.questionText.replace('主人', '<u>主人</u>');
        if (i === 3) q.questionText = q.questionText.replace('洗って', '<u>洗って</u>');
        if (i === 4) q.questionText = q.questionText.replace('不便', '<u>不便</u>');
        if (i === 5) q.questionText = q.questionText.replace('仲間', '<u>仲間</u>');
        if (i === 6) q.questionText = q.questionText.replace('肌', '<u>肌</u>');
        if (i === 7) q.questionText = q.questionText.replace('郵送', '<u>郵送</u>');
        
        // Use db's wording for 9-14 because of typos in user paste! Wait, my script replaces it with parsedQ!
        // Let me just restore DB wording for 9!
        if (i === 8) q.questionText = '彼は、<u>ふせい</u>な取引を禁じる。';
        if (i === 9) q.questionText = q.questionText.replace('きゅうか', '<u>きゅうか</u>');
        if (i === 10) q.questionText = q.questionText.replace('たのんで', '<u>たのんで</u>');
        if (i === 11) q.questionText = q.questionText.replace('こまる', '<u>こまる</u>');
        if (i === 12) q.questionText = q.questionText.replace('とまる', '<u>とまる</u>');
        if (i === 13) q.questionText = q.questionText.replace('みかた', '<u>みかた</u>');
    }
    // Questions 15-25: Remove all underlines (fill-in-the-blank)
    else if (i >= 14 && i < 25) {
        q.questionText = removeUnderline(q.questionText);
        if (q.options) {
            q.options = q.options.map(o => removeUnderline(o));
        }
    }
    // Questions 26-30: Replace with parsed text AND hardcode underlines
    else if (i >= 25 && i < 30) {
        const parsedQ = qs.find(pq => pq.id === (i + 1));
        if (parsedQ) {
            q.questionText = parsedQ.questionText;
        }
        if (i === 25) q.questionText = q.questionText.replace('やさしい', '<u>やさしい</u>');
        if (i === 26) q.questionText = q.questionText.replace('ささやいた', '<u>ささやいた</u>');
        if (i === 27) q.questionText = q.questionText.replace('気にしないで', '<u>気にしないで</u>');
        if (i === 28) q.questionText = q.questionText.replace('しかった', '<u>しかった</u>');
        if (i === 29) q.questionText = q.questionText.replace('ていねいに', '<u>ていねいに</u>');
    }
    // Questions 31-35: Replace completely with parsed text, no underlines
    else if (i >= 30 && i < 35) {
        const parsedQ = qs.find(pq => pq.id === (i + 1));
        if (parsedQ) {
            q.questionText = parsedQ.questionText;
            q.options = parsedQ.options;
        }
    }
}

fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(dbData, null, 2)};\n`);
console.log('Successfully fixed Test 6!');
