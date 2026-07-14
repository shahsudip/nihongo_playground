const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixMondai11() {
  console.log("Fixing Mondai 11 swallowed text...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let changedChapters = new Set();

  let p11 = skm.chapters.flatMap(c => c.passages).find(p => p.title.includes('問題11'));
  if (p11) {
    let swallowedPart = `<p>(注1)ができにくいという研究結果がある。なぜコーヒーにそのような効果があるのだろうか。</p><p>その仕組みは、こうである。</p><p>太陽の光にあたると、人間の体内で「活性酸素」と呼ばれる物質ができる。これは、しみの原因となる物質「メラニン」を増やしてしまう。しかし、コーヒーにたくさん含まれる「ポリフェノール」という物質は活性酸素の働きを小さくしてくれるという。それで、コーヒーを飲む人はしみができにくいというわけだ。</p><p>ポリフェノールをたくさん含むコーヒーは、美容にいい飲み物だと言えそうだ。</p><p>==================================================</p>`;
    
    if (p11.passageNotes && p11.passageNotes.includes(swallowedPart)) {
      p11.passageNotes = p11.passageNotes.replace(swallowedPart, '').trim();
      
      let textToAppend = `ができにくいという研究結果がある。なぜコーヒーにそのような効果があるのだろうか。\n\nその仕組みは、こうである。\n\n太陽の光にあたると、人間の体内で「活性酸素」と呼ばれる物質ができる。これは、しみの原因となる物質「メラニン」を増やしてしまう。しかし、コーヒーにたくさん含まれる「ポリフェノール」という物質は活性酸素の働きを小さくしてくれるという。それで、コーヒーを飲む人はしみができにくいというわけだ。\n\nポリフェノールをたくさん含むコーヒーは、美容にいい飲み物だと言えそうだ。`;
      
      let styledNote = '<span class="text-[0.75em] opacity-80 font-normal align-baseline">(注1)</span>';
      
      p11.passageText += styledNote + textToAppend;
      
      let c = skm.chapters.find(c => c.passages.includes(p11));
      changedChapters.add(c);
      console.log(`Fixed Mondai 11!`);
    }
  }

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
    console.log("Mondai 11 already fixed.");
  }
}

fixMondai11();
