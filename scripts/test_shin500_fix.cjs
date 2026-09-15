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

function isAllHiragana(str) {
    return /^[\u3040-\u309f\s]+$/.test(str);
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

    // Special dictionary overrides for irregular or JLPT-specific readings
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
    };

    function getWordReading(kanji) {
        if (customReadings[kanji]) return customReadings[kanji];
        return getReading(kanji);
    }

    console.log(`\n=== Testing Question Fixing on shin-nihongo-500-n3 ===`);
    const chaptersRef = db.collection('books').doc('shin-nihongo-500-n3').collection('chapters');
    const chaptersSnap = await chaptersRef.get();

    let totalQuestions = 0;
    let fixedQuestions = 0;
    let failedQuestions = [];

    for (const doc of chaptersSnap.docs) {
        const chapter = doc.data();
        if (!chapter.passages) continue;

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
                // Options are Kanji, e.g. ["由します", "曲します", "申します", "直します"]
                // Correct is Kanji, e.g. "申します"
                if (hasKanji(correctText) || optionsContainKanji) {
                    const targetReading = getWordReading(correctText);
                    
                    // If question text contains the Kanji correctText (or <u>Kanji</u>), replace with <u>Hiragana</u>
                    if (newText.includes(`<u>${correctText}</u>`)) {
                        newText = newText.replace(`<u>${correctText}</u>`, `<u>${targetReading}</u>`);
                    } else if (newText.includes(correctText)) {
                        newText = newText.replace(correctText, `<u>${targetReading}</u>`);
                    } else if (newText.includes(`<u>${targetReading}</u>`)) {
                        // Already proper
                    } else if (newText.includes(targetReading)) {
                        newText = newText.replace(targetReading, `<u>${targetReading}</u>`);
                    } else {
                        // Let's check tokenized surface forms
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
                // Options are Hiragana readings, e.g. ["ゆうびんきょく", "ゆびんきょく", ...]
                // Correct is Hiragana "ゆうびんきょく"
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
                    } else {
                        // Fallback search
                        failedQuestions.push({
                            chap: chapter.title,
                            qNum: qIdx + 1,
                            text: newText,
                            correct: correctText
                        });
                    }
                }

                if (newText !== originalText) {
                    fixedQuestions++;
                    if (chapter.id === 'w1-d1') {
                        console.log(`[${chapter.id} Q${qIdx+1}]`);
                        console.log(`   Old: ${originalText}`);
                        console.log(`   New: ${newText}`);
                    }
                }
            });
        });
    }

    console.log(`\nTotal questions: ${totalQuestions}`);
    console.log(`Fixed questions: ${fixedQuestions}`);
    console.log(`Failed questions count: ${failedQuestions.length}`);
    if (failedQuestions.length > 0) {
        console.log("Sample failed questions:", failedQuestions.slice(0, 10));
    }
    process.exit(0);
});
