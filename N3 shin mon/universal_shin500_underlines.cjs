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

    console.log(`\n=== Running Universal Underlines for shin-nihongo-500-n3 ===`);
    const chaptersRef = db.collection('books').doc('shin-nihongo-500-n3').collection('chapters');
    const chaptersSnap = await chaptersRef.get();
    
    let fixedCount = 0;
    
    for (const doc of chaptersSnap.docs) {
        const chapter = doc.data();
        if (!chapter.passages) continue;
        let chapterModified = false;
        
        chapter.passages.forEach(passage => {
            passage.questions.forEach((q, qIdx) => {
                // If the question does NOT have a blank, AND it is NOT already underlined
                if (!q.questionText.includes('______') && !q.questionText.includes('<u>')) {
                    
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
                    
                    // 3. Manual overrides for tricky N3 tokenizations
                    if (!foundWord) {
                        if (q.questionText.includes('求人広告') && targetText === 'きゅうじんこうこく') foundWord = '求人広告';
                        else if (q.questionText.includes('医師') && targetText === 'いし') foundWord = '医師';
                        else if (q.questionText.includes('未満') && targetText === 'みまん') foundWord = '未満';
                        else if (q.questionText.includes('体重') && targetText === 'たいじゅう') foundWord = '体重';
                        else if (q.questionText.includes('必ず') && targetText === 'かならず') foundWord = '必ず';
                        else if (q.questionText.includes('情報') && targetText === 'じょうほう') foundWord = '情報';
                        else if (q.questionText.includes('植物') && targetText === 'しょくぶつ') foundWord = '植物';
                        else if (q.questionText.includes('係員') && targetText === 'かかりいん') foundWord = '係員';
                        else if (q.questionText.includes('投手') && targetText === 'とうしゅ') foundWord = '投手';
                        else if (q.questionText.includes('記事') && targetText === 'きじ') foundWord = '記事';
                        else if (q.questionText.includes('毛糸') && targetText === 'けいと') foundWord = '毛糸';
                        else if (q.questionText.includes('畑') && targetText === 'はたけ') foundWord = '畑';
                        else if (q.questionText.includes('非常') && targetText === 'ひじょう') foundWord = '非常';
                        else if (q.questionText.includes('勝った') && targetText === 'かった') foundWord = '勝った';
                        else if (q.questionText.includes('食器') && targetText === 'しょっき') foundWord = '食器';
                        else if (q.questionText.includes('報告') && targetText === 'ほうこく') foundWord = '報告';
                        else if (q.questionText.includes('押して') && targetText === 'おして') foundWord = '押して';
                        else if (q.questionText.includes('技術') && targetText === 'ぎじゅつ') foundWord = '技術';
                        else if (q.questionText.includes('塩') && targetText === 'しお') foundWord = '塩';
                        else if (q.questionText.includes('防ぐ') && targetText === 'ふせぐ') foundWord = '防ぐ';
                        else if (q.questionText.includes('冷凍') && targetText === 'れいとう') foundWord = '冷凍';
                        else if (q.questionText.includes('値段') && targetText === 'ねだん') foundWord = '値段';
                        else if (q.questionText.includes('完了') && targetText === 'かんりょう') foundWord = '完了';
                        else if (q.questionText.includes('笑って') && targetText === 'わらって') foundWord = '笑って';
                        else if (q.questionText.includes('厚さ') && targetText === 'あつさ') foundWord = '厚さ';
                        else if (q.questionText.includes('人形') && targetText === 'にんぎょう') foundWord = '人形';
                        else if (q.questionText.includes('土産') && targetText === 'みやげ') foundWord = '土産';
                        else if (q.questionText.includes('店員') && targetText === 'てんいん') foundWord = '店員';
                        else if (q.questionText.includes('断水') && targetText === 'だんすい') foundWord = '断水';
                        else if (q.questionText.includes('植木') && targetText === 'うえき') foundWord = '植木';
                        else if (q.questionText.includes('宿題') && targetText === 'しゅくだい') foundWord = '宿題';
                        else if (q.questionText.includes('全部') && targetText === 'ぜんぶ') foundWord = '全部';
                        else if (q.questionText.includes('資料') && targetText === 'しりょう') foundWord = '資料';
                        else if (q.questionText.includes('席') && targetText === 'せき') foundWord = '席';
                        // Handle Hiragana text -> Kanji options
                        else if (targetText === '直す' && q.questionText.includes('なおす')) foundWord = 'なおす';
                        else if (targetText === '増えた' && q.questionText.includes('ふえた')) foundWord = 'ふえた';
                        else if (targetText === '負けて' && q.questionText.includes('まけて')) foundWord = 'まけて';
                        else if (targetText === '種' && q.questionText.includes('たね')) foundWord = 'たね';
                        else if (targetText === '戦った' && q.questionText.includes('たたかった')) foundWord = 'たたかった';
                        else if (targetText === '流して' && q.questionText.includes('ながして')) foundWord = 'ながして';
                        else if (targetText === '塩' && q.questionText.includes('しお')) foundWord = 'しお';
                        else if (targetText === '商品' && q.questionText.includes('しょうひん')) foundWord = 'しょうひん';
                        else if (targetText === '鳴く' && q.questionText.includes('なく')) foundWord = 'なく';
                        else if (targetText === '香水' && q.questionText.includes('こうすい')) foundWord = 'こうすい';
                        else if (targetText === '戦争' && q.questionText.includes('せんそう')) foundWord = 'せんそう';
                        else if (targetText === '未来' && q.questionText.includes('みらい')) foundWord = 'みらい';
                        else if (targetText === '済んだら' && q.questionText.includes('すんだら')) foundWord = 'すんだら';
                        else if (targetText === '種類' && q.questionText.includes('しゅるい')) foundWord = 'しゅるい';
                        else if (targetText === '移る' && q.questionText.includes('うつる')) foundWord = 'うつる';
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
    
    console.log(`Total missing questions fixed: ${fixedCount}`);
    console.log("Done updating Firebase.");
    process.exit(0);
});
