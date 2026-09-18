import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = 'tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf'
doc = fitz.open(pdf_path)

print(f"Total pages in doc: {len(doc)}")
for i in range(1, 11):
    page_text = doc[i].get_text()
    first_lines = [l.strip() for l in page_text.split('\n') if l.strip()][:10]
    print(f"--- Page {i} ---")
    print(" | ".join(first_lines))
