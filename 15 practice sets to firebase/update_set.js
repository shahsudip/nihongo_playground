import { readFileSync, writeFileSync } from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function run() {
    let text = readFileSync('pasted_set.txt', 'utf8').replace(/\r\n/g, '\n');
    let lines = text.split('\n');
    
    // Find answer map
    let answerMap = [];
    const ansMatch = text.match(/Answer List|解答/i);
    let ansIdx = ansMatch ? ansMatch.index : -1;
    if (ansIdx !== -1) {
        const ansText = text.substring(ansIdx).replace(/\*\*/g, '');
        const ansLines = ansText.split('\n');
        for (const l of ansLines) {
            const m = l.match(/^\s*(\d+)\.\s*([1234])/);
            if (m) {
                answerMap[parseInt(m[1])] = parseInt(m[2]);
            }
        }
    }
    
    // Convert bold **text** to <strong>text</strong>
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    lines = text.split('\n');
    
    // Parse sequentially
    let questions = [];
    let currentQNum = 1;
    let currentQText = "";
    let currentOptions = [];
    let readingContext = "";
    
    let i = 0;
    while (i < lines.length) {
        if (lines[i].match(/Answer List|解答/i)) break;
        let l = lines[i].trim();
        if (!l) {
            i++;
            continue;
        }
        
        let m = l.match(new RegExp(`^${currentQNum}[\\.\\s]+(.*)`));
        if (!m) m = l.match(new RegExp(`^${currentQNum}$`));
        
        if (m) {
            if (currentQNum > 1) {
                questions.push({ qNum: currentQNum - 1, text: currentQText, options: currentOptions });
            }
            if (currentQNum === 19 && readingContext) {
                currentQText = readingContext.trim() + "\n\n" + (m[1] || m[2] || "");
            } else {
                currentQText = (m[1] || m[2] || "");
            }
            currentOptions = [];
            currentQNum++;
        } else if (currentQNum > 1 && l.match(/^[1234][\.\)]/)) {
            // It's an option!
            let opts = l.split(/[1234][\.\)]/).slice(1).map(s => s.trim());
            currentOptions.push(...opts);
        } else {
            if (currentQNum === 1) {
                // Ignore leading headers
            } else if (currentQNum >= 19 && currentQNum <= 24 && currentQText === "") {
                readingContext += l + "\n";
            } else {
                if (currentQText !== "") currentQText += "\n" + l;
                else readingContext += l + "\n";
            }
        }
        i++;
    }
    if (currentQNum > 1) {
        questions.push({ qNum: currentQNum - 1, text: currentQText, options: currentOptions });
    }
    
    console.log(`Parsed ${questions.length} questions.`);
    for (let q of questions) {
        q.correctIndex = answerMap[q.qNum] ? answerMap[q.qNum] - 1 : -1;
        
        if (q.text.includes('__________ __________ ★ __________')) {
            q.text = q.text.replace('__________ __________ ★ __________', '<strong>__________ __________ ★ __________</strong>');
        }
        
        console.log(`Q${q.qNum}: ${q.text.substring(0, 30).replace(/\n/g, ' ')}... Options: ${q.options.length}, Ans: ${q.correctIndex}`);
        if (q.text.includes('<strong>')) {
            console.log("  -> HAS BOLD TAG!");
        }
    }
    
    if (questions.length === 0) {
        console.log("No questions parsed!");
        process.exit(1);
    }
    
    const bookId = 'jlpt-n3-practice-sets';
    const setIndex = 8; // Set 9 (0-indexed)
    const sectionType = 'vocabulary-kanji';
    
    const docRef = db.collection('books').doc(bookId);
    const doc = await docRef.get();
    const data = doc.data();
    
    let currentId = data.sets[setIndex].sections[sectionType].questions.length > 0 ? data.sets[setIndex].sections[sectionType].questions[0].id : 1;
    
    const formattedQuestions = questions.map(q => ({
        id: currentId++,
        questionText: q.text.trim(),
        options: q.options.slice(0, 4),
        correctIndex: q.correctIndex,
        sectionType: sectionType
    }));
    
    data.sets[setIndex].sections[sectionType].questions = formattedQuestions;
    data.totalQuestions = data.sets.reduce((acc, set) => acc + (set.sections['vocabulary-kanji']?.questions?.length || 0) + (set.sections['grammar-reading']?.questions?.length || 0), 0);
    
    await docRef.set(data);
    writeFileSync('./src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(data, null, 2)};\n`);
    
    console.log(`Successfully updated Set ${setIndex + 1} ${sectionType} with ${formattedQuestions.length} questions.`);
    process.exit(0);
}

run().catch(console.error);
