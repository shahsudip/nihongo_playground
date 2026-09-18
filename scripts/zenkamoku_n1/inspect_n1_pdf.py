"""
inspect_n1_pdf.py
Inspect the N1 Zenkamoku PDF structure — page count, TOC, first pages text.
"""
import sys, os, fitz
sys.stdout.reconfigure(encoding='utf-8')

BOOKS_DIR = r'D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\latest books'

# List all files using os.scandir which handles unicode properly
entries = list(os.scandir(BOOKS_DIR))
print('All files in books dir:')
for e in entries:
    print(f'  {e.name!r}')
print()

# Find N1 PDF
n1_candidates = [e for e in entries if e.is_file() and e.name.endswith('.pdf') and 'N1' in e.name]
if not n1_candidates:
    print('ERROR: No N1 PDF found')
    sys.exit(1)

PDF_PATH = n1_candidates[0].path
print(f'Using: {PDF_PATH}')
print()

doc = fitz.open(PDF_PATH)
print(f'Total pages: {len(doc)}')

toc = doc.get_toc()
if toc:
    print('\n=== TOC ===')
    for level, title, page in toc:
        print(f'  L{level} p{page}: {title}')

print('\n=== FIRST 12 PAGES TEXT ===')
for i in range(min(12, len(doc))):
    text = doc[i].get_text('text').strip()[:500]
    print(f'\n--- PDF index {i} ---')
    print(text)
