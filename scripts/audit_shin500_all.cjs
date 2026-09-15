const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function hasKanji(str) {
    return /[\u4e00-\u9faf\u3400-\u4dbf]/.test(str);
}

async function auditBooks() {
    const books = ['shin-nihongo-500-n1', 'shin-nihongo-500-n2', 'shin-nihongo-500-n3', 'shin-nihongo-500-n4-n5'];

    for (const bookId of books) {
        console.log(`\n========================================`);
        console.log(`AUDIT FOR: ${bookId}`);
        console.log(`========================================`);

        const chaptersRef = db.collection('books').doc(bookId).collection('chapters');
        const chaptersSnap = await chaptersRef.get();

        let totalQ = 0;
        let withUnderline = 0;
        let withBlank = 0;
        let noUnderlineOrBlank = 0;
        let kanjiInKanjiTest = 0;
        let samplesNoUnderline = [];
        let samplesKanjiInKanji = [];

        for (const doc of chaptersSnap.docs) {
            const chapter = doc.data();
            if (!chapter.passages) continue;

            chapter.passages.forEach(passage => {
                passage.questions.forEach((q, qIdx) => {
                    totalQ++;
                    const text = q.questionText || '';
                    const hasU = text.includes('<u>') || text.includes('**');
                    const hasB = text.includes('______') || text.includes('___');

                    if (hasU) withUnderline++;
                    if (hasB) withBlank++;

                    if (!hasU && !hasB) {
                        noUnderlineOrBlank++;
                        if (samplesNoUnderline.length < 5) {
                            samplesNoUnderline.push({
                                chapter: chapter.id,
                                qIdx: qIdx + 1,
                                text: text,
                                options: q.options,
                                correct: q.correctOption
                            });
                        }
                    }

                    // Check if options are Kanji and question text has Kanji inside <u> or plain text
                    let correctText = '';
                    if (q.correctOption && typeof q.correctOption === 'object') correctText = q.correctOption.text || '';
                    else if (typeof q.correctOption === 'string') correctText = q.correctOption;

                    const optionsAreKanji = (q.options || []).filter(o => hasKanji(typeof o === 'object' ? o.text : o)).length >= 2;
                    if (optionsAreKanji && hasKanji(correctText)) {
                        // Check if questionText has the Kanji word (giving away answer)
                        const uMatch = text.match(/<u>(.*?)<\/u>/);
                        if (uMatch && hasKanji(uMatch[1])) {
                            kanjiInKanjiTest++;
                            if (samplesKanjiInKanji.length < 5) {
                                samplesKanjiInKanji.push({
                                    chapter: chapter.id,
                                    qIdx: qIdx + 1,
                                    text: text,
                                    underlined: uMatch[1],
                                    correct: correctText
                                });
                            }
                        }
                    }
                });
            });
        }

        console.log(`Total questions: ${totalQ}`);
        console.log(`With Underline: ${withUnderline}`);
        console.log(`With Blank: ${withBlank}`);
        console.log(`Without Underline or Blank: ${noUnderlineOrBlank}`);
        console.log(`Kanji displayed in Kanji tests: ${kanjiInKanjiTest}`);

        if (samplesNoUnderline.length > 0) {
            console.log(`\nSample without underline/blank in ${bookId}:`, JSON.stringify(samplesNoUnderline, null, 2));
        }
        if (samplesKanjiInKanji.length > 0) {
            console.log(`\nSample Kanji in Kanji test in ${bookId}:`, JSON.stringify(samplesKanjiInKanji, null, 2));
        }
    }

    process.exit(0);
}

auditBooks();
