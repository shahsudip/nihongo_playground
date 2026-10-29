/**
 * Add sentence translations to explanations in Power Drill N3.
 * Preserves existing vocabulary explanation and appends `<br/><b>Translation:</b> ...`.
 * 
 * Usage:
 *   node scripts/add_power_drill_n3_translations.cjs           (dry run)
 *   node scripts/add_power_drill_n3_translations.cjs --apply   (apply to Firestore)
 */
const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const APPLY = process.argv.includes('--apply');
const BOOK = 'nihongo-power-drill-n3';

// Translations for vocab-14
const VOCAB_14_TRANSLATIONS = {
  'v14-m1-q1': 'That is torn, so please use this one instead.',
  'v14-m1-q2': 'I placed the bag on the desk.',
  'v14-m1-q3': 'This vegetable is bitter.',
  'v14-m2-q1': 'Please throw burnable trash, such as paper, here.',
  'v14-m2-q2': 'The latest technology is used in this television.',
  'v14-m2-q3': 'The president of that company left a large fortune to his children.',
  'v14-m3-q1': 'What should I do to earn more money?',
  'v14-m3-q2': 'This town is lively.',
  'v14-m3-q3': 'A dog from another house came into the garden.',
  'v14-m3-q4': 'The clerk at that store is always smiling.',
  'v14-m4-q1': 'If you are taking time off, please contact us in advance.',
  'v14-m4-q2': 'Excuse me, could you break a 1,000-yen bill into ten 100-yen coins for me?',
  'v14-m4-q3': 'The case was finally resolved.',
  'v14-m4-q4': 'The company president is a stingy person who won\'t pay even one yen extra when dining with employees.',
  'v14-m4-q5': 'Without staying at a hotel, I went to the hot springs on a day trip.',
  'v14-m4-q6': 'The match between Team A and Team B was a 3-3 draw.',
  'v14-m5-q1': 'I overslept and ended up being late for the appointed time.',
  'v14-m5-q2': 'A dog suddenly appeared in front of me, so I reflexively let out a loud shout.'
};

function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  const p = path.join(__dirname, '..', 'scraper-test', 'service-account.json');
  if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
  throw new Error('No Firebase service account found.');
}

async function main() {
  if (!getApps().length) initializeApp({ credential: cert(getServiceAccount()) });
  const db = getFirestore();

  const chapterId = 'vocab-14';
  const ref = db.collection('books').doc(BOOK).collection('chapters').doc(chapterId);
  const snap = await ref.get();
  if (!snap.exists) throw new Error(`Chapter ${chapterId} not found`);

  const data = snap.data();
  const sections = JSON.parse(JSON.stringify(data.sections || []));

  let updatedCount = 0;
  for (const section of sections) {
    for (const q of section.questions || []) {
      const translation = VOCAB_14_TRANSLATIONS[q.id];
      if (translation) {
        // Base explanation without any previous Translation appended
        const baseExpl = (q.explanation || '').replace(/<br\s*\/?>\s*<b>Translation:<\/b>.*$/i, '').trim();
        const newExpl = `${baseExpl}<br/><b>Translation:</b> ${translation}`;
        console.log(`[${q.id}]`);
        console.log(`  OLD: ${q.explanation}`);
        console.log(`  NEW: ${newExpl}`);
        q.explanation = newExpl;
        updatedCount++;
      }
    }
  }

  console.log(`\nReady to update ${updatedCount} questions in ${chapterId}. Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

  if (APPLY) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(__dirname, 'firebase_backup', 'backups', 'set-updates', `${stamp}-power-drill-n3-vocab14-translations`);
    fs.mkdirSync(backupDir, { recursive: true });
    fs.writeFileSync(path.join(backupDir, `${chapterId}.before.json`), JSON.stringify(data, null, 2), 'utf8');
    console.log(`Backup saved to ${backupDir}`);

    await ref.update({ sections });
    console.log(`Successfully updated ${chapterId} in Firestore!`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
