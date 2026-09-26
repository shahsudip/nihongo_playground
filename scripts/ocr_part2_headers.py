import pytesseract
import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

results = []
for p in range(17, 88):
    header_path = f'tmp_inspect/main_book/header_p{p:03d}.png'
    if os.path.exists(header_path):
        img = header_path
        text = pytesseract.image_to_string(img, lang='jpn').strip()
        lines = [l.strip() for l in text.splitlines() if l.strip()]
        results.append({'pdf_page': p, 'book_page': p-3, 'header': ' // '.join(lines)})

with open('tmp_inspect/main_headers.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

for r in results:
    if r['header']:
        print(f"P{r['pdf_page']:03d} (Book P{r['book_page']:02d}): {r['header']}")
