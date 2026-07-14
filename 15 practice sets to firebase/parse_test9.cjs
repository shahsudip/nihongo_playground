const fs = require('fs');

const raw = fs.readFileSync('test9_raw.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l);

const vocabQs = [];
const grammarQs = [];
let currentQ = null;
let mode = 'vocab'; // 'vocab' or 'grammar'
let parsingAnswers = false;

// We will extract answers from the answer list as we see them
const vocabAnswers = {};
const grammarAnswers = {};

for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    
    if (l.includes('✅ Correct Answer List for 第9回 模擬テスト')) {
        parsingAnswers = true;
        mode = 'vocab-answers';
        continue;
    }
    if (l.includes('**第9回 文法 Answer List')) {
        parsingAnswers = true;
        mode = 'grammar-answers';
        continue;
    }
    
    if (parsingAnswers) {
        if (mode === 'vocab-answers' || mode === 'grammar-answers') {
            let m = l.match(/^(\d+)\.\s+\*\*([1234])\*\*/);
            if (!m) m = l.match(/^(\d+)\.\s+([1234])$/); // Handle without **
            
            if (m) {
                let qNum = parseInt(m[1]);
                let ans = parseInt(m[2]) - 1;
                if (mode === 'vocab-answers') vocabAnswers[qNum] = ans;
                else grammarAnswers[qNum] = ans;
            }
        }
        continue;
    }
    
    // Switch to grammar mode
    if (l.includes('### **文法**') || l.includes('問題1 次の文の（　　）')) {
        if (currentQ && currentQ.options.length > 0) {
            if (mode === 'vocab') vocabQs.push(currentQ);
            else grammarQs.push(currentQ);
            currentQ = null;
        }
        mode = 'grammar';
        continue;
    }
    
    // Matching options
    let optM = l.match(/^1\.\s+(.+?)[　\s]+2\.\s+(.+?)[　\s]+3\.\s+(.+?)[　\s]+4\.\s+(.+?)$/);
    if (!optM && l.match(/^1\.\s+.*2\.\s+.*3\.\s+.*4\.\s+.*/)) {
        // Fallback for options
        let parts = l.split(/[1234]\.\s+/).filter(x => x.trim() !== '');
        if (parts.length === 4) {
            optM = [l, parts[0].trim(), parts[1].trim(), parts[2].trim(), parts[3].trim()];
        }
    }
    
    let m = null;
    if (!optM) {
        let possibleQ = l.match(/^(\d+)\.\s+(.*)/);
        if (possibleQ) {
            let qNum = parseInt(possibleQ[1]);
            // Exclude single line numbers in grammar reading passages like "1." if they aren't followed by question text
            if (qNum > 4 || (currentQ === null) || (currentQ && currentQ.options.length === 4)) {
                m = possibleQ;
            }
        }
        if (!m) m = l.match(/^\*\*(\d+)\*\*/);
    }
    
    if (m && !l.includes('a.') && !l.includes('b.') && !l.includes('問題')) {
        if (currentQ && currentQ.options.length > 0) {
            if (mode === 'vocab') vocabQs.push(currentQ);
            else grammarQs.push(currentQ);
        }
        currentQ = {
            id: parseInt(m[1]),
            questionText: m[2] ? m[2] : "",
            options: [],
            correctIndex: -1
        };
        // Deal with fill in blank missing
        if (!m[2] && i + 1 < lines.length && lines[i+1].match(/^[1234]\.\s+/)) {
            currentQ.questionText = "（　　）";
        }
    } else if (currentQ) {
        if (optM) {
            currentQ.options.push(optM[1], optM[2], optM[3], optM[4]);
        } else if (l.match(/^[1234]\.\s+(.*)/)) {
            let om = l.match(/^[1234]\.\s+(.*)/);
            currentQ.options.push(om[1].trim());
        } else if (currentQ.options.length === 0 && !l.includes('問題') && !l.includes('---')) {
            currentQ.questionText += "\n" + l;
        }
    }
}
if (currentQ && currentQ.options.length > 0) {
    if (mode === 'vocab') vocabQs.push(currentQ);
    else grammarQs.push(currentQ);
}

// Convert `**word**` to `<u>word</u>` in Vocab and Grammar
for (let q of [...vocabQs, ...grammarQs]) {
    q.questionText = q.questionText.replace(/\*\*([^*]+)\*\*/g, '<u>$1</u>');
    if (q.options) {
        q.options = q.options.map(o => o.replace(/\*\*([^*]+)\*\*/g, '<u>$1</u>'));
    }
}

// Apply Answers
for (let q of vocabQs) {
    q.sectionType = "vocabulary-kanji";
    if (vocabAnswers[q.id] !== undefined) q.correctIndex = vocabAnswers[q.id];
}
for (let q of grammarQs) {
    q.sectionType = "grammar-reading";
    if (grammarAnswers[q.id] !== undefined) q.correctIndex = grammarAnswers[q.id];
}

console.log(`Parsed ${vocabQs.length} Vocab and ${grammarQs.length} Grammar questions.`);

if (vocabQs.length === 35 && grammarQs.length === 23) {
    const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
    const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
    const dbData = JSON.parse(jsonStr);

    dbData.sets[8].sections['vocabulary-kanji'].questions = vocabQs;
    dbData.sets[8].sections['grammar-reading'].questions = grammarQs;
    
    // Reassign IDs 
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
    console.log('Successfully updated Test 9 in database!');
} else {
    console.error('Failed to parse the correct number of questions! Did not update database.');
}
