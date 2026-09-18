import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')

for page_num in range(1, 11):
    page = doc[page_num]
    drawings = page.get_drawings()
    v_lines = [d['rect'] for d in drawings if d['rect'].width < 2 and d['rect'].height > 200]
    print(f"Page {page_num}: vertical dividing lines: {v_lines}")
