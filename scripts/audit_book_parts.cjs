const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data', 'shinkanzen_reading');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).sort();

const vietnameseCharRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i;

const groups = { 'Part 1': [], 'Part 2': [], 'Part 3': [], 'Part 4': [] };

for (const file of files) {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);

    const rubyCount = (content.match(/<ruby>/g) || []).length;
    const hasVietnamese = vietnameseCharRegex.test(content);
    const vocabCount = Array.isArray(data.vocabulary) ? data.vocabulary.length : 0;
    const qCount = Array.isArray(data.questions) ? data.questions.length : (Array.isArray(data.sections) ? data.sections.reduce((acc, s) => acc + (s.questions ? s.questions.length : 0), 0) : 0);
    const hasPassage = Boolean(data.passage || data.sections);
    
    // Check if questions have `correct` vs `correctAnswer`
    let questionKeyIssue = false;
    if (Array.isArray(data.questions)) {
        for (const q of data.questions) {
            if (q.correct === undefined && q.correctAnswer !== undefined) {
                questionKeyIssue = true;
            }
        }
    }

    let slashVocab = 0;
    if (Array.isArray(data.vocabulary)) {
        for (const v of data.vocabulary) {
            if (v.meaning && v.meaning.includes(' / ')) {
                slashVocab++;
            }
        }
    }

    let partKey = `Part ${data.part || 1}`;
    if (file === 'part-1.json') partKey = 'Part 1';

    const info = {
        file,
        rubyCount,
        vocabCount,
        qCount,
        hasPassage,
        hasVietnamese,
        slashVocab,
        questionKeyIssue,
        genre: data.genre || (data.sectionHeader ? data.sectionHeader.type : 'N/A')
    };

    if (groups[partKey]) {
        groups[partKey].push(info);
    } else {
        groups[partKey] = [info];
    }
}

for (const [part, items] of Object.entries(groups)) {
    console.log(`\n=================== ${part} (${items.length} items) ===================`);
    console.table(items);
}
