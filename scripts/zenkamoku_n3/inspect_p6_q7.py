import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')
page = doc[6]
d = page.get_text('dict')
for b in d['blocks']:
    if 'lines' in b:
        for l in b['lines']:
            for s in l['spans']:
                if any(w in s['text'] for w in ['記録', '競技', '残すこと']):
                    print(s['bbox'], f"sz={s['size']}", repr(s['text']))
