/**
 * 07_push_n2_to_firestore.cjs
 * Push all zenkamoku_n2 JSON chapters to Firestore.
 * Collection: books/zenkamoku-n2-best-workbook/chapters/{chapterId}
 */
const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, '..', '..', 'scraper-test', 'service-account.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Service account not found:', serviceAccountPath);
  process.exit(1);
}

initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const BOOK_ID = 'zenkamoku-n2-best-workbook';
const DATA_DIR = path.join(__dirname, '..', '..', 'src', 'data', 'zenkamoku_n2');

function sanitize(data) {
  if (data === null || data === undefined) return null;
  if (Array.isArray(data)) return data.map(item =>
    Array.isArray(item) ? { cells: sanitize(item) } :
    typeof item === 'object' ? sanitize(item) : item
  );
  if (typeof data === 'object') {
    const clean = {};
    for (const [k, v] of Object.entries(data))
      if (v !== undefined) clean[k] = sanitize(v);
    return clean;
  }
  return data;
}

async function push() {
  await db.collection('books').doc(BOOK_ID).set({
    title: '全科目攻略！JLPT日本語能力試験ベスト総合問題集N2',
    titleEn: 'The Best Complete Workbook for JLPT N2',
    level: 'N2',
    category: 'All Subjects',
    description: '12-week complete JLPT N2 workbook covering vocabulary, grammar, reading, and listening.',
    publisher: 'The Japan Times',
    weeks: 12,
    coverUrl: ''
  }, { merge: true });
  console.log(`✓ Book document set: ${BOOK_ID}`);

  if (!fs.existsSync(DATA_DIR)) {
    console.log('⚠️  No data directory yet.');
    return;
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  console.log(`📁 Found ${files.length} chapter files`);

  let pushed = 0, failed = 0;
  for (const file of files.sort()) {
    const chapterData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
    const chapterId = chapterData.chapterId || path.basename(file, '.json');
    try {
      await db.collection('books').doc(BOOK_ID)
        .collection('chapters').doc(chapterId)
        .set(sanitize(chapterData), { merge: true });
      console.log(`  ✓ ${chapterId}`);
      pushed++;
    } catch (e) {
      console.error(`  ❌ ${chapterId}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\n✅ Done: ${pushed} pushed, ${failed} failed`);
}

push().catch(console.error);
