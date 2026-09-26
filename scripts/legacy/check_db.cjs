const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

async function checkData() {
    try {
        const bookId = 'sou-matome-n3-reading';
        const chaptersSnap = await db.collection('books').doc(bookId).collection('chapters').get();
        console.log(`Found ${chaptersSnap.size} chapters in DB for book ${bookId}`);
        chaptersSnap.forEach(doc => {
            console.log(doc.id, "=>", doc.data().title);
        });
    } catch (e) {
        console.error(e);
    }
}

checkData();
