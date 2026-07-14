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

    console.log(`\n=== Running Fallback Underlines for shin-nihongo-500-n3 ===`);
    const chaptersRef = db.collection('books').doc('shin-nihongo-500-n3').collection('chapters');
    const chaptersSnap = await chaptersRef.get();
    
    let fixedCount = 0;
    
    for (const doc of chaptersSnap.docs) {
        const chapter = doc.data();
        if (!chapter.passages) continue;
        let chapterModified = false;
        
        chapter.passages.forEach(passage => {
            passage.questions.forEach((q, qIdx) => {
                if (q.explanation && q.explanation.includes('(MOJI)')) {
                    if (q.questionText.includes('<u>')) return; // already underlined
                    if (q.questionText.includes('______')) return; // Fill in the blank doesn't need underline
                    
                    const targetText = q.correctOption.text;
                    const targetTokens = tokenizer.tokenize(targetText);
                    const targetReading = targetTokens.map(t => t.reading ? kata2hira(t.reading) : t.surface_form).join('');
                    
                    let foundWord = null;
                    
                    // Simple string search fallback for Hiragana in sentence
                    if (q.questionText.includes(targetText)) {
                        foundWord = targetText;
                    } else if (q.questionText.includes(targetReading)) {
                        foundWord = targetReading;
                    }
                    
                    // Manual overrides for tricky kanji
                    const manualOverrides = {
                        "おもて": "表",
                        "お預け": "おあずけ" // or おおずけ
                    };
                    
                    if (!foundWord && manualOverrides[targetText] && q.questionText.includes(manualOverrides[targetText])) {
                        foundWord = manualOverrides[targetText];
                    }
                    if (!foundWord && q.questionText.includes('おおずけ')) foundWord = 'おおずけ';
                    if (!foundWord && q.questionText.includes('おつれ')) foundWord = 'おつれ';
                    
                    if (foundWord) {
                        q.questionText = q.questionText.replace(foundWord, `<u>${foundWord}</u>`);
                        chapterModified = true;
                        fixedCount++;
                        console.log(`[${chapter.title} Q${qIdx+1}] Fixed via fallback: ${foundWord} -> ${targetText}`);
                    } else {
                        console.log(`[${chapter.title} Q${qIdx+1}] STILL FAILED: ${targetText} | ${targetReading}`);
                    }
                }
            });
        });
        
        if (chapterModified) {
            await chaptersRef.doc(doc.id).set(chapter);
        }
    }
    
    console.log(`Total questions fixed in fallback: ${fixedCount}`);
    console.log("Done updating Firebase.");
    process.exit(0);
});
