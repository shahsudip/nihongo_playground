const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function removeInlineNotes() {
  console.log("Removing inline note markers...");
  let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  const match = data.match(/export const sampleBooks = (\[.*\]);/s);
  if (match) {
    let books = eval(match[1]);
    let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
    let changedChapters = new Set();

    skmBook.chapters.forEach(c => {
      c.passages.forEach(p => {
        let before = p.passageText;
        // Remove (注1), （注1）, etc from the passageText only
        p.passageText = p.passageText.replace(/[(（]注\d+[)）]/g, '');
        
        if (before !== p.passageText) {
          changedChapters.add(c);
          console.log(`Removed inline note marker in: ${p.title}`);
        }
      });
    });

    if (changedChapters.size > 0) {
      const serialized = JSON.stringify(books, null, 2);
      fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
      console.log('Fixed book_data.jsx locally.');

      const bookDocRef = db.collection('books').doc(skmBook.id);
      for (const c of changedChapters) {
        const chapterDocRef = bookDocRef.collection('chapters').doc(c.id);
        await chapterDocRef.update({ passages: c.passages });
        console.log(`Pushed fix to Firebase for chapter ${c.id}`);
      }
    }
  }
}

removeInlineNotes();
