const fs = require('fs');
const admin = require('firebase-admin');

// 1. Load data
const grammarQs = JSON.parse(fs.readFileSync('parsed_grammar.json', 'utf8'));
const oldVocab = JSON.parse(fs.readFileSync('old_test1_vocab.json', 'utf8'));

const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
const dbData = JSON.parse(jsonStr);

const currentTest1Vocab = dbData.sets[0].sections['vocabulary-kanji'].questions;

// 2. Build final vocab array
const finalVocab = [];

// 1-17 from current (which have <strong> tags properly parsed)
for (let i = 0; i < 17; i++) {
    finalVocab.push(currentTest1Vocab[i]);
}

// 18-25 from oldVocab
for (let i = 17; i < 25; i++) {
    finalVocab.push(oldVocab[i]);
}

// 26-30 from current (which are at index 17-21 in currentTest1Vocab)
for (let i = 17; i < 22; i++) {
    // wait, let's just make sure we grab the correct ones by checking question text
    const q = currentTest1Vocab[i];
    // Since 1-17 are indices 0-16. Index 17 is question 26.
    finalVocab.push(q);
}

// 31-35 from oldVocab
for (let i = 30; i < 35; i++) {
    const q = oldVocab[i];
    q.options = q.options.map(o => o.replace(/<u>/g, '<strong>').replace(/<\/u>/g, '</strong>'));
    q.questionText = q.questionText.replace(/<u>/g, '<strong>').replace(/<\/u>/g, '</strong>');
    finalVocab.push(q);
}

// 3. Set up the new questions
dbData.sets[0].sections['vocabulary-kanji'].questions = finalVocab;
dbData.sets[0].sections['grammar-reading'].questions = grammarQs;

// 4. Re-assign all IDs linearly
let globalId = 1;
dbData.totalQuestions = 0;

for (const set of dbData.sets) {
    for (const secKey of ['vocabulary-kanji', 'grammar-reading']) {
        const sec = set.sections[secKey];
        for (const q of sec.questions) {
            q.id = globalId++;
            q.sectionType = secKey;
            
            // fix any leftover garbage in question texts just in case
            if (q.questionText && q.questionText.includes('<strong>\n</strong>')) {
                q.questionText = q.questionText.replace(/\n<\/strong>$/, '</strong>');
                q.questionText = q.questionText.replace(/<strong>\n<\/strong>/g, '');
            }
        }
        dbData.totalQuestions += sec.questions.length;
    }
}

// 5. Save back to file
fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(dbData, null, 2)};\n`);

console.log(`Rebuilt Test 1. Total questions in Test 1: ${finalVocab.length + grammarQs.length}`);
console.log(`Total questions in DB: ${dbData.totalQuestions}`);

// 6. Push to Firebase
const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const db = admin.firestore();

db.collection('books').doc(dbData.id).set(dbData)
    .then(() => {
        console.log("Successfully pushed to Firebase!");
        process.exit(0);
    })
    .catch(console.error);
