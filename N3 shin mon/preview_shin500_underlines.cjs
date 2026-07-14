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
        console.log(`\n=== Checking Underlines for ${bookId} ===`);
        const chaptersSnap = await db.collection('books').doc(bookId).collection('chapters').get();
        
        let fixedCount = 0;
        
        chaptersSnap.forEach(doc => {
            const chapter = doc.data();
            if (!chapter.passages) return;
            
            chapter.passages.forEach(passage => {
                passage.questions.forEach((q, qIdx) => {
                    if (q.explanation && q.explanation.includes('(MOJI)')) {
                        if (q.questionText.includes('<u>')) return; // already underlined
                        
                        const targetReading = q.correctOption.text;
                        const tokens = tokenizer.tokenize(q.questionText);
                        
                        let foundWord = null;
                        
                        for (let i = 0; i < tokens.length; i++) {
                            let currentWord = "";
                            let currentReading = "";
                            for (let j = i; j < tokens.length; j++) {
                                currentWord += tokens[j].surface_form;
                                currentReading += (tokens[j].reading ? kata2hira(tokens[j].reading) : tokens[j].surface_form);
                                
                                if (currentReading === targetReading || currentWord === targetReading) {
                                    foundWord = currentWord;
                                    break;
                                }
                            }
                            if (foundWord) break;
                        }
                        
                        if (foundWord) {
                            console.log(`[${chapter.title} Q${qIdx+1}] Found: ${foundWord} -> ${targetReading}`);
                            // Replace only the FIRST occurrence of the found word to avoid replacing particles multiple times, though MOJI words are usually unique Kanji
                            // Using a simple replace since MOJI are usually unique kanji compounds
                            const newText = q.questionText.replace(foundWord, `<u>${foundWord}</u>`);
                            // console.log(`  ${newText}`);
                            fixedCount++;
                        } else {
                            console.log(`[${chapter.title} Q${qIdx+1}] FAILED TO FIND target for reading: ${targetReading}`);
                            console.log(`  Text: ${q.questionText}`);
                        }
                    }
                });
            });
        });
        
        console.log(`Total Moji questions matched in ${bookId}: ${fixedCount}`);
    }
    
    process.exit(0);
});
