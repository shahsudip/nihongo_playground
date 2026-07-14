const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function ruby(kanji, kana) {
  return `<ruby>${kanji}<rt>${kana}</rt></ruby>`;
}

async function fixM18() {
  console.log("Fixing Mondai 18 Furigana...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p18 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第2部 問題18');

  if (p18) {
    let text = `電車に乗ると、化粧をしている女性をときどき見かける。彼女たちは、「時間がないんだし、他人に迷惑をかけているわけじゃないんだから、別にいいでしょ」と思っているらしい。確かに忙しい毎日の中、少しでも時間を節約したい気持ちもわかるが、私はそれを見ると、不快な気持ちになる。化粧は人に会うための準備なので、家でするものであり、電車ですべきではない。

電車で化粧をする人たちに、これから会う人の前でもそうやって化粧をするのかと聞くと、しないと言う。一方、自分とは全然関係ない周りの乗客には、化粧する姿を見られても別に構わないと言う。

これは、彼女たちが周りの人たちを風景の一部、壁や座席などと同じだと考えているように私には感じられる。これは大変失礼ではないだろうか。電車で化粧をするということは、そういう印象を周りの人に与えていることに気づいてほしい。`;

    p18.passageText = text
      .replaceAll('乗る', ruby('乗', 'の') + 'る')
      .replaceAll('化粧', ruby('化粧', 'けしょう'))
      .replaceAll('女性', ruby('女性', 'じょせい'))
      .replaceAll('彼女', ruby('彼女', 'かのじょ'))
      .replaceAll('他人', ruby('他人', 'たにん'))
      .replaceAll('迷惑', ruby('迷惑', 'めいわく'))
      .replaceAll('確かに', ruby('確', 'たし') + 'かに')
      .replaceAll('忙しい', ruby('忙', 'いそが') + 'しい')
      .replaceAll('節約', ruby('節約', 'せつやく'))
      .replaceAll('不快', ruby('不快', 'ふかい'))
      .replaceAll('準備', ruby('準備', 'じゅんび'))
      .replaceAll('一方', ruby('一方', 'いっぽう'))
      .replaceAll('全然関係', ruby('全然関係', 'ぜんぜんかんけい'))
      .replaceAll('周り', ruby('周', 'まわ') + 'り')
      .replaceAll('乗客', ruby('乗客', 'じょうきゃく'))
      .replaceAll('姿', ruby('姿', 'すがた'))
      .replaceAll('構わない', ruby('構', 'かま') + 'わない')
      .replaceAll('風景', ruby('風景', 'ふうけい'))
      .replaceAll('一部', ruby('一部', 'いちぶ'))
      .replaceAll('壁', ruby('壁', 'かべ'))
      .replaceAll('座席', ruby('座席', 'ざせき'))
      .replaceAll('感じられる', ruby('感', 'かん') + 'じられる')
      .replaceAll('大変失礼', ruby('大変失礼', 'たいへんしつれい'))
      .replaceAll('印象', ruby('印象', 'いんしょう'))
      .replaceAll('与え', ruby('与', 'あた') + 'え');

    let q = p18.questions[0];
    q.questionText = q.questionText
      .replaceAll('文章', ruby('文章', 'ぶんしょう'))
      .replaceAll('書い', ruby('書', 'か') + 'い')
      .replaceAll('電車', ruby('電車', 'でんしゃ'))
      .replaceAll('化粧', ruby('化粧', 'けしょう'))
      .replaceAll('理由', ruby('理由', 'りゆう'));
      
    q.options[0] = q.options[0]
      .replaceAll('周り', ruby('周', 'まわ') + 'り')
      .replaceAll('感じる', ruby('感', 'かん') + 'じる');
    q.options[1] = q.options[1]
      .replaceAll('化粧', ruby('化粧', 'けしょう'))
      .replaceAll('周り', ruby('周', 'まわ') + 'り')
      .replaceAll('迷惑', ruby('迷惑', 'めいわく'));
    q.options[2] = q.options[2]
      .replaceAll('対して', ruby('対', 'たい') + 'して')
      .replaceAll('大変失礼', ruby('大変失礼', 'たいへんしつれい'));
    q.options[3] = q.options[3]
      .replaceAll('化粧', ruby('化粧', 'けしょう'))
      .replaceAll('節約', ruby('節約', 'せつやく'))
      .replaceAll('女性', ruby('女性', 'じょせい'));

    if(q.correctOption) q.correctOption.text = q.options[q.correctOption.index];

    let c = skm.chapters.find(ch => ch.passages.includes(p18));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  }
}

fixM18();
