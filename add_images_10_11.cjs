const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function addImages() {
  console.log("Adding imageSrc to Mondai 10 and 11...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let changedChapters = new Set();

  let p10 = skm.chapters.flatMap(c => c.passages).find(p => p.title.includes('問題10'));
  if (p10 && !p10.imageSrc) {
    p10.imageSrc = "/images/image10.jpg";
    let c = skm.chapters.find(c => c.passages.includes(p10));
    changedChapters.add(c);
    console.log(`Added imageSrc to ${p10.title}`);
  }

  let p11 = skm.chapters.flatMap(c => c.passages).find(p => p.title.includes('問題11'));
  if (p11 && !p11.imageSrc) {
    p11.imageSrc = "/images/image11.jpg";
    let c = skm.chapters.find(c => c.passages.includes(p11));
    changedChapters.add(c);
    console.log(`Added imageSrc to ${p11.title}`);
  }

  if (changedChapters.size > 0) {
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    for (const c of changedChapters) {
      const chapterDocRef = bookDocRef.collection('chapters').doc(c.id);
      await chapterDocRef.update({ passages: c.passages });
      console.log(`Pushed fix to Firebase for chapter ${c.id}`);
    }
  } else {
    console.log("Images already set.");
  }
}

addImages();
