const fs = require('fs');

const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
const dbData = JSON.parse(jsonStr);

let updatedCount = 0;

function replaceTags(text) {
    if (!text) return text;
    if (text.includes('<strong>') || text.includes('</strong>')) {
        updatedCount++;
        return text.replace(/<strong>/g, '<span style="color: green;">').replace(/<\/strong>/g, '</span>');
    }
    return text;
}

for (const set of dbData.sets) {
    for (const secKey of Object.keys(set.sections)) {
        const sec = set.sections[secKey];
        if (sec.questions) {
            for (const q of sec.questions) {
                q.questionText = replaceTags(q.questionText);
                if (q.options) {
                    q.options = q.options.map(o => replaceTags(o));
                }
            }
        }
    }
}

fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(dbData, null, 2)};\n`);

console.log(`Updated ${updatedCount} texts to have green color instead of bold!`);
