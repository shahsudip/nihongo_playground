import fitz
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "JLPT_N3_Kono_Issatsu_de_Goukaku_Suru.pdf"
doc = fitz.open(pdf_path)

print(f"Total pages: {len(doc)}")

# Check first 10 pages for embedded images
for i in range(min(10, len(doc))):
    page = doc[i]
    images = page.get_images()
    text = page.get_text().strip()
    print(f"Page {i+1}: text_len={len(text)}, images_count={len(images)}, rect={page.rect}")
    if images:
        for img in images:
            xref = img[0]
            base_img = doc.extract_image(xref)
            print(f"  Img: ext={base_img['ext']}, width={base_img['width']}, height={base_img['height']}")

