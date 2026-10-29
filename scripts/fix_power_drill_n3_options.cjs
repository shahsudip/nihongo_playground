/**
 * Fix placeholder / duplicate answer options in Firestore book `nihongo-power-drill-n3`.
 *
 * Source of truth for the option text: the scanned book
 *   "Nihongo Power Drill N3 - Moji, Goi.pdf" (options read visually page by page).
 *
 * Scope (deliberately narrow):
 *   - Only `options` and `correctIndex` of the listed questions are changed.
 *   - The correct answer TEXT is never changed; only its position follows the book order.
 *   - Each question is verified against the live doc first (id exists, current correct
 *     answer text equals the expected text). Any mismatch skips the question.
 *   - Only the `sections` field of each chapter doc is written (update(), not set()).
 *   - A pre-change copy of every touched chapter doc is saved before writing.
 *
 * Usage:
 *   node scripts/fix_power_drill_n3_options.cjs            (dry run, no writes)
 *   node scripts/fix_power_drill_n3_options.cjs --apply    (backup + write)
 */
const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const APPLY = process.argv.includes('--apply');
const BOOK = 'nihongo-power-drill-n3';

// [chapterId, questionId, correctText, [option1..option4 in book order]]
const FIXES = [
  ['vocab-1', 'v1-m2-q3', '必要', ['必用', '必容', '必要', '必有']],
  ['vocab-2', 'v2-m2-q3', '眠い', ['寝い', '睡い', '眼い', '眠い']],
  ['vocab-4', 'v4-m2-q1', '忙しい', ['忙しい', '忙がしい', '急しい', '急がしい']],
  ['vocab-4', 'v4-m2-q3', '失敗', ['矢財', '矢敗', '失財', '失敗']],
  ['vocab-6', 'v6-m1-q3', 'おとずれた', ['かたれた', 'たずれた', 'ほうれた', 'おとずれた']],
  ['vocab-6', 'v6-m2-q3', '簡単', ['関単', '問単', '間単', '簡単']],
  ['vocab-8', 'v8-m2-q3', '落ち着いて', ['下ち付いて', '下ち着いて', '落ち付いて', '落ち着いて']],
  ['vocab-9', 'v9-m1-q2', 'げんいん', ['けいいん', 'げいいん', 'けんいん', 'げんいん']],
  ['vocab-9', 'v9-m2-q3', '観光', ['歓行', '歓光', '観行', '観光']],
  ['vocab-9', 'v9-m4-q2', 'ホーム', ['ゴール', 'チーム', 'プール', 'ホーム']],
  ['vocab-10', 'v10-m1-q2', 'とつぜん', ['ぐうぜん', 'こつぜん', 'とうぜん', 'とつぜん']],
  ['vocab-10', 'v10-m2-q1', '運動', ['連動', '連働', '運動', '運働']],
  ['vocab-10', 'v10-m2-q3', '確認', ['格任', '格認', '確任', '確認']],
  ['vocab-10', 'v10-m4-q6', 'わくわく', ['そろそろ', 'そわそわ', 'わいわい', 'わくわく']],
  ['vocab-11', 'v11-m2-q2', '紹介', ['招介', '招会', '紹介', '紹会']],
  ['vocab-12', 'v12-m2-q1', '伝えた', ['仏えた', '伝えた', '告えた', '云えた']],
  ['vocab-12', 'v12-m2-q2', '就職', ['修織', '修職', '就織', '就職']],
  ['vocab-14', 'v14-m1-q1', 'やぶれて', ['おれて', 'われて', 'こわれて', 'やぶれて']],
  ['vocab-14', 'v14-m2-q1', '燃える', ['然える', '焼える', '暁える', '燃える']],
  ['vocab-14', 'v14-m2-q2', '技術', ['伎術', '技術', '枝術', '妓術']],
  ['vocab-14', 'v14-m3-q1', '手に入れる', ['ためる', 'もらう', '手に入る', '手に入れる']],
  ['vocab-16', 'v16-m1-q2', 'ねっしん', ['ねしん', 'ねつしん', 'ねっしん', 'ねつじん']],
  ['vocab-16', 'v16-m2-q1', '歴史', ['歴史', '歴吏', '暦史', '暦吏']],
  ['vocab-16', 'v16-m2-q2', '得意', ['得意', '得居', '特意', '特居']],
  ['vocab-16', 'v16-m2-q3', '吸って', ['叫って', '叱って', '吸って', '呼って']],
  ['vocab-18', 'v18-m2-q2', '国際', ['交祭', '交際', '国祭', '国際']],
  ['vocab-18', 'v18-m4-q4', 'つながらない', ['とどかない', 'むすばない', 'くっつかない', 'つながらない']],
  ['vocab-19', 'v19-m2-q1', '物価', ['物値', '物価', '物貨', '物賃']],
  ['vocab-19', 'v19-m2-q2', '空港', ['空行', '空港', '航行', '航空']],
  ['vocab-20', 'v20-m1-q1', 'じょうきょう', ['しょうぎょう', 'しょうぎゅう', 'じょうきゅう', 'じょうきょう']],
  ['vocab-20', 'v20-m1-q2', 'かんばん', ['かんばん', 'かんぱん', 'がんばん', 'がんぱん']],
  ['vocab-20', 'v20-m2-q1', '億', ['意', '億', '憶', '臆']],
  ['vocab-20', 'v20-m4-q6', 'お見舞い', ['お祝い', 'お見合い', 'お見舞い', '見送り']],
  ['vocab-24', 'v24-m2-q2', '招待', ['招持', '招待', '紹持', '紹待']],
  ['vocab-26', 'v26-m4-q1', '段落', ['段差', '段落', '段階', '段々']],
  ['vocab-27', 'v27-m2-q2', '手術', ['主述', '主術', '手述', '手術']],
  ['vocab-27', 'v27-m2-q3', '貿易', ['貨易', '貸易', '貿易', '留易']],
  ['vocab-27', 'v27-m4-q4', '存在', ['在学', '実体', '存在', '状態']],
  ['vocab-29', 'v29-m4-q2', 'つめて', ['おして', 'ついて', 'つめて', 'おさえて']],
  ['vocab-30', 'v30-m1-q1', 'あらためよう', ['やめよう', 'あきらめよう', 'あたためよう', 'あらためよう']],
  ['vocab-30', 'v30-m1-q2', 'けしき', ['けしき', 'けしょく', 'けいしき', 'けいしょく']],
  ['vocab-30', 'v30-m1-q3', 'つゆ', ['つゆ', 'つうゆ', 'つゆう', 'つうゆう']],
  ['vocab-30', 'v30-m2-q1', 'お湯', ['お浴', 'お温', 'お湯', 'お熱']],
  ['vocab-30', 'v30-m2-q2', '原料', ['原科', '原料', '厚科', '厚料']],
  ['vocab-30', 'v30-m2-q3', '婚約', ['混約', '混役', '婚約', '婚役']],
];

