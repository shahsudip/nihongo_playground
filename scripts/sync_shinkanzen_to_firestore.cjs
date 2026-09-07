const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Resolve Service Account Credentials
function getServiceAccount() {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
            return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        } catch (e) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT env var:', e);
        }
    }
    const localPath = path.join(__dirname, '..', 'scraper-test', 'service-account.json');
    if (fs.existsSync(localPath)) {
        return JSON.parse(fs.readFileSync(localPath, 'utf8'));
    }
    throw new Error('No Firebase service account found. Please provide FIREBASE_SERVICE_ACCOUNT env var or scraper-test/service-account.json');
}

if (!getApps().length) {
    const cred = getServiceAccount();
    initializeApp({ credential: cert(cred) });
}

const db = getFirestore();

async function syncShinkanzenData() {
    const dataDir = path.join(__dirname, '..', 'src', 'data', 'shinkanzen_reading');
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

    const bookId = 'shinkanzen-master-n3-reading';
    console.log(`Starting Firestore sync for ${bookId} with ${files.length} files...`);

    const bookRef = db.collection('books').doc(bookId);
    await bookRef.set({
        id: bookId,
        title: '新完全マスター読解 日本語能力試験N3',
        titleEn: 'Shin Kanzen Master N3 Reading Comprehension',
        level: 'N3',
        category: 'reading',
        totalChapters: files.length,
        updatedAt: new Date().toISOString()
    }, { merge: true });

    let successCount = 0;

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const raw = fs.readFileSync(filePath, 'utf8');
        let chapterData;
        try {
            chapterData = JSON.parse(raw);
        } catch (err) {
            console.error(`Error parsing JSON in ${file}:`, err.message);
            continue;
        }

        const docId = chapterData.chapterId || chapterData.id || file.replace('.json', '');
        const chapterRef = bookRef.collection('chapters').doc(String(docId));

        await chapterRef.set({
            ...chapterData,
            syncedAt: new Date().toISOString()
        }, { merge: true });

        console.log(`✓ Synced chapter: ${docId}`);
        successCount++;
    }

    console.log(`\n🎉 Successfully synced ${successCount}/${files.length} chapters to Firestore at books/${bookId}/chapters!`);
}

syncShinkanzenData().catch(err => {
    console.error('Fatal sync error:', err);
    process.exit(1);
});
