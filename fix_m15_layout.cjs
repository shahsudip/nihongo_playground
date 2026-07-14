const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai15Layout() {
  console.log("Fixing Mondai 15 Layout...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p15 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第2部 問題15');
  if (p15) {
    const m15_html = `
<div class="overflow-x-auto pb-4 w-full flex justify-center">
  <div class="bg-gray-100 dark:bg-gray-800 border-2 border-gray-400 p-6 md:p-10 shadow-sm text-lg leading-[2.5] font-serif" style="writing-mode: vertical-rl; text-orientation: upright; height: 600px; max-height: 70vh;">
    <div class="mt-4 text-xl">拝啓</div>
    <div class="mt-4" style="text-indent: 1em;">紅葉<span class="text-[0.75em] opacity-80 font-normal" style="text-orientation: sideways;">(注1)</span>がきれいな季節になってきました。皆さま、お元気でお過ごしのことと思います。</div>
    <div class="mt-4" style="text-indent: 1em;">先日は久しぶりにチャンさんにお会いすることができて、とてもうれしかったです。仕事も順調に進んでいるとうかがい、安心しました。また、ソナちゃんがかわいい小学生になっていてびっくりしました。</div>
    <div class="mt-4" style="text-indent: 1em;">さて、その時にお話しした本を別便<span class="text-[0.75em] opacity-80 font-normal" style="text-orientation: sideways;">(注2)</span>でお送りしました。これは、私にはもう必要ないので、さしあげます。どうぞ受け取ってください。チャンさんのお仕事の役に立てばうれしいです。</div>
    <div class="mt-4" style="text-indent: 1em;">これから寒くなってきますが、どうぞお体にお気をつけてお過ごしください。</div>
    <div class="mt-4" style="margin-top: auto; text-align: right; padding-bottom: 2em;">敬具</div>
    <div class="mt-6 mb-4" style="text-align: right; letter-spacing: 0.1em;">二〇一四年十月二十五日</div>
    <div class="mt-2 mb-12" style="text-align: right; padding-bottom: 4em;">高木まなみ</div>
    <div class="text-xl" style="padding-top: 2em;">チャン・ジユン様</div>
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

fixMondai15Layout();
