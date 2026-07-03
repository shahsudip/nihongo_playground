import { readFileSync, writeFileSync } from 'fs';
import mammoth from 'mammoth';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function parseQuestions(textChunk, startId) {
    const questions = [];
    const qBlocks = textChunk.split(/\[\d+\]/).slice(1);
    let currentId = startId;
    
    for (const block of qBlocks) {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l);
        if (lines.length < 1) continue;
        
        let questionText = lines[0];
        const options = [];
        
        let validLines = lines.filter(l => l.length < 60 && !l.match(/[a-zA-Z]{5,}/) && !l.includes('問題') && !l.includes('解答'));
        let unnumberedValidLines = lines.filter(l => l.length < 30 && !l.match(/[a-zA-Z]{5,}/) && !l.includes('問題') && !l.includes('解答'));
        let isUnnumberedReading = !unnumberedValidLines.some(l => l.match(/^[1234][\s\.]/)) && unnumberedValidLines.length >= 3 && unnumberedValidLines.length <= 5;
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].match(/^[1234][\s\.]/)) {
                options.push(lines[i].replace(/^[1234][\s\.]/, '').trim());
            } else if (isUnnumberedReading && options.length < 4 && lines[i].length < 60 && !lines[i].match(/[a-zA-Z]{5,}/) && !lines[i].includes('問題') && !lines[i].includes('解答')) {
                options.push(lines[i].trim());
            }
        }
        
        if (lines[0].match(/^[1234][\s\.]/) || isUnnumberedReading) {
            questionText = "（　　）";
        }
        
        if (options.length > 0) {
            questions.push({
                id: currentId++,
                questionText: questionText,
                options: options,
                correctIndex: -1 // Will map later
            });
        }
    }
    return questions;
}

const extractText = async () => {
    console.log("Extracting text from '15 sets of question.docx'...");
    const result = await mammoth.convertToHtml({ path: '15 sets of question.docx' });
    
    // Process HTML to find the un-bolded words between bolded words (these are the targets)
    let text = result.value;
    
    // Replace <p>, <h3> etc with newlines
    text = text.replace(/<\/?(p|h[1-6]|div|br|li|ul|ol|table|tr|td|th)[^>]*>/gi, '\n');
    
    // The target words are usually NOT bolded while the rest of the question IS bolded.
    // e.g. <strong>[1] りんごが箱の中に</strong>並んでいる<strong>。</strong>
    // We want to capture '並んでいる' and wrap it in <u>...</u>
    text = text.replace(/<\/strong>\s*([^<\n]+?)\s*<strong>/g, '<u>$1</u>');
    
    // Sometimes there's unbolded text at the end: <strong>[26] 彼は、いつも女の人には</strong>あまい
    // This is trickier, but usually questions end with 。 which is bolded. If not, we handle it:
    text = text.replace(/<\/strong>\s*([^<\n]+?)$/gm, '<u>$1</u>');
    
    // Remove all remaining tags EXCEPT <u>
    text = text.replace(/<(?!u|\/u)[^>]+>/g, '');
    
    // Decode HTML entities
    text = text.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    
    // Convert Markdown bold to underlines (for Tests 9-15)
    text = text.replace(/\*\*([^*]+)\*\*/g, '<u>$1</u>');
    
    // Convert options on a single line to multiline without periods (for Tests 9-15)
    text = text.replace(/1\.\s+(.+?)[　\s]+2\.\s+(.+?)[　\s]+3\.\s+(.+?)[　\s]+4\.\s+(.+)/g, '1 $1\n2 $2\n3 $3\n4 $4');
    
    // Convert Markdown question numbers (e.g. "1. ") to standard format ("[1] ")
    text = text.replace(/\n\s*(\d+)\.\s+/g, '\n[$1] ');
    
    // Fix multiple newlines
    text = text.replace(/\n\s*\n/g, '\n\n');
    
    return text;
};

