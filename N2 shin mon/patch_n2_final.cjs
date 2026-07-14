const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function patch() {
    const chaptersRef = db.collection('books').doc('shin-nihongo-500-n2').collection('chapters');
    
    // Week 2 Day 7 Review Q19: 大勢
    // Week 3 Day 5 Q14: 目を通し
    // Week 3 Day 7 Review Q18: 行かざるをえない
    // Week 4 Day 3 Q4: ひとつぶ
    // Week 4 Day 4 Q13: 尊重
    // Week 4 Day 7 Review Q7: 平らな
    // Week 4 Day 7 Review Q31: 管
    
    const snap = await chaptersRef.get();
    let fixed = 0;
    
    for (const doc of snap.docs) {
        const chapter = doc.data();
        let modified = false;
        if (!chapter.passages) continue;
        
        chapter.passages.forEach(p => {
            p.questions.forEach(q => {
                let orig = q.questionText;
                if (!q.questionText.includes('<u>')) {
                    if (q.questionText.includes('大勢')) q.questionText = q.questionText.replace('大勢', '<u>大勢</u>');
                    if (q.questionText.includes('目を通し')) q.questionText = q.questionText.replace('目を通し', '<u>目を通し</u>');
                    if (q.questionText.includes('行かざるをえない')) q.questionText = q.questionText.replace('行かざるをえない', '<u>行かざるをえない</u>');
                    if (q.questionText.includes('ひとつぶ')) q.questionText = q.questionText.replace('ひとつぶ', '<u>ひとつぶ</u>');
                    if (q.questionText.includes('尊重')) q.questionText = q.questionText.replace('尊重', '<u>尊重</u>');
                    if (q.questionText.includes('平らな')) q.questionText = q.questionText.replace('平らな', '<u>平らな</u>');
                    if (q.questionText.includes('管')) q.questionText = q.questionText.replace('管', '<u>管</u>');
                }
                if (orig !== q.questionText) {
                    modified = true;
                    fixed++;
                    console.log(`Patched ${doc.id}: ${q.questionText}`);
                }
            });
        });
        
        if (modified) await chaptersRef.doc(doc.id).set(chapter);
    }
    console.log(`Patched ${fixed} remaining N2 questions.`);
    process.exit(0);
}
patch();
