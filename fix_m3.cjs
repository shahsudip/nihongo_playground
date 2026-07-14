const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai3() {
  console.log("Fixing Mondai 3 missing notes...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p3 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第1部 問題3');
  if (p3) {
    let newText = p3.passageText;
    
    // Add inline note marker
    newText = newText.replace('鉄鉱石など', '鉄鉱石<span class="text-[0.75em] opacity-80 font-normal align-baseline">(注1)</span>など');

    if (p3.passageText !== newText || !p3.passageNotes) {
      p3.passageText = newText;
      p3.passageNotes = '<p>(注1)鉄鉱石：鉄の原料となる石</p>';
      
      let c = skm.chapters.find(ch => ch.passages.includes(p3));
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
    console.log("Could not find Mondai 3.");
  }
}

fixMondai3();
