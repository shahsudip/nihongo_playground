import os
import fitz
import glob

base_dir = r"D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\latest books"
pdf_path = None
for f in glob.glob(os.path.join(glob.escape(base_dir), "*.pdf")):
    if "N2" in f and "全科目" in f:
        pdf_path = f
        break

if not pdf_path:
    for f in os.listdir(base_dir):
        if "N2" in f and "ベスト" in f:
            pdf_path = os.path.join(base_dir, f)
            break

if not pdf_path:
    print("Could not find the N2 Zenkamoku PDF!")
    exit(1)

print("Found PDF.")

out_dir = r"D:\sudip_software\nihongo_playground\tmp_inspect\zenkamoku_n2"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

cover_page = doc[0]
pix = cover_page.get_pixmap(dpi=150)
cover_path = r"D:\sudip_software\nihongo_playground\public\images\zenkamoku_n2_cover.jpg"
pix.save(cover_path)
print("Saved cover")

existing = glob.glob(os.path.join(out_dir, "page_*.jpg"))
if len(existing) < len(doc):
    print("Rendering pages...")
    for i in range(len(doc)):
        out_path = os.path.join(out_dir, f"page_{i:03d}.jpg")
        if not os.path.exists(out_path):
            pix = doc[i].get_pixmap(dpi=150)
            pix.save(out_path)
            if i % 20 == 0:
                print(f"Rendered {i} pages...")
else:
    print("Pages already rendered!")

print("PDF rendering complete.")
