const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai6() {
  console.log("Fixing Mondai 6...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p6 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第1部 問題6');
  if (p6) {
    let newText = p6.passageText;
    
    // Add underlines and letters/numbers
    newText = newText.replace('聞いてみると', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">A</span>聞いてみると</span>');
    newText = newText.replace('断られてしまって', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">B</span>断られてしまって</span>');
    newText = newText.replace('次もまた譲ろう', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">C</span>次もまた譲ろう</span>');
    newText = newText.replace('答えてあげてほしい', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">①</span>答えてあげてほしい</span>');

    p6.passageText = newText;
    
    // Fix the question to match the image exactly
    if (p6.questions && p6.questions[0]) {
      p6.questions[0].questionText = '問い ①答えてあげてほしいと思っているのはだれか。';
    }

    let c = skm.chapters.find(ch => ch.passages.includes(p6));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  } else {
    console.log("Could not find Mondai 6.");
  }
}

fixMondai6();
