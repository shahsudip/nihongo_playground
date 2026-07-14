import { readFileSync } from 'fs';
import mammoth from 'mammoth';

function parseQuestions(textChunk) {
    if (!textChunk) return [];
    const questions = [];
    const qBlocks = textChunk.split(/\[\d+(?:-[ab])?\]/).slice(1);
    
    for (const block of qBlocks) {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l);
        if (lines.length < 1) continue;
        
        let questionText = lines[0];
        const options = [];
        let fullQTextLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].match(/^[1234][\s\.)]/)) {
                options.push(lines[i].replace(/^[1234][\s\.)]+/, '').trim());
            } else {
                fullQTextLines.push(lines[i]);
            }
        }
        
        questionText = fullQTextLines.join('\n').trim();
        if (options.length > 0) {
            questions.push({ questionText, options });
        }
    }
    return questions;
}

async function run() {
    const { value: html } = await mammoth.convertToHtml({ path: '15 sets of question.docx' });
    let text = html;
    
    text = text.replace(/<\/?(p|h[1-6]|div|br|li|ul|ol|table|tr|td|th)[^>]*>/gi, '\n');
    text = text.replace(/<(?!u|\/u)[^>]+>/g, '');
    text = text.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/<u>/g, '').replace(/<\/u>/g, '');
    text = text.replace(/\n\s*1[.)]\s*(.+?)\n\s*2[.)]\s*(.+?)\n\s*3[.)]\s*(.+?)\n\s*4[.)]\s*(.+?)(?=\n)/g, '\n1 $1\n2 $2\n3 $3\n4 $4');
    text = text.replace(/1[.)]\s+(.+?)[　\s]+2[.)]\s+(.+?)[　\s]+3[.)]\s+(.+?)[　\s]+4[.)]\s+(.+)/g, '1 $1\n2 $2\n3 $3\n4 $4');
    text = text.replace(/\n\s*(\d+(?:-[ab])?)[.)]\s+/g, '\n[$1] ');
    text = text.replace(/\n\s*\n/g, '\n\n');
    
    const testRegex = /(?:TEST\s+(\d+)|第(\d+)回\s*模擬テスト)/gi;
    let match;
    let lastIndex = 0;
    let currentTestNum = null;
    const chunks = [];
    while ((match = testRegex.exec(text)) !== null) {
        if (currentTestNum !== null) chunks.push({ num: currentTestNum, content: text.substring(lastIndex, match.index) });
        currentTestNum = match[1] || match[2];
        lastIndex = match.index;
    }
    if (currentTestNum !== null) chunks.push({ num: currentTestNum, content: text.substring(lastIndex) });
    
    const mergedChunks = {};
    for (const c of chunks) {
        if (!mergedChunks[c.num]) mergedChunks[c.num] = '';
        mergedChunks[c.num] += '\n' + c.content;
    }
    
    const c11 = mergedChunks[11];
    let vocabText = c11;
    const grammarMarkerIndex = c11.search(/次の文の（\s*　*\s*）に入れるのに最もよいものを|次の文の\s*______★______/);
    if (grammarMarkerIndex !== -1) {
        vocabText = c11.substring(0, grammarMarkerIndex);
    }
    
    const vocabQs = parseQuestions(vocabText);
    console.log(`Test 11 Vocab Qs: ${vocabQs.length}`);
    console.log(`First Q options:`, vocabQs[0]?.options);
    console.log(`Second Q text:`, vocabQs[1]?.questionText);
    
    // Output text to see if [9] and [10] exist
    console.log(vocabText.match(/\[\d+(?:-[ab])?\]/g));
}
run();
