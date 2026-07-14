import mammoth from 'mammoth';
async function run() {
    const html = (await mammoth.convertToHtml({ path: '15 sets of question.docx' })).value;
    let text = html.replace(/<[^>]+>/g, '\n');
    text = text.replace(/TEST\s*\d+\s*ENDS\s*HERE/gi, 'END OF TEST');
    text = text.replace(/^TEST\s*(\d+)$/gim, '第$1回 模擬テスト');
    text = text.replace(/第\s*(\d+)\s*回\s*(?:模擬)?テスト/g, '第$1回 模擬テスト');
    const chunks = text.split(/第\s*\d+\s*回\s*模擬テスト/);
    console.log(`Found ${chunks.length} chunks`);
    for (let i = 1; i < chunks.length; i++) {
        console.log(`Chunk ${i} starts with:`, chunks[i].substring(0, 50).replace(/\n/g, ' '));
    }
}
run();
