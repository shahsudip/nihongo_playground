# Firebase Book Export

This folder contains a read-only exporter for the Firestore `books` collection.
It does not write to Firebase.

Run:

```text
node scripts/firebase_backup/export_books.cjs
```

Credential lookup order:

1. `FIREBASE_SERVICE_ACCOUNT` JSON text.
2. `GOOGLE_APPLICATION_CREDENTIALS` file path.
3. `scraper-test/service-account.json`.

Generated output:

- `current/books/<book-id>.json`: one app-friendly JSON file per book. Parent fields and subcollections are merged, so `chapters`, `sets`, or `topics` become arrays.
- `current/manifest.json`: counts, file hashes, source project, and export time.
- `backups/<timestamp>/books/<book-id>.json`: lossless recursive Firestore snapshots with document paths, existence flags, create times, update times, and typed values.
- `backups/<timestamp>/manifest.json`: immutable snapshot manifest.

The generated JSON uses ASCII escape sequences for non-ASCII text. JSON parsers restore the original text automatically.

The script writes staging folders first, validates every JSON file and SHA-256 hash, then replaces `current`. Existing timestamped backups are never overwritten.
