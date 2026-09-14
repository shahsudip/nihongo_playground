/**
 * Audit script: Extract all vocabulary-kanji questions from firebase dump
 * and report the question text, options, current correctIndex, and <rt> text
 * so we can verify correctness.
 */
const fs = require('fs');

const dump = JSON.parse(fs.readFileSync('./current_firebase_dump.json', 'utf-8'));

const results = [];

for (const set of dump.sets) {
  const vocabSection = set.sections['vocabulary-kanji'];
  if (!vocabSection || !vocabSection.questions) continue;

  for (const q of vocabSection.questions) {
    // Extract <rt> text from questionText
    const rtMatch = q.questionText.match(/<rt>([^<]+)<\/rt>/);
    const rtText = rtMatch ? rtMatch[1] : null;

    // Extract the underlined kanji/word from inside <ruby>...</ruby>
    // Pattern: <ruby>KANJI<rt>reading</rt></ruby>
    const rubyMatch = q.questionText.match(/<ruby>([^<]+)<rt>/);
    const kanjiWord = rubyMatch ? rubyMatch[1] : null;

    // Get current correct option text
    const currentCorrectText = q.options[q.correctIndex];

    // Check if <rt> matches the current correct option
    const rtMatchesCorrect = rtText === currentCorrectText || 
      (currentCorrectText && currentCorrectText.includes(rtText));

    // Determine question type from instruction
    let qType = 'unknown';
    if (q.instruction && q.instruction.includes('読み方')) qType = 'mondai1-reading';
    else if (q.instruction && q.instruction.includes('漢字で書く')) qType = 'mondai2-kanji';
    else if (q.instruction && q.instruction.includes('（　）')) qType = 'mondai3-context';
    else if (q.instruction && q.instruction.includes('意味')) qType = 'mondai4-meaning';
    else if (q.instruction && q.instruction.includes('使い方')) qType = 'mondai5-usage';

    results.push({
      set: set.id,
      qId: q.id,
      qType,
      kanjiWord,
      rtText,
      correctIndex: q.correctIndex,
      currentCorrectText,
      options: q.options.map((o, i) => `${i}: ${o}`),
      rtMatchesCorrect,
      // Clean question text for readability
      questionClean: q.questionText.replace(/<[^>]+>/g, ''),
    });
  }
}

// Output all reading (mondai1) and kanji-writing (mondai2) questions for audit
const readingAndKanjiQs = results.filter(r => r.qType === 'mondai1-reading' || r.qType === 'mondai2-kanji');

console.log(`\n=== AUDIT SUMMARY ===`);
console.log(`Total vocab-kanji questions: ${results.length}`);
console.log(`Reading questions (問題1): ${results.filter(r => r.qType === 'mondai1-reading').length}`);
console.log(`Kanji-writing questions (問題2): ${results.filter(r => r.qType === 'mondai2-kanji').length}`);
console.log(`Other types: ${results.filter(r => r.qType !== 'mondai1-reading' && r.qType !== 'mondai2-kanji').length}`);
console.log(`\nQuestions where <rt> matches correctIndex option: ${readingAndKanjiQs.filter(r => r.rtMatchesCorrect).length}`);
console.log(`Questions where <rt> does NOT match: ${readingAndKanjiQs.filter(r => !r.rtMatchesCorrect).length}`);

// Write full audit data as JSON for agent processing
fs.writeFileSync('./audit_all_questions.json', JSON.stringify(readingAndKanjiQs, null, 2));
console.log(`\nFull audit data written to audit_all_questions.json (${readingAndKanjiQs.length} questions)`);

// Also output a concise version for reading questions only
const readingQs = results.filter(r => r.qType === 'mondai1-reading');
console.log(`\n=== READING QUESTIONS (問題1) - Need kanji reading verification ===\n`);
for (const q of readingQs) {
  console.log(`[${q.set}] Q${q.qId}: ${q.questionClean}`);
  console.log(`  Kanji: ${q.kanjiWord} | <rt>: ${q.rtText} | correctIndex: ${q.correctIndex} → "${q.currentCorrectText}"`);
  console.log(`  Options: ${q.options.join(' | ')}`);
  console.log('');
}

// Output kanji-writing questions
const kanjiQs = results.filter(r => r.qType === 'mondai2-kanji');
console.log(`\n=== KANJI-WRITING QUESTIONS (問題2) - Need correct kanji verification ===\n`);
for (const q of kanjiQs) {
  console.log(`[${q.set}] Q${q.qId}: ${q.questionClean}`);
  console.log(`  Word: ${q.kanjiWord} | <rt>: ${q.rtText} | correctIndex: ${q.correctIndex} → "${q.currentCorrectText}"`);
  console.log(`  Options: ${q.options.join(' | ')}`);
  console.log('');
}
