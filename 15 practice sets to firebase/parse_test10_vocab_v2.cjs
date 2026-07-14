const fs = require('fs');

const raw = fs.readFileSync('test10_vocab_raw.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l);

const vocabQs = [];
let currentQ = null;
const vocabAnswers = {};
let parsingAnswers = false;

for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    
    // Switch to answer mode
    if (l.includes('### **問題1** (読み方)') || l.match(/^1\.\s+\*\*[1234]\*\*/)) {
        if (currentQ && currentQ.options.length > 0) {
            vocabQs.push(currentQ);
            currentQ = null;
        }
        parsingAnswers = true;
    }
    
    if (parsingAnswers) {
        let m = l.match(/^(\d+)\.\s+\*\*([1234])\*\*/);
        if (!m) m = l.match(/^(\d+)\.\s+([1234])/);
        if (m) {
            let qNum = parseInt(m[1]);
            let ans = parseInt(m[2]) - 1;
            vocabAnswers[qNum] = ans;
        }
        continue;
    }
    
    // Parse Questions
    let optM = l.match(/^1\.\s+(.+?)[　\s]+2\.\s+(.+?)[　\s]+3\.\s+(.+?)[　\s]+4\.\s+(.+?)$/);
    if (!optM && l.match(/^1\.\s+.*2\.\s+.*3\.\s+.*4\.\s+.*/)) {
        let parts = l.split(/[1234]\.\s+/).filter(x => x.trim() !== '');
        if (parts.length === 4) optM = [l, parts[0].trim(), parts[1].trim(), parts[2].trim(), parts[3].trim()];
    }
    
    let m = null;
    if (!optM) {
        let possibleQ = l.match(/^(\d+)\.\s+(.*)/);
        if (possibleQ) {
            let qNum = parseInt(possibleQ[1]);
            if (qNum > 4 || (currentQ === null) || (currentQ && currentQ.options.length === 4)) {
                m = possibleQ;
            }
        }
    }
    
    if (m && !l.startsWith('問題') && !l.startsWith('**問題')) {
        if (currentQ && currentQ.options.length > 0) vocabQs.push(currentQ);
        currentQ = {
            id: parseInt(m[1]),
            questionText: m[2] ? m[2] : "",
            options: [],
            correctIndex: -1
        };
        if (!m[2] && i + 1 < lines.length && lines[i+1].match(/^[1234]\.\s+/)) {
            currentQ.questionText = "（　　）";
        }
    } else if (currentQ) {
        if (optM) {
            currentQ.options.push(optM[1], optM[2], optM[3], optM[4]);
        } else if (l.match(/^[1234]\.\s+(.*)/)) {
            let om = l.match(/^[1234]\.\s+(.*)/);
            currentQ.options.push(om[1].trim());
        } else if (currentQ.options.length === 0 && !l.startsWith('問題') && !l.startsWith('**問題') && !l.includes('---')) {
            currentQ.questionText += "\n" + l;
        }
    }
}
if (currentQ && currentQ.options.length > 0) vocabQs.push(currentQ);

function removeUnderline(text) {
    if (!text) return text;
    return text.replace(/<u>/g, '').replace(/<\/u>/g, '').replace(/\*\*/g, '');
}

for (let i = 0; i < vocabQs.length; i++) {
    let q = vocabQs[i];
    
    // First, process any `**` markers naturally
    if (q.questionText.includes('**')) {
        q.questionText = q.questionText.replace(/\*\*([^*]+)\*\*/g, '<u>$1</u>');
    }
    if (q.options) {
        q.options = q.options.map(o => o.replace(/\*\*([^*]+)\*\*/g, '<u>$1</u>'));
    }
    
    // Hardcode missing underlines
    if (q.id === 2 && !q.questionText.includes('<u>')) {
        q.questionText = q.questionText.replace('程度', '<u>程度</u>');
    }
    if (q.id === 7 && !q.questionText.includes('<u>')) {
        q.questionText = q.questionText.replace('袋', '<u>袋</u>');
    }
    
    // Clean underlines for questions >= 15
    if (q.id >= 15) {
        q.questionText = removeUnderline(q.questionText);
        q.options = q.options.map(o => removeUnderline(o));
        
        // Re-apply for 26-30
        if (q.id === 26) q.questionText = q.questionText.replace('とんでもない', '<u>とんでもない</u>');
        if (q.id === 27) q.questionText = q.questionText.replace('散らかした', '<u>散らかした</u>');
        if (q.id === 28) q.questionText = q.questionText.replace('ふり返った', '<u>ふり返った</u>');
        if (q.id === 29) q.questionText = q.questionText.replace('間に合っている', '<u>間に合っている</u>');
        if (q.id === 30) q.questionText = q.questionText.replace('慎重', '<u>慎重</u>');
    }
    
    q.sectionType = "vocabulary-kanji";
    if (vocabAnswers[q.id] !== undefined) q.correctIndex = vocabAnswers[q.id];
}

console.log(`Parsed ${vocabQs.length} Vocab questions.`);

if (vocabQs.length === 35) {
    const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
    const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
    const dbData = JSON.parse(jsonStr);

    dbData.sets[9].sections['vocabulary-kanji'].questions = vocabQs;
    
    // Reassign IDs across all sets
    let currentId = 1;
    for (let set of dbData.sets) {
        for (let sec of ['vocabulary-kanji', 'grammar-reading', 'listening']) {
            if (set.sections[sec]) {
                for (let q of set.sections[sec].questions) {
                    q.id = currentId++;
                }
            }
        }
    }

    fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(dbData, null, 2)};\n`);
    console.log('Successfully updated Test 10 Vocab in database!');
} else {
    console.error('Failed to parse 35 questions! Did not update DB.');
}
