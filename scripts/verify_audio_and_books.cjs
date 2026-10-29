const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_ROOT = path.join(ROOT, 'public');
const SRC_DATA_ROOT = path.join(ROOT, 'src', 'data');

console.log('========================================================');
console.log('🔍 Comprehensive Audio & Consolidated Books Verification');
console.log('========================================================\n');

let totalErrors = 0;
let totalAudioRefs = 0;
let validAudioRefs = 0;

// 1. Verify Audio Books (Audio files and co-located book.json)
const audioBooks = [
  'nihongo_no_mori_n3',
  'shinkanzen_listening',
  'zenkamoku_n1',
  'zenkamoku_n2',
  'zenkamoku_n3',
];

console.log('--- Step 1: Checking Audio Book Folders & Co-located book.json ---');
for (const book of audioBooks) {
  const audioDir = path.join(PUBLIC_ROOT, 'audio', book);
  const srcBookJson = path.join(SRC_DATA_ROOT, book, 'book.json');
  const pubBookJson = path.join(audioDir, 'book.json');

  if (!fs.existsSync(audioDir)) {
    console.error(`[ERROR] ${book}: Missing public/audio/${book} directory`);
    totalErrors++;
    continue;
  }

  if (!fs.existsSync(pubBookJson)) {
    console.error(`[ERROR] ${book}: Missing public/audio/${book}/book.json`);
    totalErrors++;
  } else if (!fs.existsSync(srcBookJson)) {
    console.error(`[ERROR] ${book}: Missing src/data/${book}/book.json`);
    totalErrors++;
  } else {
    const srcContent = fs.readFileSync(srcBookJson, 'utf8');
    const pubContent = fs.readFileSync(pubBookJson, 'utf8');
    if (srcContent !== pubContent) {
      console.error(`[ERROR] ${book}: Content mismatch between src/data and public/audio book.json`);
      totalErrors++;
    } else {
      console.log(`✓ [OK] ${book}: public/audio and src/data book.json are perfectly synced`);
    }
  }

  // Check all referenced audio files in book.json exist on disk
  if (fs.existsSync(srcBookJson)) {
    const content = fs.readFileSync(srcBookJson, 'utf8');
    const matches = [...new Set(content.match(/\/audio\/[^"]+\.mp3/g) || [])];
    totalAudioRefs += matches.length;
    let missing = 0;
    for (const src of matches) {
      const fullPath = path.join(PUBLIC_ROOT, src);
      if (!fs.existsSync(fullPath)) {
        console.error(`  [ERROR] Missing audio file: ${src} (checked ${fullPath})`);
        missing++;
        totalErrors++;
      } else {
        validAudioRefs++;
      }
    }
    if (missing === 0) {
      console.log(`  ✓ All ${matches.length} audio references in ${book} verified on disk`);
    }
  }
}

// 2. Verify All Consolidated Books
console.log('\n--- Step 2: Checking Consolidated book.json Integrity ---');
const allBooks = [
  'nihongo_no_mori_n3',
  'kore_issatsu_n3',
  'shinkanzen_listening',
  'shinkanzen_reading',
  'somatome',
  'speed_master_n3_reading',
  'zenkamoku_n1',
  'zenkamoku_n2',
  'zenkamoku_n3',
  'first_time_n3_350_kanji',
  'pass_n3_within_20_days',
  'chokuzen_n2',
];

for (const book of allBooks) {
  const jsonPath = path.join(SRC_DATA_ROOT, book, 'book.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`[ERROR] ${book}: Missing src/data/${book}/book.json`);
    totalErrors++;
    continue;
  }

  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const chapters = data.chapters || data.sets || [];
    if (!Array.isArray(chapters) || chapters.length === 0) {
      console.error(`[ERROR] ${book}: book.json has no chapters/sets array (found ${typeof chapters})`);
      totalErrors++;
    } else {
      console.log(`✓ [OK] ${book}: book.json valid with ${chapters.length} chapters/sets (id: ${data.id || 'N/A'})`);
    }
  } catch (e) {
    console.error(`[ERROR] ${book}: Failed to parse book.json: ${e.message}`);
    totalErrors++;
  }
}

console.log('\n========================================================');
console.log(`Summary: Total Errors: ${totalErrors}, Total Audio Refs Checked: ${totalAudioRefs}`);
console.log('========================================================');

if (totalErrors > 0) {
  process.exit(1);
} else {
  console.log('🎉 All audio files, folders, and consolidated book JSONs verified successfully!');
  process.exit(0);
}
