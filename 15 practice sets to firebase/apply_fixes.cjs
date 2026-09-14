/**
 * Fix script: Apply all correctIndex fixes from shin_mon_answers.json
 * to current_firebase_dump.json and write to fixed_firebase_dump.json.
 * 
 * This corrects 429 mismatched correctIndex values across sets 1-10.
 */
const fs = require('fs');

const dump = JSON.parse(fs.readFileSync('./current_firebase_dump.json', 'utf-8'));
const answerKey = JSON.parse(fs.readFileSync('./shin_mon_answers.json', 'utf-8'));

let fixCount = 0;
let skipCount = 0;
let alreadyCorrect = 0;
const fixLog = [];

for (const set of dump.sets) {
  for (const [sectionKey, section] of Object.entries(set.sections)) {
    if (!section.questions) continue;
    for (const q of section.questions) {
      const keyId = String(q.id);
      if (answerKey[keyId] !== undefined) {
        const expected = answerKey[keyId];
        if (q.correctIndex !== expected) {
          // Validate expected index is within options range
          if (expected >= 0 && expected < q.options.length) {
            fixLog.push({
              set: set.id,
              section: sectionKey,
              qId: q.id,
              oldIndex: q.correctIndex,
              newIndex: expected,
              oldAnswer: (q.options[q.correctIndex] || '').replace(/<[^>]+>/g, '').substring(0, 40),
              newAnswer: (q.options[expected] || '').replace(/<[^>]+>/g, '').substring(0, 40),
            });
            q.correctIndex = expected;
            fixCount++;
          } else {
            console.error(`SKIP: ${set.id} Q${q.id} - expected index ${expected} out of range (${q.options.length} options)`);
            skipCount++;
          }
        } else {
          alreadyCorrect++;
        }
      }
    }
  }
}

// Write the fixed dump
fs.writeFileSync('./fixed_firebase_dump.json', JSON.stringify(dump, null, 2));

// Write the fix log
fs.writeFileSync('./fix_log.json', JSON.stringify(fixLog, null, 2));

console.log(`\n=== FIX SUMMARY ===`);
console.log(`Questions fixed: ${fixCount}`);
console.log(`Already correct: ${alreadyCorrect}`);
console.log(`Skipped (out of range): ${skipCount}`);
console.log(`\nFixed dump written to: fixed_firebase_dump.json`);
console.log(`Fix log written to: fix_log.json`);

// Verify the fix
console.log(`\n=== VERIFICATION ===`);
const verifyDump = JSON.parse(fs.readFileSync('./fixed_firebase_dump.json', 'utf-8'));
let verifyMismatches = 0;
for (const set of verifyDump.sets) {
  for (const [sectionKey, section] of Object.entries(set.sections)) {
    if (!section.questions) continue;
    for (const q of section.questions) {
      const keyId = String(q.id);
      if (answerKey[keyId] !== undefined) {
        if (q.correctIndex !== answerKey[keyId]) {
          verifyMismatches++;
          console.error(`STILL WRONG: ${set.id} Q${q.id} - is ${q.correctIndex}, should be ${answerKey[keyId]}`);
        }
      }
    }
  }
}
console.log(`Remaining mismatches after fix: ${verifyMismatches}`);
if (verifyMismatches === 0) {
  console.log(`✅ ALL questions now match the answer key!`);
} else {
  console.log(`❌ ${verifyMismatches} questions still have wrong correctIndex`);
}
