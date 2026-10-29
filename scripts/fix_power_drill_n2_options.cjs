/**
 * Fix duplicate answer options in Firestore book `nihongo-power-drill-n2`
 * (chapters that really match the scanned "n2-power-drill-moji-goi" PDF).
 *
 * Same safety rules as fix_power_drill_n3_options.cjs:
 *   - only `options` and `correctOption` of the listed questions change
 *   - question located by chapter + section + questionText; current correct text verified
 *   - only the `sections` field is written; pre-change copy saved before writing
 *
 * Usage: node scripts/fix_power_drill_n2_options.cjs [--apply]
 */
const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const APPLY = process.argv.includes('--apply');
const BOOK = 'nihongo-power-drill-n2';

// [chapterId, sectionIndex, questionTextIncludes, expectedCorrectText, newOptions]
const FIXES = [
  ['vocab-5', 1, 'かんかく', '感覚', ['感党', '感常', '感覚', '感賞']],
  ['vocab-7', 0, '募集', 'ぼしゅう', ['ほしゅう', 'ほじゅう', 'ぼしゅう', 'ぼじゅう']],
];

function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  const p = path.join(__dirname, '..', 'scraper-test', 'service-account.json');
  if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
  throw new Error('No Firebase service account found.');
}

async function main() {
  if (!getApps().length) initializeApp({ credential: cert(getServiceAccount()) });
  const db = getFirestore();
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, 'firebase_backup', 'backups', 'set-updates', `${stamp}-power-drill-n2-options`);
  const writes = [];

  for (const [chapterId, si, needle, correctText, newOptions] of FIXES) {
    const ref = db.collection('books').doc(BOOK).collection('chapters').doc(chapterId);
    const snap = await ref.get();
    if (!snap.exists) { console.log(`SKIP ${chapterId}: missing`); continue; }
    const data = snap.data();
    const sections = JSON.parse(JSON.stringify(data.sections));
    const q = (sections[si].questions || []).find((x) => (x.questionText || '').includes(needle));
    if (!q) { console.log(`SKIP ${chapterId}: question "${needle}" not found`); continue; }
    if (!q.correctOption || q.correctOption.text !== correctText) {
      console.log(`SKIP ${chapterId}: correct text "${q.correctOption && q.correctOption.text}" != "${correctText}"`);
      continue;
    }
    const idx = newOptions.indexOf(correctText);
    if (new Set(newOptions).size !== 4 || idx < 0) { console.log(`SKIP ${chapterId}: bad new options`); continue; }
    console.log(`FIX ${chapterId}: ${JSON.stringify(q.options)} idx=${q.correctOption.index} -> ${JSON.stringify(newOptions)} idx=${idx}`);
    q.options = newOptions;
    q.correctOption = { ...q.correctOption, index: idx, text: correctText };
    writes.push({ ref, chapterId, sections, before: data });
  }

  if (!APPLY) { console.log(`DRY RUN: ${writes.length} chapter(s)`); return; }
  fs.mkdirSync(backupDir, { recursive: true });
  for (const w of writes) fs.writeFileSync(path.join(backupDir, `${w.chapterId}.before.json`), JSON.stringify(w.before, null, 2), 'utf8');
  for (const w of writes) { await w.ref.update({ sections: w.sections }); console.log(`updated ${w.chapterId}`); }
  console.log(`Backup: ${backupDir}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
