import { readFileSync } from 'fs';
import mammoth from 'mammoth';

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
        if (currentTestNum !== null) {
            chunks.push({ num: currentTestNum, content: text.substring(lastIndex, match.index) });
        }
        currentTestNum = match[1] || match[2];
        lastIndex = match.index;
    }
    if (currentTestNum !== null) {
        chunks.push({ num: currentTestNum, content: text.substring(lastIndex) });
    }

    const mergedChunks = {};
    for (const chunk of chunks) {
        if (!mergedChunks[chunk.num]) mergedChunks[chunk.num] = "";
        mergedChunks[chunk.num] += "\n" + chunk.content;
    }

    const chunkContent = mergedChunks[10];
    const localAnsMatch = chunkContent.match(/\n\s*(?:Correct\s+)?(?:Answer List|Answer Key|最終解答|解答\s*\()/i);
    let answerListText = "";
    if (localAnsMatch) {
        answerListText = chunkContent.substring(localAnsMatch.index);
        console.log("Found Answer List!");
    } else {
        console.log("No Answer List found for Test 10!");
    }
    
    const lines = answerListText.split('\n').map(l => l.trim());
    let possibleAnswers = [];
    for (const l of lines) {
        let m = l.match(/^(\d+(?:-[ab])?)[\.\)]?\s*([1234])$/);
        if (!m) m = l.match(/^\[(\d+(?:-[ab])?)\]\s*[:：]?\s*([1234])/);
        if (!m) m = l.match(/^(\d+)\s*\(解答/);
        
        if (m) {
            possibleAnswers.push({ num: parseInt(m[1]), ans: parseInt(m[2]) });
        }
    }
    console.log(`possibleAnswers length: ${possibleAnswers.length}`);
}

run().catch(console.error);
