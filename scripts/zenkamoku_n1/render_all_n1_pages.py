import fitz
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_dir = r'D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\latest books'
n1_pdf = [f for f in os.listdir(pdf_dir) if 'N1' in f and 'ベスト総合問題集' in f][0]
full_path = os.path.join(pdf_dir, n1_pdf)

out_dir = 'tmp_inspect/zenkamoku_n1'
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(full_path)
print(f"Total pages in N1 PDF: {len(doc)}")
print("Rendering all content pages (pages 1 to 251)...")

rendered = 0
skipped = 0

for p in range(len(doc)):
    fname = f"page_{p+1:03d}.jpg"
    out_file = os.path.join(out_dir, fname)
    if os.path.exists(out_file):
        skipped += 1
        continue
    page = doc[p]
    pix = page.get_pixmap(dpi=150)
    pix.save(out_file)
    rendered += 1
    if (p + 1) % 25 == 0 or p == len(doc) - 1:
        print(f"  Processed {p+1}/{len(doc)} pages...")

print(f"\n✅ Done: {rendered} rendered, {skipped} already existed.")
print(f"Total images in {out_dir}: {len(os.listdir(out_dir))}")
