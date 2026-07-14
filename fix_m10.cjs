const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai10() {
  console.log("Fixing Mondai 10...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p10 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第1部 問題10');
  if (p10) {
    p10.passageLayout = 'html';
    
    // The beautiful SVG clock
    const svgClock = `
<div class="float-right ml-6 mb-4 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 w-40 flex flex-col items-center">
  <svg width="100" height="180" viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
    <!-- Top decorative piece -->
    <path d="M 30 20 L 50 5 L 70 20 Z" fill="#8B4513" stroke="#5C2E0B" stroke-width="2"/>
    <circle cx="50" cy="5" r="4" fill="#D2B48C"/>
    
    <!-- Main Clock Body -->
    <path d="M 20 20 L 80 20 L 90 70 L 70 160 L 30 160 L 10 70 Z" fill="#A0522D" stroke="#5C2E0B" stroke-width="3"/>
    
    <!-- Inner face rim -->
    <circle cx="50" cy="55" r="28" fill="#FDF5E6" stroke="#DAA520" stroke-width="4"/>
    
    <!-- Clock Hands & Center -->
    <circle cx="50" cy="55" r="3" fill="#333"/>
    <line x1="50" y1="55" x2="50" y2="35" stroke="#333" stroke-width="2" stroke-linecap="round"/>
    <line x1="50" y1="55" x2="65" y2="55" stroke="#333" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Clock Numbers (simplified markers) -->
    <line x1="50" y1="30" x2="50" y2="35" stroke="#333" stroke-width="2"/>
    <line x1="50" y1="80" x2="50" y2="75" stroke="#333" stroke-width="2"/>
    <line x1="25" y1="55" x2="30" y2="55" stroke="#333" stroke-width="2"/>
    <line x1="75" y1="55" x2="70" y2="55" stroke="#333" stroke-width="2"/>
    
    <!-- Pendulum Window -->
    <rect x="35" y="100" width="30" height="50" rx="5" fill="#2C1809" stroke="#5C2E0B" stroke-width="2"/>
    
    <!-- Pendulum Rod & Bob -->
    <line x1="50" y1="90" x2="50" y2="135" stroke="#DAA520" stroke-width="2"/>
    <circle cx="50" cy="135" r="8" fill="#DAA520"/>
  </svg>
  <div class="mt-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
    <span class="mr-1">⬅</span> ふりこ
  </div>
</div>
`;

    let newText = p10.passageText;
    
    // Convert to HTML with layout
    newText = `<div class="leading-relaxed whitespace-pre-wrap">${svgClock}${newText}</div>`;
    
    // Add inline notes
    newText = newText.replace('うとうとしていました', 'うとうと<span class="text-[0.75em] opacity-80 font-normal align-baseline">(注1)</span>していました');
    newText = newText.replace('古い柱時計が鳴る', '古い柱時計<span class="text-[0.75em] opacity-80 font-normal align-baseline">(注2)</span>が鳴る');
    newText = newText.replace('時計のふりこも揺れ', '時計のふりこ<span class="text-[0.75em] opacity-80 font-normal align-baseline">(注3)</span>も揺れ');

    // Add A, B, C underlines
    newText = newText.replace('ところが、次の朝、', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">A</span>ところが</span>、次の朝、');
    newText = newText.replace('「まさか。', '「<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">B</span>まさか</span>。');
    newText = newText.replace('そこで、二人で', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">C</span>そこで</span>、二人で');

    // Add question underline
    newText = newText.replace('私は不思議に思いました。', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400">私は不思議に思いました。</span>');

    p10.passageText = newText;
    
    // Fix Notes formatting if needed
    if (!p10.passageNotes) {
      p10.passageNotes = '<p>(注1)うとうと：眠りが浅い様子</p><p>(注2)柱時計：イラスト参照</p><p>(注3)ふりこ：イラスト参照</p>';
    }
    
    // Make sure question is correct
    if (p10.questions && p10.questions[0]) {
       p10.questions[0].questionText = '問い 私は不思議に思いました。とあるが、なぜか。';
    }

    let c = skm.chapters.find(ch => ch.passages.includes(p10));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  } else {
    console.log("Could not find Mondai 10.");
  }
}

fixMondai10();
