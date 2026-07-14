const fs = require('fs');

const raw = fs.readFileSync('test11_raw.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l);

const vocabQs = [];
let currentQ = null;
const vocabAnswers = {};
let parsingAnswers = false;

for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    
    if (l.includes('Answer List (1-35)') || (l.includes('**問題1**') && vocabQs.length > 30)) {
        if (currentQ && currentQ.options.length > 0) {
            vocabQs.push(currentQ);
            currentQ = null;
        }
        parsingAnswers = true;
    }
    
    if (parsingAnswers) {
        if (l.includes('TEST 11') && l.includes('文法')) break;
        let m = l.match(/^(\d+)\.\s+(\d+)$/);
        if (m) {
            let qNum = parseInt(m[1]);
            let ans = parseInt(m[2]) - 1;
            vocabAnswers[qNum] = ans;
        }
        continue;
    }
    
    // Check if it's a question line
    let m = null;
    let possibleQ = l.match(/^\*?\*?(\d+)\.\s+(.*)/);
    if (possibleQ) {
        let qNum = parseInt(possibleQ[1]);
        if (qNum > 4 || (currentQ === null) || (currentQ && currentQ.options.length === 4)) {
            m = possibleQ;
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
        // Is it options?
        let isOptionsLine = false;
        let optM = l.match(/^1\.\s+(.+?)[　\s]+2\.\s+(.+?)[　\s]+3\.\s+(.+?)[　\s]+4\.\s+(.+?)$/);
        let fallbackOptM = l.split(/[1234]\.\s+/).filter(x => x.trim() !== '');

        if (optM || (l.includes('1.') && l.includes('2.') && l.includes('3.') && l.includes('4.'))) {
            isOptionsLine = true;
            // Find which part has **
            let parts = l.split(/[1234]\.\s+/).filter(x => x.trim() !== '');
            for (let j = 0; j < parts.length; j++) {
                if (parts[j].includes('**')) {
                    vocabAnswers[currentQ.id] = j;
                }
                currentQ.options.push(parts[j].replace(/\*\*/g, '').trim());
            }
        } else if (l.match(/^[1234]\.\s+(.*)/)) {
            let om = l.match(/^[1234]\.\s+(.*)/);
            let optText = om[1].trim();
            if (optText.includes('**') || l.startsWith('**')) {
                vocabAnswers[currentQ.id] = currentQ.options.length;
            }
            currentQ.options.push(optText.replace(/\*\*/g, '').trim());
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
    
    // Process any `**` markers naturally in question text
    if (q.questionText.includes('**')) {
        q.questionText = q.questionText.replace(/\*\*([^*]+)\*\*/g, '<u>$1</u>');
    }
    
    // Clean underlines for questions >= 15
    if (q.id >= 15) {
        q.questionText = removeUnderline(q.questionText);
        
        // Re-apply for 26-30 since they are meaning questions
        if (q.id === 26) q.questionText = q.questionText.replace('せっかく', '<u>せっかく</u>');
        if (q.id === 27) q.questionText = q.questionText.replace('さっそく', '<u>さっそく</u>');
        if (q.id === 28) q.questionText = q.questionText.replace('うっかり', '<u>うっかり</u>');
        if (q.id === 29) q.questionText = q.questionText.replace('ばったり', '<u>ばったり</u>');
        if (q.id === 30) q.questionText = q.questionText.replace('ぼんやり', '<u>ぼんやり</u>');
    }
    
    q.sectionType = "vocabulary-kanji";
    if (vocabAnswers[q.id] !== undefined) q.correctIndex = vocabAnswers[q.id];
}

console.log(`Parsed ${vocabQs.length} Vocab questions.`);

if (vocabQs.length === 35) {
    const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
    const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
    const dbData = JSON.parse(jsonStr);

    dbData.sets[10].sections['vocabulary-kanji'].questions = vocabQs;
    
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
    console.log('Successfully updated Test 11 Vocab in database!');
} else {
    console.error('Failed to parse 35 questions! Did not update DB.');
}
