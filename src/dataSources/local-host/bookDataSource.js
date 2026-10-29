import {
  normalizeDataValue,
  sortById,
  toBookMetadata,
} from '../bookDataContract.js';

const VITE_BASE_URL = import.meta.env?.BASE_URL || '/';
const DEFAULT_BASE_URL = VITE_BASE_URL + 'scripts/firebase_backup/current';

const NIHONGO_NO_MORI_SECTION_LOADERS = [
  ['ch1-m1', () => import('../../data/nihongo_no_mori_n3/ch1_mondai1_kanji_reading.json')],
  ['ch1-m2', () => import('../../data/nihongo_no_mori_n3/ch1_mondai2_hyouki.json')],
  ['ch1-m3', () => import('../../data/nihongo_no_mori_n3/ch1_mondai3_context.json')],
  ['ch1-m4', () => import('../../data/nihongo_no_mori_n3/ch1_mondai4_synonyms.json')],
  ['ch1-m5', () => import('../../data/nihongo_no_mori_n3/ch1_mondai5_usage.json')],
  ['ch2-lessons', () => import('../../data/nihongo_no_mori_n3/ch2_grammar_lessons.json')],
  ['ch2-sec1', () => import('../../data/nihongo_no_mori_n3/ch2_sec1_grammar_reason.json')],
  ['ch2-sec2', () => import('../../data/nihongo_no_mori_n3/ch2_sec2_grammar_situation.json')],
  ['ch2-sec3', () => import('../../data/nihongo_no_mori_n3/ch2_sec3_grammar_standpoint.json')],
  ['ch2-sec4', () => import('../../data/nihongo_no_mori_n3/ch2_sec4_grammar_contrast.json')],
  ['ch2-sec5', () => import('../../data/nihongo_no_mori_n3/ch2_sec5_grammar_degree.json')],
  ['ch3-tanbun', () => import('../../data/nihongo_no_mori_n3/ch3_dokkai_tanbun.json')],
  ['ch3-chubun', () => import('../../data/nihongo_no_mori_n3/ch3_dokkai_chubun.json')],
  ['ch3-chobun', () => import('../../data/nihongo_no_mori_n3/ch3_dokkai_chobun.json')],
  ['ch3-kensaku', () => import('../../data/nihongo_no_mori_n3/ch3_dokkai_kensaku.json')],
  ['ch4-kadai', () => import('../../data/nihongo_no_mori_n3/ch4_sec1_kadai.json')],
  ['ch4-point', () => import('../../data/nihongo_no_mori_n3/ch4_sec2_point.json')],
  ['ch4-gaiyou', () => import('../../data/nihongo_no_mori_n3/ch4_sec3_gaiyou.json')],
  ['ch4-hatsuwa', () => import('../../data/nihongo_no_mori_n3/ch4_sec4_hatsuwa.json')],
  ['ch4-sokuji', () => import('../../data/nihongo_no_mori_n3/ch4_sec5_sokuji.json')],
];

async function loadNihongoNoMoriBook() {
  const bookModule = await import('../../data/nihongo_no_mori_n3/book.json');
  const book = bookModule.default || bookModule;
  if (Array.isArray(book.chapters) && book.chapters.length > 0) {
    return book;
  }

  const sectionModules = await Promise.all(
    NIHONGO_NO_MORI_SECTION_LOADERS.map(([, loader]) => loader())
  );

  return {
    ...book,
    chapters: NIHONGO_NO_MORI_SECTION_LOADERS.map(([id], index) => ({
      id,
      data: sectionModules[index].default || sectionModules[index],
    })),
  };
}

const LOCAL_BOOK_LOADERS = Object.freeze({
  'first-time-jlpt-n3-350-kanji': async () => {
    const bookModule = await import('../../data/first_time_n3_350_kanji/book.json');
    const book = bookModule.default || bookModule;
    if (Array.isArray(book.chapters) && book.chapters.length > 0) {
      return book;
    }
    const module = await import('../../data/first_time_n3_350_kanji/index.js');
    return module.firstTimeN3KanjiBook || module.default;
  },
  'pass-n3-within-20-days': async () => {
    const bookModule = await import('../../data/pass_n3_within_20_days/book.json');
    const book = bookModule.default || bookModule;
    if (Array.isArray(book.chapters) && book.chapters.length > 0) {
      return book;
    }
    const module = await import('../../data/pass_n3_within_20_days/index.js');
    return module.passN3Within20DaysBook || module.default;
  },
  'nihongo-no-mori-n3': loadNihongoNoMoriBook,
  'kore-issatsu-n3': async () => {
    const bookModule = await import('../../data/kore_issatsu_n3/book.json');
    return bookModule.default || bookModule;
  },
});

