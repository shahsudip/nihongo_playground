import {
  BOOK_DATA_SOURCES,
  createBookDataSource,
} from './createBookDataSource.js';

const RUNTIME_BOOK_IDS = new Set([
  'first-time-jlpt-n3-350-kanji',
  'pass-n3-within-20-days',
  'nihongo-no-mori-n3',
]);

let sourceRequest = null;
const bookRequests = new Map();

export const isRuntimeBookId = (bookId) => RUNTIME_BOOK_IDS.has(bookId);

const getRuntimeSource = () => {
  if (!sourceRequest) {
    const source = import.meta.env.DEV
      ? BOOK_DATA_SOURCES.LOCALHOST
      : BOOK_DATA_SOURCES.LIVE_DEPLOY;
    sourceRequest = createBookDataSource(source);
  }
  return sourceRequest;
};

export const loadRuntimeBook = async (bookId) => {
  if (!isRuntimeBookId(bookId)) {
    throw new Error(`Runtime book source is not registered for "${bookId}".`);
  }

  if (!bookRequests.has(bookId)) {
    const request = getRuntimeSource()
      .then((source) => source.getBook(bookId))
      .then((book) => {
        if (!book) throw new Error(`Book content not found for "${bookId}".`);
        return book;
      })
      .catch((error) => {
        bookRequests.delete(bookId);
        throw error;
      });
    bookRequests.set(bookId, request);
  }

  return bookRequests.get(bookId);
};
