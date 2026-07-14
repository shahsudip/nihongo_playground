import { readFileSync, writeFileSync } from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import mammoth from 'mammoth';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function parseQuestions(textChunk, startId) {
    if (!textChunk) return [];
    const questions = [];
    
    // Split by [1] or [12-a]
    const qBlocks = textChunk.split(/\[\d+(?:-[ab])?\]/).slice(1);
    
    let currentId = startId;
    
    for (const block of qBlocks) {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l);
        if (lines.length < 1) continue;
        
        let questionText = lines[0];
        const options = [];
        
        let unnumberedValidLines = lines.filter(l => l.length < 30 && !l.match(/[a-zA-Z]{5,}/) && !l.includes('問題') && !l.includes('解答'));
        let isUnnumberedReading = !unnumberedValidLines.some(l => l.match(/^(?:<strong>)?\s*[1234][\s\.]/)) && unnumberedValidLines.length >= 3 && unnumberedValidLines.length <= 5;
        
        let fullQTextLines = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].match(/^(?:<strong>)?\s*[1234][\s\.)]/)) {
                options.push(lines[i].replace(/^(?:<strong>)?\s*[1234][\s\.)]+/, '').replace(/<\/strong>\s*$/, '').trim());
            } else if (isUnnumberedReading && options.length < 4 && lines[i].length < 60 && !lines[i].match(/[a-zA-Z]{5,}/) && !lines[i].includes('問題') && !lines[i].includes('解答')) {
                options.push(lines[i].replace(/<\/?strong>/g, '').trim());
            } else {
                fullQTextLines.push(lines[i]);
            }
        }
        
        questionText = fullQTextLines.join('\n').trim();
        
        if (questionText === "" && options.length > 0) {
            questionText = "（　　）";
        }
        
        if (questionText.includes('__________ __________ ★ __________')) {
            questionText = questionText.replace('__________ __________ ★ __________', '<strong>__________ __________ ★ __________</strong>');
        }
        
        if (options.length > 0) {
            questions.push({
                id: currentId++,
                questionText: questionText,
                options: options.slice(0, 4),
                correctIndex: -1 // To be mapped later
            });
        }
    }
    
    return questions;
}

