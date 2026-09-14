/**
 * Fix the 3 corrupted questions in set-8 (Q439, Q440, Q441)
 * where options were concatenated into a single string instead of 4 separate options.
 * Then apply the correct correctIndex from the answer key.
 */
const fs = require('fs');

const dump = JSON.parse(fs.readFileSync('./fixed_firebase_dump.json', 'utf-8'));
const answerKey = JSON.parse(fs.readFileSync('./shin_mon_answers.json', 'utf-8'));

for (const set of dump.sets) {
  if (set.id !== 'set-8') continue;
  for (const [sectionKey, section] of Object.entries(set.sections)) {
    if (!section.questions) continue;
    for (const q of section.questions) {
      if (q.id === 439) {
        // Q439: 配る
        q.options = [
          "買い物のとき、レジでお金を<u>配った</u>。",
          "テスト用紙を全員に<u>配って</u>ください。",
          "きのうは母の誕生日だったので、母にプレゼントを<u>配りました</u>。",
          "このパソコンは、作動が早く<u>配られている。</u>"
        ];
        q.correctIndex = answerKey["439"]; // 2
        console.log(`Fixed Q439: options split into 4, correctIndex=${q.correctIndex}`);
      }
      if (q.id === 440) {
        // Q440: 係
        q.options = [
          "うちの子どもは、クラスのそうじの<u>係</u>だ。",
          "田中さんと鈴木さんは<u>係</u>がよくない。",
          "これは、野菜に見えますが、果物の<u>係</u>です。",
          "私の<u>係</u>は、会社員です。"
        ];
        q.correctIndex = answerKey["440"]; // 3
        console.log(`Fixed Q440: options split into 4, correctIndex=${q.correctIndex}`);
      }
      if (q.id === 441) {
        // Q441: 挑戦
        q.options = [
          "今年は、新しい仕事に<u>挑戦</u>してみたい。",
          "強い選手とテニスの<u>挑戦</u>をして、負けた。",
          "人と出会う<u>挑戦</u>は、多ければ多いほどいい。",
          "あの2人は仲が悪くて、いつも<u>挑戦している。</u>"
        ];
        q.correctIndex = answerKey["441"]; // 2
        console.log(`Fixed Q441: options split into 4, correctIndex=${q.correctIndex}`);
      }
    }
  }
}

fs.writeFileSync('./fixed_firebase_dump.json', JSON.stringify(dump, null, 2));
console.log('\nFixed dump updated.');

// Final verification
const verify = JSON.parse(fs.readFileSync('./fixed_firebase_dump.json', 'utf-8'));
let remaining = 0;
for (const set of verify.sets) {
  for (const [sk, sec] of Object.entries(set.sections)) {
    if (!sec.questions) continue;
    for (const q of sec.questions) {
      const k = String(q.id);
      if (answerKey[k] !== undefined && q.correctIndex !== answerKey[k]) {
        remaining++;
        console.error(`STILL WRONG: ${set.id} Q${q.id}`);
      }
    }
  }
}
console.log(`\nRemaining mismatches: ${remaining}`);
if (remaining === 0) console.log('✅ ALL questions now match the answer key!');
