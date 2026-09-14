/**
 * Split audit questions into batches for parallel agent processing.
 * Output concise text format per batch.
 */
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./audit_all_questions.json', 'utf-8'));

const BATCH_SIZE = 50;
const batches = [];
for (let i = 0; i < data.length; i += BATCH_SIZE) {
  batches.push(data.slice(i, i + BATCH_SIZE));
}

console.log(`Total questions: ${data.length}`);
console.log(`Batches: ${batches.length} (${BATCH_SIZE} per batch)`);

for (let b = 0; b < batches.length; b++) {
  let text = '';
  for (const q of batches[b]) {
    // Clean the question text for readability
    text += `[${q.set}] Q${q.qId} (${q.qType})\n`;
    text += `  Kanji: ${q.kanjiWord || 'N/A'}\n`;
    text += `  Question: ${q.questionClean}\n`;
    text += `  Options: ${q.options.join(' | ')}\n`;
    text += `  Current correctIndex: ${q.correctIndex} → "${q.currentCorrectText}"\n\n`;
  }
  fs.writeFileSync(`./audit_batch_${b + 1}.txt`, text);
  console.log(`Batch ${b + 1}: ${batches[b].length} questions (${batches[b][0].set} Q${batches[b][0].qId} → ${batches[b][batches[b].length-1].set} Q${batches[b][batches[b].length-1].qId})`);
}
