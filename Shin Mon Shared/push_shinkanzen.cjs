const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function pushShinkanzen() {
  console.log("Loading book_data...");
  // We can't import JSX easily in node, so we will extract the JSON using a quick trick
  const content = fs.readFileSync('./src/data/book_data.jsx', 'utf8');
  const match = content.match(/export const sampleBooks = (\[.*\]);/s);
  
  if (!match) {
    console.error("Could not find sampleBooks array");
    return;
  }
  
  // Clean up any trailing commas or unquoted keys if necessary, or just eval it
  // Since it's a JS object export, eval is easiest in this isolated script
  let sampleBooks;
  try {
    sampleBooks = eval(match[1]);
  } catch (e) {
    console.error("Failed to parse sampleBooks", e);
    return;
  }
  
  const book = sampleBooks.find(b => b.id === 'shinkanzen-master-n3-reading');
  if (!book) return;

  console.log(`Pushing ${book.title}...`);
  const bookDocRef = db.collection('books').doc(book.id);
  await bookDocRef.set({
    id: book.id,
    title: book.title,
    description: book.description,
    level: book.level,
    category: book.category,
  });

  for (const chapter of book.chapters) {
    const chapterDocRef = bookDocRef.collection('chapters').doc(chapter.id);
    await chapterDocRef.set({
      id: chapter.id,
      title: chapter.title,
      type: chapter.type,
      description: chapter.description,
      passages: chapter.passages
    });
    console.log(`  Pushed chapter ${chapter.id}`);
  }
  
  console.log("Successfully pushed Shin Kanzen Master to Firestore!");
}

pushShinkanzen();
