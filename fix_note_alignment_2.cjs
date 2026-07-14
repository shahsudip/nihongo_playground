const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixNoteAlignment() {
  console.log("Fixing note alignment to match the screenshot (baseline alignment)...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let changedChapters = new Set();

  skm.chapters.forEach(c => {
    c.passages.forEach(p => {
      let before = p.passageText;
      if (p.passageText) {
        // Find all instances of the sup tags and replace them with span
        p.passageText = p.passageText.replace(/<sup class="text-\[0\.8em\] align-super opacity-80 font-normal">(\(注\d+\))<\/sup>/g, '<span class="text-[0.75em] opacity-80 font-normal align-baseline">$1</span>');
        // Catch any old ones that didn't get updated properly if they exist
        p.passageText = p.passageText.replace(/<sup class="text-xs text-gray-500 font-normal">(\(注\d+\))<\/sup>/g, '<span class="text-[0.75em] opacity-80 font-normal align-baseline">$1</span>');
        
        if (before !== p.passageText) {
          changedChapters.add(c);
          console.log(`Updated note alignment in: ${p.title}`);
        }
      }
    });
  });

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
    console.log("No notes to update.");
  }
}

fixNoteAlignment();
