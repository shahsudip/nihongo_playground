const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixDistribution() {
  console.log("Loading book_data...");
  const content = fs.readFileSync('./src/data/book_data.jsx', 'utf8');
  const match = content.match(/export const sampleBooks = (\[.*\]);/s);
  
  let sampleBooks = eval(match[1]);
  const book = sampleBooks.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  let allPassages = [];
  book.chapters.forEach(c => {
    c.passages.forEach(p => {
      const m1 = p.title.match(/問題\s*(\d+)/);
      const m2 = p.title.match(/(?:^|\b)(\d+)(?:\)|\b|$)/);
      const num = m1 ? parseInt(m1[1]) : (m2 ? parseInt(m2[1]) : 999);
      p._sortNum = num;
      allPassages.push(p);
    });
  });

  allPassages.sort((a, b) => a._sortNum - b._sortNum);
  allPassages = allPassages.filter(p => !(p._sortNum === 25 && p.passageText.length < 50));

  const ch1 = [], ch2 = [], ch3 = [], ch4 = [];
  allPassages.forEach(p => {
    const n = p._sortNum;
    delete p._sortNum;
    
    if (n >= 1 && n <= 13) {
      ch1.push(p);
    } else if (n >= 14 && n <= 20) {
      ch2.push(p);
    } else if (n >= 21 && n <= 28) {
      ch3.push(p);
    } else if (n >= 29) {
      ch4.push(p);
    }
  });

  book.chapters[0].passages = ch1;
  book.chapters[1].passages = ch2;
  book.chapters[2].passages = ch3;
  book.chapters[3].passages = ch4;

  // Restore Titles correctly
  book.chapters[0].title = "第1部 基礎力をつけよう";
  book.chapters[0].description = "Mastering the basics";
  book.chapters[1].title = "第2部 いろいろな文章を読もう";
  book.chapters[1].description = "Reading different kinds of text";
  book.chapters[2].title = "第3部 広告・お知らせなどから情報を探そう";
  book.chapters[2].description = "Finding out what you need to know from advertising, public notices and similar texts";
  book.chapters[3].title = "第4部 実戦問題";
  book.chapters[3].description = "Practical Exercises";

  const oldIds = book.chapters.map(c => c.id);
  book.chapters[0].id = 'part-1';
  book.chapters[1].id = 'part-2';
  book.chapters[2].id = 'part-3';
  book.chapters[3].id = 'part-4';

  console.log(`NEW COUNTS -> Part 1: ${ch1.length}, Part 2: ${ch2.length}, Part 3: ${ch3.length}, Part 4: ${ch4.length}`);

  const newContent = 'export const sampleBooks = ' + JSON.stringify(sampleBooks, null, 2) + ';\n';
  fs.writeFileSync('./src/data/book_data.jsx', newContent, 'utf8');

  // Push to Firebase
  const bookDocRef = db.collection('books').doc(book.id);
  
  for (const oldId of oldIds) {
    if (oldId.includes('short') || oldId.includes('medium') || oldId.includes('long') || oldId.includes('email')) {
      await bookDocRef.collection('chapters').doc(oldId).delete();
      console.log(`Deleted old Firebase document: ${oldId}`);
    }
  }

  for (const chapter of book.chapters) {
    const chapterDocRef = bookDocRef.collection('chapters').doc(chapter.id);
    await chapterDocRef.set({
      id: chapter.id,
      title: chapter.title,
      type: chapter.type,
      description: chapter.description,
      passages: chapter.passages
    });
    console.log(`Pushed to Firebase: ${chapter.id}`);
  }
  
  console.log("Successfully redistributed and pushed!");
}

fixDistribution();
