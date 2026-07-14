const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai2() {
  console.log("Fixing Mondai 2...");
  let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  const match = data.match(/export const sampleBooks = (\[.*\]);/s);
  if (match) {
    let books = eval(match[1]);
    let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
    let p2 = skmBook.chapters[0].passages.find(p => p.title.includes('問題2'));
    
    if (p2) {
      // The text that was swallowed
      const swallowedText1 = "(注1)や展示・販売、壊れたおもちゃの修理、フリーマーケットなどが行われていた。20分の自由時間で留学生は買い物を楽しむことができた。";
      const swallowedText2 = "11時に見学終了。センターの出口で解散。";
      
      // Remove it from notes
      p2.passageNotes = p2.passageNotes
         .replace('<p>' + swallowedText1 + '</p>', '')
         .replace('<p>' + swallowedText2 + '</p>', '')
         .trim();
      
      p2.passageText += swallowedText1 + '\n\n' + swallowedText2;

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

fixMondai2();
