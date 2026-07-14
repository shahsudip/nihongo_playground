const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai17() {
  console.log("Rebuilding Mondai 17 Exact Layout & Furigana...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p17 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第2部 問題17');
  if (p17) {
    const m17_html = `
<div class="font-serif text-lg leading-loose tracking-wide">

  <!-- Top Grey Box -->
  <div class="bg-[#dcdcdc] dark:bg-gray-700 border border-gray-500 p-6 mb-8 relative">
    <h3 class="text-2xl font-bold text-center mb-6"><ruby>親子丼<rt>おやこどん</rt></ruby>の作り方</h3>

    <div class="flex flex-col md:flex-row justify-between pl-4 md:pl-12">
      <!-- Left Column: Ingredients -->
      <div class="mb-6 md:mb-0 md:w-1/2">
        <h4 class="font-bold mb-4">材料(2人分)</h4>
        <ul class="space-y-2">
          <li>ごはん・・・どんぶり2<ruby>杯分<rt>はいぶん</rt></ruby></li>
          <li>とり<ruby>肉<rt>にく</rt></ruby>・・・1枚(<ruby>約<rt>やく</rt></ruby>150g)</li>
          <li>たまご・・・4コ</li>
          <li>たまねぎ・・・1/4コ</li>
          <li>だし<ruby>汁<rt>じる</rt></ruby>・・・カップ1杯(200cc)</li>
        </ul>
      </div>

      <!-- Right Column: Seasonings -->
      <div class="md:w-1/2 relative">
        <h4 class="font-bold mb-4"><ruby>調味料<rt>ちょうみりょう</rt></ruby></h4>
        <ul class="space-y-2 relative z-10">
          <li>みりん・・・大さじ2</li>
          <li><ruby>酒<rt>さけ</rt></ruby>・・・大さじ1</li>
          <li>しょうゆ・・・大さじ2</li>
          <li>さとう・・・大さじ1</li>
        </ul>
        <!-- Illustration -->
        <div class="absolute -right-4 top-4 text-7xl md:text-8xl opacity-90 select-none">🍚</div>
      </div>
    </div>
  </div>

  <!-- Instructions Section -->
  <div class="mb-6">
    <div class="inline-block border border-gray-600 dark:border-gray-400 px-4 py-1 mb-6 font-bold bg-white dark:bg-gray-900 shadow-sm">
      作り方
    </div>

    <!-- Step 1 -->
    <div class="flex justify-between items-start mb-6">
      <div class="flex-grow pr-4">
        <span class="mr-2">1.</span>まず、とり肉を<ruby>一口大<rt>ひとくちだい</rt></ruby><span class="text-sm">(注1)</span>に切り、たまねぎをうす切りにします。<br/>
        <span class="ml-6">ボールにたまごを<ruby>割<rt>わ</rt></ruby>って混ぜておきます。</span>
      </div>
      <div class="text-5xl select-none flex space-x-2">🧅🔪</div>
    </div>

    <!-- Step 2 -->
    <div class="flex justify-between items-start mb-6">
      <div class="flex-grow pr-4">
        <span class="mr-2">2.</span>なべにだし<ruby>汁<rt>じる</rt></ruby><span class="text-sm">(注2)</span>、みりん、<ruby>酒<rt>さけ</rt></ruby>、しょうゆ、<br/>
        <span class="ml-6">さとうを入れて火にかけます。</span>
      </div>
      <div class="text-5xl select-none flex space-x-2">🥘🥄</div>
    </div>

    <!-- Step 3 -->
    <div class="flex justify-between items-start mb-6">
      <div class="flex-grow pr-4">
        <span class="mr-2">3.</span><ruby>沸騰<rt>ふっとう</rt></ruby>したら、たまねぎ、とり肉を入れて、<br/>
        <span class="ml-6"><ruby>中火<rt>ちゅうび</rt></ruby>～<ruby>弱火<rt>よわび</rt></ruby>で<ruby>煮<rt>に</rt></ruby>ます。</span>
      </div>
      <div class="text-5xl select-none">♨️🥘</div>
    </div>

    <!-- Step 4 -->
    <div class="flex justify-between items-start mb-6">
      <div class="flex-grow pr-4">
        <span class="mr-2">4.</span>とり肉が<ruby>煮<rt>に</rt></ruby>えたら、たまごを<ruby>回<rt>まわ</rt></ruby>し入れます<span class="text-sm">(注3)</span>。<br/>
        <span class="ml-6"><ruby>固<rt>かた</rt></ruby>まり始めたら、火をとめます。</span>
      </div>
      <div class="text-5xl select-none">🥣🍳</div>
    </div>

    <!-- Step 5 -->
    <div class="flex justify-between items-start mb-6">
      <div class="flex-grow pr-4">
        <span class="mr-2">5.</span>ごはんの上にのせて、出来あがり！
      </div>
    </div>
  </div>

  <!-- Note Box -->
  <div class="inline-block border border-gray-600 dark:border-gray-400 px-4 py-1 font-bold bg-white dark:bg-gray-900 shadow-sm mb-4 mt-2">
    ここに注意！
  </div>
  <div class="mb-8">
    <ruby>最後<rt>さいご</rt></ruby>にたまごを入れたら、あまり混ぜないこと。そして長く<ruby>煮<rt>に</rt></ruby>ないこと。
  </div>

</div>
`;

    const m17_notes = `
<div class="space-y-2">
  <p>(注1)<ruby>一口大<rt>ひとくちだい</rt></ruby>：口に入るくらいの大きさ</p>
  <p>(注2)だし<ruby>汁<rt>じる</rt></ruby>：こんぶやかつおぶしで作ったスープ</p>
  <p>(注3)<ruby>回<rt>まわ</rt></ruby>し入れる：まるをかくようにして入れる</p>
</div>
`;

    p17.passageText = m17_html;
    p17.passageNotes = m17_notes;
    p17.passageLayout = 'html';
    
    let c = skm.chapters.find(ch => ch.passages.includes(p17));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  } else {
    console.log("Could not find Mondai 17.");
  }
}

fixMondai17();
