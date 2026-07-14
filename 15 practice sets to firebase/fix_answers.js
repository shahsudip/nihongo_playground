import { readFileSync, writeFileSync } from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function run() {
    const data = JSON.parse(readFileSync('./src/data/practice_sets_data.js', 'utf8').replace('export const practiceSetsBook = ', '').replace(/;\n$/, ''));
    
    // Set 9 Vocab
    const s9v = [3,3,2,3,3,2,2,3, 2,3,3,3,4,3, 4,2,4,2,2,2,4,4,3,2,2, 2,1,2,4,1, 2,4,1,1,1].map(x => x - 1);
    const s9qV = data.sets[8].sections['vocabulary-kanji'].questions;
    for(let i=0; i<Math.min(s9v.length, s9qV.length); i++) {
        s9qV[i].correctIndex = s9v[i];
    }
    
    // Set 9 Grammar
    const s9g = [4,1,3,2,3,2,1,1,4,2,1,3,1,2,1,2,2,1, 2,3,2,1,3].map(x => x - 1);
    const s9qG = data.sets[8].sections['grammar-reading'].questions;
    for(let i=0; i<Math.min(s9g.length, s9qG.length); i++) {
        s9qG[i].correctIndex = s9g[i];
    }
    
    // Set 10 Vocab
    const s10v = [4,3,4,2,1,3,3,1, 1,4,2,4,2,3, 4,4,4,3,1,2,2,2,3,3,4, 4,2,3,1,2, 4,1,3,4,2].map(x => x - 1);
    const s10qV = data.sets[9].sections['vocabulary-kanji'].questions;
    for(let i=0; i<Math.min(s10v.length, s10qV.length); i++) {
        s10qV[i].correctIndex = s10v[i];
    }
    
    // Set 10 Grammar
    const s10g = [4,3,4,2,3,2,2,2,2,3, 1,1,3,3,3,4,3,2, 2,4,4,4,2].map(x => x - 1);
    const s10qG = data.sets[9].sections['grammar-reading'].questions;
    for(let i=0; i<Math.min(s10g.length, s10qG.length); i++) {
        s10qG[i].correctIndex = s10g[i];
    }
    
    writeFileSync('./src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(data, null, 2)};\n`);
    await db.collection('books').doc(data.id).set(data);
    
    console.log("Answers injected successfully!");
    process.exit(0);
}
run().catch(console.error);
