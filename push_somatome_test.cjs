const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

async function pushSomatomeData() {
    try {
        const bookId = 'sou-matome-n3-reading';
        
        // 1. Push Book Document
        console.log(`Pushing book document: ${bookId}`);
        await db.collection('books').doc(bookId).set({
            title: "JLPT Sou Matome N3 Reading Comprehension",
            description: "Focuses on comprehension of short letters, advertisements, and medium-length essays for the N3 level.",
            coverUrl: "",
            level: "N3",
            category: "Reading"
        });

        // 2. Read the rich JSON file
        const dataPath = path.join(__dirname, 'src', 'data', 'somatome_week1_day1.json');
        const chapterData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        const chapterId = chapterData.chapterId; // "week1-day1"
        
        console.log(`Pushing chapter document: ${chapterId}`);
        await db.collection('books').doc(bookId).collection('chapters').doc(chapterId).set(chapterData);

        console.log('✅ Success! Data pushed to Firebase.');
    } catch (error) {
        console.error('❌ Error pushing data:', error);
    }
}

pushSomatomeData();
