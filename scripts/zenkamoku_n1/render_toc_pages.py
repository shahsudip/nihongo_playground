"""
render_toc_pages.py
Renders the first 15 pages of the N1 PDF at high DPI for TOC inspection.
"""
import sys, os, fitz
sys.stdout.reconfigure(encoding='utf-8')

BOOKS_DIR = r'D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\latest books'
entries = list(os.scandir(BOOKS_DIR))
n1 = [e for e in entries if e.is_file() and e.name.endswith('.pdf') and 'N1' in e.name][0]
PDF_PATH = n1.path

OUT_DIR = 'tmp_inspect/zenkamoku_n1_toc'
os.makedirs(OUT_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)
print(f'Total pages: {len(doc)}')

# Render first 15 pages at 200 DPI for TOC
for i in range(min(15, len(doc))):
    page = doc[i]
    pix = page.get_pixmap(dpi=200)
    out = os.path.join(OUT_DIR, f'page_{i:03d}.jpg')
    pix.save(out)
    print(f'  Saved page_{i:03d}.jpg')

print(f'\n✅ Done — check tmp_inspect/zenkamoku_n1_toc/')
