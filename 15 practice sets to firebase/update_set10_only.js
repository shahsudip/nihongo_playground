import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// 1. Initialize Firebase
const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function updateSet10() {
    try {
        console.log('Fetching jlpt-n3-practice-sets from Firebase...');
        const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
        const docSnap = await docRef.get();
        
        if (!docSnap.exists) {
            console.error('Document does not exist!');
            return;
        }

        const data = docSnap.data();
        let sets = data.sets || [];

        // 2. Read the perfectly parsed Set 10 data from our local extraction
        const set10Parsed = JSON.parse(readFileSync('./set10_debug.json', 'utf8'));
        
        const set10Object = {
            id: "set-10",
            title: "Set 10",
            description: "Practice Test 10",
            sections: {
                "vocabulary-kanji": {
                    title: "Vocabulary & Kanji",
                    titleJa: "文字・語彙",
                    questions: set10Parsed.vocab
                },
                "grammar-reading": {
                    title: "Grammar & Reading",
                    titleJa: "文法・読解",
                    questions: set10Parsed.grammar
                }
            }
        };

        // 3. Find and replace ONLY Set 10
        const setIndex = sets.findIndex(s => s.id === 'set-10');
        if (setIndex === -1) {
            console.error('Set 10 not found in Firebase! Adding it.');
            sets.push(set10Object);
        } else {
            console.log(`Found Set 10 at index ${setIndex}. Replacing exclusively Set 10.`);
            sets[setIndex] = set10Object;
        }

        // 4. Update the document with the targeted sets array
        console.log('Writing strictly this update back to Firebase...');
        await docRef.update({ sets: sets });
        
        console.log('SUCCESS! Set 10 updated perfectly. No other sets were touched.');
    } catch (error) {
        console.error('Error updating Set 10:', error);
    }
}

updateSet10();
