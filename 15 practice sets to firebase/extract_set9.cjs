const mammoth = require('mammoth');
const fs = require('fs');

async function extractSet9() {
    const result = await mammoth.extractRawText({ path: '15 sets of question.docx' });
    const text = result.value;
    
    // Find Set 9
    const sets = text.split(/第\s*\d+\s*回\s*模擬テスト/);
    
    // sets[0] is everything before 第1回
    // sets[9] should be Set 9
    
    if (sets.length > 9) {
        fs.writeFileSync('set9_raw.txt', sets[9]);
        console.log('Set 9 extracted to set9_raw.txt');
    } else {
        console.log('Could not find Set 9. Total sets split:', sets.length);
    }
}

extractSet9().catch(console.error);
