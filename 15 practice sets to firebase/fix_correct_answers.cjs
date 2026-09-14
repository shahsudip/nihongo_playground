// fix_correct_answers.cjs
// Reads answer_key_from_pdf.json, applies correct 0-indexed correctIndex
// to current_firebase_dump.json -> writes fixed_firebase_dump_v2.json
// VK section: 35 questions per set (mondai1=8, mondai2=14, mondai3=11, mondai4=5, mondai5=5)
// GR section: 23 questions per set (gr_mondai1=13, gr_mondai2=5, gr_mondai3=5)

const fs = require('fs');
const path = require('path');

const dumpPath = path.join(__dirname, 'current_firebase_dump.json');
const keyPath = path.join(__dirname, 'answer_key_from_pdf.json');
const outPath = path.join(__dirname, 'fixed_firebase_dump_v2.json');

const dump = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));
const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

// Structure per section (question count per mondai):
// VK: mondai1=8, mondai2=14, mondai3=11, mondai4=5, mondai5=5 => total 35
// GR: mondai1=13, mondai2=5, mondai3=5 => total 23

const VK_COUNTS = { mondai1: 8, mondai2: 14, mondai3: 11, mondai4: 5, mondai5: 5 };
const GR_COUNTS = { mondai1: 13, mondai2: 5, mondai3: 5 };

let totalFixed = 0;
let totalMismatch = 0;
const log = [];

function flattenAnswers(section, counts) {
  const flat = [];
  for (const [k, count] of Object.entries(counts)) {
    const answers = section[k];
    if (!answers) throw new Error(`Missing ${k} in answer key`);
    if (answers.length !== count) throw new Error(`${k} has ${answers.length} answers, expected ${count}`);
    flat.push(...answers);
  }
  return flat;
}

for (const set of dump.sets) {
  const setKey = key.sets[set.id];
  if (!setKey) {
    console.log(`⚠️  No answer key for ${set.id}, skipping`);
    continue;
  }

  // Build flat 0-indexed answer arrays
  const vkAnswers = flattenAnswers(setKey['vocabulary-kanji'], VK_COUNTS); // length 35
  const grAnswers = flattenAnswers(setKey['grammar'], GR_COUNTS);          // length 23

  const vkQuestions = set.sections['vocabulary-kanji'].questions;
  const grQuestions = set.sections['grammar-reading'].questions;

  if (vkQuestions.length !== 35) {
    console.log(`⚠️  ${set.id} VK has ${vkQuestions.length} questions (expected 35)`);
  }
  if (grQuestions.length !== 23) {
    console.log(`⚠️  ${set.id} GR has ${grQuestions.length} questions (expected 23)`);
  }

  // Apply VK fixes
  for (let i = 0; i < vkQuestions.length; i++) {
    const q = vkQuestions[i];
    const newIdx = vkAnswers[i] - 1; // convert 1-based to 0-based
    if (q.correctIndex !== newIdx) {
      log.push(`${set.id} VK Q${i+1} id=${q.id}: ${q.correctIndex} -> ${newIdx}`);
      totalMismatch++;
      q.correctIndex = newIdx;
      totalFixed++;
    }
  }

  // Apply GR fixes
  for (let i = 0; i < grQuestions.length; i++) {
    const q = grQuestions[i];
    const newIdx = grAnswers[i] - 1; // convert 1-based to 0-based
    if (q.correctIndex !== newIdx) {
      log.push(`${set.id} GR Q${i+1} id=${q.id}: ${q.correctIndex} -> ${newIdx}`);
      totalMismatch++;
      q.correctIndex = newIdx;
      totalFixed++;
    }
  }
}

fs.writeFileSync(outPath, JSON.stringify(dump, null, 2), 'utf8');

console.log('\n=== FIX SUMMARY ===');
console.log(`Total questions updated: ${totalFixed}`);
console.log('\nDetailed changes:');
log.forEach(l => console.log(' ', l));
console.log(`\n✅ Written to: ${outPath}`);
