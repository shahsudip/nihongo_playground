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

    const books = ['shin-nihongo-500-n3', 'shin-nihongo-500-n2'];
    
    for (const bookId of books) {
        console.log(`\n=== Fixing Underlines for ${bookId} ===`);
        const chaptersRef = db.collection('books').doc(bookId).collection('chapters');
        const chaptersSnap = await chaptersRef.get();
        
        let fixedCount = 0;
        
        for (const doc of chaptersSnap.docs) {
            const chapter = doc.data();
            if (!chapter.passages) continue;
            let chapterModified = false;
            
            chapter.passages.forEach(passage => {
                passage.questions.forEach((q, qIdx) => {
                    // Check for ** format first (Mainly N2)
                    if (q.questionText && q.questionText.includes('**')) {
                        q.questionText = q.questionText.replace(/\*\*(.*?)\*\*/g, '<u>$1</u>');
                        chapterModified = true;
                        fixedCount++;
                        return;
                    }
                    
                    // For N3, use Kuromoji if it's a MOJI question
                    if (q.explanation && q.explanation.includes('(MOJI)')) {
                        if (q.questionText.includes('<u>')) return; // already underlined
                        if (q.questionText.includes('______')) return; // Fill in the blank doesn't need underline
                        
                        const targetText = q.correctOption.text;
                        const tokens = tokenizer.tokenize(q.questionText);
                        
                        // Let's get the reading of the targetText just in case it's Kanji
                        const targetTokens = tokenizer.tokenize(targetText);
                        const targetReading = targetTokens.map(t => t.reading ? kata2hira(t.reading) : t.surface_form).join('');
                        
                        let foundWord = null;
                        
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
                        
                        if (foundWord) {
                            q.questionText = q.questionText.replace(foundWord, `<u>${foundWord}</u>`);
                            chapterModified = true;
                            fixedCount++;
                        } else {
                            console.log(`[${chapter.title} Q${qIdx+1}] FAILED TO FIND target: ${targetText}`);
                        }
                    }
                });
            });
            
            if (chapterModified) {
                await chaptersRef.doc(doc.id).set(chapter);
            }
        }
        
        console.log(`Total questions fixed in ${bookId}: ${fixedCount}`);
    }
    
    console.log("Done updating Firebase.");
    process.exit(0);
});
