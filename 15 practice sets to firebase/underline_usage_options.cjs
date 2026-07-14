const fs = require('fs');

function processUsageQuestions(filename) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

    // The usage questions are typically Q31 to Q35 in vocab
    const usageQs = data.vocab.filter(q => q.id >= 31 && q.id <= 35);

    for (let q of usageQs) {
        // Extract the target word from the questionText. e.g. "31. <u>つつむ</u>" -> "つつむ"
        const m = q.questionText.match(/<u>(.*?)<\/u>/) || q.questionText.match(/\*\*(.*?)\*\*/);
        if (!m) continue;
        
        let word = m[1];
        let stems = [word];

        // Basic Japanese conjugation stems
        if (word.endsWith('む')) {
            const base = word.slice(0, -1);
            stems.push(base + 'ん', base + 'み', base + 'ま', base + 'め');
        } else if (word.endsWith('す')) {
            const base = word.slice(0, -1);
            stems.push(base + 'し', base + 'さ', base + 'せ');
        } else if (word.endsWith('く')) {
            const base = word.slice(0, -1);
            stems.push(base + 'い', base + 'き', base + 'か', base + 'け');
        } else if (word.endsWith('ぐ')) {
            const base = word.slice(0, -1);
            stems.push(base + 'い', base + 'ぎ', base + 'が', base + 'げ');
        } else if (word.endsWith('ぶ')) {
            const base = word.slice(0, -1);
            stems.push(base + 'ん', base + 'び', base + 'ば', base + 'べ');
        } else if (word.endsWith('つ')) {
            const base = word.slice(0, -1);
            stems.push(base + 'っ', base + 'ち', base + 'た', base + 'て');
        } else if (word.endsWith('う')) {
            const base = word.slice(0, -1);
            stems.push(base + 'っ', base + 'い', base + 'わ', base + 'え');
        } else if (word.endsWith('る')) {
            const base = word.slice(0, -1);
            stems.push(base + 'っ', base + 'り', base + 'ら', base + 'れ', base + 'た', base + 'て');
        } else if (word.endsWith('い')) { // I-adjectives
            const base = word.slice(0, -1);
            stems.push(base + 'く', base + 'かっ', base + 'けれ');
        } else if (word.endsWith('だ')) { // Na-adjectives
            const base = word.slice(0, -1);
            stems.push(base + 'な', base + 'に', base + 'で');
        }

        // Sort stems by length descending to match the longest form first
        stems.sort((a, b) => b.length - a.length);

        for (let i = 0; i < q.options.length; i++) {
            let optionText = q.options[i];
            
            // Skip if already underlined
            if (optionText.includes('<u>')) continue;

            for (let stem of stems) {
                if (optionText.includes(stem)) {
                    // Replace only the first occurrence
                    optionText = optionText.replace(stem, `<u>${stem}</u>`);
                    break; // Move to next option
                }
            }
            q.options[i] = optionText;
        }
    }

    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

processUsageQuestions('./set9_debug.json');
processUsageQuestions('./set10_debug.json');
console.log("Usage underlines injected successfully!");
