const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixQuestionUnderlines() {
  console.log("Fixing Question Underlines...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  // Fix Mondai 8 Question
  let p8 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第1部 問題8');
  if (p8 && p8.questions && p8.questions[0]) {
     p8.questions[0].questionText = '問い この文章を書いた人は、<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400">片づけをするのに何が一番大切だと言っているか</span>。';
     let c = skm.chapters.find(ch => ch.passages.includes(p8));
     const bookDocRef = db.collection('books').doc(skm.id);
     await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
  }

  // Fix Mondai 13 Question
  let p13 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第1部 問題13');
  if (p13 && p13.questions && p13.questions[0]) {
     p13.questions[0].questionText = '問い <span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400">この文章を書いた人の気持ち</span>を説明しているのはどれか。';
     let c = skm.chapters.find(ch => ch.passages.includes(p13));
     const bookDocRef = db.collection('books').doc(skm.id);
     await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
  }

  const serialized = JSON.stringify(curBooks, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
  console.log('Fixed book_data.jsx locally and pushed to Firebase.');
}

fixQuestionUnderlines();
