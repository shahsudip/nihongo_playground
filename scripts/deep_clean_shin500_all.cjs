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
        '四時': 'よじ',
        'お預け': 'おあずけ',
        '乾電池': 'かんでんち',
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
    };

    const books = ['shin-nihongo-500-n1', 'shin-nihongo-500-n2', 'shin-nihongo-500-n3', 'shin-nihongo-500-n4-n5'];

    for (const bookId of books) {
        console.log(`\n========================================`);
        console.log(`Deep Cleaning & Normalizing: ${bookId}`);
        console.log(`========================================`);

        const chaptersRef = db.collection('books').doc(bookId).collection('chapters');
        const chaptersSnap = await chaptersRef.get();

        let modifiedCount = 0;

        for (const doc of chaptersSnap.docs) {
            const chapter = doc.data();
            if (!chapter.passages) continue;
            let chapterModified = false;

            chapter.passages.forEach(passage => {
                passage.questions.forEach((q, qIdx) => {
                    let originalText = q.questionText || '';
                    let newText = originalText;

                    // 1. Normalize fullwidth underscores to standard ______
                    newText = newText.replace(/＿+/g, '______');

                    // 2. Clean leading / trailing whitespace
                    newText = newText.trim();

                    // 3. Convert markdown **bold** to <u>
                    newText = newText.replace(/\*\*(.*?)\*\*/g, '<u>$1</u>');

                    // Extract correct text
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

                    const isMoji = (q.explanation && (q.explanation.includes('(MOJI)') || q.explanation.includes('MOJI') || q.explanation.includes('漢字') || q.explanation.includes('文字'))) || 
                                   (q.category && (q.category.includes('moji') || q.category.includes('kanji'))) ||
                                   (qIdx % 3 === 0 && !newText.includes('______'));

                    // Check for specific known edge cases
                    if (newText.includes('おおずけしました') && correctText === 'お預け') {
                        newText = newText.replace('おおずけしました', '<u>おあずけ</u>しました');
                    } else if (newText.includes('四時') && correctText === 'よじ') {
                        newText = newText.replace('四時', '<u>四時</u>');
                    } else if (newText.includes('かん電池') && correctText === '乾電池') {
                        newText = newText.replace('かん電池', '<u>かんでんち</u>');
                        newText = newText.replace('<u>かん電池</u>', '<u>かんでんち</u>');
                    }

                    // Kanji Writing Questions (options have Kanji, correct is Kanji)
                    if (hasKanji(correctText) || (optionsContainKanji && isMoji)) {
                        const targetReading = customReadings[correctText] || getReading(correctText);

                        if (newText.includes(`<u>${correctText}</u>`)) {
                            newText = newText.replace(`<u>${correctText}</u>`, `<u>${targetReading}</u>`);
                        } else if (newText.includes(correctText)) {
                            newText = newText.replace(correctText, `<u>${targetReading}</u>`);
                        } else if (newText.includes(`<u>${targetReading}</u>`)) {
                            // Perfect
                        } else if (newText.includes(targetReading)) {
                            newText = newText.replace(targetReading, `<u>${targetReading}</u>`);
                        }
                    } 
                    // Kanji Reading Questions (options are Hiragana, correct is Hiragana)
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

        console.log(`[${bookId}] Updated ${modifiedCount} questions in DB.`);
    }

    console.log(`\nAll Shin 500 books thoroughly normalized and updated!`);
    process.exit(0);
});
