/**
 * 07_push_to_firestore.cjs
 * Push all zenkamoku_n1 JSON chapters to Firestore.
 * Collection: books/zenkamoku-n1-best-workbook/chapters/{chapterId}
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

const BOOK_ID = 'zenkamoku-n1-best-workbook';
const DATA_DIR = path.join(__dirname, '..', '..', 'src', 'data', 'zenkamoku_n1');

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
  // Set book-level document
  await db.collection('books').doc(BOOK_ID).set({
    title: '全科目攻略！JLPT日本語能力試験ベスト総合問題集N1',
    titleEn: 'The Best Complete Workbook for JLPT N1',
    level: 'N1',
    category: 'All Subjects',
    description: '12-week complete JLPT N1 workbook covering vocabulary, grammar, reading, and listening.',
    publisher: 'The Japan Times Publishing',
    authors: ['五十嵐香子', '佐藤茉奈花', '金澤美香子', '杉山舞', '植村有里沙'],
    weeks: 12,
    coverUrl: ''
  }, { merge: true });
  console.log(`✓ Book document set: ${BOOK_ID}`);

  if (!fs.existsSync(DATA_DIR)) {
    console.log('⚠️  No data directory yet. Run extraction scripts first.');
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
