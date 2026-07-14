const fs = require('fs');

const raw = fs.readFileSync('test13_raw.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l);

const vocabQs = [];
const grammarQs = [];
let currentQ = null;
const vocabAnswers = {};
const grammarAnswers = {};
let section = 'vocab'; // vocab, grammar, ans_vocab, ans_grammar
let readingPassage = "";

for (let i = 0; i < lines.length; i++) {
    let l = lines[i];

    if (l.includes('文字・語彙 (1-35)')) {
        if (currentQ && currentQ.options.length > 0) {
            if (section === 'vocab') vocabQs.push(currentQ);
            else grammarQs.push(currentQ);
            currentQ = null;
        }
        section = 'ans_vocab';
        continue;
    }
    if (l.includes('文法 (1-23)')) {
        section = 'ans_grammar';
        continue;
    }
    if (l.includes('TEST 13') && l.includes('文法')) {
        continue; // handled below
    }
    if (l.includes('文法') && section === 'vocab') {
        if (currentQ && currentQ.options.length > 0) {
            vocabQs.push(currentQ);
            currentQ = null;
        }
        section = 'grammar';
        continue;
    }

    if (section === 'ans_vocab' || section === 'ans_grammar') {
        let m = l.match(/^\*?\*?(\d+)\.\s+(\d+)\*?\*?$/);
        if (m) {
            let qNum = parseInt(m[1]);
            let ans = parseInt(m[2]) - 1;
            if (section === 'ans_vocab') vocabAnswers[qNum] = ans;
            else grammarAnswers[qNum] = ans;
        }
        continue;
    }
    
    if (section === 'grammar') {
        if (l.includes('テレビを消す') || l.includes('もちろん') || l.includes('「消す」という') || l.includes('このごろ') || l.includes('田中さんは')) {
            readingPassage += l + "\n";
            continue;
        }
    }

    let cleanL = l.replace(/\*\*/g, '');
    let optM = cleanL.match(/^1\.\s+(.+?)[　\s]+2\.\s+(.+?)[　\s]+3\.\s+(.+?)[　\s]+4\.\s+(.+?)$/);
    if (!optM && cleanL.match(/^1\.\s+.*2\.\s+.*3\.\s+.*4\.\s+.*/)) {
        let parts = cleanL.split(/[1234]\.\s+/).filter(x => x.trim() !== '');
        if (parts.length === 4) optM = [cleanL, parts[0].trim(), parts[1].trim(), parts[2].trim(), parts[3].trim()];
    }

    let m = null;
    let possibleQ = cleanL.match(/^\*?\*?(\d+)(?:\.|\*?\*?)\s*(.*)/);
    if (possibleQ) {
        let qNum = parseInt(possibleQ[1]);
        if (qNum > 4 || (currentQ === null) || (currentQ && currentQ.options.length === 4)) {
            m = possibleQ;
        }
    }

    if (m && !cleanL.startsWith('問題')) {
        if (currentQ && currentQ.options.length > 0) {
            if (section === 'vocab') vocabQs.push(currentQ);
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
        if (section === 'grammar' && currentQ.id === 19 && readingPassage) {
            currentQ.questionText = readingPassage.trim() + "\n\n" + currentQ.questionText;
            readingPassage = ""; 
        }
    } else if (currentQ) {
        if (optM) {
            currentQ.options.push(optM[1], optM[2], optM[3], optM[4]);
        } else if (cleanL.match(/^[1234]\.\s+(.*)/)) {
            let om = cleanL.match(/^[1234]\.\s+(.*)/);
            currentQ.options.push(om[1].trim());
        } else if (currentQ.options.length === 0 && !cleanL.startsWith('問題') && !cleanL.includes('---')) {
            currentQ.questionText += "\n" + cleanL;
        }
    }
}
if (currentQ && currentQ.options.length > 0) {
    if (section === 'vocab') vocabQs.push(currentQ);
    else grammarQs.push(currentQ);
}

for (let q of vocabQs) {
    // Recover ** from original file, convert to <u>
    let origLine = lines.find(l => l.startsWith(q.id + '. '));
    if (!origLine) origLine = lines.find(l => l.startsWith('**' + q.id + '.'));
    if (origLine && origLine.includes('**')) {
        let parts = origLine.split('**');
        if (parts.length >= 3) {
            let target = parts[1];
            q.questionText = q.questionText.replace(target, `<u>${target}</u>`);
        }
    }
    
    // Meanings fixes 26-30
    if (q.id === 26 && !q.questionText.includes('<u>')) q.questionText = q.questionText.replace('くやしい', '<u>くやしい</u>');
    if (q.id === 27 && !q.questionText.includes('<u>')) q.questionText = q.questionText.replace('ばらばら', '<u>ばらばら</u>');
    if (q.id === 28 && !q.questionText.includes('<u>')) q.questionText = q.questionText.replace('ぴったり', '<u>ぴったり</u>');
    if (q.id === 29 && !q.questionText.includes('<u>')) q.questionText = q.questionText.replace('述べて', '<u>述べて</u>');
    if (q.id === 30) q.questionText = q.questionText.replace('わずかな', '<u>わずかな</u>');
    
    q.sectionType = "vocabulary-kanji";
    if (vocabAnswers[q.id] !== undefined) q.correctIndex = vocabAnswers[q.id];
}

for (let q of grammarQs) {
    q.sectionType = "grammar-reading";
    if (grammarAnswers[q.id] !== undefined) q.correctIndex = grammarAnswers[q.id];
}

console.log(`Parsed ${vocabQs.length} Vocab questions and ${grammarQs.length} Grammar questions.`);

if (vocabQs.length === 35 && grammarQs.length === 23) {
    const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
    const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
    const dbData = JSON.parse(jsonStr);

    dbData.sets[12].sections['vocabulary-kanji'].questions = vocabQs;
    dbData.sets[12].sections['grammar-reading'].questions = grammarQs;
    
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
    console.log('Successfully updated Test 13 in database!');
} else {
    console.error('Failed to parse! Vocab: ' + vocabQs.length + '/35, Grammar: ' + grammarQs.length + '/23');
}
