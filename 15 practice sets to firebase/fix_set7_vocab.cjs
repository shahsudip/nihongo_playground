const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixVocabSet7() {
    const doc = await db.collection('books').doc('jlpt-n3-practice-sets').get();
    const data = doc.data();
    
    let rawData = JSON.parse(fs.readFileSync('scraper-test/jlpt_n3_201007_vocab.json', 'utf8'));
    
    let targetWords = [
        "包んで", "得意", "発見", "表して", "件", "通勤", "岩", "努力",
        "せいじょう", "けつえき", "おって", "おりる", "しんちょう", "ものがたり",
        // 15-25 are blanks
        "", "", "", "", "", "", "", "", "", "", "",
        // 26-30
        "きつい", "くたびれた", "明けたら", "混雑している", "単純だ"
    ];

    let newQuestions = [];

    for (let i = 0; i < 35; i++) {
        let q = rawData[i];
        let text = q.question;
        
        // Q1-Q14: Add underline
        if (i < 14) {
            let tw = targetWords[i];
            text = text.replace(tw, `<u>${tw}</u>`);
        }
        // Q15-Q25: Replace unusual spaces with （　　）
        else if (i >= 14 && i < 25) {
            // some have a special space char, replace it or any blank block
            text = text.replace(/\s+/g, ' ').replace(' 店で をもらってきた', ' 店で（　　）をもらってきた').replace(' な がする', ' な（　　）がする').replace(' 毎月の として', ' 毎月の（　　）として').replace(' かばんの中に ください', ' かばんの中に（　　）ください').replace(' 若者の のファッション', ' 若者の（　　）のファッション').replace(' ひもで 捨てた', ' ひもで（　　）捨てた').replace(' 予約を した', ' 予約を（　　）した').replace(' 東 だ', ' 東（　　）だ').replace(' とき、 して泣いて', ' とき、（　　）して泣いて').replace(' ので、 違うバスに', ' ので、（　　）違うバスに').replace(' 勉強して、 医者に', ' 勉強して、（　　）医者に');
            
            // Just in case replace didn't work for the blank, let's do a fallback:
            if (!text.includes('（　　）')) {
                // look for double spaces or unusual spaces
                text = text.replace(/\u00A0/g, '（　　）');
            }
        }
        // Q26-Q30: Add underline
        else if (i >= 25 && i < 30) {
            let tw = targetWords[i];
            text = text.replace(tw, `<u>${tw}</u>`);
        }
        // Q31-Q35: Just the word itself, which is already `text`

        let options = q.options.map(o => o.text.trim());
        let correctIndex = q.options.findIndex(o => o.isCorrect);

        // For Q31-35, ensure options don't have numbers
        if (i >= 30) {
            options = options.map(opt => opt.replace(/^[1234]\s*/, '').trim());
            // also remove underlines inside options if any are accidentally there
            options = options.map(opt => opt.replace(/<u>/g, '').replace(/<\/u>/g, ''));
        }

        newQuestions.push({
            id: i + 1,
            questionText: text,
            options: options,
            correctIndex: correctIndex
        });
    }

    // Set 7 is index 6
    data.sets[6].sections['vocabulary-kanji'].questions = newQuestions;
    
    await db.collection('books').doc('jlpt-n3-practice-sets').set(data);
    console.log('Fixed Set 7 Vocabulary!');
}

fixVocabSet7().catch(console.error);
