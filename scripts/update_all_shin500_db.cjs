const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const kuromoji = require('kuromoji');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function kata2hira(s) {
    if (!s) return '';
    return s.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

function hasKanji(str) {
    return /[\u4e00-\u9faf\u3400-\u4dbf]/.test(str);
}

kuromoji.builder({ dicPath: 'node_modules/kuromoji/dict' }).build(async (err, tokenizer) => {
    if (err) {
        console.error(err);
        return;
    }

    function getReading(text) {
        const tokens = tokenizer.tokenize(text);
        return tokens.map(t => t.reading ? kata2hira(t.reading) : t.surface_form).join('');
    }

    const customReadings = {
        '申します': 'もうします',
        'お菓子': 'おかし',
        '参ります': 'まいります',
        '要りません': 'いりません',
        '雑誌': 'ざっし',
        '遅れました': 'おくれました',
        '妻': 'つま',
        '飛行機': 'ひこうき',
        '渡って': 'わたって',
        '泊まり': 'とまり',
        '優しい': 'やさしい',
        '個': 'こ',
        '静か': 'しずか',
        '子供': 'こども',
        '自由': 'じゆう',
        '信じられない': 'しんじられない',
        '曲': 'きょく',
        '割って': 'わって',
        '飛んで': 'とんで',
        '泊まる': 'とまる',
        '呼びます': 'よびます',
        '連れて': 'つれて',
        '苦い': 'にがい',
        '貝': 'かい',
        '製品': 'せいひん',
        '涼しい': 'すずしい',
        '原因': 'げんいん',
        '実現': 'じつげん',
        '首相': 'しゅしょう',
        '折り曲げない': 'おりまげない',
        '指示': 'しじ',
        '失敗': 'しっぱい',
        '残業': 'ざんぎょう',
        '拾って': 'ひろって',
        '冷たい': 'つめたい',
        '晴れている': 'はれている',
        '禁止': 'きんし',
        '論文': 'ろんぶん',
        '保存': 'ほぞん',
        '守りましょう': 'まもりましょう',
        '表': 'おもて',
        '王子': 'おうじ',
        '期限': 'きげん',
        '求人広告': 'きゅうじんこうこく',
        '医師': 'いし',
        '未満': 'みまん',
        '体重': 'たいじゅう',
        '必ず': 'かならず',
        '情報': 'じょうほう',
        '植物': 'しょくぶつ',
        '係員': 'かかりいん',
        '投手': 'とうしゅ',
        '記事': 'きじ',
        '毛糸': 'けいと',
        '畑': 'はたけ',
        '非常': 'ひじょう',
        '勝った': 'かった',
        '食器': 'しょっき',
        '報告': 'ほうこく',
        '押して': 'おして',
        '技術': 'ぎじゅつ',
        '塩': 'しお',
        '防ぐ': 'ふせぐ',
        '冷凍': 'れいとう',
        '値段': 'ねだん',
        '完了': 'かんりょう',
        '笑って': 'わらって',
        '厚さ': 'あつさ',
        '人形': 'にんぎょう',
        '土産': 'みやげ',
        '店員': 'てんいん',
        '断水': 'だんすい',
        '植木': 'うえき',
        '宿題': 'しゅくだい',
        '全部': 'ぜんぶ',
        '資料': 'しりょう',
        '席': 'せき',
    };

    function getWordReading(kanji) {
        if (customReadings[kanji]) return customReadings[kanji];
        return getReading(kanji);
    }

    const books = ['shin-nihongo-500-n3', 'shin-nihongo-500-n2', 'shin-nihongo-500-n1', 'shin-nihongo-500-n4-n5'];

    for (const bookId of books) {
        console.log(`\n========================================`);
        console.log(`Processing Book: ${bookId}`);
        console.log(`========================================`);

        const chaptersRef = db.collection('books').doc(bookId).collection('chapters');
        const chaptersSnap = await chaptersRef.get();

        if (chaptersSnap.empty) {
            console.log(`No subcollection chapters for ${bookId}, checking main document...`);
            continue;
        }

        let totalQuestions = 0;
        let modifiedCount = 0;

        for (const doc of chaptersSnap.docs) {
            const chapter = doc.data();
            if (!chapter.passages) continue;
            let chapterModified = false;

            chapter.passages.forEach(passage => {
                passage.questions.forEach((q, qIdx) => {
                    totalQuestions++;
                    let originalText = q.questionText || '';
                    let newText = originalText;

                    // 1. Convert markdown **bold** to <u>
                    newText = newText.replace(/\*\*(.*?)\*\*/g, '<u>$1</u>');

                    // Get correct text
                    let correctText = '';
                    if (q.correctOption && typeof q.correctOption === 'object') {
                        correctText = q.correctOption.text || '';
                    } else if (typeof q.correctOption === 'string') {
                        correctText = q.correctOption;
                    } else if (typeof q.correctOption === 'number' && q.options && q.options[q.correctOption]) {
                        const opt = q.options[q.correctOption];
                        correctText = typeof opt === 'object' ? opt.text : opt;
                    }

                    const optionsContainKanji = (q.options || []).some(opt => {
                        const t = typeof opt === 'object' ? opt.text : opt;
                        return hasKanji(t || '');
                    });

                    const isMoji = (q.explanation && q.explanation.includes('(MOJI)')) || 
                                   (q.category && (q.category.includes('moji') || q.category.includes('kanji'))) ||
                                   (qIdx % 3 === 0 && !newText.includes('______'));

                    // Scenario A: Tested word is Kanji (Kanji writing test)
                    if (hasKanji(correctText) || (optionsContainKanji && isMoji)) {
                        const targetReading = getWordReading(correctText);
                        
                        if (newText.includes(`<u>${correctText}</u>`)) {
                            newText = newText.replace(`<u>${correctText}</u>`, `<u>${targetReading}</u>`);
                        } else if (newText.includes(correctText)) {
                            newText = newText.replace(correctText, `<u>${targetReading}</u>`);
                        } else if (newText.includes(`<u>${targetReading}</u>`)) {
                            // Already proper
                        } else if (newText.includes(targetReading)) {
                            newText = newText.replace(targetReading, `<u>${targetReading}</u>`);
                        } else {
                            // Sliding token match
                            const tokens = tokenizer.tokenize(newText.replace(/<[^>]+>/g, ''));
                            let found = null;
                            for (let i = 0; i < tokens.length; i++) {
                                let curr = "";
                                for (let j = i; j < tokens.length; j++) {
                                    curr += tokens[j].surface_form;
                                    if (curr === correctText) {
                                        found = curr;
                                        break;
                                    }
                                }
                                if (found) break;
                            }
                            if (found) {
                                newText = newText.replace(found, `<u>${targetReading}</u>`);
                            }
                        }
                    } 
                    // Scenario B: Tested word is Hiragana reading (Kanji reading test)
                    else if (isMoji && !newText.includes('<u>') && !newText.includes('______') && correctText) {
                        const tokens = tokenizer.tokenize(newText.replace(/<[^>]+>/g, ''));
                        let foundWord = null;

                        for (let i = 0; i < tokens.length; i++) {
                            let currentWord = "";
                            let currentReading = "";
                            for (let j = i; j < tokens.length; j++) {
                                currentWord += tokens[j].surface_form;
                                currentReading += (tokens[j].reading ? kata2hira(tokens[j].reading) : tokens[j].surface_form);

                                if (currentReading === correctText || currentWord === correctText) {
                                    foundWord = currentWord;
                                    break;
                                }
                            }
                            if (foundWord) break;
                        }

                        // Fallback check
                        if (!foundWord) {
                            if (newText.includes('表') && correctText === 'おもて') foundWord = '表';
                            else if (newText.includes('角') && correctText === 'かど') foundWord = '角';
                        }

                        if (foundWord) {
                            newText = newText.replace(foundWord, `<u>${foundWord}</u>`);
                        }
                    }

                    if (newText !== originalText) {
                        q.questionText = newText;
                        chapterModified = true;
                        modifiedCount++;
                    }
                });
            });

            if (chapterModified) {
                await chaptersRef.doc(doc.id).set(chapter);
            }
        }

        console.log(`[${bookId}] Total Questions: ${totalQuestions} | Modified in DB: ${modifiedCount}`);
    }

    console.log(`\nAll Shin 500 books successfully updated in Firestore!`);
    process.exit(0);
});
