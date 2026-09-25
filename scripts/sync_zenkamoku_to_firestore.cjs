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

async function syncZenkamokuBook(level, bookId, title) {
    const dataDir = path.join(__dirname, '..', 'src', 'data', `zenkamoku_${level.toLowerCase()}`);
    if (!fs.existsSync(dataDir)) {
        console.warn(`Data directory not found: ${dataDir}`);
        return;
    }

    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).sort();

    console.log(`\n======================================================`);
    console.log(`Starting Firestore sync for ${bookId} (${files.length} files)...`);
    console.log(`======================================================`);

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
        title: title,
        description: `12-week complete JLPT ${level} workbook covering vocabulary, grammar, reading, and listening.`,
        level: level,
        category: 'Mixed',
        coverImage: `/images/zenkamoku_${level.toLowerCase()}_cover.jpg`,
        coverUrl: `/images/zenkamoku_${level.toLowerCase()}_cover.jpg`,
        totalChapters: files.length,
        hasDigitalDrill: true,
        updatedAt: new Date().toISOString()
    };

    if (!isDryRun && db) {
        const bookRef = db.collection('books').doc(bookId);
        await bookRef.set(bookMetadata, { merge: true });
        console.log(`✓ Updated book metadata for ${bookId}`);
    } else {
        console.log(`[DRY-RUN] Would write book metadata for ${bookId}`);
    }

    let successCount = 0;
    let totalQuestions = 0;

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

        let qCount = 0;
        if (chapterData.sections) {
            chapterData.sections.forEach(s => {
                if (Array.isArray(s.questions)) qCount += s.questions.length;
            });
        } else if (Array.isArray(chapterData.questions)) {
            qCount = chapterData.questions.length;
        }

        totalQuestions += qCount;

        if (!isDryRun && db) {
            const bookRef = db.collection('books').doc(bookId);
            const chapterRef = bookRef.collection('chapters').doc(String(docId));
            await chapterRef.set(sanitized, { merge: true });
        }

        successCount++;
    }

    console.log(`✓ Finished syncing ${bookId}: ${successCount} chapters, ${totalQuestions} questions synced to Firestore.`);
}

async function main() {
    const target = process.argv[2] || 'all';

    if (target === 'n1' || target === 'all') {
        await syncZenkamokuBook('N1', 'zenkamoku-n1-best-workbook', '全科目攻略！JLPT日本語能力試験ベスト総合問題集N1');
    }
    if (target === 'n2' || target === 'all') {
        await syncZenkamokuBook('N2', 'zenkamoku-n2-best-workbook', '全科目攻略JLPT日本語能力試験ベスト総合問題集N2');
    }
    if (target === 'n3' || target === 'all') {
        await syncZenkamokuBook('N3', 'zenkamoku-n3-best-workbook', '全科目攻略！JLPT日本語能力試験ベスト総合問題集N3');
    }

    console.log(`\n🎉 All Zenkamoku Firestore sync jobs complete!`);
}

main().catch(err => {
    console.error('Fatal sync error:', err);
    process.exit(1);
});
