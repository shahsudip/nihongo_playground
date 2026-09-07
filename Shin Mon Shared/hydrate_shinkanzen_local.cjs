const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin if not already initialized
if (getApps().length === 0) {
  const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, '../scraper-test/service-account.json'), 'utf8'));
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

const OUT_DIR = path.join(__dirname, '../src/data/shinkanzen_reading');

const PART_TITLES = {
  1: '第1部：内容理解（短文）',
  2: '第2部：内容理解（中文）',
  3: '第3部：内容理解（長文）',
  4: '第4部：情報検索',
};

const PART_TITLES_EN = {
  1: 'Short Passage Comprehension',
  2: 'Medium Passage Comprehension',
  3: 'Long Passage Comprehension',
  4: 'Information Retrieval',
};

// Based on the research, here's a rough mapping of mondai numbers to the first scanned page of that mondai.
// (Since we don't have a perfect mapping for all 54 mondais, we will assign them sequentially based on the known ranges).
// Part 1: Mondai 1-13 (Pages 22-49)
// Part 2: Mondai 14-20 (Pages 50-69)
// Part 3: Mondai 21-28 (Pages 70-89)
// Part 4: Mondai 29-54+ (Pages 90-161)
function estimateImageSrc(partNum, mondaiNum) {
  let basePage = 22;
  if (partNum === 2) basePage = 50;
  if (partNum === 3) basePage = 70;
  if (partNum === 4) basePage = 90;
  
  // Rough estimate: each mondai takes about 1-2 pages.
  // We'll just provide a fallback image URL pattern so the UI has something to render.
  // The actual manual mapping can be refined later by the user in the UI.
  return `/shinkanzen_pages/N3_page-${String(basePage).padStart(4, '0')}.jpg`;
}

async function hydrate() {
  console.log("Starting hydration of Shinkanzen Master N3 Reading data...");
  
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const chaptersRef = db.collection('books').doc('shinkanzen-master-n3-reading').collection('chapters');
  const snapshot = await chaptersRef.get();
  
  if (snapshot.empty) {
    console.error("No chapters found in Firestore!");
    return;
  }

  let globalMondaiCounter = 1;

  // The chapters might come back in random order, so let's sort them by part number (1, 2, 3, 4)
  const docs = snapshot.docs.map(d => d.data());
  docs.sort((a, b) => {
    const getNum = (id) => parseInt(id.match(/part-(\d+)/)[1]);
    return getNum(a.id) - getNum(b.id);
  });

  for (const chapter of docs) {
    const partNum = parseInt(chapter.id.match(/part-(\d+)/)[1]);
    console.log(`Processing ${chapter.id} (Part ${partNum})...`);

    if (!chapter.passages || chapter.passages.length === 0) continue;

    for (let i = 0; i < chapter.passages.length; i++) {
      const passage = chapter.passages[i];
      const mondaiId = `mondai-${globalMondaiCounter}`;
      
      const payload = {
        bookId: 'shinkanzen-master-n3-reading',
        chapterId: mondaiId,
        part: partNum,
        partTitle: PART_TITLES[partNum],
        partTitleEn: PART_TITLES_EN[partNum],
        mondaiNumber: globalMondaiCounter,
        title: passage.title || `問題${globalMondaiCounter}`,
        mondaiHeader: passage.mondaiHeader || '',
        passageText: passage.passageText || '',
        passageLayout: passage.passageLayout || '',
        passageNotes: passage.passageNotes || '',
        // Use existing imageSrc if available, otherwise fallback to our estimator
        imageSrc: passage.imageSrc || estimateImageSrc(partNum, globalMondaiCounter),
        questions: passage.questions || []
      };

      const outPath = path.join(OUT_DIR, `${mondaiId}.json`);
      fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
      console.log(`  -> Saved ${mondaiId}.json`);
      
      globalMondaiCounter++;
    }
  }

  console.log(`Hydration complete! Generated ${globalMondaiCounter - 1} JSON files.`);
}

hydrate().catch(console.error);
