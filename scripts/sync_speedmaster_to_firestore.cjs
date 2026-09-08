const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const isDryRun = process.argv.includes('--dry-run') || process.env.DRY_RUN === 'true';

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
    if (!isDryRun) {
        throw new Error('No Firebase service account found. Please provide FIREBASE_SERVICE_ACCOUNT env var or scraper-test/service-account.json');
    }
    return null;
}

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

async function syncSpeedMasterData() {
    const dataDir = path.join(__dirname, '..', 'src', 'data', 'speed_master_n3_reading');
    if (!fs.existsSync(dataDir)) {
        throw new Error(`Data directory not found: ${dataDir}`);
    }

    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).sort();
    const bookId = 'speed-master-n3-reading';

    console.log(`Starting Firestore sync for ${bookId} with ${files.length} files...`);
    if (isDryRun) {
        console.log(`🔍 RUNNING IN DRY-RUN MODE (no Firestore writes will be performed)`);
    }

    let db = null;
    if (!isDryRun) {
        if (!getApps().length) {
            const cred = getServiceAccount();
            initializeApp({ credential: cert(cred) });
        }
        db = getFirestore();
    }

    const bookMetadata = {
        id: bookId,
        title: '日本語能力試験 読解 スピードマスター N3',
        titleEn: 'JLPT Speed Master N3 Reading Comprehension',
        description: 'Timed JLPT N3 reading comprehension: short, medium, long passages, information retrieval, and full mock exam.',
        level: 'N3',
        category: 'reading',
        totalChapters: files.length,
        updatedAt: new Date().toISOString()
    };

    if (!isDryRun && db) {
        const bookRef = db.collection('books').doc(bookId);
        await bookRef.set(bookMetadata, { merge: true });
        console.log(`✓ Updated book metadata for ${bookId}`);
    } else {
        console.log(`[DRY-RUN] Would write book metadata for ${bookId}:`, JSON.stringify(bookMetadata, null, 2));
    }

    let successCount = 0;
    let totalQuestions = 0;
    let totalVocab = 0;
    let totalFootnotes = 0;

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
        const sanitized = sanitizeForFirestore({
            ...chapterData,
            syncedAt: new Date().toISOString()
        });

        const qCount = Array.isArray(chapterData.questions) ? chapterData.questions.length : 0;
        const vCount = Array.isArray(chapterData.vocabulary) ? chapterData.vocabulary.length : 0;
        const fnCount = Array.isArray(chapterData.footnotes) ? chapterData.footnotes.length : 0;

        totalQuestions += qCount;
        totalVocab += vCount;
        totalFootnotes += fnCount;

        if (!isDryRun && db) {
            const bookRef = db.collection('books').doc(bookId);
            const chapterRef = bookRef.collection('chapters').doc(String(docId));
            await chapterRef.set(sanitized, { merge: true });
            console.log(`✓ Synced chapter: ${docId} (${qCount} Qs)`);
        } else {
            console.log(`[DRY-RUN] ✓ Validated chapter: ${docId} (${qCount} Qs, ${vCount} vocab, ${fnCount} footnotes)`);
        }

        successCount++;
    }

    console.log(`\n======================================================`);
    console.log(`Sync Summary:`);
    console.log(`  Book ID:         ${bookId}`);
    console.log(`  Total Chapters:  ${successCount}/${files.length}`);
    console.log(`  Total Questions: ${totalQuestions}`);
    console.log(`  Total Vocab:     ${totalVocab}`);
    console.log(`  Total Footnotes: ${totalFootnotes}`);
    console.log(`  Dry Run:         ${isDryRun ? 'YES' : 'NO'}`);
    console.log(`======================================================\n`);

    if (isDryRun) {
        console.log(`🎉 Dry-run test completed successfully! All ${successCount} chapters are ready for Firestore upload.`);
    } else {
        console.log(`🎉 Successfully synced ${successCount}/${files.length} chapters to Firestore at books/${bookId}/chapters!`);
    }
}

syncSpeedMasterData().catch(err => {
    console.error('Fatal sync error:', err);
    process.exit(1);
});
