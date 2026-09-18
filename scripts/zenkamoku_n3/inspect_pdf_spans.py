import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')
doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')
page = doc[1]
d = page.get_text('dict')
count = 0
for block in d['blocks']:
    if 'lines' in block:
        for line in block['lines']:
            for span in line['spans']:
                text = span['text'].strip()
                if text:
                    print(f"{span['size']:.1f} | {span['font']} | {span['bbox']} | {text}")
                    count += 1
                    if count > 40:
                        sys.exit(0)
