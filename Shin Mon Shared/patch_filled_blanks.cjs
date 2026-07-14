const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const MojiOverrides = {
    'w1-d7-Q2': 'ほね',
    'w2-d7-Q20': 'おく',
    'w3-d4-Q7': '戸',
    'w3-d4-Q10': 'くんれん',
    'w3-d7-Q2': 'いのる'
};

async function patch() {
    console.log('Patching N2 anomalies...');
    const snap = await db.collection('books').doc('shin-nihongo-500-n2').collection('chapters').get();
    let fixed = 0;
    
    for (const doc of snap.docs) {
        const chapter = doc.data();
        let modified = false;
        if (!chapter.passages) continue;
        
        chapter.passages.forEach(p => {
            p.questions.forEach((q, i) => {
                const key = `${doc.id}-Q${i+1}`;
                const text = q.questionText;
                const correct = q.correctOption.text;
                
                if (text.includes(`<u>${correct}</u>`) || text.includes(correct)) {
                    // Only apply to questions without blanks
                    if (!text.includes('_') && !text.includes('＿')) {
                        
                        let replacement = null;
                        if (MojiOverrides[key]) {
                            replacement = `<u>${MojiOverrides[key]}</u>`;
                        } else {
                            // If it's not a MOJI override, it should be a full-width blank!
                            replacement = '＿＿＿＿＿';
                        }
                        
                        if (replacement) {
                            if (text.includes(`<u>${correct}</u>`)) {
                                q.questionText = text.replace(`<u>${correct}</u>`, replacement);
                            } else {
                                q.questionText = text.replace(correct, replacement);
                            }
                            modified = true;
                            fixed++;
                            console.log(`[${key}] Replaced '${correct}' with '${replacement}'`);
                        }
                    }
                }
            });
        });
        
        if (modified) {
            await db.collection('books').doc('shin-nihongo-500-n2').collection('chapters').doc(doc.id).set(chapter);
        }
    }
    console.log(`Patched ${fixed} N2 anomalies.`);
    
    console.log('Patching N3 anomalies...');
    const snap3 = await db.collection('books').doc('shin-nihongo-500-n3').collection('chapters').get();
    let fixed3 = 0;
    
    const N3Overrides = {
        'w1-d1-Q4': 'もうします',
        'w1-d1-Q10': 'おかし',
        'w2-d7-Q2': 'ひさしぶり',
        'w4-d1-Q4': 'まい',
        'w4-d1-Q10': 'けん',
        'w4-d5-Q4': 'しつれい',
        'w4-d5-Q10': 'かいさつぐち'
    };
    
    for (const doc of snap3.docs) {
        const chapter = doc.data();
        let modified = false;
        if (!chapter.passages) continue;
        
        chapter.passages.forEach(p => {
            p.questions.forEach((q, i) => {
                const key = `${doc.id}-Q${i+1}`;
                if (N3Overrides[key]) {
                    const text = q.questionText;
                    const correct = q.correctOption.text;
                    if (text.includes(`<u>${correct}</u>`)) {
                        q.questionText = text.replace(`<u>${correct}</u>`, `<u>${N3Overrides[key]}</u>`);
                        if (key === 'w4-d5-Q4' && q.questionText.includes('（失礼）')) {
                            q.questionText = q.questionText.replace('（失礼）', '');
                        }
                        modified = true;
                        fixed3++;
                        console.log(`[${key}] Replaced '${correct}' with '${N3Overrides[key]}'`);
                    }
                }
            });
        });
        
        if (modified) {
            await db.collection('books').doc('shin-nihongo-500-n3').collection('chapters').doc(doc.id).set(chapter);
        }
    }
    console.log(`Patched ${fixed3} N3 anomalies.`);
    
    process.exit(0);
}
patch();
