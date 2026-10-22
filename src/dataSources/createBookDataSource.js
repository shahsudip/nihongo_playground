export const BOOK_DATA_SOURCES = Object.freeze({
  LIVE_DEPLOY: 'live-deploy',
  LOCALHOST: 'localhost',
});

export async function createBookDataSource(source, options = {}) {
  if (source === BOOK_DATA_SOURCES.LOCALHOST) {
    return createLocalhostBookDataSource(options);
  }
  if (source === BOOK_DATA_SOURCES.LIVE_DEPLOY) {
    return createLiveDeployBookDataSource(options);
  }
  throw new Error(`Unknown book data source: ${source}`);
}

export async function createLocalhostBookDataSource(options = {}) {
  const module = await import('./local-host/bookDataSource.js');
  return module.createLocalhostBookDataSource(options);
}

export async function createLiveDeployBookDataSource(options = {}) {
  const module = await import('./live-deploy/bookDataSource.js');
  return module.createLiveDeployBookDataSource(options);
}
