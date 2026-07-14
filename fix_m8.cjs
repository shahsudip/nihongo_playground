const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai8() {
  console.log("Fixing Mondai 8...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p8 = skm.chapters.flatMap(c => c.passages).find(p => p.title === '第1部 問題8');
  if (p8) {
    let newText = p8.passageText;
    
    // Add inline note 1
    newText = newText.replace('処分し「減らす」', '処分し<span class="text-[0.75em] opacity-80 font-normal align-baseline">(注1)</span>「減らす」');

    // Add underlines and letters
    newText = newText.replace('片づけに悩まされる', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">A</span>片づけ</span>に悩まされる');
    newText = newText.replace('「整理」と', '「<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">B</span>整理</span>」と');
    newText = newText.replace('「整頓」である', '「<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">C</span>整頓</span>」である');
    newText = newText.replace('配置することを', '<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">D</span>配置する</span>ことを');
    newText = newText.replace('8割が終了している', '8割が<span class="underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400"><span class="text-[0.8em] mr-0.5 inline-block -translate-y-[1px]">E</span>終了している</span>');

    // Add author citation
    if (!newText.includes('小松易')) {
      newText += '\\n\\n<div class="text-right text-sm text-gray-600 dark:text-gray-400 mt-4">(小松易『3秒でやる気にスイッチ！仕事が変わる「ひとこと片づけ術」』日本能率協会マネジメントセンターより)</div>';
    }

    p8.passageText = newText;
    
    let c = skm.chapters.find(ch => ch.passages.includes(p8));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  } else {
    console.log("Could not find Mondai 8.");
  }
}

fixMondai8();
