const fs = require('fs');
const data = JSON.parse(fs.readFileSync('current_firebase_dump.json', 'utf8'));

const rawFiles = {
    7: 'set8_raw.txt', 8: 'test9_raw.txt', 9: 'test10_vocab_raw.txt', 
    10: 'set11_raw.txt', 11: 'set12_raw.txt', 12: 'set13_raw.txt', 
    13: 'set14_raw.txt', 14: 'set15_raw.txt'
};

const hardcodedTargets = {
    "10_2": "程度", "10_7": "破れている",
    "11_5": "例", "11_10": "きょうじゅ",
    "12_5": "缶", "12_9": "ふうん",
    "13_30": "わずかな",
    "14_7": "田舎", "14_10": "きろく", "14_11": "とらえて", "14_13": "きのう", "14_28": "あげて", "14_30": "ついている",
    "15_1": "文書", "15_5": "害", "15_7": "港", "15_30": "割合"
};

const set8Targets = {
    1: '飛んで', 2: '無料', 3: '通行', 4: '疲れて', 5: '面', 6: '知恵', 7: '多様', 8: '到着',
    9: 'ふまん', 10: 'けんちく', 11: 'もどって', 12: 'みとめる', 13: 'こうがい', 14: 'やちん',
    26: 'わがまま', 27: '全然', 28: 'もうけた', 29: 'どんどん', 30: 'アドバイス'
};

for (let i = 7; i < 15; i++) {
    const set = data.sets[i];
    const vocab = set.sections['vocabulary-kanji'].questions;
    let rawText = '';
    if (rawFiles[i] && fs.existsSync(rawFiles[i])) {
        rawText = fs.readFileSync(rawFiles[i], 'utf8');
    }

    // Fix Q1-14 and Q26-30 Underlines and Ruby tags
    for (let j of [...Array(14).keys(), ...Array(5).keys().map(x => x + 25)]) {
        let q = vocab[j];
        let qNum = j + 1;
        
        let cleanText = q.questionText.replace(/<u>/g, '').replace(/<\/u>/g, '');
        cleanText = cleanText.replace(/<ruby>(.*?)<rt>.*?<\/rt><\/ruby>/g, '$1');
        q.questionText = cleanText;

        let targetWord = null;
        if (i === 7) {
            targetWord = set8Targets[qNum];
        } else {
            targetWord = hardcodedTargets[`${i+1}_${qNum}`];
            if (!targetWord && rawText) {
                let regex = new RegExp(`(?:^|\\n)(?:\\*\\*)?${qNum}\\.(?:\\*\\*)?\\s*(.*?)(?=\\n(?:\\s*(?:\\*\\*)?\\d+\\.(?:\\*\\*)?|\\s*$))`, 's');
                let qMatch = rawText.match(regex);
                if (qMatch) {
                    let boldMatch = qMatch[1].match(/(?:\*\*|<u>|__)(.*?)(?:\*\*|<\/u>|__)/);
                    if (boldMatch) targetWord = boldMatch[1];
                }
            }
        }
        
        if (targetWord) {
            q.questionText = q.questionText.replace(targetWord, `<u>${targetWord}</u>`);
            
            if (q.correctIndex !== -1 && q.options[q.correctIndex]) {
                let optText = q.options[q.correctIndex].replace(/<[^>]*>/g, '').trim();
                if (j >= 0 && j <= 7) {
                    q.questionText = q.questionText.replace(`<u>${targetWord}</u>`, `<u><ruby>${targetWord}<rt>${optText}</rt></ruby></u>`);
                } else if (j >= 8 && j <= 13) {
                    q.questionText = q.questionText.replace(`<u>${targetWord}</u>`, `<u><ruby>${optText}<rt>${targetWord}</rt></ruby></u>`);
                    if (!q.options[q.correctIndex].includes('<ruby>')) {
                        q.options[q.correctIndex] = `<ruby>${optText}<rt>${targetWord}</rt></ruby>`;
                    }
                }
            }
        }
    }

    // Fix Q15-25 blanks
    for (let j = 14; j < 25; j++) {
        let q = vocab[j];
        if (q) {
            q.questionText = q.questionText.replace(/（\s*）/g, '（　　）').replace(/\(\s*\)/g, '（　　）');
            // If it had a single space bracket: ( )
            q.questionText = q.questionText.replace(/（ \)/g, '（　　）').replace(/\( ）/g, '（　　）');
            if(!q.questionText.includes('（　　）')) {
                q.questionText = q.questionText.replace('（', '（　　）').replace('）', '');
            }
        }
    }

    // Fix Q31-35 options combined string
    if (i === 7) {
        for (let j = 30; j < 35; j++) {
            let q = vocab[j];
            if (q && q.options && q.options.length === 1 && q.options[0].includes(' 2 ')) {
                let opts = q.options[0].split(/\s[234]\s/);
                if (opts.length === 4) {
                    q.options = opts.map(x => x.replace(/^[\d\.]\s*/, '').trim());
                }
            }
        }
    }

    // Fix Grammar Q19-23 passages (especially Sets 11-15)
    if (i >= 10 && i <= 14) {
        const grammar = set.sections['grammar-reading'].questions;
        let gStart = rawText.indexOf('### **文法**');
        if (gStart === -1) gStart = rawText.indexOf('**文法**');
        if (gStart !== -1) {
            let gText = rawText.substring(gStart);
            let passageMatch = gText.match(/\*\*問題3\*\*[^\n]*\n([\s\S]*?)(?=\n\s*\*\*\s*19\s*\*\*|\n\s*19\s*)/);
            if (!passageMatch) passageMatch = gText.match(/問題3[^\n]*\n([\s\S]*?)(?=\n\s*\*\*\s*19\s*\*\*|\n\s*19\s*)/);
            
            if (passageMatch) {
                let passageText = passageMatch[1].trim();
                passageText = passageText.replace(/^[^\n]*えらびなさい。?\s*\n*/, '');
                for (let j = 18; j < 23; j++) {
                    if (grammar[j]) grammar[j].passageText = passageText;
                }
            }
        }
    }
}

fs.writeFileSync('fixed_firebase_dump.json', JSON.stringify(data, null, 2));
console.log('Fixed dump saved to fixed_firebase_dump.json');
