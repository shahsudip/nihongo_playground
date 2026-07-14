const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function addUnderlinesM2() {
  console.log("Adding underlines to Mondai 2...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p2 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第1部 問題2');
  if (p2) {
    let newText = p2.passageText;
    
    // Replace strings with underlined HTML equivalents based on the image
    newText = newText.replace('徒歩で', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">A</span>徒歩</span>で');
    newText = newText.replace('到着。', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">B</span>到着</span>。');
    newText = newText.replace('販売、', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">C</span>販売</span>、');
    newText = newText.replace('修理、', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">D</span>修理</span>、');

    if (p2.passageText !== newText) {
      p2.passageText = newText;
      let c = skm.chapters.find(ch => ch.passages.includes(p2));
      const serialized = JSON.stringify(curBooks, null, 2);
      fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
      console.log('Fixed book_data.jsx locally.');

      const bookDocRef = db.collection('books').doc(skm.id);
      await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
      console.log(`Pushed fix to Firebase for chapter ${c.id}`);
    } else {
      console.log("No changes made. Text might already be replaced.");
    }
  } else {
    console.log("Could not find Mondai 2.");
  }
}

addUnderlinesM2();
