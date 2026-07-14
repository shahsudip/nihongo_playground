const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixSet6() {
    const doc = await db.collection('books').doc('jlpt-n3-practice-sets').get();
    const data = doc.data();
    
    let v = data.sets[5].sections['vocabulary-kanji'].questions;
    
    let targetWords = [
        "壊れ", "各地", "主人", "洗って", "不便", "仲間", "肌", "郵送",
        "ふせい", "きゅうか", "たのんで", "こまる", "とまる", "みかた",
        // 15-25 already have （　　） or （ ）
        "", "", "", "", "", "", "", "", "", "", "",
        // 26-30
        "やさしい", "ささやいた", "気にしないで", "しかった", "ていねいに"
    ];

    for (let i = 0; i < 35; i++) {
        let text = v[i].questionText;
        
        // Q1-14 and Q26-30 add underline if not there
        if ((i < 14) || (i >= 25 && i < 30)) {
            let tw = targetWords[i];
            if (tw && !text.includes('<u>')) {
                // To avoid multiple replaces if run twice
                text = text.replace(tw, `<u>${tw}</u>`);
            }
        }
        
        // Fix blanks for 15-25 if they are missing
        if (i >= 14 && i < 25) {
            // Check if it has a blank
            if (!text.includes('（') && !text.includes('(')) {
                console.log(`Q${i+1} missing blank: ${text}`);
            }
        }

        v[i].questionText = text;
    }

    // Fix correctIndex for Q27
    // "彼女は、電車の中でささやいた。"
    // Options: 1. 大きな声で話した　2. 小さな声で話した　3. たくさん眠った　4. 少し眠った
    // It should be '小さな声で話した' which is index 1.
    v[26].correctIndex = 1;

    data.sets[5].sections['vocabulary-kanji'].questions = v;
    
    await db.collection('books').doc('jlpt-n3-practice-sets').set(data);
    console.log('Fixed Set 6!');
    process.exit(0);
}

fixSet6().catch(console.error);
