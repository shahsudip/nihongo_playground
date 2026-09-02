import fitz
import os

PDF_PATH = r"D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\Materi N3 総まとめ\日本語総まとめ N3, 読解  Nihongo sōmatome N3, Dokkai.pdf"
OUTPUT_DIR = r"D:\sudip_software\nihongo_playground\somatome_pages"
os.makedirs(OUTPUT_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)
print(f"Total pages in PDF: {doc.page_count}")

# Extract pages 65 to 113
for i in range(65, doc.page_count):
    page = doc.load_page(i)
    pix = page.get_pixmap(dpi=150)
    out_path = os.path.join(OUTPUT_DIR, f"page_{i+1}.jpg")
    pix.save(out_path)
    print(f"Saved page_{i+1}.jpg")

print("Done!")
