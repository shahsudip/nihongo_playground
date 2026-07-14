const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai5() {
  console.log("Fixing Mondai 5...");
  let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  const match = data.match(/export const sampleBooks = (\[.*\]);/s);
  if (match) {
    let books = eval(match[1]);
    let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
    let p5 = skmBook.chapters[0].passages.find(p => p.title.includes('問題5'));
    
    if (p5) {
      // The text that was swallowed
      const swallowedText = "(注1)くる。それがかわいくてしかたがない存在になっているのではないだろうか。";
      
      // Remove it from notes
      p5.passageNotes = p5.passageNotes.replace('<p>' + swallowedText + '</p>', '').trim();
      
      // Usually it's "したう(注1)" then "くる". Let's just append it.
      p5.passageText += swallowedText;

      // Save locally
      const serialized = JSON.stringify(books, null, 2);
      fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
      console.log('Fixed book_data.jsx locally.');

      // Push to Firebase
      const bookDocRef = db.collection('books').doc(skmBook.id);
      const chapterDocRef = bookDocRef.collection('chapters').doc(skmBook.chapters[0].id);
      await chapterDocRef.update({
        passages: skmBook.chapters[0].passages
      });
      console.log('Pushed fix to Firebase.');
    }
  }
}

fixMondai5();
