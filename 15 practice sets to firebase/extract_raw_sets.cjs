const fs = require('fs');
const text = fs.readFileSync('15_sets_new_extracted.txt', 'utf8');

for (let i = 1; i <= 8; i++) {
    const startStr = `TEST ${i}`;
    let endStr = `TEST ${i} ENDS HERE`;
    
    let startIdx = text.indexOf(startStr + '\r\n');
    if (startIdx === -1) startIdx = text.indexOf(startStr + '\n');
    if (startIdx === -1) {
        console.log(`Could not find start for TEST ${i}`);
        continue;
    }
    
    let endIdx = text.indexOf(endStr, startIdx);
    if (endIdx === -1) {
        console.log(`Could not find end for TEST ${i}`);
        continue;
    }
    
    const setRaw = text.substring(startIdx, endIdx + endStr.length);
    fs.writeFileSync(`set${i}_raw.txt`, setRaw);
    console.log(`Saved set${i}_raw.txt`);
}