function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  const localPath = path.join(__dirname, '..', 'scraper-test', 'service-account.json');
  if (fs.existsSync(localPath)) return JSON.parse(fs.readFileSync(localPath, 'utf8'));
  throw new Error('No Firebase service account (FIREBASE_SERVICE_ACCOUNT or scraper-test/service-account.json).');
}

const stripMarker = (s) => String(s).replace(/\((?:distractor\d*|correct)\)\s*$/i, '');

async function main() {
  if (!getApps().length) initializeApp({ credential: cert(getServiceAccount()) });
  const db = getFirestore();

  const byChapter = new Map();
  for (const f of FIXES) {
    if (!byChapter.has(f[0])) byChapter.set(f[0], []);
    byChapter.get(f[0]).push(f);
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, 'firebase_backup', 'backups', 'set-updates', `${stamp}-power-drill-n3-options`);
  const report = [];
  const writes = [];

  for (const [chapterId, fixes] of byChapter) {
    const ref = db.collection('books').doc(BOOK).collection('chapters').doc(chapterId);
    const snap = await ref.get();
    if (!snap.exists) { report.push(`SKIP chapter ${chapterId}: not found`); continue; }
    const data = snap.data();
    const sections = JSON.parse(JSON.stringify(data.sections || []));
    let changed = 0;
    for (const [, qid, correctText, newOptions] of fixes) {
      let q = null;
      for (const s of sections) for (const x of s.questions || []) if (x.id === qid) q = x;
      if (!q) { report.push(`SKIP ${chapterId}/${qid}: question not found`); continue; }
      const oldCorrect = stripMarker((q.options || [])[q.correctIndex]);
      if (oldCorrect !== correctText) {
        report.push(`SKIP ${chapterId}/${qid}: live correct "${oldCorrect}" != expected "${correctText}"`);
        continue;
      }
      if (new Set(newOptions).size !== 4) { report.push(`SKIP ${chapterId}/${qid}: new options not unique`); continue; }
      const newIdx = newOptions.indexOf(correctText);
      if (newIdx < 0) { report.push(`SKIP ${chapterId}/${qid}: correct text missing in new options`); continue; }
      report.push(`FIX  ${chapterId}/${qid}: ${JSON.stringify(q.options)} ci=${q.correctIndex}  ->  ${JSON.stringify(newOptions)} ci=${newIdx}`);
      q.options = newOptions;
      q.correctIndex = newIdx;
      changed += 1;
    }
    if (changed) writes.push({ ref, chapterId, sections, before: data, changed });
  }

  console.log(report.join('\n'));
  console.log(`\n${writes.reduce((n, w) => n + w.changed, 0)} question(s) across ${writes.length} chapter doc(s) to update. Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

  if (!APPLY) return;
  fs.mkdirSync(backupDir, { recursive: true });
  for (const w of writes) {
    fs.writeFileSync(path.join(backupDir, `${w.chapterId}.before.json`), JSON.stringify(w.before, null, 2), 'utf8');
  }
  console.log(`Pre-change backup written to ${backupDir}`);
  for (const w of writes) {
    await w.ref.update({ sections: w.sections });
    console.log(`updated ${w.chapterId} (${w.changed})`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
