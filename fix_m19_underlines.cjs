const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixM19Underlines() {
  console.log("Fixing Mondai 19 Underlines...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p19 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第2部 問題19');

  if (p19) {
    p19.passageText = p19.passageText.replaceAll('<span class="underline underline-offset-4 decoration-black">', '<u style="text-underline-offset: 4px; text-decoration-thickness: 1.5px;">').replaceAll('</span></p>', '</u></p>').replaceAll('</span>', '</u>');
    
    let q2 = p19.questions[1];
    q2.questionText = q2.questionText.replaceAll('<span class="underline underline-offset-4 decoration-black">', '<u style="text-underline-offset: 4px; text-decoration-thickness: 1.5px;">').replaceAll('</span>', '</u>');

    let c = skm.chapters.find(ch => ch.passages.includes(p19));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  }
}

fixM19Underlines();
