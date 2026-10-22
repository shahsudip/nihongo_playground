const EMPTY_COLLECTION_LAYOUT = Object.freeze({});
const SETS_LAYOUT = Object.freeze({ sets: EMPTY_COLLECTION_LAYOUT });
const CHAPTERS_LAYOUT = Object.freeze({ chapters: EMPTY_COLLECTION_LAYOUT });
const TOPICS_LAYOUT = Object.freeze({
  topics: Object.freeze({ stories: EMPTY_COLLECTION_LAYOUT }),
});

export const BOOK_COLLECTION_LAYOUTS = Object.freeze({
  'chokuzen-taisaku-n4': SETS_LAYOUT,
  'first-time-jlpt-n3-350-kanji': CHAPTERS_LAYOUT,
  'jlpt-n3-practice-sets': SETS_LAYOUT,
  'nihongo-no-mori-n3': CHAPTERS_LAYOUT,
  'nihongo-power-drill-n1': CHAPTERS_LAYOUT,
  'nihongo-power-drill-n2': CHAPTERS_LAYOUT,
  'nihongo-power-drill-n3': CHAPTERS_LAYOUT,
  'shin-nihongo-500-n1': CHAPTERS_LAYOUT,
  'shin-nihongo-500-n2': CHAPTERS_LAYOUT,
  'shin-nihongo-500-n3': CHAPTERS_LAYOUT,
  'shin-nihongo-500-n4-n5': CHAPTERS_LAYOUT,
  'pass-n3-within-20-days': CHAPTERS_LAYOUT,
  'shinkanzen-master-n3-listening': CHAPTERS_LAYOUT,
  'shinkanzen-master-n3-reading': CHAPTERS_LAYOUT,
  'sou-matome-n3-reading': CHAPTERS_LAYOUT,
  'speed-master-n3-reading': CHAPTERS_LAYOUT,
  tango_n1: TOPICS_LAYOUT,
  tango_n2: TOPICS_LAYOUT,
  tango_n3: TOPICS_LAYOUT,
  'zenkamoku-n1-best-workbook': CHAPTERS_LAYOUT,
  'zenkamoku-n2-best-workbook': CHAPTERS_LAYOUT,
  'zenkamoku-n3-best-workbook': CHAPTERS_LAYOUT,
});

const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);

function isObject(value) {
  return value !== null && typeof value === 'object';
}

function isGeoPointLike(value) {
  if (
    !isObject(value)
    || typeof value.latitude !== 'number'
    || typeof value.longitude !== 'number'
  ) {
    return false;
  }

  return value.constructor?.name === 'GeoPoint'
    || typeof value.isEqual === 'function'
    || Object.keys(value).every((key) => key === 'latitude' || key === 'longitude');
}

function isDocumentReferenceLike(value) {
  if (!isObject(value) || typeof value.path !== 'string') {
    return false;
  }

  const keys = Object.keys(value);
  return value.constructor?.name === 'DocumentReference'
    || value.type === 'document'
    || typeof value.withConverter === 'function'
    || keys.every((key) => key === 'id' || key === 'path');
}

function bytesToBase64(value) {
  if (isObject(value) && typeof value.toBase64 === 'function') {
    return value.toBase64();
  }

  let bytes = null;
  if (typeof Uint8Array !== 'undefined' && value instanceof Uint8Array) {
    bytes = value;
  } else if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    bytes = new Uint8Array(value);
  } else if (isObject(value) && typeof value.toUint8Array === 'function') {
    bytes = value.toUint8Array();
  }

  if (!bytes) {
    return null;
  }

  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return globalThis.btoa(binary);
}

export function getBookCollectionLayout(bookId) {
  if (!hasOwn(BOOK_COLLECTION_LAYOUTS, bookId)) {
    throw new Error(`Unknown book collection layout: ${bookId}`);
  }
  return BOOK_COLLECTION_LAYOUTS[bookId];
}

export function normalizeDataValue(value) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (isObject(value) && typeof value.toDate === 'function') {
    const date = value.toDate();
    if (date instanceof Date) {
      return date.toISOString();
    }
  }

  if (isGeoPointLike(value)) {
    return {
      latitude: value.latitude,
      longitude: value.longitude,
    };
  }

  if (isDocumentReferenceLike(value)) {
    return value.path;
  }

  const base64 = bytesToBase64(value);
  if (base64 !== null) {
    return {
      __firestoreType: 'bytes',
      base64,
    };
  }

  if (Array.isArray(value)) {
    return value.map(normalizeDataValue);
  }

  if (value instanceof Map) {
    return Object.fromEntries(
      Array.from(value, ([key, item]) => [key, normalizeDataValue(item)]),
    );
  }

  if (isObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, normalizeDataValue(item)]),
    );
  }

  return value;
}

export function materializeDocument(data, documentId, childCollections = {}) {
  const normalizedData = normalizeDataValue(data ?? {});
  const document = isObject(normalizedData) && !Array.isArray(normalizedData)
    ? { ...normalizedData }
    : {};

  if (!hasOwn(document, 'id')) {
    document.id = documentId;
  }

  for (const [collectionName, documents] of Object.entries(childCollections)) {
    if (hasOwn(document, collectionName)) {
      throw new Error(
        `Cannot materialize ${documentId}: field and subcollection both use ${collectionName}.`,
      );
    }
    document[collectionName] = normalizeDataValue(documents);
  }

  return document;
}

export function toBookMetadata(book, bookId) {
  const metadata = { ...book };
  const layout = getBookCollectionLayout(bookId ?? book.id);
  for (const collectionName of Object.keys(layout)) {
    delete metadata[collectionName];
  }
  return metadata;
}

export function sortById(items) {
  return [...items].sort((left, right) => (
    String(left.id).localeCompare(String(right.id), 'en', {
      numeric: true,
      sensitivity: 'base',
    })
  ));
}
