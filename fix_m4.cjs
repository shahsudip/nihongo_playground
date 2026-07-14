const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai4() {
  console.log("Fixing Mondai 4...");
  let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  const match = data.match(/export const sampleBooks = (\[.*\]);/s);
  if (match) {
    let books = eval(match[1]);
    let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
    let p4 = skmBook.chapters[0].passages.find(p => p.title.includes('問題4'));
    
    if (p4) {
      // The text that was swallowed
      const swallowedText1 = "(注1)から「余裕を持って来るように。」と言われたばかりなのに、ちっとも進歩しない。ああ、自分が怒られている様子が目に浮かぶ(注2)。";
      const swallowedText2 = "駅で大事なことに気がついた。今日は日曜日だったのだ。目覚まし時計が鳴らなかったのも、バスが平日の時刻表通りに来なかったのも、今日が日曜日だからだったのだ。よかった。怒られないで済む。しかし、ずいぶん無駄な心配をしてしまった。私は得をしたような、損をしたような複雑な気持ちで家までの道を30分歩いて帰った。";
      
      // Remove it from notes
      p4.passageNotes = p4.passageNotes
         .replace('<p>' + swallowedText1 + '</p>', '')
         .replace('<p>' + swallowedText2 + '</p>', '')
         .replace('<p>[Pasted Text: 12 lines]</p>', '')
         .trim();
      
      // The part "(注1)" before "から" is actually the citation indicator in the text.
      // Usually it's "上司(注1)から". Let's check what ends the passageText.
      if (p4.passageText.endsWith('上司')) {
         p4.passageText += swallowedText1 + '\n\n' + swallowedText2;
      } else {
         p4.passageText += '\n\n' + swallowedText1 + '\n\n' + swallowedText2;
      }

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

fixMondai4();
