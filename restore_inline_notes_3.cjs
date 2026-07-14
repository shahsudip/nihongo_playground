const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function restoreSub() {
  console.log("Restoring remaining notes...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let curSkm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let changedChapters = new Set();

  const fixes = [
    { title: "29", find: 'おにぎり<span class="text-xs">\n</span>', replace: 'おにぎり<sup class="text-xs text-gray-500 font-normal">(注1)</sup>' },
    { title: "29", find: '具<span class="text-xs"></span>', replace: '具<sup class="text-xs text-gray-500 font-normal">(注2)</sup>' },
    { title: "30", find: '稲作<span class="text-xs"></span>', replace: '稲作<sup class="text-xs text-gray-500 font-normal">(注1)</sup>' },
    { title: "33", find: '宝くじ<span class="text-xs"></span>', replace: '宝くじ<sup class="text-xs text-gray-500 font-normal">(注1)</sup>' },
    { title: "50", find: '彼の書いた原稿や手紙の展示を', replace: '彼の書いた原稿<sup class="text-xs text-gray-500 font-normal">(注1)</sup>や手紙の展示<sup class="text-xs text-gray-500 font-normal">(注2)</sup>を' }
  ];

  fixes.forEach(fix => {
    let p = curSkm.chapters.flatMap(c => c.passages).find(p => p.title.includes(fix.title));
    if (p) {
      if (p.passageText.includes(fix.find) || p.passageText.includes(fix.find.replace('\n', ''))) {
        let actualFind = p.passageText.includes(fix.find) ? fix.find : fix.find.replace('\n', '');
        p.passageText = p.passageText.replace(actualFind, fix.replace);
        let c = curSkm.chapters.find(c => c.passages.includes(p));
        changedChapters.add(c);
        console.log(`Restored ${fix.title}`);
      } else {
        console.log(`Could not find ${fix.find} in ${fix.title}`);
      }
    }
  });

  // Restore 58 from saved_svgs.json
  let svgs = JSON.parse(fs.readFileSync('saved_svgs.json', 'utf8'));
  let p58 = curSkm.chapters.flatMap(c => c.passages).find(p => p.title.includes('58'));
  if (p58 && svgs['58']) {
    p58.passageText = svgs['58'];
    let c = curSkm.chapters.find(c => c.passages.includes(p58));
    changedChapters.add(c);
    console.log(`Restored 58 from saved_svgs.json`);
  }

  if (changedChapters.size > 0) {
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(curSkm.id);
    for (const c of changedChapters) {
      const chapterDocRef = bookDocRef.collection('chapters').doc(c.id);
      await chapterDocRef.update({ passages: c.passages });
      console.log(`Pushed fix to Firebase for chapter ${c.id}`);
    }
  } else {
    console.log("No notes restored.");
  }
}

restoreSub();
