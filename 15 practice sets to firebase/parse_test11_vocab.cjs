const fs = require('fs');

const raw = fs.readFileSync('test11_raw.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l);

const vocabQs = [];
let currentQ = null;
const vocabAnswers = {};
let parsingAnswers = false;

for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    
    // Switch to answer mode
    if (l.includes('Answer List (1-35)') || l.includes('**問題1**') && vocabQs.length > 30) {
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
    
    // Strip `**` from correct options if they are embedded like `**3. 自然**`
    let cleanL = l.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
        // If it's a number dot something, like 3. 自然, just return the inner part
        if (p1.match(/^[1234]\.\s+/)) return p1;
        // Else it's likely a target word in the question, so keep the ** for now
        return `**${p1}**`;
    });
    // Wait, wait, some are like `**4. かわいた**`.
    // Replace it so it becomes `4. かわいた`.
    cleanL = cleanL.replace(/\*\*([1234]\.\s+.*?)\*\*/g, '$1');
    cleanL = cleanL.replace(/([1234]\.\s+.*?)\*\*/g, '$1');
    cleanL = cleanL.replace(/\*\*([1234]\.\s+.*)/g, '$1');
    
    // Parse Questions using cleanL for options
    let optM = cleanL.match(/^1\.\s+(.+?)[　\s]+2\.\s+(.+?)[　\s]+3\.\s+(.+?)[　\s]+4\.\s+(.+?)$/);
    if (!optM && cleanL.match(/^1\.\s+.*2\.\s+.*3\.\s+.*4\.\s+.*/)) {
        let parts = cleanL.split(/[1234]\.\s+/).filter(x => x.trim() !== '');
        if (parts.length === 4) optM = [cleanL, parts[0].trim(), parts[1].trim(), parts[2].trim(), parts[3].trim()];
    }
    
    let m = null;
    if (!optM) {
        let possibleQ = cleanL.match(/^(\d+)\.\s+(.*)/);
        if (possibleQ) {
            let qNum = parseInt(possibleQ[1]);
            if (qNum > 4 || (currentQ === null) || (currentQ && currentQ.options.length === 4)) {
                m = possibleQ;
            }
        }
    }
    
    if (m && !cleanL.startsWith('問題') && !cleanL.startsWith('**問題')) {
        if (currentQ && currentQ.options.length > 0) vocabQs.push(currentQ);
        currentQ = {
            id: parseInt(m[1]),
            questionText: m[2] ? m[2] : "",
            options: [],
            correctIndex: -1
        };
        // Fill in missing blanks
        if (!m[2] && i + 1 < lines.length && lines[i+1].match(/^[1234]\.\s+/)) {
            currentQ.questionText = "（　　）";
        }
    } else if (currentQ) {
        if (optM) {
            currentQ.options.push(optM[1], optM[2], optM[3], optM[4]);
        } else if (cleanL.match(/^[1234]\.\s+(.*)/)) {
            let om = cleanL.match(/^[1234]\.\s+(.*)/);
            currentQ.options.push(om[1].trim());
        } else if (currentQ.options.length === 0 && !cleanL.startsWith('問題') && !cleanL.startsWith('**問題') && !cleanL.includes('---')) {
            currentQ.questionText += "\n" + cleanL;
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
    
    // Process any `**` markers naturally
    if (q.questionText.includes('**')) {
        q.questionText = q.questionText.replace(/\*\*([^*]+)\*\*/g, '<u>$1</u>');
    }
    if (q.options) {
        q.options = q.options.map(o => o.replace(/\*\*([^*]+)\*\*/g, '<u>$1</u>'));
    }
    
    // Clean underlines for questions >= 15
    if (q.id >= 15) {
        q.questionText = removeUnderline(q.questionText);
        q.options = q.options.map(o => removeUnderline(o));
        
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
    console.log('Successfully updated Test 11 Vocab in database!');
} else {
    console.error('Failed to parse 35 questions! Did not update DB.');
}
