const fs = require('fs');

const mappingsSet9 = {
    31: [{term: "つつんだ", furigana: ""}, {term: "つつんで", furigana: ""}, {term: "つつみました", furigana: ""}],
    32: [{term: "こぼして", furigana: ""}, {term: "こぼし", furigana: ""}],
    33: [{term: "角", furigana: "かど", qTerm: "かど"}],
    34: [{term: "相手", furigana: "あいて", qTerm: "あいて"}],
    35: [{term: "夢中", furigana: "むちゅう", qTerm: "むちゅう"}]
};

const mappingsSet10 = {
    31: [{term: "ほえて", furigana: ""}, {term: "ほえます", furigana: ""}, {term: "ほえる", furigana: ""}, {term: "ほえた", furigana: ""}],
    32: [{term: "あふれた", furigana: ""}, {term: "あふれて", furigana: ""}, {term: "あふれていた", furigana: ""}, {term: "あふれてしまいました", furigana: ""}],
    33: [{term: "しばって", furigana: ""}, {term: "しばった", furigana: ""}],
    34: [{term: "とく", furigana: ""}],
    35: [{term: "するどい", furigana: ""}, {term: "するどくて", furigana: ""}]
};

function applyRubyToQuestionAndOptions(filename, mapObj) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

    for (let q of data.vocab) {
        if (q.id >= 31 && q.id <= 35) {
            let terms = mapObj[q.id];
            if (!terms) continue;

            for (let {term, furigana, qTerm} of terms) {
                // If it has furigana AND a qTerm (meaning the question text used hiragana but options use Kanji)
                if (furigana && qTerm) {
                    // Update the question text
                    if (q.questionText.includes(qTerm) && !q.questionText.includes('<ruby>')) {
                        q.questionText = q.questionText.replace(qTerm, `<ruby>${term}<rt>${furigana}</rt></ruby>`);
                    }
                }
            }
        }
    }
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

applyRubyToQuestionAndOptions('./set9_debug.json', mappingsSet9);
applyRubyToQuestionAndOptions('./set10_debug.json', mappingsSet10);
console.log("Ruby tags applied to question text too!");
