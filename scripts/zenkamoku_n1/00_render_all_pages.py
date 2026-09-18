"""
00_render_all_pages.py
Renders all content pages from the N1 PDF at 150 DPI into tmp_inspect/zenkamoku_n1/.
Run this ONCE before any extraction agent starts.

PDF offset: book page number shown = PDF index - 2
So: PDF index = book_page + 2
File naming: page_{book_page:03d}.jpg (1-indexed book page number)
"""
import sys, os, fitz
sys.stdout.reconfigure(encoding='utf-8')

BOOKS_DIR = r'D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\latest books'
entries = list(os.scandir(BOOKS_DIR))
n1 = [e for e in entries if e.is_file() and e.name.endswith('.pdf') and 'N1' in e.name][0]
PDF_PATH = n1.path

OUT_DIR = 'tmp_inspect/zenkamoku_n1'
os.makedirs(OUT_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)
print(f'PDF: {n1.name}')
print(f'Total pages: {len(doc)}')

# PDF offset: PDF index = book_page + 2
# Book content starts at book page 8 (PDF idx 10) through book page 192 (PDF idx 194)
# We render all pages book p8 to p192 (+ answer key, scripts after p192)
# Save as page_{book_page:03d}.jpg

rendered = 0
skipped = 0

# Render all content pages: PDF indices 10 to 250
for pdf_idx in range(10, min(251, len(doc))):
    book_page = pdf_idx - 2  # derived book page number
    fname = f'page_{book_page:03d}.jpg'
    out_path = os.path.join(OUT_DIR, fname)
    if os.path.exists(out_path):
        skipped += 1
        continue
    page = doc[pdf_idx]
    pix = page.get_pixmap(dpi=150)
    pix.save(out_path)
    rendered += 1
    if rendered % 20 == 0:
        print(f'  Rendered {rendered} pages... (book p{book_page})')

print(f'\n✅ Done: {rendered} rendered, {skipped} already existed')
print(f'Total in {OUT_DIR}: {len(os.listdir(OUT_DIR))} files')
