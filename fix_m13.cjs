const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai13() {
  console.log("Fixing Mondai 13...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p13 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第1部 問題13');
  if (p13) {
    let newText = p13.passageText;
    
    // Fix typo: 満席 -> 満員
    newText = newText.replace('満席になった', '満員になった');

    // Add underlines and letters
    newText = newText.replace('さっそく行ってみた', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">A</span>さっそく</span>行ってみた');
    newText = newText.replace('落ち着いた雰囲気だ', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">B</span>落ち着いた雰囲気だ</span>');
    newText = newText.replace('期待がふくらんだ', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">C</span>期待がふくらんだ</span>');
    newText = newText.replace('やはり私の料理は彼らの料理の後に運ばれてきた', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">D</span>やはり私の料理は彼らの料理の後に運ばれてきた</span>');
    newText = newText.replace('彼らに先に注文されたからだ', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">E</span>彼らに先に注文されたからだ</span>');

    p13.passageText = newText;
    
    let c = skm.chapters.find(ch => ch.passages.includes(p13));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  } else {
    console.log("Could not find Mondai 13.");
  }
}

fixMondai13();
