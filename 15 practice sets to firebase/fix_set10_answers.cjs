const fs = require('fs');

// Read the perfectly parsed Set 10 data from our local extraction
const set10Parsed = JSON.parse(fs.readFileSync('./set10_debug.json', 'utf8'));

const text = fs.readFileSync('15_sets_new_extracted.txt', 'utf8');
const lines = text.split('\n');
const idx1 = lines.findIndex(l => l.includes('TEST 10 Starts  here'));
const idx2 = lines.findIndex(l => l.includes('TEST 10 ENDS HERE'));
const set10Lines = lines.slice(idx1, idx2);

function mapAnswers(questions, answerText) {
    const lines = answerText.split('\n');
    for (let l of lines) {
        // Matches "1. **3**" or "1. 3" or "**19. 2**"
        const m = l.match(/^\*?\*?(\d+)\.\s+\*?\*?(\d)\*?\*?/);
        if (m) {
            let qId = parseInt(m[1]);
            let ans = parseInt(m[2]);
            let q = questions.find(q => q.id === qId);
            if (q) {
                q.correctIndex = ans - 1; // 0-indexed
            }
        }
    }
}

const vocabAnsStart = set10Lines.findIndex(l => l.includes('Here are the **correct answers**:'));
if (vocabAnsStart !== -1) {
    mapAnswers(set10Parsed.vocab, set10Lines.slice(vocabAnsStart, vocabAnsStart+100).join('\n'));
}

// Grammar answers are at the end, before "TEST 10 ENDS HERE"
mapAnswers(set10Parsed.grammar, set10Lines.slice(set10Lines.length-40).join('\n'));

fs.writeFileSync('set10_debug.json', JSON.stringify(set10Parsed, null, 2));
console.log("Re-mapped Set 10 answer keys successfully!");
