const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function ruby(kanji, kana) {
  return `<ruby>${kanji}<rt>${kana}</rt></ruby>`;
}

async function fixM17FuriganaOptions() {
  console.log("Adding Furigana to Mondai 17 Options...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p17 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第2部 問題17');

  if (p17) {
    let q = p17.questions[0];
    q.questionText = q.questionText
      .replaceAll('順番', ruby('順番', 'じゅんばん'))
      .replaceAll('正しい', ruby('正', 'ただ') + 'しい');
      
    q.options = q.options.map(opt => 
      opt.replaceAll('汁', ruby('汁', 'じる'))
         .replaceAll('肉', ruby('肉', 'にく'))
         .replaceAll('火', ruby('火', 'ひ'))
         .replaceAll('調味料', ruby('調味料', 'ちょうみりょう'))
         .replaceAll('沸騰', ruby('沸騰', 'ふっとう'))
    );
      
    if(q.correctOption) q.correctOption.text = q.options[q.correctOption.index];

    let c = skm.chapters.find(ch => ch.passages.includes(p17));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  }
}

fixM17FuriganaOptions();
