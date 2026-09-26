import sys
import os
import fitz
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

def extract_col_lines(page, col_idx):
    d = page.get_text('dict')
    spans = []
    for b in d['blocks']:
        if 'lines' in b:
            for l in b['lines']:
                for s in l['spans']:
                    t = s['text'].strip()
                    if not t or s['bbox'][1] < 35 or s['bbox'][1] > 750:
                        continue
                    # Check column: dividing boundary is around x=258
                    col = 1 if s['bbox'][0] < 258 else 2
                    if col == col_idx:
                        spans.append(s)
    if not spans:
        return []
    
    furi_spans = [s for s in spans if s['size'] < 7.0]
    base_spans = [s for s in spans if s['size'] >= 7.0]
    
    base_spans.sort(key=lambda s: s['bbox'][1])
    lines = []
    for s in base_spans:
        placed = False
        for line in lines:
            avg_y = sum(x['bbox'][1] for x in line) / len(line)
            if abs(s['bbox'][1] - avg_y) < 3.5:
                line.append(s)
                placed = True
                break
        if not placed:
            lines.append([s])
    for line in lines:
        line.sort(key=lambda s: s['bbox'][0])
    lines.sort(key=lambda line: sum(s['bbox'][1] for s in line) / len(line))
    
    result_lines = []
    for line in lines:
        line_min_y = min(s['bbox'][1] for s in line)
        line_furis = [f for f in furi_spans if f['bbox'][3] <= line_min_y + 4.0 and f['bbox'][1] >= line_min_y - 12.0]
        
        line_str = ''
        i = 0
        while i < len(line):
            s = line[i]
            if re.search(r'[\u4e00-\u9fff]', s['text']):
                s_x0, s_y0, s_x1, s_y1 = s['bbox']
                overlapping_furi = [f for f in line_furis if f['bbox'][0] < s_x1 and f['bbox'][2] > s_x0]
                if overlapping_furi:
                    f_main = overlapping_furi[0]
                    kanji_group = [s['text']]
                    j = i + 1
                    while j < len(line) and re.search(r'[\u4e00-\u9fff]', line[j]['text']):
                        next_s = line[j]
                        if f_main['bbox'][0] < next_s['bbox'][2] and f_main['bbox'][2] > next_s['bbox'][0]:
                            kanji_group.append(next_s['text'])
                            j += 1
                        else:
                            break
                    furi_text = f_main['text'].strip()
                    combined_kanji = "".join(kanji_group)
                    line_str += f'<ruby>{combined_kanji}<rt>{furi_text}</rt></ruby>'
                    i = j
                    continue
            line_str += s['text']
            i += 1
        result_lines.append(line_str)
    return result_lines

def extract_all_kaisetsu_text(pdf_path):
    doc = fitz.open(pdf_path)
    all_lines = []
    for pno in range(1, len(doc)): # skip cover page (page 0)
        page = doc[pno]
        for col in [1, 2]:
            col_lines = extract_col_lines(page, col)
            for l in col_lines:
                clean_l = l.strip()
                if not clean_l:
                    continue
                if '全科目攻略！JLPT' in clean_l or '日本語能力試験ベスト総合問題集' in clean_l:
                    continue
                if re.match(r'^\d+$', clean_l) and len(clean_l) <= 2: # page number
                    continue
                all_lines.append(clean_l)
    return all_lines

if __name__ == '__main__':
    pdf_path = 'tmp_inspect/zenkamoku_n1/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N1.pdf'
    lines = extract_all_kaisetsu_text(pdf_path)
    print(f"Extracted {len(lines)} lines from Kaisetsu PDF.")
    with open('scripts/zenkamoku_n1/kaisetsu_lines.json', 'w', encoding='utf-8') as f:
        json.dump(lines, f, ensure_ascii=False, indent=2)
    print("Sample lines 0 to 40:")
    for l in lines[:40]:
        print("  ", l)
