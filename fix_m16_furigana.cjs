const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function addFurigana(text, kanji, ruby) {
  return text.replaceAll(kanji, `<ruby>${kanji}<rt>${ruby}</rt></ruby>`);
}

async function fixMondai16Furigana() {
  console.log("Adding Furigana to Mondai 16...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p16 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第2部 問題16');
  if (p16) {
    const m16_html = `
<div class="mb-4 text-lg"><ruby>職場<rt>しょくば</rt></ruby>でコピーを<ruby>取<rt>と</rt></ruby>ろうとしたら、コピー<ruby>機<rt>き</rt></ruby>に以下のようなメモが<ruby>貼<rt>は</rt></ruby>ってあった。</div>

<div class="flex my-6 w-full max-w-3xl mx-auto">
  <!-- The Grey Box -->
  <div class="bg-[#dcdcdc] dark:bg-gray-700 border border-gray-600 dark:border-gray-400 p-6 md:p-10 shadow-sm flex-1 font-serif text-lg leading-[2.2] tracking-wide relative">
    
    <div class="flex items-center mb-2"><div class="text-[1.35rem] font-bold border-b-[2.5px] border-black dark:border-white inline-block pb-1 tracking-wider">このコピー<ruby>機<rt>き</rt></ruby>は<ruby>故障中<rt>こしょうちゅう</rt></ruby>です。</div></div>
    <div class="flex items-center"><div><ruby>修理<rt>しゅうり</rt></ruby>の人が11時ごろ来ます。</div></div>
    <div class="flex items-center"><div><ruby>修理<rt>しゅうり</rt></ruby>が問題なく終われば、午後から使えるようになります。</div></div>
    
    <div class="h-4"></div> <!-- Gap -->
    
    <div class="flex items-center"><div>お急ぎの方は、5<ruby>階<rt>かい</rt></ruby>の<ruby>第一事務室<rt>だいいちじむしつ</rt></ruby>か、5<ruby>階<rt>かい</rt></ruby>の<ruby>第二事務室<rt>だいにじむしつ</rt></ruby>か、</div></div>
    <div class="flex items-center relative">
      <div>4<ruby>階<rt>かい</rt></ruby>の<ruby>資料準備室<rt>しりょうじゅんびしつ</rt></ruby>のものをお<ruby>使<rt>つか</rt></ruby>いください。</div>
    </div>
    <div class="flex items-center"><div>ただし、5<ruby>階<rt>かい</rt></ruby>の<ruby>第一事務室<rt>だいいちじむしつ</rt></ruby>は、<ruby>混<rt>こ</rt></ruby>んでいるので、20<ruby>枚<rt>まい</rt></ruby>以上のコピー</div></div>
    <div class="flex items-center"><div>は</div></div>
    <div class="flex items-center"><div>ご<ruby>遠慮<rt>えんりょ</rt></ruby>ください。</div></div>
    <div class="flex items-center"><div><ruby>第二事務室<rt>だいにじむしつ</rt></ruby>のコピー<ruby>機<rt>き</rt></ruby>はA3サイズが<ruby>取<rt>と</rt></ruby>れません。</div></div>
    <div class="flex items-center relative">
      <div>また、4<ruby>階<rt>かい</rt></ruby>の<ruby>資料準備室<rt>しりょうじゅんびしつ</rt></ruby>はカギがかかっていますので、</div>
    </div>
    <div class="flex items-center"><div>となりの<ruby>資料管理室<rt>しりょうかんりしつ</rt></ruby>でカギを<ruby>借<rt>か</rt></ruby>りてください。</div></div>

  </div>
</div>
`;

    p16.passageText = m16_html;
    
    // Add Furigana to Questions and Options
    let q = p16.questions[0];
    q.questionText = `問い 今、9時45分で、10時の<ruby>会議<rt>かいぎ</rt></ruby>のためにA3サイズのコピーを40<ruby>枚取<rt>まいと</rt></ruby>りたい。<ruby>間<rt>ま</rt></ruby>に<ruby>合<rt>あ</rt></ruby>うようにコピーを<ruby>取<rt>と</rt></ruby>るには、どうすれば<ruby>一番<rt>いちばん</rt></ruby>よいか。`;
    
    q.options[0] = `5<ruby>階<rt>かい</rt></ruby>の<ruby>第一事務室<rt>だいいちじむしつ</rt></ruby>に行き、コピーを<ruby>取<rt>と</rt></ruby>る。`;
    q.options[1] = `5<ruby>階<rt>かい</rt></ruby>の<ruby>第二事務室<rt>だいにじむしつ</rt></ruby>に行き、コピーを<ruby>取<rt>と</rt></ruby>る。`;
    q.options[2] = `4<ruby>階<rt>かい</rt></ruby>の<ruby>資料管理室<rt>しりょうかんりしつ</rt></ruby>でカギを借り、<ruby>資料準備室<rt>しりょうじゅんびしつ</rt></ruby>でコピーを<ruby>取<rt>と</rt></ruby>る。`;
    q.options[3] = `<ruby>修理<rt>しゅうり</rt></ruby>の後、このコピー<ruby>機<rt>き</rt></ruby>を使う。`;
    
    // Need to also update the correctOption text if it exists
    if (q.correctOption) {
      q.correctOption.text = q.options[q.correctOption.index];
    }
    
    let c = skm.chapters.find(ch => ch.passages.includes(p16));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  } else {
    console.log("Could not find Mondai 16.");
  }
}

fixMondai16Furigana();
