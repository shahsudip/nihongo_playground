const kuromoji = require('kuromoji');

// Convert Katakana reading from kuromoji to Hiragana
function kata2hira(s) {
    return s.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

kuromoji.builder({ dicPath: 'node_modules/kuromoji/dict' }).build((err, tokenizer) => {
    if (err) {
        console.error(err);
        return;
    }
    const text = '郵便局の近くに引っ越したので便利です。';
    const targetReading = 'ゆうびんきょく';
    
    const tokens = tokenizer.tokenize(text);
    console.log(tokens.map(t => ({ word: t.surface_form, reading: t.reading ? kata2hira(t.reading) : null })));
    
    // find the token(s) that match the reading
    // Sometimes the word is split into multiple tokens, e.g. 郵便 + 局
    // We can do a sliding window to check combinations of tokens
    for (let i = 0; i < tokens.length; i++) {
        let currentWord = "";
        let currentReading = "";
        for (let j = i; j < tokens.length; j++) {
            currentWord += tokens[j].surface_form;
            currentReading += (tokens[j].reading ? kata2hira(tokens[j].reading) : tokens[j].surface_form);
            
            if (currentReading === targetReading || currentWord === targetReading) {
                console.log(`Found target: ${currentWord}`);
                break;
            }
        }
    }
});