function joinUrl(baseUrl, relativePath) {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
  const normalizedPath = relativePath.replace(/^\/+/, '');
  return normalizedBaseUrl + '/' + normalizedPath;
}

function describeResponseStatus(response) {
  if (!response) {
    return 'no response';
  }

  const status = typeof response.status === 'number'
    ? String(response.status)
    : 'unknown status';
  const statusText = typeof response.statusText === 'string'
    ? response.statusText.trim()
    : '';

  return 'HTTP ' + status + (statusText ? ' ' + statusText : '');
}

function mapManifestFiles(manifest, manifestUrl) {
  if (!manifest || !Array.isArray(manifest.books)) {
    throw new Error(
      'Invalid localhost book manifest at "' + manifestUrl
        + '": expected a books array.',
    );
  }

  const filesById = new Map();

  manifest.books.forEach((entry, index) => {
    if (
      !entry
      || typeof entry.id !== 'string'
      || entry.id.length === 0
      || typeof entry.file !== 'string'
      || entry.file.length === 0
    ) {
      throw new Error(
        'Invalid localhost book manifest entry at index ' + index
          + ' in "' + manifestUrl + '".',
      );
    }

    if (filesById.has(entry.id)) {
      throw new Error(
        'Duplicate localhost book id "' + entry.id
          + '" in "' + manifestUrl + '".',
      );
    }

    filesById.set(entry.id, entry.file);
  });

  return filesById;
}

export function createLocalhostBookDataSource(options = {}) {
  const baseUrl = options.baseUrl === undefined
    ? DEFAULT_BASE_URL
    : String(options.baseUrl);
  const fetchImpl = options.fetchImpl === undefined
    ? globalThis.fetch
    : options.fetchImpl;

  if (typeof fetchImpl !== 'function') {
    throw new Error(
      'Localhost book data source requires fetch support. '
        + 'Provide options.fetchImpl or use an environment with global fetch.',
    );
  }

  const manifestUrl = joinUrl(baseUrl, 'manifest.json');
  const bookCache = new Map();
  const bookRequests = new Map();
  let manifestRequest = null;

  async function fetchJson(url) {
    const response = await fetchImpl(url);

    if (!response || response.ok !== true) {
      throw new Error(
        'Failed to fetch localhost book data from "' + url + '": '
          + describeResponseStatus(response) + '.',
      );
    }

    return response.json();
  }

  function getManifestFiles() {
    if (!manifestRequest) {
      manifestRequest = fetchJson(manifestUrl)
        .then((manifest) => mapManifestFiles(manifest, manifestUrl))
        .catch((error) => {
          manifestRequest = null;
          throw error;
        });
    }

    return manifestRequest;
  }

  function loadBook(bookId, relativePath) {
    if (bookCache.has(bookId)) {
      return Promise.resolve(bookCache.get(bookId));
    }

    if (!bookRequests.has(bookId)) {
      const bookUrl = joinUrl(baseUrl, relativePath);
      const request = fetchJson(bookUrl)
        .then((book) => normalizeDataValue(book))
        .then((book) => {
          bookCache.set(bookId, book);
          return book;
        })
        .finally(() => {
          bookRequests.delete(bookId);
        });

      bookRequests.set(bookId, request);
    }

    return bookRequests.get(bookId);
  }

  function loadLocalModuleBook(bookId) {
    const loader = LOCAL_BOOK_LOADERS[bookId];
    if (!loader) return null;
    if (bookCache.has(bookId)) return Promise.resolve(bookCache.get(bookId));

    if (!bookRequests.has(bookId)) {
      const request = loader()
        .then((book) => normalizeDataValue(book))
        .then((book) => {
          bookCache.set(bookId, book);
          return book;
        })
        .finally(() => {
          bookRequests.delete(bookId);
        });
      bookRequests.set(bookId, request);
    }

    return bookRequests.get(bookId);
  }

  async function getBook(bookId) {
    const localModuleBook = loadLocalModuleBook(bookId);
    if (localModuleBook) return localModuleBook;

    const filesById = await getManifestFiles();
    const relativePath = filesById.get(bookId);

    if (relativePath === undefined) {
      return null;
    }

    const book = await loadBook(bookId, relativePath);
    return normalizeDataValue(book);
  }

  async function listBooks() {
    const filesById = await getManifestFiles();
    const metadata = await Promise.all(
      Array.from(filesById, async ([bookId, relativePath]) => {
        const book = await loadBook(bookId, relativePath);
        return toBookMetadata(normalizeDataValue(book), bookId);
      }),
    );

    return normalizeDataValue(sortById(metadata));
  }

  return Object.freeze({
    source: 'localhost',
    listBooks,
    getBook,
  });
}
