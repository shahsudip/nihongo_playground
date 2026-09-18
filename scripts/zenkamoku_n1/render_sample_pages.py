"""
render_sample_pages.py
Renders sample content pages from the N1 PDF to understand question format.
Pages to render: 16-35 (Week 1-2: Language Knowledge section)
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
print(f'Total pages: {len(doc)}')

# Book page N = PDF index N+13 (book p1=cover, content starts at book p16=PDF idx 15)
# PDF has: cover(0), blank(1), title(2), copyright(3), TOC-p4(6), TOC-p5(7), features(8,9), vocab(10-12)...
# Let's render key sample pages: book p16-44 = PDF idx 15-43
# Also include answer key area
BOOK_PAGES = list(range(16, 45)) + [46, 48, 50, 52, 54]  # weeks 1-4 language knowledge

rendered = 0
skipped = 0
for bp in BOOK_PAGES:
    # PDF index = bp - 1 (0-indexed, book page numbering offset by 1)
    pdf_idx = bp - 1
    if pdf_idx >= len(doc):
        print(f'  ⚠️  Book p{bp} (PDF idx {pdf_idx}) out of range')
        continue
    fname = f'page_{bp:03d}.jpg'
    out_path = os.path.join(OUT_DIR, fname)
    if os.path.exists(out_path):
        skipped += 1
        continue
    page = doc[pdf_idx]
    pix = page.get_pixmap(dpi=150)
    pix.save(out_path)
    rendered += 1
    print(f'  Saved {fname} (PDF idx {pdf_idx})')

print(f'\n✅ Done: {rendered} rendered, {skipped} already existed')
