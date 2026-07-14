const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai15Exact() {
  console.log("Fixing Mondai 15 Exact Layout...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p15 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第2部 問題15');
  if (p15) {
    const m15_html = `
<div class="flex justify-center my-6 w-full overflow-x-auto pb-8 pt-4">
  <div class="relative" style="writing-mode: vertical-rl; font-family: serif;">
    
    <!-- The Grey Box -->
    <div class="bg-[#dcdcdc] dark:bg-gray-700 border border-gray-600 dark:border-gray-400 p-4 shadow-sm" style="height: 520px; line-height: 2.2; letter-spacing: 0.05em; font-size: 1.1rem;">
      
      <!-- Line 1 -->
      <div>拝啓</div>
      <!-- Line 2 -->
      <div>　紅葉<span class="text-[0.75em] opacity-80">(注1)</span>がきれいな季節になってきました。皆さ</div>
      <!-- Line 3 -->
      <div>ま、お元気でお過ごしのことと思います。</div>
      <!-- Line 4 -->
      <div>　先日は久しぶりにチャンさんにお会いすること</div>
      <!-- Line 5 -->
      <div>ができて、とてもうれしかったです。仕事も順調</div>
      <!-- Line 6 -->
      <div>に進んでいるとうかがい、安心しました。また、</div>
      <!-- Line 7 -->
      <div>ソナちゃんがかわいい小学生になっていてびっく</div>
      <!-- Line 8 -->
      <div>りしました。</div>
      <!-- Line 9 -->
      <div>　さて、その時にお話しした本を別便<span class="text-[0.75em] opacity-80">(注2)</span>でお送り</div>
      <!-- Line 10 -->
      <div>しました。これは、私にはもう必要ないので、さ</div>
      <!-- Line 11 -->
      <div>しあげます。どうぞ受け取ってください。チャン</div>
      <!-- Line 12 -->
      <div>さんのお仕事の役に立てばうれしいです。</div>
      <!-- Line 13 -->
      <div>　これから寒くなってきますが、どうぞお体にお</div>
      <!-- Line 14 -->
      <div>気をつけてお過ごしください。</div>
      <!-- Line 15 -->
      <div class="text-right pb-2">敬具</div>
      <!-- Line 16 -->
      <div class="pt-4">二〇一四年十月二十五日</div>
      <!-- Line 17 -->
      <div class="text-right pb-4">高木まなみ</div>
      <!-- Line 18 -->
      <div class="pt-2">チャン・ジユン様</div>
      
    </div>

    <!-- The Line Numbers (Outside the box at the bottom) -->
    <!-- In vertical-rl, absolute positioning with bottom/left/right works based on the container -->
    <div class="absolute" style="bottom: -1.5rem; right: calc(4 * 2.2em + 1em);">5</div>
    <div class="absolute" style="bottom: -1.5rem; right: calc(9 * 2.2em + 1.2em);">10</div>
    <div class="absolute" style="bottom: -1.5rem; right: calc(14 * 2.2em + 1.4em);">15</div>

  </div>
</div>
`;

    p15.passageText = m15_html;
    
    let c = skm.chapters.find(ch => ch.passages.includes(p15));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  } else {
    console.log("Could not find Mondai 15.");
  }
}

fixMondai15Exact();
