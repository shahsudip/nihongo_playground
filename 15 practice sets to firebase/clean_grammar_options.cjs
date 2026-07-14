const fs = require('fs');

function cleanOptions(filename) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    
    if (data.grammar) {
        for (let q of data.grammar) {
            if (q.options && q.options.length === 4) {
                let lastOpt = q.options[3];
                // Strip out anything from --- or **問題
                const cutIdx1 = lastOpt.indexOf('---');
                const cutIdx2 = lastOpt.indexOf('**問題');
                
                let minCutIdx = -1;
                if (cutIdx1 !== -1) minCutIdx = cutIdx1;
                if (cutIdx2 !== -1) {
                    if (minCutIdx === -1 || cutIdx2 < minCutIdx) {
                        minCutIdx = cutIdx2;
                    }
                }
                
                if (minCutIdx !== -1) {
                    q.options[3] = lastOpt.substring(0, minCutIdx).trim();
                }
                
                // Also remove any stray \r\n at the end just to be safe
                q.options[3] = q.options[3].replace(/[\r\n]+$/, '').trim();
            }
        }
    }
    
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

cleanOptions('./set9_debug.json');
cleanOptions('./set10_debug.json');
console.log("Options cleaned successfully!");
