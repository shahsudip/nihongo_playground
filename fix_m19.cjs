const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function ruby(kanji, kana) {
  return `<ruby>${kanji}<rt>${kana}</rt></ruby>`;
}

async function fixM19() {
  console.log("Fixing Mondai 19 Full Text & Furigana...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p19 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第2部 問題19');

  if (p19) {
    let textHTML = `
<div class="font-serif text-lg leading-loose tracking-wide">
  <p class="mb-4 indent-4">日本では<ruby>幼稚園<rt>ようちえん</rt></ruby>や小学校で「おかしも」という<ruby>言葉<rt>ことば</rt></ruby>を習います。「おかしも」とはどのような意味でしょうか。「お<ruby>菓子<rt>かし</rt></ruby>も」と書いて「肉や<ruby>野菜<rt>やさい</rt></ruby>だけでなく『お<ruby>菓子<rt>かし</rt></ruby>も』食べましょう。」という意味でしょうか。<ruby>実<rt>じつ</rt></ruby>は、これは<ruby>災害<rt>さいがい</rt></ruby><span class="text-sm">(注1)</span>や<ruby>事故<rt>じこ</rt></ruby>などが起きたときに、<ruby>安全<rt>あんぜん</rt></ruby>に<ruby>避難<rt>ひなん</rt></ruby>するための注意を一つにした<ruby>言葉<rt>ことば</rt></ruby>です。「<ruby>押<rt>お</rt></ruby>さない、<ruby>駆<rt>か</rt></ruby>けない<span class="text-sm">(注2)</span>、しゃべらない<span class="text-sm">(注3)</span>、<ruby>戻<rt>もど</rt></ruby>らない」という四つの<ruby>言葉<rt>ことば</rt></ruby>の<ruby>初<rt>はじ</rt></ruby>めのひらがなを<ruby>並<rt>なら</rt></ruby>べたものです。</p>

  <p class="mb-4 indent-4">小学校で一年に何度も行われる<ruby>避難訓練<rt>ひなんくんれん</rt></ruby>では、教室を出て<ruby>校庭<rt>こうてい</rt></ruby>に<ruby>逃<rt>に</rt></ruby>げる<ruby>練習<rt>れんしゅう</rt></ruby>をするのですが、そのとき<ruby>子<rt>こ</rt></ruby>どもたちが<ruby>素早<rt>すばや</rt></ruby>く<ruby>避難<rt>ひなん</rt></ruby>できるように、先生は「『おかしも』ですよ。」と何度も声をかけます。一年に何度も、<ruby>避難訓練<rt>ひなんくんれん</rt></ruby>のたびにこの<ruby>言葉<rt>ことば</rt></ruby>を<ruby>耳<rt>みみ</rt></ruby>にするので、<span class="underline underline-offset-4 decoration-black">日本の子どもたちで「おかしも」の意<br/>味を知らない<ruby>子<rt>こ</rt></ruby>どもはいないほどです。</span></p>

  <p class="mb-8 indent-4"><ruby>本当<rt>ほんとう</rt></ruby>に何かがあったときには、この<ruby>訓練<rt>くんれん</rt></ruby>で「おかしも」を身につけたおかげで<ruby>子<rt>こ</rt></ruby>どもたちはこわがったりあわてたりせずに<ruby>冷静<rt>れいせい</rt></ruby>に<ruby>避難<rt>ひなん</rt></ruby>できるというわけです。「おかしも」は<ruby>子<rt>こ</rt></ruby>どもたちを<ruby>安全<rt>あんぜん</rt></ruby>に<ruby>避難<rt>ひなん</rt></ruby>させるために考えられた<ruby>工夫<rt>くふう</rt></ruby>なのです。</p>
</div>
`;

    let notesHTML = `
<div class="space-y-2 mt-8 text-sm text-gray-700 dark:text-gray-300">
  <p>(注1)<ruby>災害<rt>さいがい</rt></ruby>：<ruby>地震<rt>じしん</rt></ruby>・<ruby>台風<rt>たいふう</rt></ruby>などの大きな<ruby>被害<rt>ひがい</rt></ruby>が出る出来事</p>
  <p>(注2)<ruby>駆<rt>か</rt></ruby>ける：走る</p>
  <p>(注3)しゃべる：話す</p>
</div>
`;

    p19.passageText = textHTML;
    p19.passageNotes = notesHTML;
    p19.passageLayout = 'html';

    let q1 = p19.questions[0];
    q1.questionText = "問1 「おかしも」とは何か。";
    q1.options[0] = `肉や<ruby>野菜<rt>やさい</rt></ruby>だけでなくお<ruby>菓子<rt>かし</rt></ruby>も食べようと<ruby>勧<rt>すす</rt></ruby>める<ruby>言葉<rt>ことば</rt></ruby>`;
    q1.options[1] = `<ruby>避難<rt>ひなん</rt></ruby>するときの注意を<ruby>短<rt>みじか</rt></ruby>くした<ruby>言葉<rt>ことば</rt></ruby>`;
    q1.options[2] = `<ruby>避難訓練<rt>ひなんくんれん</rt></ruby>のとき、教室を出て<ruby>校庭<rt>こうてい</rt></ruby>に<ruby>素早<rt>すばや</rt></ruby>く<ruby>避難<rt>ひなん</rt></ruby>すること`;
    q1.options[3] = `<ruby>避難訓練<rt>ひなんくんれん</rt></ruby>のとき、<ruby>子<rt>こ</rt></ruby>どもたちが<ruby>冷静<rt>れいせい</rt></ruby>に行動すること`;
    if(q1.correctOption) q1.correctOption.text = q1.options[q1.correctOption.index];

    let q2 = p19.questions[1];
    q2.questionText = `問2 <span class="underline underline-offset-4 decoration-black">「日本の子どもたちで「おかしも」の意味を知らない<ruby>子<rt>こ</rt></ruby>どもはいないほどです。」</span>とあるが、それはなぜか。`;
    q2.options[0] = `毎日学校で先生から<ruby>説明<rt>せつめい</rt></ruby>してもらうから。`;
    q2.options[1] = `<ruby>避難訓練<rt>ひなんくんれん</rt></ruby>をするときにはいつもその<ruby>言葉<rt>ことば</rt></ruby>を聞くから。`;
    q2.options[2] = `大人たちが<ruby>工夫<rt>くふう</rt></ruby>して考えた<ruby>言葉<rt>ことば</rt></ruby>だから。`;
    q2.options[3] = `お<ruby>菓子<rt>かし</rt></ruby>に<ruby>似<rt>に</rt></ruby>ている<ruby>言葉<rt>ことば</rt></ruby>だから。`;
    if(q2.correctOption) q2.correctOption.text = q2.options[q2.correctOption.index];

    let c = skm.chapters.find(ch => ch.passages.includes(p19));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  } else {
    console.log("Could not find Mondai 19.");
  }
}

fixM19();
