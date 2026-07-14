const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixPart2() {
  console.log("Fixing Part 2 Chaos...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let c2 = skm.chapters.find(c => c.id === 'part-2');
  
  // Deduplicate and filter out junk
  let validPassages = [];
  let seenTitles = new Set();
  
  c2.passages.forEach(p => {
    if (p.title === '20') return; // skip junk
    if (!seenTitles.has(p.title)) {
      seenTitles.add(p.title);
      validPassages.push(p);
    }
  });

  // Now validPassages has 14, 16, 17, 18, 19, 20
  
  // Construct Mondai 15
  const m15_html = `
<div class="bg-gray-100 dark:bg-gray-800 border-2 border-gray-400 p-8 shadow-sm mx-auto max-w-2xl text-lg leading-10 font-serif flex justify-end" style="writing-mode: vertical-rl; text-orientation: upright; height: 500px;">
  <div class="mt-4 text-xl">拝啓</div>
  <div class="mt-4" style="text-indent: 1em;">紅葉<span class="text-[0.75em] opacity-80 font-normal" style="text-orientation: sideways;">(注1)</span>がきれいな季節になってきました。皆さま、お元気でお過ごしのことと思います。</div>
  <div class="mt-4" style="text-indent: 1em;">先日は久しぶりにチャンさんにお会いすることができて、とてもうれしかったです。仕事も順調に進んでいるとうかがい、安心しました。また、ソナちゃんがかわいい小学生になっていてびっくりしました。</div>
  <div class="mt-4" style="text-indent: 1em;">さて、その時にお話しした本を別便<span class="text-[0.75em] opacity-80 font-normal" style="text-orientation: sideways;">(注2)</span>でお送りしました。これは、私にはもう必要ないので、さしあげます。どうぞ受け取ってください。チャンさんのお仕事の役に立てばうれしいです。</div>
  <div class="mt-4" style="text-indent: 1em;">これから寒くなってきますが、どうぞお体にお気をつけてお過ごしください。</div>
  <div class="mt-4 text-right" style="margin-top: auto; padding-bottom: 2em;">敬具</div>
  <div class="mt-4 mb-4" style="text-align: right; letter-spacing: 0.1em;">二〇一四年十月二十五日</div>
  <div class="mt-2 mb-12" style="text-align: right; padding-bottom: 4em;">高木まなみ</div>
  <div class="text-xl" style="padding-top: 2em;">チャン・ジユン様</div>
</div>
`;

  const m15 = {
    title: '第2部 問題15',
    passageText: m15_html,
    passageLayout: 'html',
    passageNotes: '<p>(注1)紅葉：秋になって木の葉が赤くなること</p><p>(注2)別便：別に送ったもの</p>',
    questions: [
      {
        questionText: '問い この手紙の内容について、正しいのはどれか。',
        options: [
          '高木さんはチャンさんに、自分の本をあげると言っている。',
          '高木さんはチャンさんに、自分の本を貸してあげると言っている。',
          '高木さんはチャンさんの子どもに、本を受け取ってほしいと言っている。',
          '高木さんはチャンさんに、本を受け取りに来てほしいと言っている。'
        ],
        correctAnswerIndex: 0,
        explanation: '「これは、私にはもう必要ないので、さしあげます」と書いてあるため、1が正解。'
      }
    ]
  };

  // Insert 15 after 14
  let newPassages = [];
  validPassages.forEach(p => {
    newPassages.push(p);
    if (p.title === '第2部 問題14') {
      newPassages.push(m15);
    }
  });

  c2.passages = newPassages;

  const serialized = JSON.stringify(curBooks, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
  console.log('Fixed book_data.jsx locally.');

  const bookDocRef = db.collection('books').doc(skm.id);
  await bookDocRef.collection('chapters').doc(c2.id).update({ passages: c2.passages });
  console.log('Pushed fix to Firebase for chapter part-2');
}

fixPart2();
