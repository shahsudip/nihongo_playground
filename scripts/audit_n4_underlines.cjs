const fs = require('fs');
const path = require('path');

const dumpPath = path.join(__dirname, '../N4_Chokuzen_Taisaku_Processing/n4_firebase_dump.json');
const doc = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));

console.log('=== N4 CHOKUZEN TAISAKU DATA AUDIT ===');
console.log('Book Title:', doc.title);
console.log('Total Sets in doc:', doc.sets.length);

let totalQuestions = 0;
const issues = [];
const summaryBySet = {};

doc.sets.forEach((set, sIdx) => {
  const setId = set.id || `set-${sIdx + 1}`;
  summaryBySet[setId] = { total: 0, sections: {} };

  for (const [secKey, secVal] of Object.entries(set.sections || {})) {
    const qList = secVal.questions || [];
    summaryBySet[setId].sections[secKey] = qList.length;
    summaryBySet[setId].total += qList.length;

    qList.forEach((q, qIdx) => {
      totalQuestions++;
      const qText = q.questionText || q.question || '';
      const opts = q.options || [];
      const correctIdx = q.correctIndex !== undefined ? q.correctIndex : (q.correctAnswer !== undefined ? q.correctAnswer - 1 : -1);

      // Check empty
      if (!qText.trim()) {
        issues.push({ setId, secKey, qId: q.id, type: 'EMPTY_QUESTION_TEXT' });
      }

      // Check options count
      if (!opts || opts.length !== 4) {
        issues.push({ setId, secKey, qId: q.id, type: 'INVALID_OPTIONS_COUNT', count: opts ? opts.length : 0 });
      }

      // Check correct answer index (0 to 3)
      if (![0, 1, 2, 3].includes(correctIdx)) {
        issues.push({ setId, secKey, qId: q.id, type: 'INVALID_CORRECT_ANSWER', correctIdx, rawCorrect: q.correctIndex || q.correctAnswer });
      }

      // Check unclosed <u> tags in question
      const uOpenQ = (qText.match(/<u>/g) || []).length;
      const uCloseQ = (qText.match(/<\/u>/g) || []).length;
      if (uOpenQ !== uCloseQ) {
        issues.push({ setId, secKey, qId: q.id, type: 'UNBALANCED_U_QUESTION', uOpenQ, uCloseQ, text: qText });
      }

      // Check raw escaped HTML
      if (qText.includes('&lt;') || qText.includes('&gt;')) {
        issues.push({ setId, secKey, qId: q.id, type: 'ESCAPED_HTML_QUESTION', text: qText });
      }

      // Check ruby tags
      const rubyOpen = (qText.match(/<ruby>/g) || []).length;
      const rubyClose = (qText.match(/<\/ruby>/g) || []).length;
      if (rubyOpen !== rubyClose) {
        issues.push({ setId, secKey, qId: q.id, type: 'UNBALANCED_RUBY_QUESTION', text: qText });
      }

      // Star questions check
      if (qText.includes('★') || (q.instruction && q.instruction.includes('★'))) {
        if (qText.includes('<u>') || qText.includes('</u>')) {
          issues.push({ setId, secKey, qId: q.id, type: 'U_IN_STAR_QUESTION', text: qText });
        }
      }

      // Check options
      opts.forEach((opt, oIdx) => {
        const uOpenOpt = (opt.match(/<u>/g) || []).length;
        const uCloseOpt = (opt.match(/<\/u>/g) || []).length;
        if (uOpenOpt !== uCloseOpt) {
          issues.push({ setId, secKey, qId: q.id, type: `UNBALANCED_U_OPTION_${oIdx + 1}`, text: opt });
        }
        if (opt.includes('&lt;') || opt.includes('&gt;')) {
          issues.push({ setId, secKey, qId: q.id, type: `ESCAPED_HTML_OPTION_${oIdx + 1}`, text: opt });
        }
      });
    });
  }
});

console.log('\n--- SUMMARY BY SET ---');
console.table(summaryBySet);
console.log('Total Questions across all sets:', totalQuestions);
console.log('\n--- ISSUES FOUND (' + issues.length + ') ---');
issues.forEach(iss => console.log(JSON.stringify(iss)));