async function run() {
    console.log("Reading word doc...");
    const { value: html } = await mammoth.convertToHtml({ path: '15 sets of question.docx' });
    
    console.log("Cleaning and formatting...");
    let text = html;
    
    text = text.replace(/<\/?(p|h[1-6]|div|br|li|ul|ol|table|tr|td|th)[^>]*>/gi, '\n');
    text = text.replace(/<(?!u|\/u|strong|\/strong)[^>]+>/g, '');
    text = text.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    
    // Convert remaining markdown bold to strong just in case
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    text = text.replace(/<u>/g, '').replace(/<\/u>/g, '');
    
    const reg = /(?:<strong>)?\s*1[.)](?:<\/strong>)?\s+(.+?)[　\s]+(?:<strong>)?\s*2[.)](?:<\/strong>)?\s+(.+?)[　\s]+(?:<strong>)?\s*3[.)](?:<\/strong>)?\s+(.+?)[　\s]+(?:<strong>)?\s*4[.)](?:<\/strong>)?\s+(.+?)(?=\n|<\/strong>)/g;
    text = text.replace(reg, '1 $1\n2 $2\n3 $3\n4 $4\n');
    
    const reg2 = /(?:<strong>)?\s*1[.)](?:<\/strong>)?\s+(.+?)[　\s]+(?:<strong>)?\s*2[.)](?:<\/strong>)?\s+(.+?)[　\s]+(?:<strong>)?\s*3[.)](?:<\/strong>)?\s+(.+?)[　\s]+(?:<strong>)?\s*4[.)](?:<\/strong>)?\s+(.+?)(?:<\/strong>)?$/gim;
    text = text.replace(reg2, '1 $1\n2 $2\n3 $3\n4 $4');
    
    text = text.replace(/\n\s*(?:<strong>)?\s*(\d+(?:-[ab])?)[.)]\s*(?:<\/strong>)?\s+/g, '\n[$1] ');
    
    // Fix standalone bold numbers for reading comprehension (e.g. "**19**")
    text = text.replace(/\n\s*<strong>\s*(\d+(?:-[ab])?)\s*<\/strong>\s*(?=\n)/g, '\n[$1] ');
    
    text = text.replace(/\n\s*\n/g, '\n\n');
    
    text = text.replace(/TEST\s*\d+\s*ENDS\s*HERE/gi, 'END OF TEST');
    text = text.replace(/^TEST\s*(\d+)$/gim, '第$1回 模擬テスト');
    text = text.replace(/第\s*(\d+)\s*回\s*(?:模擬)?テスト/g, '第$1回 模擬テスト');
    
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

    const dbData = {
        id: "jlpt-n3-practice-sets",
        title: "JLPT N3 Practice Sets",
        description: "Comprehensive N3 grammar, vocabulary, reading, and kanji practice.",
        sets: [],
        totalQuestions: 0
    };

    let globalQId = 1;

    // We want to iterate sorted sequentially: 1, 2, ..., 15
    const testNums = Object.keys(mergedChunks).map(Number).sort((a, b) => a - b);
    
    // Read existing data to preserve manually mapped answers for old tests
    let existingData = null;
    let oldAnswersMap = {};
    try {
        const fileContent = readFileSync('./src/data/practice_sets_data.js', 'utf8');
        const jsonStr = fileContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
        existingData = JSON.parse(jsonStr);
        console.log("Loaded existing practice_sets_data.js to preserve manual answers.");
        
        // Build map of ID -> correctIndex
        for (const set of existingData.sets) {
            for (const sectionName in set.sections) {
                const section = set.sections[sectionName];
                for (const q of section.questions) {
                    if (q.correctIndex !== -1) {
                        oldAnswersMap[q.id] = q.correctIndex;
                    }
                }
            }
        }
    } catch (e) {
        console.log("Could not load existing practice_sets_data.js. Starting fresh.");
    }
    
    for (const setNum of testNums) {
        console.log(`Parsing Test ${setNum}...`);
        
        let chunkContent = mergedChunks[setNum];
        let answerMap = [];
        
        if (setNum === 1) {
            const s1v = [2,4,2,1,3,3,2,2, 3,4,3,2,4,1, 3,4,2,3,4,1,4,3,4,2,3, 4,2,3,1,4, 4,1,3,2,2];
            const s1g = [3,2,2,4,3,1,2,3,2,4,1,3,4, 1,3,1,2,4, 4,2,2,3,3,3];
            answerMap = [...s1v, ...s1g];
        } else if (setNum === 6) {
            const s6v = [3,2,3,4,1,2,3,4, 3,4,1,4,4,2, 4,2,4,2,1,2,4,2,3,3,4, 3,4,3,3,4, 4,2,3,2,4];
            const s6g = [2,3,4,4,2,3,1,4,3,2,3,4,4, 1,2,4,4,1, 3,2,2,3,4];
            answerMap = [...s6v, ...s6g];
        } else if (setNum === 9) {
            const s9v = [3,3,2,3,3,2,2,3, 2,3,3,3,4,3, 4,2,4,2,2,2,4,4,3,2,2, 2,1,2,4,1, 2,4,1,1,1];
            const s9g = [4,1,3,2,3,2,1,1,4,2,1,3,1,2,1,2,2,1, 2,3,2,1,3];
            answerMap = [...s9v, ...s9g];
        } else if (setNum === 10) {
            const s10v = [4,3,4,2,1,3,3,1, 1,4,2,4,2,3, 4,4,4,3,1,2,2,2,3,3,4, 4,2,3,1,2, 4,1,3,4,2];
            const s10g = [4,3,4,2,3,2,2,2,2,3, 1,1,3,3,3,4,3,2, 2,4,4,4,2];
            answerMap = [...s10v, ...s10g];
        } else if (setNum === 15) {
            const s15v = [3,2,4,3,2,4,2,1, 4,3,3,4,2,3, 4,3,4,3,2,3,2,1,4,4,3, 4,2,3,3,1, 3,4,1,2,2];
            const s15g = [1,3,2,4,4,3,1,1,4,2,1,1,3, 3,3,4,3,2, 2,1,3,4,4];
            answerMap = [...s15v, ...s15g];
        } else {
            // Find local answer list at the bottom of the chunk
            const localAnsMatch = chunkContent.match(/\n\s*(?:Correct\s+)?(?:Answer List|Answer Key|最終解答|解答\s*\()/i);
            let answerListText = "";
            if (localAnsMatch) {
                answerListText = chunkContent.substring(localAnsMatch.index);
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
            
            let actualAnswers = [];
            if (possibleAnswers.length > 20) {
                let currentNum = 1;
                let currentBlock = [];
                for (let j = 0; j < possibleAnswers.length; j++) {
                    if (possibleAnswers[j].num === currentNum) {
                        currentBlock.push(possibleAnswers[j].ans);
                        currentNum++;
                    } else if (possibleAnswers[j].num === 1 && currentBlock.length > 0) {
                        if (currentBlock.length > actualAnswers.length) {
                            actualAnswers = currentBlock;
                        }
                        currentBlock = [possibleAnswers[j].ans];
                        currentNum = 2;
                    }
                }
                if (currentBlock.length > actualAnswers.length) {
                    actualAnswers = currentBlock;
                }
                if (actualAnswers.length > 0 && actualAnswers.length < possibleAnswers.length / 2) {
                    actualAnswers = [];
                    let seq = 1;
                    for (let j = 0; j < possibleAnswers.length; j++) {
                        if (possibleAnswers[j].num === seq) {
                            actualAnswers.push(possibleAnswers[j].ans);
                            seq++;
                        }
                    }
                }
            } else {
                let currentNum = 1;
                let currentBlock = [];
                for (let j = 0; j < possibleAnswers.length; j++) {
                    if (possibleAnswers[j].num === currentNum) {
                        currentBlock.push(possibleAnswers[j].ans);
                        currentNum++;
                    } else if (possibleAnswers[j].num === 1 && currentBlock.length > 0) {
                        if (currentBlock.length > actualAnswers.length) actualAnswers = currentBlock;
                        currentNum = 2;
                        currentBlock = [possibleAnswers[j].ans];
                    }
                }
                if (currentBlock.length > actualAnswers.length) {
                    actualAnswers = currentBlock;
                }
            }
            
            answerMap = actualAnswers;
            if (answerMap.length === 0) {
                answerMap = possibleAnswers.map(p => p.ans);
            }

            // Global fallback if STILL empty (e.g., no Answer List marker at all)
            if (answerMap.length === 0) {
                const allLines = chunkContent.split('\n').map(l => l.trim());
                let globalAnswers = [];
                for (const l of allLines) {
                    let m = l.match(/^(\d+(?:-[ab])?)[\.\)]?\s*([1234])$/);
                    if (!m) m = l.match(/^\[(\d+(?:-[ab])?)\]\s*[:：]?\s*([1234])/);
                    if (!m) m = l.match(/^(\d+)\s*\(解答/);
                    
                    // For test 10 grammar answers at bottom like "**19. 2**"
                    if (!m) m = l.match(/^(?:<strong>)?(\d+(?:-[ab])?)\.\s*([1234])(?:<\/strong>)?$/);
                    
                    if (m) {
                        globalAnswers.push({ num: parseInt(m[1]), ans: parseInt(m[2]) });
                    }
                }
                if (globalAnswers.length > 0) {
                    // Try to piece together the longest block
                    let actualAnswers = [];
                    let currentNum = 1;
                    let currentBlock = [];
                    for (let j = 0; j < globalAnswers.length; j++) {
                        if (globalAnswers[j].num === currentNum) {
                            currentBlock.push(globalAnswers[j].ans);
                            currentNum++;
                        } else if (globalAnswers[j].num === 1 && currentBlock.length > 0) {
                            if (currentBlock.length > actualAnswers.length) actualAnswers = currentBlock;
                            currentBlock = [globalAnswers[j].ans];
                            currentNum = 2;
                        }
                    }
                    if (currentBlock.length > actualAnswers.length) actualAnswers = currentBlock;
                    answerMap = actualAnswers.length > 0 ? actualAnswers : globalAnswers.map(g => g.ans);
                }
            }
        }

        let vocabText = chunkContent;
        let grammarText = "";
        
        const grammarMarkerIndex = chunkContent.search(/次の文の（\s*　*\s*）に入れるのに最もよいものを|次の文の\s*______★______/);
        
        if (grammarMarkerIndex !== -1) {
            vocabText = chunkContent.substring(0, grammarMarkerIndex);
            grammarText = chunkContent.substring(grammarMarkerIndex);
        }

        const answerListRegex = /\n\s*(?:Correct\s+)?(?:Answer List|Answer Key|最終解答|解答\s*\()/i;
        
        let vAnsIdx = vocabText.search(answerListRegex);
        if (vAnsIdx > 100) vocabText = vocabText.substring(0, vAnsIdx);
        
        let gAnsIdx = grammarText.search(answerListRegex);
        if (gAnsIdx > 100) grammarText = grammarText.substring(0, gAnsIdx);

        const vocabQs = parseQuestions(vocabText, globalQId);
        globalQId += vocabQs.length;
        
        const grammarQs = parseQuestions(grammarText, globalQId);
        globalQId += grammarQs.length;

        let localAnswerIndex = 0;
        for (let q of vocabQs) {
            if (localAnswerIndex < answerMap.length) {
                q.correctIndex = answerMap[localAnswerIndex] - 1;
                localAnswerIndex++;
            } else if (oldAnswersMap[q.id] !== undefined) {
                q.correctIndex = oldAnswersMap[q.id];
                localAnswerIndex++;
            }
        }
        
        for (let q of grammarQs) {
            if (localAnswerIndex < answerMap.length) {
                q.correctIndex = answerMap[localAnswerIndex] - 1;
                localAnswerIndex++;
            } else if (oldAnswersMap[q.id] !== undefined) {
                q.correctIndex = oldAnswersMap[q.id];
                localAnswerIndex++;
            }
        }

        console.log(`Test ${setNum}: Found ${vocabQs.length} Vocab, ${grammarQs.length} Grammar, ${localAnswerIndex} Answers mapped.`);

        dbData.sets.push({
            setId: `set-${setNum}`,
            title: `Practice Set ${setNum}`,
            sections: {
                "vocabulary-kanji": {
                    type: "vocabulary-kanji",
                    title: "Vocabulary & Kanji",
                    questions: vocabQs.map(q => ({ ...q, sectionType: "vocabulary-kanji" }))
                },
                "grammar-reading": {
                    type: "grammar-reading",
                    title: "Grammar & Reading Comprehension",
                    questions: grammarQs.map(q => ({ ...q, sectionType: "grammar-reading" }))
                }
            }
        });
        
        dbData.totalQuestions += vocabQs.length + grammarQs.length;
    }

    console.log(`Total Sets: ${dbData.sets.length}`);
    console.log(`Total Questions: ${dbData.totalQuestions}`);

    writeFileSync('./src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(dbData, null, 2)};\n`);
    
    console.log("Pushing to Firebase...");
    await db.collection('books').doc(dbData.id).set(dbData);
    
    console.log("Done!");
    process.exit(0);
}

run().catch(console.error);
