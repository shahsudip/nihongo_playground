const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function addUnderlines() {
  console.log("Adding underlines to Mondai 1...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p1 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第1部 問題1');
  if (p1) {
    let newText = p1.passageText;
    
    // Replace strings with underlined HTML equivalents
    newText = newText.replace('着るのではないだろうか。', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">①</span>着るのではないだろうか。</span>');
    newText = newText.replace('使いわける。', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">②</span>使いわける。</span>');
    newText = newText.replace('勉強してきた。', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">③</span>勉強してきた。</span>');
    newText = newText.replace('読みやすくなるだろう。', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">④</span>読みやすくなるだろう。</span>');

    if (p1.passageText !== newText) {
      p1.passageText = newText;
      let c = skm.chapters.find(ch => ch.passages.includes(p1));
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
    console.log("Could not find Mondai 1.");
  }
}

addUnderlines();
