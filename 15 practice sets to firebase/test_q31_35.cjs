const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/practice_sets_data.js', 'utf8').replace('export const practiceSetsBook = ', '').replace(/;\s*$/, ''));

const rawFiles = {
    10: 'set11_raw.txt',
    11: 'set12_raw.txt',
    12: 'set13_raw.txt',
    13: 'set14_raw.txt',
    14: 'set15_raw.txt'
};

for (let i = 10; i < 15; i++) {
    const rawText = fs.readFileSync(rawFiles[i], 'utf8');
    const vocab = data.sets[i].sections['vocabulary-kanji'].questions;
    
    const q5Match = rawText.match(/問題5[\s\S]*?(?=\n\s*(?:---|\nTEST|### \*\*文法\*\*|\*\*文法\*\*))/);
    if (!q5Match) continue;
    
    let block = q5Match[0];
    let chunks = block.split(/\n\*\*(3[1-5])\.\s*/).slice(1);
    
    for (let j = 0; j < chunks.length; j += 2) {
        let qNum = parseInt(chunks[j]);
        let chunkText = chunks[j+1];
        
        // chunkText: `たまたま**\n1. お正月は... \n2. 彼に... \n3. 散歩を... \n4. きちんと...`
        let titleMatch = chunkText.match(/^(.*?)\*\*/);
        let qText = titleMatch ? titleMatch[1].trim() : "Unknown";
        qText = `<u>${qText}</u>`;
        
        let opt1 = chunkText.match(/1\.\s*(.*?)(?=\n\s*2\.)/s);
        let opt2 = chunkText.match(/2\.\s*(.*?)(?=\n\s*3\.)/s);
        let opt3 = chunkText.match(/3\.\s*(.*?)(?=\n\s*4\.)/s);
        let opt4 = chunkText.match(/4\.\s*(.*?)$/s);
        
        if (opt1 && opt2 && opt3 && opt4) {
            let opts = [opt1[1].trim(), opt2[1].trim(), opt3[1].trim(), opt4[1].trim()];
            let idx = qNum - 1;
            vocab[idx].questionText = qText;
            vocab[idx].options = opts;
            console.log(`Set ${i+1} Q${qNum} parsed: ${qText}`);
        } else {
            console.log(`Failed to parse options for Set ${i+1} Q${qNum}`);
        }
    }
}

fs.writeFileSync('fixed_q31_35.json', JSON.stringify(data, null, 2));
