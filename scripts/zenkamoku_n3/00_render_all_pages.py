"""
00_render_all_pages.py
Renders all content pages from the PDF at 150 DPI into tmp_inspect/zenkamoku_n3/.
Run this ONCE before any extraction agent starts.
"""
import sys, os, fitz
sys.stdout.reconfigure(encoding='utf-8')

PDF_PATH = r'D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\latest books\全科目攻略JLPT日本語能力試験ベスト総合問題集N3 (五十嵐香子, 金澤美香子, 杉山舞) (z-library.sk, 1lib.sk, z-lib.sk).pdf'
OUT_DIR = 'tmp_inspect/zenkamoku_n3'
os.makedirs(OUT_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)

# All content pages (book page numbers, 1-based = PDF page index+1 due to cover offset)
# Book page 16 = PDF index 15, etc.
# We render PDF indices 14 to 212 (book pages 15 to 213)
RANGES = list(range(14, 213))  # PDF 0-indexed

rendered = 0
skipped = 0
for idx in RANGES:
    fname = f'page_{idx+1:03d}.jpg'  # filename matches book page number (idx+1)
    out_path = os.path.join(OUT_DIR, fname)
    if os.path.exists(out_path):
        skipped += 1
        continue
    page = doc[idx]
    pix = page.get_pixmap(dpi=150)
    pix.save(out_path)
    rendered += 1
    if rendered % 20 == 0:
        print(f'  Rendered {rendered} pages...')

print(f'\n✅ Done: {rendered} rendered, {skipped} already existed')
print(f'Total in {OUT_DIR}: {len(os.listdir(OUT_DIR))} files')
