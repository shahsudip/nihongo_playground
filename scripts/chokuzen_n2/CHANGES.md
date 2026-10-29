# Before and after

## Book cover progress

File: `src/components/BookListPage.jsx`.

Before:

```jsx
const loadLocalHistory = (currentUser = null) => {
  const historyMap = {};
  try {
```

After:

```jsx
const loadLocalHistory = (currentUser = null) => {
  const historyMap = {};
  Object.entries(readN2Attempts(n2StorageKeyFor(currentUser?.uid))).forEach(([quizId, record]) => {
    addHistoryRecord(historyMap, quizId, record);
  });
  try {
```

Before, the library had no N2 entry and did not read N2 attempt storage. After, development includes the N2 book and the cover counts both vocabulary and grammar answers out of 810. The browser check confirmed 32 answered questions produce 4 percent cover completion.

## New book route

Before, no `/n2-practice-sets` route existed. After, `src/App.jsx` contains:

```jsx
<Route path="/n2-practice-sets" element={<ChokuzenN2Book />} />
<Route path="/n2-practice-sets/:setId" element={<ChokuzenN2Book />} />
<Route path="/n2-practice-sets/:setId/:sectionId" element={<ChokuzenN2Book />} />
```

The new component, stylesheet, data helpers, and extraction/verification scripts did not exist before this work. Their complete added source and the existing-file modifications are recorded in [changes.diff](changes.diff). Large generated JSON and image assets are documented in [README.md](README.md) rather than duplicated in that code diff.

## Japanese text rendering

Before, the N2 questions were unavailable. The first working extraction retained scanned questions and draft OCR. After proofreading, each set has a separate native-text overlay with actual underline/ruby markup, individual choice text, and a shared passage. Source scans remain only as internal comparison evidence; the quiz displays text, not source images or PDF references.

## Explanation overlays and verification

Before, `build_book.py` read only `study_explanations.json`. After, it reads all `study_explanations*.json` files and rejects duplicate question IDs:

```diff
-    study_explanations = read_json(DATA / 'study_explanations.json')
+    study_explanations = {}
+    for target in sorted(DATA.glob('study_explanations*.json')):
+        for question_id, explanation in read_json(target).items():
+            if question_id in study_explanations:
+                raise ValueError(f'Duplicate study explanation for {question_id}.')
+            study_explanations[question_id] = explanation
```

Before, the browser check assumed Test 15 would remain locked. After, it checks the question's verification flag and expects either a locked notice or an enabled choice. This keeps the same test useful after all 15 sets are proofread.

## TeraTerm impact

None. No serial protocol, console screen, flags, readings, or error codes change. The visible changes are in the browser UI and local extraction/audit command output.
