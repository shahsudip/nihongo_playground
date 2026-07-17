const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');

const serviceAccount = require(path.join(__dirname, '..', 'scraper-test', 'service-account.json'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function deleteWrongCollection() {
    console.log("Deleting wrong document: nihongo-power-drill-n3-grammar");
    const bookRef = db.collection('books').doc('nihongo-power-drill-n3-grammar');
    
    const chapters = await bookRef.collection('chapters').get();
    let batch = db.batch();
    let count = 0;
    
    chapters.forEach((doc) => {
        batch.delete(doc.ref);
        count++;
    });
    
    if (count > 0) {
        await batch.commit();
        console.log(`Deleted ${count} chapters.`);
    }
    
    await bookRef.delete();
    console.log("Deleted main book document. Done!");
}

deleteWrongCollection();
