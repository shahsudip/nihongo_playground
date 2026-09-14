const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = __dirname;
const files = ['sets_1_3.json', 'sets_4_5.json', 'sets_6_7.json', 'sets_8_10.json'];

function loadSets() {
  let allSets = [];
  for (const f of files) {
    const filePath = path.join(dir, f);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not yet ready: ${f}`);
      continue;
    }
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (Array.isArray(data.sets)) {
        allSets = allSets.concat(data.sets);
      }
    } catch (err) {
      console.error(`Error reading ${f}:`, err);
    }
  }
  return allSets;
}

function verifyAndMerge() {
  const sets = loadSets();
  console.log(`Found ${sets.length} total sets loaded.`);

  // Sort by set number
  sets.sort((a, b) => {
    const numA = parseInt(a.id.replace(/\D/g, '')) || 0;
    const numB = parseInt(b.id.replace(/\D/g, '')) || 0;
    return numA - numB;
  });

  const finalBookObj = {
    id: 'chokuzen-taisaku-n4',
    title: '日本語能力試験 直前対策 N4 文字・語彙・文法',
    description: '10 Full Mock Practice Tests for JLPT N4 (Kanji, Vocabulary, Grammar, and Short Reading Comprehension)',
    totalSets: sets.length,
    sets: sets
  };

  // Save to dump file for Firestore upload
  const dumpPath = path.join(dir, 'n4_firebase_dump.json');
  fs.writeFileSync(dumpPath, JSON.stringify(finalBookObj, null, 2), 'utf8');
  console.log(`Saved merged dump to ${dumpPath}`);

  // Audit
  let totalErrors = 0;
  let totalQuestions = 0;

  sets.forEach((set, idx) => {
    const vQs = set.sections?.['vocabulary-kanji']?.questions || [];
    const gQs = set.sections?.['grammar-reading']?.questions || [];
    const setQs = [...vQs, ...gQs];
    totalQuestions += setQs.length;

    setQs.forEach(q => {
      if (!q.options || q.options.length !== 4) {
        console.error(`[Set ${idx + 1} Q${q.id}] Expected 4 options, found ${q.options?.length}`);
        totalErrors++;
      }
      if (q.correctIndex < 0 || q.correctIndex > 3 || typeof q.correctIndex !== 'number') {
        console.error(`[Set ${idx + 1} Q${q.id}] Invalid correctIndex: ${q.correctIndex}`);
        totalErrors++;
      }
      // Check unclosed tags
      const uOpen = (q.questionText.match(/<u>/g) || []).length;
      const uClose = (q.questionText.match(/<\/u>/g) || []).length;
      if (uOpen !== uClose) {
        console.error(`[Set ${idx + 1} Q${q.id}] Unmatched <u> tags: open=${uOpen}, close=${uClose}`);
        totalErrors++;
      }
    });
  });

  console.log(`Audit Complete: ${sets.length} sets, ${totalQuestions} questions, ${totalErrors} errors.`);

  if (totalErrors === 0 && sets.length === 10) {
    console.log('All 10 sets passed audit! Uploading to Firestore...');
    try {
      execSync(`node "${path.join(dir, 'upload_to_firebase_n4.cjs')}"`, { stdio: 'inherit' });
    } catch (e) {
      console.error('Firestore upload failed:', e);
    }
  }
}

verifyAndMerge();
