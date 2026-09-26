import sys
import fitz
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = 'tmp_inspect/zenkamoku_n1/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N1.pdf'
doc = fitz.open(pdf_path)

print(f"Total pages: {len(doc)}")

for pno in range(1, 6):
    page = doc[pno]
    print(f"\n================ PAGE {pno+1} ================")
    text = page.get_text()
    print(text[:1000])
