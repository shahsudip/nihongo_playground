const mammoth = require('mammoth');
const fs = require('fs');

async function extractAll() {
    const result = await mammoth.extractRawText({ path: '15 sets of question.docx' });
    fs.writeFileSync('all_raw.txt', result.value);
    console.log('Done!');
}

extractAll().catch(console.error);
