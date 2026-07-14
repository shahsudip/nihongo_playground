const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function ruby(kanji, kana) {
  return `<ruby>${kanji}<rt>${kana}</rt></ruby>`;
}

async function fixPart2Furigana() {
  console.log("Adding Furigana to Mondai 14 and 15...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let c2 = skm.chapters.find(c => c.id === 'part-2');
  let p14 = c2.passages.find(p => p.title === '第2部 問題14');
  let p15 = c2.passages.find(p => p.title === '第2部 問題15');

  if (p14) {
    p14.passageText = p14.passageText
      .replaceAll('友達', ruby('友達', 'ともだち'))
      .replaceAll('佐藤', ruby('佐藤', 'さとう'))
      .replaceAll('届いた', ruby('届', 'とど') + 'いた')
      .replaceAll('件名', ruby('件名', 'けんめい'))
      .replaceAll('送信日時', ruby('送信', 'そうしん') + '日時')
      .replaceAll('久しぶり', ruby('久', 'ひさ') + 'しぶり')
      .replaceAll('元気', ruby('元気', 'げんき'))
      .replaceAll('忙しかった', ruby('忙', 'いそが') + 'しかった')
      .replaceAll('取れる', ruby('取', 'と') + 'れる')
      .replaceAll('会いたい', ruby('会', 'あ') + 'いたい')
      .replaceAll('思って', ruby('思', 'おも') + 'って')
      .replaceAll('食事', ruby('食事', 'しょくじ'))
      .replaceAll('お店', 'お' + ruby('店', 'みせ'))
      .replaceAll('見つけた', ruby('見', 'み') + 'つけた')
      .replaceAll('一緒に', ruby('一緒', 'いっしょ') + 'に')
      .replaceAll('行きたい', ruby('行', 'い') + 'きたい')
      .replaceAll('都合', ruby('都合', 'つごう'))
      .replaceAll('教えて', ruby('教', 'おし') + 'えて')
      .replaceAll('合わせられます', ruby('合', 'あ') + 'わせられます')
      .replaceAll('お返事', 'お' + ruby('返事', 'へんじ'))
      .replaceAll('待ってます', ruby('待', 'ま') + 'ってます');

    let q = p14.questions[0];
    q.questionText = q.questionText
      .replaceAll('一番伝えたい', ruby('一番伝', 'いちばんつた') + 'えたい');
      
    q.options[0] = q.options[0]
      .replaceAll('元気', ruby('元気', 'げんき'))
      .replaceAll('教えて', ruby('教', 'おし') + 'えて');
    q.options[1] = q.options[1]
      .replaceAll('最近忙しかった', ruby('最近忙', 'さいきんいそが') + 'しかった')
      .replaceAll('久しぶり', ruby('久', 'ひさ') + 'しぶり')
      .replaceAll('暇に', ruby('暇', 'ひま') + 'に')
      .replaceAll('伝えたい', ruby('伝', 'つた') + 'えたい');
    q.options[2] = q.options[2]
      .replaceAll('一緒に', ruby('一緒', 'いっしょ') + 'に')
      .replaceAll('食事', ruby('食事', 'しょくじ'))
      .replaceAll('都合', ruby('都合', 'つごう'))
      .replaceAll('日時', ruby('日時', 'にちじ'))
      .replaceAll('連絡して', ruby('連絡', 'れんらく') + 'して');
    q.options[3] = q.options[3]
      .replaceAll('久しぶり', ruby('久', 'ひさ') + 'しぶり');
      
    if(q.correctOption) q.correctOption.text = q.options[q.correctOption.index];
  }

  if (p15) {
    p15.passageText = p15.passageText
      .replaceAll('<div>拝啓</div>', '<div>' + ruby('拝啓', 'はいけい') + '</div>')
      .replaceAll('紅葉', ruby('紅葉', 'こうよう'))
      .replaceAll('季節', ruby('季節', 'きせつ'))
      .replaceAll('皆さ', ruby('皆', 'みな') + 'さ')
      .replaceAll('順調', ruby('順調', 'じゅんちょう'))
      .replaceAll('別便', ruby('別便', 'べつびん'))
      .replaceAll('必要', ruby('必要', 'ひつよう'))
      .replaceAll('役に', ruby('役', 'やく') + 'に')
      .replaceAll('敬具', ruby('敬具', 'けいぐ'))
      .replaceAll('ジユン様', 'ジユン' + ruby('様', 'さま'));

    let q = p15.questions[0];
    q.questionText = q.questionText.replaceAll('内容', ruby('内容', 'ないよう'));
    
    q.options[2] = q.options[2]
      .replaceAll('子ども', ruby('子', 'こ') + 'ども');
    q.options[3] = q.options[3]
      .replaceAll('受け取りに', ruby('受', 'う') + 'け取りに')
      .replaceAll('来て', ruby('来', 'き') + 'て');
      
    if(q.correctOption) q.correctOption.text = q.options[q.correctOption.index];
  }

  const serialized = JSON.stringify(curBooks, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
  console.log('Fixed book_data.jsx locally.');

  const bookDocRef = db.collection('books').doc(skm.id);
  await bookDocRef.collection('chapters').doc(c2.id).update({ passages: c2.passages });
  console.log(`Pushed fix to Firebase for chapter part-2`);
}

fixPart2Furigana();
