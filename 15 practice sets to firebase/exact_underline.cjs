const fs = require('fs');

const mappings = {
    // Set 9
    31: ["つつんだ", "つつんで", "つつみました", "つつんでいる"],
    32: ["こぼして", "こぼし"],
    33: ["角"],
    34: ["相手"],
    35: ["夢中"],
    
    // Set 10 (assuming IDs might overlap, but since they are distinct files we just map ID to search terms)
    1031: ["くり返し"], // Will handle Set 10 below
    1032: ["生え"],
    1033: ["トレーニング"],
    1034: ["努力"],
    1035: ["なつかしい", "なつかし"]
};

function underlineTarget(filename, isSet10) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

    for (let q of data.vocab) {
        if (q.id >= 31 && q.id <= 35) {
            let terms = isSet10 ? mappings[1000 + q.id] : mappings[q.id];
            if (!terms) continue;

            for (let i = 0; i < q.options.length; i++) {
                let opt = q.options[i];
                // Remove existing if any
                opt = opt.replace(/<\/?u>/g, '');
                
                for (let term of terms) {
                    if (opt.includes(term)) {
                        opt = opt.replace(term, `<u>${term}</u>`);
                        break; // Only underline once per option
                    }
                }
                q.options[i] = opt;
            }
        }
    }
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

underlineTarget('./set9_debug.json', false);
underlineTarget('./set10_debug.json', true);
console.log("Injected exact underlines!");
