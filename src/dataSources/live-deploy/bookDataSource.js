import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db as defaultDatabase } from '../../firebaseConfig.js';
import {
  getBookCollectionLayout,
  materializeDocument,
  normalizeDataValue,
  sortById,
} from '../bookDataContract.js';

const BOOKS_COLLECTION = 'books';

async function readConfiguredCollections(parentReference, layout) {
  const collectionEntries = Object.entries(layout || {});
  const resolvedCollections = await Promise.all(
    collectionEntries.map(async ([collectionName, childLayout]) => {
      const snapshot = await getDocs(collection(parentReference, collectionName));
      const documents = await Promise.all(
        snapshot.docs.map(async (documentSnapshot) => {
          const childCollections = await readConfiguredCollections(
            documentSnapshot.ref,
            childLayout,
          );

          return materializeDocument(
            normalizeDataValue(documentSnapshot.data()),
            documentSnapshot.id,
            childCollections,
          );
        }),
      );

      return [collectionName, sortById(documents)];
    }),
  );

  return Object.fromEntries(resolvedCollections);
}

export function createLiveDeployBookDataSource(options = {}) {
  const database = options.database ?? options.db ?? defaultDatabase;

  return Object.freeze({
    source: 'live-deploy',

    async listBooks() {
      const snapshot = await getDocs(collection(database, BOOKS_COLLECTION));
      const books = snapshot.docs.map((documentSnapshot) => materializeDocument(
        normalizeDataValue(documentSnapshot.data()),
        documentSnapshot.id,
      ));

      return sortById(books);
    },

    async getBook(bookId) {
      const bookReference = doc(database, BOOKS_COLLECTION, bookId);
      const snapshot = await getDoc(bookReference);

      if (!snapshot.exists()) {
        return null;
      }

      let layout;
      try {
        layout = getBookCollectionLayout(bookId);
      } catch {
        throw new Error(`No collection layout is registered for live book "${bookId}".`);
      }

      const childCollections = await readConfiguredCollections(bookReference, layout);

      return materializeDocument(
        normalizeDataValue(snapshot.data()),
        snapshot.id,
        childCollections,
      );
    },
  });
}
