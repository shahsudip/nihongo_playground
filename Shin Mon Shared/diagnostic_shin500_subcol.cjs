const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function runDiagnostic() {
    const books = ['shin-nihongo-500-n3', 'shin-nihongo-500-n2'];
    
    for (const bookId of books) {
        console.log(`\n=== Running Diagnostic on ${bookId} ===`);
        const chaptersSnap = await db.collection('books').doc(bookId).collection('chapters').get();
        if (chaptersSnap.empty) {
            console.log(`No chapters found for ${bookId}!`);
            continue;
        }
        
        let errorCount = 0;
        let instructionSet = new Set();
        
        chaptersSnap.forEach(doc => {
            const chapter = doc.data();
            if (!chapter.questions) return;
            
            chapter.questions.forEach((q, qIdx) => {
                // 1. Check correctIndex
                if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
                    console.log(`[${chapter.title}] Q${qIdx + 1}: Invalid correctIndex = ${q.correctIndex} (Options length: ${q.options.length})`);
                    errorCount++;
                }
                
                // 2. Check options length
                if (q.options.length < 3 || q.options.length > 4) {
                    console.log(`[${chapter.title}] Q${qIdx + 1}: Suspicious options length = ${q.options.length}`);
                    errorCount++;
                }
                
                // 3. Check for leaked text in questionText, instruction
                const leakKeywords = ['問題', '選択肢', '最もよい', '次の中'];
                leakKeywords.forEach(keyword => {
                    if (q.questionText && q.questionText.includes(keyword)) {
                        console.log(`[${chapter.title}] Q${qIdx + 1}: Leaked keyword '${keyword}' found in questionText! -> ${q.questionText}`);
                        errorCount++;
                    }
                });
                
                // 4. Check for Mondai header text
                if (q.instruction) {
                    instructionSet.add(q.instruction);
                    console.log(`[${chapter.title}] Q${qIdx + 1}: Has instruction text: ${q.instruction}`);
                    errorCount++;
                }
            });
            
            // 5. Check question counts
            if (chapter.questions.length !== 15 && chapter.questions.length !== 35 && chapter.questions.length !== 36) {
                console.log(`[${chapter.title}]: Unexpected number of questions = ${chapter.questions.length}`);
                errorCount++;
            }
        });
        
        console.log(`Unique Instructions found in ${bookId}:`);
        instructionSet.forEach(inst => console.log(` - ${inst}`));
        
        console.log(`Completed ${bookId} with ${errorCount} potential issues found.`);
    }
    
    process.exit(0);
}

runDiagnostic().catch(console.error);
