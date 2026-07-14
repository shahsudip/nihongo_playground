const fs = require('fs');

function cleanData(filename) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

    function processQuestions(questions) {
        for (let q of questions) {
            // Convert **text** to <u>text</u> in questionText
            q.questionText = q.questionText.replace(/\*\*([^*]+)\*\*/g, (match, p1) => {
                if (p1.includes('問題')) return match; // Leave **問題2** alone if it leaked here
                return `<u>${p1}</u>`;
            });

            // Clean up options
            for (let i = 0; i < q.options.length; i++) {
                // If the option has **問題X**, split and take only the first part
                if (q.options[i].includes('**問題')) {
                    q.options[i] = q.options[i].split('**問題')[0].trim();
                }
                
                // Also convert **text** to <u>text</u> in options
                q.options[i] = q.options[i].replace(/\*\*([^*]+)\*\*/g, (match, p1) => {
                    if (p1.includes('問題')) return match;
                    return `<u>${p1}</u>`;
                });
                
                // Clean up any remaining trailing instructions or newlines
                q.options[i] = q.options[i].replace(/\r?\n[\s\S]*/g, '').trim();
            }
        }
    }

    processQuestions(data.vocab);
    processQuestions(data.grammar);

    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

cleanData('./set9_debug.json');
cleanData('./set10_debug.json');
console.log("Successfully cleaned Set 9 and Set 10!");
