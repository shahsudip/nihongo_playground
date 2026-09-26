import os
import fitz

pdf_path = r"D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\Materi N3\新完全マスター聴解 N3\新完全マスター聴解, N3 Shin kanzen masutā chōkai, N3.pdf"
doc = fitz.open(pdf_path)

out_dir = "scratch/shinkanzen_part1"
os.makedirs(out_dir, exist_ok=True)

# Render Part 1 pages (from Page 6 to 18 in PDF)
for pno in range(6, 19):
    page = doc[pno - 1]
    pix = page.get_pixmap(dpi=150)
    pix.save(f"{out_dir}/page_{pno:03d}.png")
    print(f"Rendered page_{pno:03d}.png")
