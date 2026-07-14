const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai16Layout() {
  console.log("Fixing Mondai 16 Layout...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p16 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第2部 問題16');
  if (p16) {
    const m16_html = `
<div class="mb-4 text-lg">職場でコピーを取ろうとしたら、コピー機に以下のようなメモが貼ってあった。</div>

<div class="flex my-6 w-full max-w-3xl mx-auto">
  <!-- The Grey Box -->
  <div class="bg-[#dcdcdc] dark:bg-gray-700 border border-gray-600 dark:border-gray-400 p-6 md:p-10 shadow-sm flex-1 font-serif text-lg leading-[2.2] tracking-wide relative">
    
    <div class="flex justify-between items-center"><div class="text-xl font-bold">このコピー機は故障中です。</div></div>
    <div class="flex justify-between items-center"><div>修理の人が11時ごろ来ます。</div></div>
    <div class="flex justify-between items-center"><div>修理が問題なく終われば、午後から使えるようになります。</div></div>
    
    <div class="h-4"></div> <!-- Gap -->
    
    <div class="flex justify-between items-center"><div>お急ぎの方は、5階の第一事務室か、5階の第二事務室か、</div></div>
    <div class="flex justify-between items-center relative">
      <div>4階の資料準備室のものをお使いください。</div>
      <div class="absolute -right-12">5</div>
    </div>
    <div class="flex justify-between items-center"><div>ただし、5階の第一事務室は、混んでいるので、20枚以上のコピー</div></div>
    <div class="flex justify-between items-center"><div>は</div></div>
    <div class="flex justify-between items-center"><div>ご遠慮ください。</div></div>
    <div class="flex justify-between items-center"><div>第二事務室のコピー機はA3サイズが取れません。</div></div>
    <div class="flex justify-between items-center relative">
      <div>また、4階の資料準備室はカギがかかっていますので、</div>
      <div class="absolute -right-12">10</div>
    </div>
    <div class="flex justify-between items-center"><div>となりの資料管理室でカギを借りてください。</div></div>

  </div>
</div>
`;

    p16.passageText = m16_html;
    p16.passageLayout = 'html'; // Set to html to allow proper rendering!
    
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

fixMondai16Layout();
