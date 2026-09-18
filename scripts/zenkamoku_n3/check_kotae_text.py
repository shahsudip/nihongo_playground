import sys
import fitz
import re

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')

for pno in range(1, 11):
    page = doc[pno]
    text = page.get_text()
    # Find all occurrences of 答え
    matches = re.findall(r'(\d+\s*答え\s*[１２３４\d])', text)
    print(f"Page {pno}: {len(matches)} questions -> {matches}")
