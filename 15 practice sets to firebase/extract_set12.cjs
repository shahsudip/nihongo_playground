const mammoth = require('mammoth');
const fs = require('fs');

async function extractSet12() {
    const result = await mammoth.extractRawText({ path: '15 sets of question.docx' });
    const text = result.value;
    
    // Find Set 12
    const sets = text.split(/第\s*\d+\s*回\s*模擬テスト/);
    
    if (sets.length > 12) {
        fs.writeFileSync('test12_raw.txt', sets[12]);
        console.log('Set 12 extracted to test12_raw.txt');
    } else {
        console.log('Could not find Set 12. Total sets split:', sets.length);
    }
}

extractSet12().catch(console.error);
