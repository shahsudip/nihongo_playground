const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

async function pushChapter(chapterId) {
    const bookId = 'sou-matome-n3-reading';
    const dataPath = path.join(__dirname, 'src', 'data', 'somatome', `${chapterId}.json`);
    
    if (!fs.existsSync(dataPath)) {
        console.error(`❌ File not found: ${dataPath}`);
        process.exit(1);
    }

    const chapterData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`Pushing chapter: ${chapterId}`);
    await db.collection('books').doc(bookId).collection('chapters').doc(chapterId).set(chapterData);
    console.log(`✅ ${chapterId} pushed to Firebase!`);
}

const chapterId = process.argv[2];
if (!chapterId) {
    console.error('Usage: node push_somatome_chapter.cjs <chapterId>');
    console.error('Example: node push_somatome_chapter.cjs week1-day2');
    process.exit(1);
}

pushChapter(chapterId);
