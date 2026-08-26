const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../scraper-test/service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function migrateData() {
    console.log("Starting migration...");
    const rootCollection = db.collection('JLPT-matome');
    const snapshot = await rootCollection.get();
    
    let count = 0;
    
    for (const doc of snapshot.docs) {
        // Skip if the document is one of the level documents
        if (['N1', 'N2', 'N3', 'N4', 'N5'].includes(doc.id)) {
            continue;
        }
        
        const data = doc.data();
        
        // Write to the new subcollection: JLPT-matome/N5/kanjilist
        await rootCollection.doc('N5').collection('kanjilist').doc(doc.id).set(data);
        
        // Delete the old document from the root collection
        await rootCollection.doc(doc.id).delete();
        
        count++;
        if (count % 10 === 0) console.log(`Migrated ${count} documents...`);
    }
    
    console.log(`Migration complete! Successfully moved ${count} documents to JLPT-matome -> N5 -> kanjilist.`);
}

migrateData().catch(console.error);
