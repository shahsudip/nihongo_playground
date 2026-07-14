const fs = require('fs');

const mappingsSet9 = {
    31: [{term: "つつんだ", furigana: ""}, {term: "つつんで", furigana: ""}, {term: "つつみました", furigana: ""}],
    32: [{term: "こぼして", furigana: ""}, {term: "こぼし", furigana: ""}],
    33: [{term: "角", furigana: "かど"}],
    34: [{term: "相手", furigana: "あいて"}],
    35: [{term: "夢中", furigana: "むちゅう"}]
};

const mappingsSet10 = {
    31: [{term: "ほえて", furigana: ""}, {term: "ほえます", furigana: ""}, {term: "ほえる", furigana: ""}, {term: "ほえた", furigana: ""}],
    32: [{term: "あふれた", furigana: ""}, {term: "あふれて", furigana: ""}, {term: "あふれていた", furigana: ""}, {term: "あふれてしまいました", furigana: ""}],
    33: [{term: "しばって", furigana: ""}, {term: "しばった", furigana: ""}],
    34: [{term: "とく", furigana: ""}],
    35: [{term: "するどい", furigana: ""}, {term: "するどくて", furigana: ""}]
};

function applyRuby(filename, mapObj) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

    for (let q of data.vocab) {
        if (q.id >= 31 && q.id <= 35) {
            let terms = mapObj[q.id];
            if (!terms) continue;

            for (let i = 0; i < q.options.length; i++) {
                let opt = q.options[i];
                // Strip existing underlines
                opt = opt.replace(/<\/?u>/g, '');
                
                for (let {term, furigana} of terms) {
                    if (opt.includes(term)) {
                        if (furigana) {
                            opt = opt.replace(term, `<u><ruby>${term}<rt>${furigana}</rt></ruby></u>`);
                        } else {
                            opt = opt.replace(term, `<u>${term}</u>`);
                        }
                        break;
                    }
                }
                q.options[i] = opt;
            }
        }
    }
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

applyRuby('./set9_debug.json', mappingsSet9);
applyRuby('./set10_debug.json', mappingsSet10);
console.log("Ruby tags and proper underlines applied!");
