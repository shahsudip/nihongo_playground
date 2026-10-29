# Chokuzen Taisaku N2 digitization

## Current state

- Local preview: http://localhost:5174/nihongo_playground/#/n2-practice-sets
- 240 original scanned pages retained with searchable Japanese OCR.
- 15 interactive tests: 810 questions, 480 vocabulary questions, 330 grammar questions.
- All 810 printed answer keys, 255 printed grammar explanations, and 75 sentence-order permutations transcribed from the answer booklet.
- All 15 tests have separate native Japanese proofreading overlays: 810 stems/options and 15 shared passages, including underlines, printed ruby, and sentence-order blanks.
- All 15 tests (810 questions) now have complete English study explanations: full-sentence / passage-context translation, correct-answer meaning, and four-choice reasons.
- The N2 UI follows the N3 Chokuzen quiz pattern: top question navigator, four native-text choices, and a separate explanation card. No page scans, PDF references, or source reader are displayed in the UI.
- Automated gates pass with 0 structural errors, 0 text records pending, and 0 English explanations pending.
- Work is local. No N2 Firebase content was written, and no deployment was performed.

## Files

- `src/data/chokuzen_n2/book.json`: assembled book used by the development UI.
- `src/data/chokuzen_n2/source.json`: PDF fingerprint and original page manifest.
- `src/data/chokuzen_n2/answer_keys_1_8.json`: verified printed keys/explanations for tests 1-8.
- `src/data/chokuzen_n2/answer_keys_9_15.json`: verified printed keys/explanations for tests 9-15.
- `src/data/chokuzen_n2/proofread_sets_1_5.json`: Test 1 proofreading overlay.
- `src/data/chokuzen_n2/proofread_set_2.json` through `proofread_set_15.json`: separate Japanese text overlays for Tests 2-15.
- `src/data/chokuzen_n2/study_explanations.json`: Test 1 English translation and four-choice breakdown overlay.
- `src/data/chokuzen_n2/study_explanations_set_*.json`: separate English explanation overlays for later tests, loaded only after each file is complete JSON.
- `public/books/chokuzen_n2/`: original pages, question crops, four option crops per question, shared passages, and cover.
- `src/components/ChokuzenN2Book.jsx`: N3-style overview, sections, text-only quiz, and progress.
- `src/utils/chokuzenN2Data.js`: local/Firebase source selection, numeric answer validation, separate account/guest attempts.
- `checklists/set-1.md` through `checklists/set-15.md`: per-test verification gates.
- `tmp_inspect/chokuzen_n2/`: raw OCR geometry, layout provenance, audit output, browser evidence, and isolated browser test profile.

## Source order corrections

Most test-region pages have `printedPage = pdfPage + 2`. These exceptions were visually verified:

| Printed page | PDF page |
| --- | --- |
| 15 | 15 |
| 16 | 16 |
| 17 | 13 |
| 18 | 14 |
| 117 | 116 |
| 118 | 115 |

Tests 8 and 10 split the first grammar group across pages as 8 questions and 4 questions, rather than 9 and 3. The builder handles those exceptions explicitly. Text-grammar Q50-54 always retain empty individual stems and share the correct passage.

## Rebuild and verify

```powershell
python scripts/chokuzen_n2/prepare_source.py 'D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\jlpt mix files\Chokuzen_Taisaku_N2_Resources_PDF.pdf'
python scripts/chokuzen_n2/build_book.py
python scripts/chokuzen_n2/verify_book.py --checklists
node scripts/chokuzen_n2/verify_ui.mjs
npm.cmd run build
```

The source preparation uses the installed Windows Japanese OCR engine. The PDF has no embedded text layer. All page assets are harvested before JSON is written. Cached OCR lives under the repository inspection folder so interrupted extraction can resume.

For the final proofreading gate:

```powershell
python scripts/chokuzen_n2/verify_book.py --require-proofread
```

Run this after rebuilding the assembled book. Structural validation is separate and currently passes with zero errors. Raw OCR must never be promoted to verified text just to pass the gate. `--require-complete` also requires 54 English explanations and signed manual checklist gates per set.

## UI and data behavior

Development reads only local JSON and writes only local attempt storage. Production reads the `books/jlpt-n2-practice-sets` metadata document and its `sets` subcollection, and saves signed-in history under `users/{uid}/quizHistory`. Production has no JSON fallback. The catalog entry is enabled only in development until the book is ready to publish.

Answers use stable IDs such as `n2-set-1-q-1` and zero-based indices. `correctOption` always equals `options[correctIndex]`. Attempt completion counts both vocabulary and grammar answers. Mastery requires every question answered and accuracy strictly above 90 percent. The library cover uses question completion across all 810 questions.

Printed detailed explanations exist for Q33-49. Other questions have the verified answer key only. No missing textbook explanation is fabricated. Unproofread OCR words are never displayed as authoritative questions or scored.

TeraTerm output is unaffected. This work changes the React web application and local book data.

## Verification evidence

- Structural audit: 15 tests, 810 questions, 240 source pages, zero structural errors on the latest assembled book.
- Scoped ESLint: all five touched JavaScript/JSX modules passed.
- Production build: passed.
- Browser checks: all 30 section routes, text-only choices, answer restoration after reload, sentence-order markup, ruby in stems/options, shared passage rendering, desktop/mobile overflow, and library cover completion passed.
- Browser evidence: `tmp_inspect/chokuzen_n2/ui-answered-desktop.png`, `ui-native-text-mobile.png`, `ui-quiz-dark-mobile.png`, and `ui-passage-desktop.png`.
- Strict completion gate: passes with 0 structural errors, 0 text records pending, and 0 English explanations pending across all 15 tests (810 questions).

## Status summary

All 15 tests, 810 questions, and 15 shared passages have been completely digitized with native proofread Japanese text and comprehensive English study explanations. Rebuilding applies overlays without disturbing stable IDs or saved answers.
