const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai8Paragraph() {
  console.log("Fixing Mondai 8 paragraph breaks...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p8 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第1部 問題8');
  if (p8) {
    let newText = p8.passageText;
    
    // Remove the newline between 'であると言っています。' and '整理は'
    // It looks like: であると言っています。\n\n整理は
    newText = newText.replace('であると言っています。\\n\\n整理は', 'であると言っています。整理は');

    p8.passageText = newText;
    
    let c = skm.chapters.find(ch => ch.passages.includes(p8));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  } else {
    console.log("Could not find Mondai 8.");
  }
}

fixMondai8Paragraph();
