const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
if (!fs.existsSync(serviceAccountPath)) {
    console.error('Service account not found:', serviceAccountPath);
    process.exit(1);
}

initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

function sanitizeForFirestore(data) {
    if (data === null || data === undefined) return null;
    if (Array.isArray(data)) {
        return data.map(item => {
            if (Array.isArray(item)) {
                // Firestore does not allow arrays directly inside arrays, wrap into an object
                return { cells: sanitizeForFirestore(item) };
            }
            if (typeof item === 'object') {
                return sanitizeForFirestore(item);
            }
            return item;
        });
    }
    if (typeof data === 'object') {
        const clean = {};
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                clean[key] = sanitizeForFirestore(value);
            }
        }
        return clean;
    }
    return data;
}

async function pushAllSomatome() {
    try {
        const bookId = 'sou-matome-n3-reading';
        
        console.log(`Setting book document: ${bookId}...`);
        await db.collection('books').doc(bookId).set({
            title: "JLPT Sou Matome N3 Reading Comprehension",
            description: "Focuses on comprehension of short letters, advertisements, and medium-length essays for the N3 level.",
            coverUrl: "",
            level: "N3",
            category: "Reading"
        }, { merge: true });

        const dirPath = path.join(__dirname, 'src', 'data', 'somatome');
        if (!fs.existsSync(dirPath)) {
            console.log('No somatome directory yet.');
            return;
        }

        const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
        console.log(`Found ${files.length} chapter files to sync.`);

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const chapterData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const chapterId = chapterData.chapterId || file.replace('.json', '');

            console.log(`Pushing chapter: ${chapterId}`);
            const sanitizedData = sanitizeForFirestore(chapterData);
            await db.collection('books').doc(bookId).collection('chapters').doc(chapterId).set(sanitizedData);
        }

        console.log('✅ All chapters successfully synced to Firestore!');
    } catch (err) {
        console.error('❌ Error syncing to Firestore:', err);
    }
}

pushAllSomatome();
