const fs = require('fs');

const text = fs.readFileSync('set1_raw.txt', 'utf8');
const lines = text.split('\n');

const vocabStartIdx = lines.findIndex(l => l.includes('**問題1**'));
const grammarStartIdx = lines.findIndex(l => l.includes('文法') && l.includes('TEST 1'));
const answerStartIdx = lines.findIndex((l, i) => i > grammarStartIdx && (l.includes('Answer List') || l.includes('Grammar - Sentence Blanks')));

const vocabText = lines.slice(vocabStartIdx, grammarStartIdx).join('\n');
const grammarText = lines.slice(grammarStartIdx, answerStartIdx).join('\n');

// 1. Parse Vocab (35 questions)
const vocabQuestions = [];
const vocabMatches = Array.from(vocabText.matchAll(/(?:^|\n)\s*(\d+)\.\s+([\s\S]*?)(?=(?:\n\s*\d+\.\s+)|\n\*\*問題|$)/g));

let currentVocabId = 1;
for (let m of vocabMatches) {
    let qNum = parseInt(m[1]);
    if (qNum !== currentVocabId) continue;
    currentVocabId++;
    
    if (qNum > 35) continue;
    let block = m[2].trim();
    let optionsMatch = block.match(/(?:^|\n)\s*1\.\s+([\s\S]*)/);
    let qText = block;
    let optionsStr = "";
    if (optionsMatch) {
        qText = block.substring(0, optionsMatch.index).trim();
        optionsStr = optionsMatch[1].trim();
    }
    let options = optionsStr.split(/(?:\s+|　)[1234]\.\s+/).filter(o => o.trim()).map(o => o.trim());
    if (options.length !== 4 && optionsStr) {
        options = optionsStr.split(/\s+/).map(o => o.trim()).filter(o => o && !o.match(/^[1234]\.$/));
    }
    // ensure exactly 4 options
    if (optionsStr) {
       let optRegex = /(?:^|\s+)[1234]\.\s+([^\s1234]+(?:[\s]+[^\s1234]+)*)/g;
       let opts = [];
       let match;
       while ((match = optRegex.exec(optionsStr)) !== null) {
           opts.push(match[1].trim());
       }
       if (opts.length === 4) options = opts;
    }
    
    vocabQuestions.push({
        id: qNum,
        questionText: qText.replace(/\*\*(.*?)\*\*/g, '<u>$1</u>'),
        options: options,
        correctIndex: 0,
        sectionType: "vocabulary-kanji"
    });
}

// 2. Parse Grammar
const grammarQuestions = [];
const passageStart = grammarText.search(/問題\s*3/);
const q1To18Text = grammarText.substring(0, passageStart !== -1 ? passageStart : grammarText.length);
const grammarMatches = Array.from(q1To18Text.matchAll(/(?:^|\n)\[(\d+)\]\s+([\s\S]*?)(?=(?:\n\[\d+\]\s+)|\n問題|$)/g));

for (let m of grammarMatches) {
    let qNum = parseInt(m[1]);
    if (qNum > 18) continue;
    let block = m[2].trim();
    let optionsMatch = block.match(/(?:^|\n)\s*1\s+([\s\S]*)/);
    let qText = block;
    let optionsStr = "";
    if (optionsMatch) {
        qText = block.substring(0, optionsMatch.index).trim();
        optionsStr = optionsMatch[1].trim();
    }
    let options = optionsStr.split(/(?:^|\n)\s*[1234]\s+/).filter(o => o.trim());
    
    grammarQuestions.push({
        id: qNum,
        questionText: qText.replace(/\*\*(.*?)\*\*/g, '<u>$1</u>'),
        options: options.map(o => o.trim()),
        correctIndex: 0,
        sectionType: "grammar-reading"
    });
}

// Passage Q19-23
const passageMatch = grammarText.match(/問題\s*3[^\n]*\n([\s\S]*?)(?=\n\[19\])/);
if (passageMatch) {
    let passageText = passageMatch[1].trim();
    let lines = passageText.split('\n');
    let instruction = lines[0].trim();
    passageText = lines.slice(1).join('\n').trim();

    const q19to23Matches = Array.from(grammarText.matchAll(/(?:^|\n)\[(\d+)\]\s*\n([\s\S]*?)(?=(?:\n\[\d+\])|(?:\n文法)|(?:\nTEST|$))/g));
    for (let m of q19to23Matches) {
        let qNum = parseInt(m[1]);
        if (qNum < 19 || qNum > 23) continue;
        let optionsStr = m[2].trim();
        let options = optionsStr.split(/(?:^|\n)\s*[1234]\s+/).filter(o => o.trim());
        grammarQuestions.push({
            id: qNum,
            questionText: `（　${qNum}　）の中に入る最もよいものを、一つえらびなさい。`,
            passageText: passageText,
            instruction: instruction,
            options: options.map(o => o.trim()),
            correctIndex: 0,
            sectionType: "grammar-reading"
        });
    }
}

