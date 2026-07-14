const fs = require('fs');

function extractInstructions(filename, docxTextStart, docxTextEnd) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const text = fs.readFileSync('15_sets_new_extracted.txt', 'utf8');
    const lines = text.split('\n');
    
    const idx1 = lines.findIndex(l => l.includes(docxTextStart));
    const idx2 = lines.findIndex(l => l.includes(docxTextEnd));
    const sectionLines = lines.slice(idx1, idx2);

    let currentInstruction = "";
    const questionToInstructionMap = {};

    for (let l of sectionLines) {
        // If we hit a new Mondai
        if (l.match(/\*\*問題\d+\*\*/)) {
            // "問題1 ______ のことばの..."
            // Remove the bold stars
            currentInstruction = l.replace(/\*\*/g, '').trim();
        } else if (l.match(/^(\d+)\.\s+/)) {
            const m = l.match(/^(\d+)\.\s+/);
            const qNum = parseInt(m[1]);
            if (currentInstruction && !questionToInstructionMap[qNum]) {
                questionToInstructionMap[qNum] = currentInstruction;
            }
        }
    }

    // Now inject them into our JSON
    let vocabDoneCount = 0;
    
    for (let q of data.vocab) {
        if (questionToInstructionMap[q.id]) {
            q.instruction = questionToInstructionMap[q.id];
        }
    }

    // Grammar questions restart numbering. But we have a mapping from q.id (1 to 23).
    // The grammar section starts after some marker. 
    // Wait, questionToInstructionMap will be overwritten if grammar restarts at 1!
    // Let's do it section by section.
    
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

// Let's do a more robust parsing that separates Vocab and Grammar text first
function injectRobustly(filename, docxTextStart, docxTextEnd, isSet10) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const text = fs.readFileSync('15_sets_new_extracted.txt', 'utf8');
    const lines = text.split('\n');
    
    const idx1 = lines.findIndex(l => l.includes(docxTextStart));
    const idx2 = lines.findIndex(l => l.includes(docxTextEnd));
    const sectionLines = lines.slice(idx1, idx2);

    let grammarStartIdx = sectionLines.findIndex(l => l.includes('### **文法**') || l.includes('文法・読解'));
    if (grammarStartIdx === -1) {
        const vocabAnsIdx = sectionLines.findIndex(l => l.includes('Correct Answer List') && l.includes('1–35'));
        grammarStartIdx = vocabAnsIdx !== -1 ? vocabAnsIdx + 50 : 200; 
    }

    const vocabText = sectionLines.slice(0, grammarStartIdx);
    const grammarText = sectionLines.slice(grammarStartIdx);

    function mapInstructions(questions, textArray) {
        let currentInstruction = null;
        const qMap = {};
        for (let l of textArray) {
            if (l.match(/\*\*問題\d+\*\*/)) {
                // Keep the bolding but clean up maybe? Or just keep raw.
                // Let's remove the ** around 問題X and wrap it nicely.
                let clean = l.replace(/\*\*/g, '').trim();
                currentInstruction = clean;
            } else if (l.match(/^(\d+)\.\s+/)) {
                const m = l.match(/^(\d+)\.\s+/);
                const qNum = parseInt(m[1]);
                if (currentInstruction && !qMap[qNum]) {
                    qMap[qNum] = currentInstruction;
                }
            }
        }
        for (let q of questions) {
            if (qMap[q.id]) {
                q.instruction = qMap[q.id];
            }
        }
    }

    mapInstructions(data.vocab, vocabText);
    mapInstructions(data.grammar, grammarText);

    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

injectRobustly('./set9_debug.json', 'TEST 9 STarts HERE', 'TEST 9 ENDS HERE', false);
injectRobustly('./set10_debug.json', 'TEST 10 Starts  here', 'TEST 10 ENDS HERE', true);
console.log("Injected dynamic instructions successfully!");
