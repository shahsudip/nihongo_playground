const fs = require('fs');

function fixGrammarInstructions(filename, startMarker, endMarker) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const text = fs.readFileSync('15_sets_new_extracted.txt', 'utf8');

    const idx1 = text.indexOf(startMarker);
    const idx2 = text.indexOf(endMarker, idx1);
    const setLines = text.substring(idx1, idx2).split('\n');

    const grammarStartIdx = setLines.findIndex(l => l.includes('### **文法**') || l.includes('文法・読解'));
    const grammarEndIdx = setLines.findIndex((l, i) => i > grammarStartIdx && (l.includes('Answer List') || l.includes('correct answers')));
    const grammarText = setLines.slice(grammarStartIdx, grammarEndIdx === -1 ? setLines.length : grammarEndIdx).join('\n');

    const passageStartIdx = grammarText.indexOf('**問題3**');
    const q1To18Text = passageStartIdx !== -1 ? grammarText.substring(0, passageStartIdx) : grammarText;

    let currentInstruction = "";
    for (let l of q1To18Text.split('\n')) {
        if (l.match(/\*\*問題\d+\*\*/)) {
            currentInstruction = l.replace(/\*\*/g, '').trim();
        } else if (l.match(/^(\d+)\.\s+/)) {
            const m = l.match(/^(\d+)\.\s+/);
            const qNum = parseInt(m[1]);
            let q = data.grammar.find(q => q.id === qNum);
            if (q && q.id <= 18) {
                q.instruction = currentInstruction;
            }
        }
    }

    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

fixGrammarInstructions('./set9_debug.json', 'TEST 9 STarts HERE', 'TEST 9 ENDS HERE');
fixGrammarInstructions('./set10_debug.json', 'TEST 10 Starts  here', 'TEST 10 ENDS HERE');
console.log("Grammar instructions for Q1-18 safely restored!");
