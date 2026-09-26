import sys
import fitz
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = 'tmp_inspect/zenkamoku_n1/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N1.pdf'
doc = fitz.open(pdf_path)

def parse_page_with_ruby(page):
    d = page.get_text('dict')
    spans = []
    for b in d['blocks']:
        if 'lines' in b:
            for l in b['lines']:
                for s in l['spans']:
                    t = s['text'].strip()
                    if not t:
                        continue
                    if s['bbox'][1] < 40 or s['bbox'][1] > 745:
                        continue
                    col = 1 if s['bbox'][0] < 258 else 2
                    spans.append({
                        'col': col,
                        'bbox': s['bbox'],
                        'size': s['size'],
                        'text': s['text'],
                        'font': s['font']
                    })
    
    # Process column by column
    col_texts = []
    for col_idx in [1, 2]:
        col_spans = [s for s in spans if s['col'] == col_idx]
        if not col_spans:
            continue
        
        # Separate furigana (size < 7.0) and base text (size >= 7.0)
        furi_spans = [s for s in col_spans if s['size'] < 7.0]
        base_spans = [s for s in col_spans if s['size'] >= 7.0]
        
        # Group base spans into lines by y-coordinate
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
        
        # Now for each line, attach furigana to matching kanji spans
        rendered_lines = []
        for line in lines:
            line_str = ""
            for s in line:
                # Find matching furigana span directly above this span
                # Furigana should be above (f_y1 <= s_y0 + 2) and horizontally overlapping
                s_x0, s_y0, s_x1, s_y1 = s['bbox']
                matched_furi = []
                for f in furi_spans:
                    f_x0, f_y0, f_x1, f_y1 = f['bbox']
                    if f_y1 <= s_y0 + 3.0 and f_y0 >= s_y0 - 10.0:
                        # Horizontal overlap check
                        if f_x0 < s_x1 and f_x1 > s_x0:
                            matched_furi.append(f)
                
                matched_furi.sort(key=lambda x: x['bbox'][0])
                if matched_furi and re.search(r'[\u4e00-\u9fff]', s['text']):
                    furi_text = "".join([f['text'] for f in matched_furi])
                    # If span text is pure kanji
                    line_str += f"<ruby>{s['text']}<rt>{furi_text}</rt></ruby>"
                else:
                    line_str += s['text']
            rendered_lines.append(line_str)
        
        col_texts.append("\n".join(rendered_lines))
    
    return "\n\n".join(col_texts)

print("=== PAGE 2 ===")
print(parse_page_with_ruby(doc[1]))
print("\n=== PAGE 3 ===")
print(parse_page_with_ruby(doc[2]))
