const fs = require('fs');

const raw = fs.readFileSync('test9_raw.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l);

const vocabQs = [];
const grammarQs = [];
let mode = null; 
let currentQ = null;

const vocabAnswers = {};
const grammarAnswers = {};

for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    
    if (l.includes('TEST 9 STarts HERE') || l.includes('文字・語彙')) {
        mode = 'vocab';
        continue;
    }
    if (l.includes('Correct Answer List for 第9回')) {
        if (currentQ) vocabQs.push(currentQ);
        currentQ = null;
        mode = 'vocab-answers';
        continue;
    }
    if (l.includes('### **文法**')) {
        mode = 'grammar';
        continue;
    }
    if (l.includes('第9回 文法 Answer List')) {
        if (currentQ) grammarQs.push(currentQ);
        currentQ = null;
        mode = 'grammar-answers';
        continue;
    }
    
    if (mode === 'vocab-answers' || mode === 'grammar-answers') {
        let m = l.match(/^(\d+)\.\s+\*\*([1234])\*\*/);
        if (!m) m = l.match(/^(\d+)\.\s+([1234])$/); 
        
        if (m) {
            let qNum = parseInt(m[1]);
            let ans = parseInt(m[2]) - 1;
            if (mode === 'vocab-answers') vocabAnswers[qNum] = ans;
            else grammarAnswers[qNum] = ans;
        }
        continue;
    }
    
    if (mode === 'vocab' || mode === 'grammar') {
        // Matching options 1. xxx 2. xxx 3. xxx 4. xxx
        let optM = l.match(/^1\.\s+(.+?)[　\s]+2\.\s+(.+?)[　\s]+3\.\s+(.+?)[　\s]+4\.\s+(.+?)$/);
        
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
}
if (currentQ && currentQ.options.length > 0) {
    if (mode === 'vocab') vocabQs.push(currentQ);
    else grammarQs.push(currentQ);
}

// Ensure underline is properly handled for Vocab
function removeUnderline(text) {
    if (!text) return text;
    return text.replace(/<u>/g, '').replace(/<\/u>/g, '').replace(/\*\*/g, '');
}

for (let i = 0; i < vocabQs.length; i++) {
    let q = vocabQs[i];
    q.questionText = removeUnderline(q.questionText);
    q.options = q.options.map(o => removeUnderline(o));
    
    // Hardcode underlines for Test 9 Vocab
    if (i === 0) q.questionText = q.questionText.replace('飾って', '<u>飾って</u>');
    if (i === 1) q.questionText = q.questionText.replace('各自', '<u>各自</u>');
    if (i === 2) q.questionText = q.questionText.replace('湖', '<u>湖</u>');
    if (i === 3) q.questionText = q.questionText.replace('鳴いて', '<u>鳴いて</u>');
    if (i === 4) q.questionText = q.questionText.replace('屋上', '<u>屋上</u>');
    if (i === 5) q.questionText = q.questionText.replace('通過', '<u>通過</u>');
    if (i === 6) q.questionText = q.questionText.replace('歯', '<u>歯</u>');
    if (i === 7) q.questionText = q.questionText.replace('回転', '<u>回転</u>');
    if (i === 8) q.questionText = q.questionText.replace('きそく', '<u>きそく</u>');
    if (i === 9) q.questionText = q.questionText.replace('ゆうじょう', '<u>ゆうじょう</u>');
    if (i === 10) q.questionText = q.questionText.replace('あんだ', '<u>あんだ</u>');
    if (i === 11) q.questionText = q.questionText.replace('おもに', '<u>おもに</u>');
    if (i === 12) q.questionText = q.questionText.replace('いちしき', '<u>ちしき</u>').replace('ちしき', '<u>ちしき</u>'); 
    if (i === 13) q.questionText = q.questionText.replace('せわ', '<u>せわ</u>');
    
    if (i === 25) q.questionText = q.questionText.replace('再会', '<u>再会</u>');
    if (i === 26) q.questionText = q.questionText.replace('はらはらする', '<u>はらはらする</u>');
    if (i === 27) q.questionText = q.questionText.replace('はずして', '<u>はずして</u>');
    if (i === 28) q.questionText = q.questionText.replace('アクセス', '<u>アクセス</u>');
    if (i === 29) q.questionText = q.questionText.replace('正直', '<u>正直</u>');
}

// Ensure underline is properly handled for Grammar
for (let q of grammarQs) {
    q.questionText = removeUnderline(q.questionText);
    q.options = q.options.map(o => removeUnderline(o));
    // No underlines for grammar typically, or if there is, we can leave them out.
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