// Map Instructions
let currentVocabInstruction = "";
for (let l of vocabText.split('\n')) {
    if (l.match(/\*\*問題\d+\*\*/)) {
        currentVocabInstruction = l.replace(/\*\*/g, '').trim();
    } else if (l.match(/^\s*(\d+)\.\s+/)) {
        let qNum = parseInt(l.match(/^\s*(\d+)\.\s+/)[1]);
        let q = vocabQuestions.find(q => q.id === qNum);
        if (q) q.instruction = currentVocabInstruction;
    }
}

let currentGrammarInstruction = "";
for (let l of q1To18Text.split('\n')) {
    if (l.match(/問題 \d+/)) {
        currentGrammarInstruction = l.trim();
    } else if (l.match(/^\[(\d+)\]\s+/)) {
        let qNum = parseInt(l.match(/^\[(\d+)\]\s+/)[1]);
        let q = grammarQuestions.find(q => q.id === qNum);
        if (q) q.instruction = currentGrammarInstruction;
    }
}

// Map Answers
const ansText = lines.slice(answerStartIdx).join('\n');
// Vocab has 35 answers in a row: 4 \n 1 \n 3...
const vocabAnsMatch = ansText.match(/Answer List\r?\n((?:\d\r?\n){35})/);
if (vocabAnsMatch) {
    const ansLines = vocabAnsMatch[1].split('\n').filter(l => l.trim());
    for (let i = 0; i < 35; i++) {
        let ans = parseInt(ansLines[i].trim());
        let q = vocabQuestions.find(q => q.id === i + 1);
        if (q) q.correctIndex = ans - 1;
    }
}

// Grammar has sections like "14. 1", or just lists of numbers "3\n2\n..."
const grammarAnsText = ansText.substring(ansText.indexOf('Grammar - Sentence Blanks'));
let grammarAnsCount = 1;
for (let l of grammarAnsText.split('\n')) {
    if (l.match(/^\s*\d\s*$/)) {
        let q = grammarQuestions.find(q => q.id === grammarAnsCount);
        if (q) {
            q.correctIndex = parseInt(l.trim()) - 1;
            grammarAnsCount++;
        }
    } else if (l.match(/^(\d+)(?:-[a-z])?\.\s+(\d)/)) {
        let m = l.match(/^(\d+)(?:-[a-z])?\.\s+(\d)/);
        let qNum = parseInt(m[1]);
        let ans = parseInt(m[2]);
        let q = grammarQuestions.find(q => q.id === qNum);
        if (q) {
            q.correctIndex = ans - 1;
            if (qNum >= grammarAnsCount) grammarAnsCount = qNum + 1;
        }
    }
}

// Inject Ruby dynamically for Vocab!
for (let q of vocabQuestions) {
    // Mondai 1 (Q1-8): Kanji in question, Hiragana in correct option
    if (q.id >= 1 && q.id <= 8 && q.options[q.correctIndex]) {
        let hiragana = q.options[q.correctIndex].replace(/<[^>]*>/g, '');
        // Find the kanji word in the question. It's inside <u>...</u>
        let kanjiMatch = q.questionText.match(/<u>(.*?)<\/u>/);
        if (kanjiMatch) {
            let kanji = kanjiMatch[1];
            q.questionText = q.questionText.replace(`<u>${kanji}</u>`, `<u><ruby>${kanji}<rt>${hiragana}</rt></ruby></u>`);
        }
    }
    // Mondai 2 (Q9-14): Hiragana in question, Kanji in correct option
    else if (q.id >= 9 && q.id <= 14 && q.options[q.correctIndex]) {
        let kanji = q.options[q.correctIndex].replace(/<[^>]*>/g, '');
        let hiraganaMatch = q.questionText.match(/<u>(.*?)<\/u>/);
        if (hiraganaMatch) {
            let hiragana = hiraganaMatch[1];
            q.options[q.correctIndex] = `<ruby>${kanji}<rt>${hiragana}</rt></ruby>`;
            q.questionText = q.questionText.replace(`<u>${hiragana}</u>`, `<u><ruby>${kanji}<rt>${hiragana}</rt></ruby></u>`);
        }
    }
}

fs.writeFileSync('set1_built.json', JSON.stringify({ vocab: vocabQuestions, grammar: grammarQuestions }, null, 2));
console.log("Set 1 built perfectly!");
