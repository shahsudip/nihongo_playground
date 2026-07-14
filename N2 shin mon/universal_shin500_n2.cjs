const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const kuromoji = require('kuromoji');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function kata2hira(s) {
    return s.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

kuromoji.builder({ dicPath: 'node_modules/kuromoji/dict' }).build(async (err, tokenizer) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(`\n=== Running Universal Underlines for shin-nihongo-500-n2 ===`);
    const chaptersRef = db.collection('books').doc('shin-nihongo-500-n2').collection('chapters');
    const chaptersSnap = await chaptersRef.get();
    
    let fixedCount = 0;
    
    for (const doc of chaptersSnap.docs) {
        const chapter = doc.data();
        if (!chapter.passages) continue;
        let chapterModified = false;
        
        chapter.passages.forEach(passage => {
            passage.questions.forEach((q, qIdx) => {
                // If the question does NOT have a blank (full width or half width), AND it is NOT already underlined
                if (!q.questionText.includes('_') && !q.questionText.includes('＿') && !q.questionText.includes('<u>')) {
                    
                    const targetText = q.correctOption.text;
                    const tokens = tokenizer.tokenize(q.questionText);
                    
                    const targetTokens = tokenizer.tokenize(targetText);
                    const targetReading = targetTokens.map(t => t.reading ? kata2hira(t.reading) : t.surface_form).join('');
                    
                    let foundWord = null;
                    
                    // 1. Sliding window Kuromoji logic
                    for (let i = 0; i < tokens.length; i++) {
                        let currentWord = "";
                        let currentReading = "";
                        for (let j = i; j < tokens.length; j++) {
                            currentWord += tokens[j].surface_form;
                            currentReading += (tokens[j].reading ? kata2hira(tokens[j].reading) : tokens[j].surface_form);
                            
                            if (currentWord === targetText || currentReading === targetText || currentWord === targetReading || currentReading === targetReading) {
                                foundWord = currentWord;
                                break;
                            }
                        }
                        if (foundWord) break;
                    }
                    
                    // 2. Simple string match fallback
                    if (!foundWord) {
                        if (q.questionText.includes(targetText)) {
                            foundWord = targetText;
                        } else if (q.questionText.includes(targetReading)) {
                            foundWord = targetReading;
                        }
                    }
                    
                    // 3. Manual overrides for tricky N2 tokenizations
                    if (!foundWord) {
                        // Handle Hiragana text -> Kanji options
                        if (targetText === '候補者' && q.questionText.includes('候補者')) foundWord = '候補者';
                        else if (targetText === '復習' && q.questionText.includes('復習')) foundWord = '復習';
                        else if (targetText === '湾' && q.questionText.includes('わん')) foundWord = 'わん';
                        else if (targetText === '国境' && q.questionText.includes('こっきょう')) foundWord = 'こっきょう';
                        else if (targetText === '略して' && q.questionText.includes('りゃくして')) foundWord = 'りゃくして';
                        else if (targetText === '講義' && q.questionText.includes('こうぎ')) foundWord = 'こうぎ';
                        else if (targetText === '看板' && q.questionText.includes('かんばん')) foundWord = 'かんばん';
                        else if (targetText === '平等' && q.questionText.includes('平等')) foundWord = '平等';
                        else if (targetText === '確率' && q.questionText.includes('かくりつ')) foundWord = 'かくりつ';
                        else if (targetText === '尊敬' && q.questionText.includes('尊敬')) foundWord = '尊敬';
                        else if (targetText === '一位' && q.questionText.includes('いちい')) foundWord = 'いちい';
                        else if (targetText === '衣装' && q.questionText.includes('いしょう')) foundWord = 'いしょう';
                        else if (targetText === '湿度' && q.questionText.includes('しつど')) foundWord = 'しつど';
                        else if (targetText === '管' && q.questionText.includes('管')) foundWord = '管';
                        else if (targetText === '平均' && q.questionText.includes('へいきん')) foundWord = 'へいきん';
                        else if (targetText === '宇宙飛行士' && q.questionText.includes('宇宙飛行士')) foundWord = '宇宙飛行士';
                        else if (targetText === '副詞' && q.questionText.includes('ふくし')) foundWord = 'ふくし';
                        else if (targetText === '気象庁' && q.questionText.includes('きしょう庁')) foundWord = 'きしょう庁';
                        else if (targetText === '清書' && q.questionText.includes('せいしょ')) foundWord = 'せいしょ';
                        else if (targetText === '操作' && q.questionText.includes('そうさ')) foundWord = 'そうさ';
                        else if (targetText === '天才' && q.questionText.includes('てんさい')) foundWord = 'てんさい';
                        else if (targetText === '地域' && q.questionText.includes('ちいき')) foundWord = 'ちいき';
                    }
                    
                    if (foundWord) {
                        q.questionText = q.questionText.replace(foundWord, `<u>${foundWord}</u>`);
                        chapterModified = true;
                        fixedCount++;
                        console.log(`[${chapter.title} Q${qIdx+1}] Fixed: ${foundWord} -> ${targetText}`);
                    } else {
                        console.log(`[${chapter.title} Q${qIdx+1}] STILL FAILED: ${targetText} | ${targetReading} | Text: ${q.questionText}`);
                    }
                }
            });
        });
        
        if (chapterModified) {
            await chaptersRef.doc(doc.id).set(chapter);
        }
    }
    
    console.log(`Total missing N2 questions fixed: ${fixedCount}`);
    console.log("Done updating Firebase.");
    process.exit(0);
});
