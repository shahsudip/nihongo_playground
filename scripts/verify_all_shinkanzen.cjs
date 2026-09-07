const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data', 'shinkanzen_reading');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).sort();
const vietnameseCharRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i;

console.log(`Checking ${files.length} JSON files in ${dataDir}...\n`);

let errorCount = 0;

for (const file of files) {
    const fullPath = path.join(dataDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    let data;
    try {
        data = JSON.parse(content);
    } catch (e) {
        console.error(`❌ ${file}: Invalid JSON - ${e.message}`);
        errorCount++;
        continue;
    }

    const checkIssues = [];

    // Check Vietnamese text
    if (vietnameseCharRegex.test(content)) {
        checkIssues.push(`Contains Vietnamese characters`);
    }

    // Check ruby tags
    const rubyOpenCount = (content.match(/<ruby>/g) || []).length;
    const rubyCloseCount = (content.match(/<\/ruby>/g) || []).length;
    const rtOpenCount = (content.match(/<rt>/g) || []).length;
    const rtCloseCount = (content.match(/<\/rt>/g) || []).length;

    if (rubyOpenCount !== rubyCloseCount) {
        checkIssues.push(`Mismatched <ruby> tags: ${rubyOpenCount} open vs ${rubyCloseCount} close`);
    }
    if (rtOpenCount !== rtCloseCount) {
        checkIssues.push(`Mismatched <rt> tags: ${rtOpenCount} open vs ${rtCloseCount} close`);
    }

    const passages = data.passages || [data];
    passages.forEach((p, pIdx) => {
        // Vocabulary check
        if (Array.isArray(p.vocabulary)) {
            p.vocabulary.forEach((v, vIdx) => {
                if (!v.word || !v.meaning) {
                    checkIssues.push(`Passage[${pIdx}] vocabulary[${vIdx}] missing word or meaning`);
                }
                if (v.meaning && (v.meaning.includes(' / ') || v.meaning.includes(' /'))) {
                    checkIssues.push(`Passage[${pIdx}] vocabulary "${v.word}" has slash in meaning: "${v.meaning}"`);
                }
            });
        }

        // Questions check
        if (Array.isArray(p.questions)) {
            p.questions.forEach((q, qIdx) => {
                if (!q.options || q.options.length < 2) {
                    checkIssues.push(`Passage[${pIdx}] question[${qIdx}] missing options`);
                }
                if (typeof q.correct !== 'number' || q.correct < 1 || q.correct > q.options.length) {
                    checkIssues.push(`Passage[${pIdx}] question[${qIdx}] invalid correct answer: ${q.correct}`);
                }
                if (!q.correctOption) {
                    checkIssues.push(`Passage[${pIdx}] question[${qIdx}] missing correctOption`);
                }
            });
        }
    });

    if (checkIssues.length > 0) {
        console.error(`⚠️  ${file}:`);
        checkIssues.forEach(iss => console.error(`    - ${iss}`));
        errorCount += checkIssues.length;
    } else {
        console.log(`✓ ${file} OK (ruby tags: ${rubyOpenCount})`);
    }
}

console.log(`\nVerification finished with ${errorCount} issue(s).`);
if (errorCount > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
