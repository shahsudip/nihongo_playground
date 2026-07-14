const fs = require('fs');

function parseSet(setIndex) {
    let txt = fs.readFileSync(`set${setIndex}_raw.txt`, 'utf8');
    
    // Split into Vocab and Grammar
    let gStart = txt.indexOf('文法');
    if (gStart === -1) gStart = txt.indexOf('**文法**');
    if (gStart === -1) gStart = txt.length;
    
    let vocabTxt = txt.substring(0, gStart);
    let grammarTxt = txt.substring(gStart);
    
    function extractQ(textBlock) {
        let qs = [];
        // use matchAll to find questions reliably
        let qMatches = Array.from(textBlock.matchAll(/(?:^|\n)\s*(\d+)\.\s+([\s\S]*?)(?=(?:\n\s*\d+\.\s+)|\n\*\*|###|\nAnswer|$)/g));
        
        for (let m of qMatches) {
            let qNum = parseInt(m[1]);
            let block = m[2].trim();
            
            // The block contains the question text and the options
            // Options always start with 1. or **1. on a NEW LINE
            let optionsMatch = block.match(/\n\s*(?:\*\*)?1\.\s+([\s\S]*)/);
            let qText = block;
            let optionsStr = "";
            if (optionsMatch) {
                qText = block.substring(0, optionsMatch.index).trim();
                optionsStr = block.substring(optionsMatch.index).trim(); // this keeps '1. '
            }
            
            let currentQ = {
                id: qNum,
                questionText: qText.replace(/\*\*/g, ''),
                options: [],
                correctIndex: -1,
                optionsStr: optionsStr
            };
            
            if (optionsStr) {
                let optRaw = optionsStr.replace(/\*\*/g, '@@');
                let matches = [...optRaw.matchAll(/(?:^|\s+|　+)(?:@@)?([1234])[\.\s]\s*(?:@@)?([\s\S]*?)(?=(?:\s+|　+)(?:@@)?[1234][\.\s]|$)/g)];
                if (matches.length > 0) {
                    currentQ.options = matches.map(m => m[2].trim());
                } else {
                    currentQ.options = [optionsStr.trim()];
                }
                
                for (let j = 0; j < currentQ.options.length; j++) {
                    if (currentQ.options[j].includes('@@')) {
                        currentQ.correctIndex = j;
                        currentQ.options[j] = currentQ.options[j].replace(/@@/g, '').trim();
                    }
                }
                if (currentQ.correctIndex === -1) {
                    for(let m of matches) {
                        if (m[0].includes('@@')) {
                            currentQ.correctIndex = parseInt(m[1]) - 1;
                        }
                    }
                }
            }
            for(let j=0;j<currentQ.options.length;j++) currentQ.options[j] = currentQ.options[j].replace(/@@/g, '').trim();
            
            if (qNum === 1 && setIndex === 11) console.log(currentQ); qs.push(currentQ);
        }
        
        return qs;
    }
    
    let vocabQs = extractQ(vocabTxt).slice(0, 35);
    let grammarQs = extractQ(grammarTxt).slice(0, 23);
    
    console.log(`Set ${setIndex}: Vocab=${vocabQs.length}, Grammar=${grammarQs.length}`);
    let missingAns = 0;
    vocabQs.concat(grammarQs).forEach(q => { if(q.correctIndex === -1) missingAns++; });
    console.log(`Missing answers: ${missingAns}`);
}

for (let i = 11; i <= 15; i++) {
    parseSet(i);
}
