import os
import fitz

pdf_path = r"D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\Materi N3\新完全マスター聴解 N3\新完全マスター聴解, N3 Shin kanzen masutā chōkai, N3.pdf"
doc = fitz.open(pdf_path)

os.makedirs("scratch/shinkanzen_inspect", exist_ok=True)
print(f"Total pages: {len(doc)}")

# Render key pages around Table of Contents and booklet transition to inspect
for pno in [1, 2, 3, 4, 5, 6, 7, 8, 80, 85, 86, 87, 88, 90, 100, 110, 120, 130]:
    if pno <= len(doc):
        page = doc[pno - 1]
        pix = page.get_pixmap(dpi=150)
        pix.save(f"scratch/shinkanzen_inspect/page_{pno:03d}.png")
        print(f"Saved page_{pno:03d}.png")
