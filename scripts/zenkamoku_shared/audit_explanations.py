"""
audit_explanations.py
Checks every question in all 3 zenkamoku books for a non-empty explanation field.
"""
import sys, json, glob, os
sys.stdout.reconfigure(encoding='utf-8')

BOOKS = ['zenkamoku_n1', 'zenkamoku_n2', 'zenkamoku_n3']

grand_total = 0
grand_missing = 0

for book in BOOKS:
    files = sorted(glob.glob(f'src/data/{book}/*.json'))
    book_total = 0
    book_missing = []

    for fp in files:
        base = os.path.basename(fp)
        with open(fp, 'r', encoding='utf-8') as f:
            d = json.load(f)

        # Collect all questions from sections or top-level
        questions = []
        for s in d.get('sections', []):
            questions.extend(s.get('questions', []))
        questions.extend(d.get('questions', []))

        for i, q in enumerate(questions):
            book_total += 1
            expl = q.get('explanation', '')
            if not expl or not expl.strip():
                book_missing.append((base, i+1, q.get('id', ''), q.get('stem', '')[:40]))

    grand_total += book_total
    grand_missing += len(book_missing)

    pct = 100 * (book_total - len(book_missing)) / book_total if book_total else 0
    print(f"\n{'='*55}")
    print(f"  {book}")
    print(f"  Total questions : {book_total}")
    print(f"  With explanation: {book_total - len(book_missing)}")
    print(f"  MISSING         : {len(book_missing)}")
    print(f"  Coverage        : {pct:.1f}%")
    if book_missing:
        print(f"  Missing details:")
        for (fn, qi, qid, stem) in book_missing[:20]:
            print(f"    {fn} Q{qi} id={qid} stem='{stem}'")
        if len(book_missing) > 20:
            print(f"    ... and {len(book_missing)-20} more")

print(f"\n{'='*55}")
print(f"  GRAND TOTAL")
print(f"  Total: {grand_total}   Missing: {grand_missing}   Coverage: {100*(grand_total-grand_missing)/grand_total:.1f}%")