async function run() {
    const text = await extractText();
    
    // Find answers
    const answerSectionIndex = text.lastIndexOf('Answer List');
    let answerMap = [];
    if (answerSectionIndex !== -1) {
        const answerText = text.substring(answerSectionIndex);
        const answerLines = answerText.split('\n').map(l => l.trim()).filter(l => l.match(/^\d+$/));
        answerMap = answerLines.map(Number);
    }

    console.log(`Found ${answerMap.length} answers.`);

    const sets = [];
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

    // Merge chunks by currentTestNum
    const mergedChunks = {};
    for (const chunk of chunks) {
        if (!mergedChunks[chunk.num]) {
            mergedChunks[chunk.num] = "";
        }
        mergedChunks[chunk.num] += "\n" + chunk.content;
    }

    let globalQId = 1;
    let globalAnswerIndex = 0;

    for (const setNum of Object.keys(mergedChunks)) {
        console.log(`Parsing Test ${setNum}...`);
        
        let chunkContent = mergedChunks[setNum];

        // Find answers for this specific test
        let answerMap = [];
        
        // Find all "Answer List" or "consolidated answer key" or "解答 (Answer Key)" occurrences
        const markers = ['Answer List', 'consolidated answer key', '解答 (Answer Key)'];
        let answerBlocks = [];
        
        let remainingChunk = chunkContent;
        while (true) {
            let earliestMarkerIdx = -1;
            let foundMarker = null;
            
            for (const marker of markers) {
                const idx = remainingChunk.indexOf(marker);
                if (idx !== -1 && (earliestMarkerIdx === -1 || idx < earliestMarkerIdx)) {
                    earliestMarkerIdx = idx;
                    foundMarker = marker;
                }
            }
            
            if (earliestMarkerIdx === -1) break;
            
            // Extract the block after the marker
            remainingChunk = remainingChunk.substring(earliestMarkerIdx + foundMarker.length);
            
            // The answer block is everything until the next "TEST" or "問題" or just take a good chunk
            // Actually, since we split by Test already, we can just parse the rest of the text for answers.
            // But to avoid reading into the next section if there are multiple lists, we just read lines until we stop seeing numbers.
            const lines = remainingChunk.split('\n').map(l => l.trim());
            for (const l of lines) {
                let m = l.match(/^([1234])$/);
                if (!m) m = l.match(/^\d+(?:-[ab])?\.\s*([1234])/);
                if (!m) m = l.match(/^\[\d+(?:-[ab])?\]\s*[:：]?\s*([1234])/);
                if (!m) m = l.match(/^([1234])\s*\(並び替え/);
                
                if (m) {
                    answerMap.push(parseInt(m[1]));
                }
            }
        }
        
        // Also globally check for unambiguous formats anywhere in the chunk
        // and sometimes they don't have an "Answer List" header
        if (answerMap.length === 0) {
            const lines = chunkContent.split('\n').map(l => l.trim());
            for (const l of lines) {
                let m = l.match(/^\d+(?:-[ab])?\.\s*([1234])/);
                if (!m) m = l.match(/^\[\d+(?:-[ab])?\]\s*[:：]?\s*([1234])/);
                
                if (m) {
                    answerMap.push(parseInt(m[1]));
                }
            }
        }
        
        let vocabText = chunkContent;
        let grammarText = "";
        
        const grammarIndex = chunkContent.indexOf('文法');
        if (grammarIndex !== -1) {
            vocabText = chunkContent.substring(0, grammarIndex);
            grammarText = chunkContent.substring(grammarIndex);
        }

        const vocabQs = parseQuestions(vocabText, globalQId);
        globalQId += vocabQs.length;
        
        const grammarQs = parseQuestions(grammarText, globalQId);
        globalQId += grammarQs.length;

        let manualAnswers = {};
        try {
            manualAnswers = JSON.parse(readFileSync('shin_mon_answers.json', 'utf8'));
        } catch (e) {}

        // Map answers
        let localAnswerIndex = 0;
        for (let q of vocabQs) {
            q.sectionType = 'vocabulary-kanji';
            if (manualAnswers[q.id] !== undefined) {
                q.correctIndex = manualAnswers[q.id];
                localAnswerIndex++; // advance to keep in sync if needed
            } else if (localAnswerIndex < answerMap.length) {
                q.correctIndex = answerMap[localAnswerIndex] - 1;
                localAnswerIndex++;
            }
        }
        for (let q of grammarQs) {
            q.sectionType = 'grammar-reading';
            if (manualAnswers[q.id] !== undefined) {
                q.correctIndex = manualAnswers[q.id];
                localAnswerIndex++; // advance
            } else if (localAnswerIndex < answerMap.length) {
                q.correctIndex = answerMap[localAnswerIndex] - 1;
                localAnswerIndex++;
            }
        }

        console.log(`Test ${setNum}: Found ${vocabQs.length} Vocab, ${grammarQs.length} Grammar, ${answerMap.length} Answers mapped.`);

        sets.push({
            id: `set-${setNum}`,
            title: `Set ${setNum}`,
            description: `Practice Test ${setNum}`,
            sections: {
                'vocabulary-kanji': {
                    title: 'Vocabulary & Kanji',
                    titleJa: '文字・語彙',
                    questions: vocabQs
                },
                'grammar-reading': {
                    title: 'Grammar & Reading',
                    titleJa: '文法・読解',
                    questions: grammarQs
                }
            }
        });
    }

    const practiceSetsBook = {
        id: 'jlpt-n3-practice-sets',
        title: 'JLPT N3 Practice Sets',
        description: 'Practice questions covering Kanji, Vocabulary, and Grammar.',
        level: 'N3',
        category: 'Mixed Practice',
        totalQuestions: sets.reduce((acc, set) => acc + set.sections['vocabulary-kanji'].questions.length + set.sections['grammar-reading'].questions.length, 0),
        sets: sets
    };

    console.log(`Successfully parsed ${sets.length} sets. Pushing to Firebase...`);
    const docRef = db.collection('books').doc(practiceSetsBook.id);
    await docRef.set(practiceSetsBook);
    
    // Also save locally for reference
    writeFileSync('./src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(practiceSetsBook, null, 2)};\n`);
    
    console.log("Upload complete!");
    process.exit(0);
}

run().catch(console.error);
