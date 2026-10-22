const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const { cert, getApps, initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const FORMAT_VERSION = 1;
const DEFAULT_CREDENTIAL_PATH = path.resolve(
  __dirname,
  '..',
  '..',
  'scraper-test',
  'service-account.json',
);
const DEFAULT_OUTPUT_PATH = __dirname;
const MAX_PARALLEL_REQUESTS = 12;
const GET_ALL_BATCH_SIZE = 100;

function parseArguments(argv) {
  const options = {
    credentialPath: process.env.GOOGLE_APPLICATION_CREDENTIALS || DEFAULT_CREDENTIAL_PATH,
    outputPath: DEFAULT_OUTPUT_PATH,
    projectId: process.env.FIREBASE_PROJECT_ID || '',
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--credential') {
      options.credentialPath = argv[++index];
    } else if (argument === '--output') {
      options.outputPath = argv[++index];
    } else if (argument === '--project') {
      options.projectId = argv[++index];
    } else if (argument === '--help') {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  for (const [name, value] of Object.entries(options)) {
    if (name !== 'help' && typeof value !== 'string') {
      throw new Error(`Missing value for ${name}.`);
    }
  }

  return options;
}

function printHelp() {
  console.log('Usage: node scripts/firebase_backup/export_books.cjs [options]');
  console.log('');
  console.log('Options:');
  console.log('  --credential PATH  Service account JSON path.');
  console.log('  --project ID       Expected Firebase project id.');
  console.log('  --output PATH      Export root directory.');
  console.log('  --help             Show this help.');
}

function loadCredential(credentialPath) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }

  const resolvedPath = path.resolve(credentialPath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Service account file not found: ${resolvedPath}`);
  }
  return JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
}

function createRequestLimiter(limit) {
  let activeCount = 0;
  const queue = [];

  function startNext() {
    if (activeCount >= limit || queue.length === 0) {
      return;
    }

    const task = queue.shift();
    activeCount += 1;
    Promise.resolve()
      .then(task.operation)
      .then(task.resolve, task.reject)
      .finally(() => {
        activeCount -= 1;
        startNext();
      });
    startNext();
  }

  return function limitRequest(operation) {
    return new Promise((resolve, reject) => {
      queue.push({ operation, reject, resolve });
      startNext();
    });
  };
}

async function mapWithLimit(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  }

  const workerCount = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workerCount }, runWorker));
  return results;
}

function compareIds(left, right) {
  return left.localeCompare(right, 'en', { numeric: true, sensitivity: 'base' });
}

function toIsoString(value) {
  if (!value) {
    return null;
  }
  if (typeof value.toDate === 'function') {
    return value.toDate().toISOString();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return null;
}

function isTimestamp(value) {
  return Boolean(
    value
      && value.constructor
      && value.constructor.name === 'Timestamp'
      && typeof value.toDate === 'function',
  );
}

function isGeoPoint(value) {
  return Boolean(
    value
      && value.constructor
      && value.constructor.name === 'GeoPoint'
      && typeof value.latitude === 'number'
      && typeof value.longitude === 'number',
  );
}

function isDocumentReference(value) {
  return Boolean(
    value
      && value.constructor
      && value.constructor.name === 'DocumentReference'
      && typeof value.path === 'string',
  );
}

function serializeValue(value, preserveTypes) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    if (Number.isFinite(value)) {
      return value;
    }
    return {
      __firestoreType: 'number',
      value: String(value),
    };
  }

  if (typeof value === 'bigint') {
    return {
      __firestoreType: 'bigint',
      value: value.toString(),
    };
  }

  if (isTimestamp(value)) {
    if (!preserveTypes) {
      return value.toDate().toISOString();
    }
    return {
      __firestoreType: 'timestamp',
      nanoseconds: value.nanoseconds,
      seconds: value.seconds,
    };
  }

  if (value instanceof Date) {
    if (!preserveTypes) {
      return value.toISOString();
    }
    return {
      __firestoreType: 'date',
      value: value.toISOString(),
    };
  }

  if (isGeoPoint(value)) {
    const point = {
      latitude: value.latitude,
      longitude: value.longitude,
    };
    if (!preserveTypes) {
      return point;
    }
    return {
      __firestoreType: 'geopoint',
      ...point,
    };
  }

  if (isDocumentReference(value)) {
    if (!preserveTypes) {
      return value.path;
    }
    return {
      __firestoreType: 'reference',
      path: value.path,
    };
  }

  if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
    return {
      __firestoreType: 'bytes',
      base64: Buffer.from(value).toString('base64'),
    };
  }

  if (Array.isArray(value)) {
    return value.map((item) => serializeValue(item, preserveTypes));
  }

  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort(compareIds)
        .map((key) => [key, serializeValue(value[key], preserveTypes)]),
    );
  }

  throw new Error(`Unsupported Firestore value type: ${typeof value}`);
}

function safeFileName(documentId) {
  return Buffer.from(documentId, 'utf8')
    .toString('hex')
    .match(/.{1,2}/g)
    .map((byte) => {
      const character = String.fromCharCode(Number.parseInt(byte, 16));
      return /[A-Za-z0-9._-]/.test(character) ? character : `_${byte.toUpperCase()}`;
    })
    .join('');
}

function stringifyJson(value) {
  const json = `${JSON.stringify(value, null, 2)}\n`;
  return json.replace(/[\u007f-\uffff]/g, (character) => (
    `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`
  ));
}

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function ensurePathInside(parentPath, childPath) {
  const resolvedParent = path.resolve(parentPath);
  const resolvedChild = path.resolve(childPath);
  const relativePath = path.relative(resolvedParent, resolvedChild);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`Unsafe output path: ${resolvedChild}`);
  }
}

function removeDirectory(outputRoot, targetPath) {
  ensurePathInside(outputRoot, targetPath);
  if (path.resolve(outputRoot) === path.resolve(targetPath)) {
    throw new Error('Refusing to remove the export root.');
  }
  fs.rmSync(targetPath, { force: true, recursive: true });
}

function cleanStaleStagingDirectories(outputRoot, backupRoot, currentPath) {
  const outputEntries = fs.readdirSync(outputRoot, { withFileTypes: true });
  const previousDirectories = outputEntries
    .filter((entry) => entry.isDirectory() && /^\.current-.+\.previous$/.test(entry.name))
    .map((entry) => path.join(outputRoot, entry.name))
    .sort()
    .reverse();

  if (!fs.existsSync(currentPath) && previousDirectories.length > 0) {
    fs.renameSync(previousDirectories.shift(), currentPath);
  }

  for (const entry of outputEntries) {
    if (!entry.isDirectory()) {
      continue;
    }
    if (/^\.current-.+\.(partial|previous)$/.test(entry.name)) {
      removeDirectory(outputRoot, path.join(outputRoot, entry.name));
    }
  }

  if (!fs.existsSync(backupRoot)) {
    return;
  }
  for (const entry of fs.readdirSync(backupRoot, { withFileTypes: true })) {
    if (entry.isDirectory() && /^\..+\.partial$/.test(entry.name)) {
      removeDirectory(outputRoot, path.join(backupRoot, entry.name));
    }
  }
}

function writeJson(filePath, value) {
  const content = stringifyJson(value);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  return {
    bytes: Buffer.byteLength(content),
    sha256: sha256(content),
  };
}

function chunk(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

async function fetchSnapshots(database, references, limitRequest) {
  const snapshots = [];
  for (const referenceBatch of chunk(references, GET_ALL_BATCH_SIZE)) {
    const batchSnapshots = await limitRequest(() => database.getAll(...referenceBatch));
    snapshots.push(...batchSnapshots);
  }
  return snapshots;
}

async function exportDocument(snapshot, context) {
  context.stats.documentCount += 1;
  if (snapshot.exists) {
    context.stats.existingDocumentCount += 1;
  } else {
    context.stats.missingDocumentCount += 1;
  }

  const collections = await context.limitRequest(() => snapshot.ref.listCollections());
  collections.sort((left, right) => compareIds(left.id, right.id));
  context.stats.collectionCount += collections.length;

  const exportedCollections = {};
  for (const collectionReference of collections) {
    const documentReferences = await context.limitRequest(() => collectionReference.listDocuments());
    documentReferences.sort((left, right) => compareIds(left.id, right.id));
    const childSnapshots = await fetchSnapshots(
      context.database,
      documentReferences,
      context.limitRequest,
    );
    const snapshotsByPath = new Map(childSnapshots.map((child) => [child.ref.path, child]));
    exportedCollections[collectionReference.id] = await mapWithLimit(
      documentReferences,
      MAX_PARALLEL_REQUESTS,
      (reference) => exportDocument(snapshotsByPath.get(reference.path), context),
    );
  }

  return {
    collections: exportedCollections,
    createTime: toIsoString(snapshot.createTime),
    data: snapshot.exists ? serializeValue(snapshot.data(), true) : null,
    localData: snapshot.exists ? serializeValue(snapshot.data(), false) : null,
    exists: snapshot.exists,
    id: snapshot.id,
    path: snapshot.ref.path,
    updateTime: toIsoString(snapshot.updateTime),
  };
}

function materializeDocument(documentNode) {
  const data = documentNode.exists
    ? documentNode.localData
    : {};

  if (!Object.prototype.hasOwnProperty.call(data, 'id')) {
    data.id = documentNode.id;
  }

  for (const [collectionId, documents] of Object.entries(documentNode.collections)) {
    if (Object.prototype.hasOwnProperty.call(data, collectionId)) {
      throw new Error(
        `Cannot flatten ${documentNode.path}: field and subcollection both use ${collectionId}.`,
      );
    }
    data[collectionId] = documents.map(materializeDocument);
  }

  return data;
}

function createBackupDocument(documentNode) {
  return {
    collections: Object.fromEntries(
      Object.entries(documentNode.collections).map(([collectionId, documents]) => [
        collectionId,
        documents.map(createBackupDocument),
      ]),
    ),
    createTime: documentNode.createTime,
    data: documentNode.data,
    exists: documentNode.exists,
    id: documentNode.id,
    path: documentNode.path,
    updateTime: documentNode.updateTime,
  };
}

function validateWrittenJson(filePath, expectedHash) {
  const content = fs.readFileSync(filePath, 'utf8');
  JSON.parse(content);
  const actualHash = sha256(content);
  if (actualHash !== expectedHash) {
    throw new Error(`Hash mismatch after writing ${filePath}.`);
  }
}

async function exportBooks(options) {
  const credential = loadCredential(options.credentialPath);
  const projectId = options.projectId || credential.project_id;
  if (!projectId) {
    throw new Error('Firebase project id is missing.');
  }
  if (credential.project_id && credential.project_id !== projectId) {
    throw new Error('Project id does not match the service account.');
  }

  if (!getApps().length) {
    initializeApp({ credential: cert(credential), projectId });
  }

  const database = getFirestore();
  const outputRoot = path.resolve(options.outputPath);
  const exportedAt = new Date().toISOString();
  const snapshotId = exportedAt.replace(/[:.]/g, '-');
  const backupRoot = path.join(outputRoot, 'backups');
  const backupPath = path.join(backupRoot, snapshotId);
  const backupStagingPath = path.join(backupRoot, `.${snapshotId}.partial`);
  const currentPath = path.join(outputRoot, 'current');
  const currentStagingPath = path.join(outputRoot, `.current-${snapshotId}.partial`);
  const previousCurrentPath = path.join(outputRoot, `.current-${snapshotId}.previous`);

  fs.mkdirSync(outputRoot, { recursive: true });
  cleanStaleStagingDirectories(outputRoot, backupRoot, currentPath);
  if (fs.existsSync(backupPath)) {
    throw new Error(`Backup already exists: ${backupPath}`);
  }
  removeDirectory(outputRoot, backupStagingPath);
  removeDirectory(outputRoot, currentStagingPath);
  removeDirectory(outputRoot, previousCurrentPath);
  fs.mkdirSync(path.join(backupStagingPath, 'books'), { recursive: true });
  fs.mkdirSync(path.join(currentStagingPath, 'books'), { recursive: true });

  const limitRequest = createRequestLimiter(MAX_PARALLEL_REQUESTS);
  const bookReferences = await limitRequest(() => database.collection('books').listDocuments());
  bookReferences.sort((left, right) => compareIds(left.id, right.id));
  const bookSnapshots = await fetchSnapshots(database, bookReferences, limitRequest);
  const snapshotsByPath = new Map(bookSnapshots.map((snapshot) => [snapshot.ref.path, snapshot]));
  const manifestBooks = [];

  try {
    for (let index = 0; index < bookReferences.length; index += 1) {
      const bookReference = bookReferences[index];
      const stats = {
        collectionCount: 0,
        documentCount: 0,
        existingDocumentCount: 0,
        missingDocumentCount: 0,
      };
      const documentTree = await exportDocument(snapshotsByPath.get(bookReference.path), {
        database,
        limitRequest,
        stats,
      });
      const fileName = `${safeFileName(bookReference.id)}.json`;
      const localBook = materializeDocument(documentTree);
      const backupBook = {
        backupFormatVersion: FORMAT_VERSION,
        exportedAt,
        projectId,
        root: createBackupDocument(documentTree),
      };
      const currentFilePath = path.join(currentStagingPath, 'books', fileName);
      const backupFilePath = path.join(backupStagingPath, 'books', fileName);
      const currentFile = writeJson(currentFilePath, localBook);
      const backupFile = writeJson(backupFilePath, backupBook);
      validateWrittenJson(currentFilePath, currentFile.sha256);
      validateWrittenJson(backupFilePath, backupFile.sha256);

      manifestBooks.push({
        backupBytes: backupFile.bytes,
        backupSha256: backupFile.sha256,
        collectionCount: stats.collectionCount,
        currentBytes: currentFile.bytes,
        currentSha256: currentFile.sha256,
        documentCount: stats.documentCount,
        existingDocumentCount: stats.existingDocumentCount,
        file: `books/${fileName}`,
        id: bookReference.id,
        missingDocumentCount: stats.missingDocumentCount,
      });
      console.log(
        `[${index + 1}/${bookReferences.length}] ${bookReference.id}: `
          + `${stats.documentCount} documents, ${stats.collectionCount} collections`,
      );
    }

    const manifest = {
      bookCount: manifestBooks.length,
      books: manifestBooks,
      exportedAt,
      formatVersion: FORMAT_VERSION,
      projectId,
      rootCollection: 'books',
      totalCollections: manifestBooks.reduce((sum, book) => sum + book.collectionCount, 0),
      totalDocuments: manifestBooks.reduce((sum, book) => sum + book.documentCount, 0),
    };
    const currentManifest = writeJson(path.join(currentStagingPath, 'manifest.json'), manifest);
    const backupManifest = writeJson(path.join(backupStagingPath, 'manifest.json'), manifest);
    validateWrittenJson(
      path.join(currentStagingPath, 'manifest.json'),
      currentManifest.sha256,
    );
    validateWrittenJson(
      path.join(backupStagingPath, 'manifest.json'),
      backupManifest.sha256,
    );

    fs.renameSync(backupStagingPath, backupPath);
    if (fs.existsSync(currentPath)) {
      fs.renameSync(currentPath, previousCurrentPath);
    }
    fs.renameSync(currentStagingPath, currentPath);
    removeDirectory(outputRoot, previousCurrentPath);

    console.log(`Export complete: ${manifest.bookCount} books, ${manifest.totalDocuments} documents.`);
    console.log(`Current JSON: ${currentPath}`);
    console.log(`Backup snapshot: ${backupPath}`);
  } catch (error) {
    removeDirectory(outputRoot, backupStagingPath);
    removeDirectory(outputRoot, currentStagingPath);
    if (!fs.existsSync(currentPath) && fs.existsSync(previousCurrentPath)) {
      fs.renameSync(previousCurrentPath, currentPath);
    }
    throw error;
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  await exportBooks(options);
}

main().catch((error) => {
  console.error(`Export failed: ${error.message}`);
  process.exitCode = 1;
});
