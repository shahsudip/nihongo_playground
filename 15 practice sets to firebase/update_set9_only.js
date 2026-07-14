import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// 1. Initialize Firebase
const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function updateSet9() {
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

        // 2. Read the perfectly parsed Set 9 data from our local extraction
        const set9Parsed = JSON.parse(readFileSync('./set9_debug.json', 'utf8'));
        
        const set9Object = {
            id: "set-9",
            title: "Set 9",
            description: "Practice Test 9",
            sections: {
                "vocabulary-kanji": {
                    title: "Vocabulary & Kanji",
                    titleJa: "文字・語彙",
                    questions: set9Parsed.vocab
                },
                "grammar-reading": {
                    title: "Grammar & Reading",
                    titleJa: "文法・読解",
                    questions: set9Parsed.grammar
                }
            }
        };

        // 3. Find and replace ONLY Set 9
        const set9Index = sets.findIndex(s => s.id === 'set-9');
        if (set9Index === -1) {
            console.error('Set 9 not found in Firebase! Adding it.');
            sets.push(set9Object);
        } else {
            console.log(`Found Set 9 at index ${set9Index}. Replacing exclusively Set 9.`);
            sets[set9Index] = set9Object;
        }

        // 4. Update the document with the targeted sets array
        console.log('Writing strictly this update back to Firebase...');
        await docRef.update({ sets: sets });
        
        console.log('SUCCESS! Set 9 updated perfectly. No other sets were touched.');
    } catch (error) {
        console.error('Error updating Set 9:', error);
    }
}

updateSet9();
