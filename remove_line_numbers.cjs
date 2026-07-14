const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function removeLineNumbers() {
  console.log("Removing Line Numbers from Mondai 15...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p15 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第2部 問題15');
  if (p15) {
    p15.passageText = p15.passageText.replace(/<!-- The Line Numbers \(Outside the box at the bottom\) -->[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/, '');
    
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

removeLineNumbers();
