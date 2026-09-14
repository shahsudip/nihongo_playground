/**
 * Compare current firebase dump correctIndex values against the 
 * shin_mon_answers.json answer key and report ALL mismatches.
 * This covers all question types across all 15 sets.
 */
const fs = require('fs');

const dump = JSON.parse(fs.readFileSync('./current_firebase_dump.json', 'utf-8'));
const answerKey = JSON.parse(fs.readFileSync('./shin_mon_answers.json', 'utf-8'));

const mismatches = [];
let totalChecked = 0;
let totalMatched = 0;

for (const set of dump.sets) {
  for (const [sectionKey, section] of Object.entries(set.sections)) {
    if (!section.questions) continue;
    for (const q of section.questions) {
      const keyId = String(q.id);
      if (answerKey[keyId] !== undefined) {
        totalChecked++;
        const expected = answerKey[keyId];
        const actual = q.correctIndex;
        if (expected !== actual) {
          mismatches.push({
            set: set.id,
            section: sectionKey,
            qId: q.id,
            questionText: q.questionText.replace(/<[^>]+>/g, '').substring(0, 80),
            options: q.options,
            currentCorrectIndex: actual,
            currentCorrectText: q.options[actual],
            expectedCorrectIndex: expected,
            expectedCorrectText: q.options[expected],
          });
        } else {
          totalMatched++;
        }
      }
    }
  }
}

console.log(`\n=== MISMATCH AUDIT REPORT ===`);
console.log(`Total questions checked against answer key: ${totalChecked}`);
console.log(`Matched correctly: ${totalMatched}`);
console.log(`MISMATCHES FOUND: ${mismatches.length}`);
console.log(`\n--- DETAILS ---\n`);

// Group by set
const bySet = {};
for (const m of mismatches) {
  if (!bySet[m.set]) bySet[m.set] = [];
  bySet[m.set].push(m);
}

for (const [setId, items] of Object.entries(bySet)) {
  console.log(`\n=== ${setId} (${items.length} mismatches) ===`);
  for (const m of items) {
    console.log(`  Q${m.qId} [${m.section}]:`);
    console.log(`    Text: ${m.questionText}`);
    console.log(`    Options: ${m.options.map((o,i) => `${i}: ${o.replace(/<[^>]+>/g, '').substring(0,20)}`).join(' | ')}`);
    console.log(`    WRONG:    correctIndex=${m.currentCorrectIndex} → "${(m.currentCorrectText||'').replace(/<[^>]+>/g, '').substring(0,30)}"`);
    console.log(`    CORRECT:  correctIndex=${m.expectedCorrectIndex} → "${(m.expectedCorrectText||'').replace(/<[^>]+>/g, '').substring(0,30)}"`);
  }
}

// Write machine-readable output
fs.writeFileSync('./mismatch_report.json', JSON.stringify(mismatches, null, 2));
console.log(`\nFull mismatch data saved to mismatch_report.json`);
