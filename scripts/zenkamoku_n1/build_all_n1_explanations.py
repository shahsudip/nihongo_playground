import sys
import os
import json
import re
import fitz

sys.stdout.reconfigure(encoding='utf-8')

def to_half_width(s):
    if not s:
        return ""
    table = str.maketrans('０１２３４５６７８９', '0123456789')
    return s.translate(table)

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

def extract_all_lines(pdf_path):
    doc = fitz.open(pdf_path)
    all_lines = []
    for pno in range(1, len(doc)):
        page = doc[pno]
        for col in [1, 2]:
            col_lines = extract_col_lines(page, col)
            for l in col_lines:
                clean_l = l.strip()
                if not clean_l or '全科目攻略！JLPT' in clean_l or '日本語能力試験ベスト総合問題集' in clean_l:
                    continue
                if re.fullmatch(r'\d+', clean_l) and len(clean_l) <= 2:
                    continue
                all_lines.append(clean_l)
    return all_lines

def parse_lines_to_db(lines):
    db = {} # day_id -> list of question items
    current_w = None
    current_d = None
    current_sec_idx = 0
    current_q_num = None
    current_q_ans = None
    current_q_lines = []

    def commit_q():
        nonlocal current_q_num, current_q_ans, current_q_lines
        if current_w is not None and current_d is not None and current_q_num is not None:
            day_id = f"w{current_w:02d}-d{current_d:02d}"
            if day_id not in db:
                db[day_id] = []
            db[day_id].append({
                'sec_idx': current_sec_idx,
                'q_num': current_q_num,
                'ans': current_q_ans,
                'lines': list(current_q_lines)
            })
        current_q_num = None
        current_q_ans = None
        current_q_lines = []

    for line in lines:
        m_wd = re.search(r'第\s*([１２３４５６７８９0-9]+)\s*週\s*([１２３４５0-9]+)\s*日目?', line)
        if m_wd:
            commit_q()
            current_w = int(to_half_width(m_wd.group(1)))
            current_d = int(to_half_width(m_wd.group(2)))
            current_sec_idx = 0
            continue
        
        m_d_only = re.fullmatch(r'([１２３４５0-9])\s*日目?', line)
        if m_d_only and current_w is not None:
            commit_q()
            current_d = int(to_half_width(m_d_only.group(1)))
            current_sec_idx = 0
            continue

        if line.startswith('◆'):
            commit_q()
            current_sec_idx += 1
            continue

        # Questions like "1 答え 2", "質問１ 答え 3", "(1) 1 答え 2"
        m_q = re.match(r'^(?:質問|第)?([１２３４５６７８９0-9]+)\s*答え\s*[\(（\[]?\s*([１２３４1234])\s*[\)）\]]?', line)
        if m_q:
            commit_q()
            current_q_num = int(to_half_width(m_q.group(1)))
            current_q_ans = int(to_half_width(m_q.group(2)))
            rem = line[m_q.end():].strip()
            if rem:
                current_q_lines.append(rem)
            continue

        if current_q_num is not None:
            current_q_lines.append(line)

    commit_q()
    return db

def format_explanation_body(lines):
    # Join lines with appropriate linebreaks
    # If line starts with 【 or ※ or is an example sentence, use <br/>
    formatted = []
    for l in lines:
        l = l.strip()
        if not l:
            continue
        formatted.append(l)
    return "<br/>".join(formatted)

def update_all_n1_json():
    pdf_path = 'tmp_inspect/zenkamoku_n1/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N1.pdf'
    lines = extract_all_lines(pdf_path)
    db = parse_lines_to_db(lines)

    total_updated = 0
    for w in range(1, 13):
        for d in range(1, 6):
            day_id = f"w{w:02d}-d{d:02d}"
            json_path = f"src/data/zenkamoku_n1/{day_id}.json"
            if not os.path.exists(json_path):
                print(f"Warning: {json_path} does not exist!")
                continue

            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Collect all questions in this json file in order
            target_qs = []
            if 'sections' in data and data['sections']:
                for s in data['sections']:
                    for q in s.get('questions', []):
                        target_qs.append(q)
            elif 'questions' in data and data['questions']:
                for q in data['questions']:
                    target_qs.append(q)

            kaisetsu_items = db.get(day_id, [])

            # Map questions
            for idx, q in enumerate(target_qs):
                # If we have a direct kaisetsu item for this index
                if idx < len(kaisetsu_items):
                    k_item = kaisetsu_items[idx]
                    exp_body = format_explanation_body(k_item['lines'])
                    corr_opt = q.get('correctOption', '')
                    if not corr_opt and 'options' in q and 'correct' in q:
                        corr_opt = q['options'][q['correct'] - 1]
                    
                    if exp_body:
                        q['explanation'] = f"<b>【正解】{corr_opt}</b><br/>{exp_body}"
                    else:
                        q['explanation'] = f"<b>【正解】{corr_opt}</b>"
                else:
                    corr_opt = q.get('correctOption', '')
                    if not corr_opt and 'options' in q and 'correct' in q:
                        corr_opt = q['options'][q['correct'] - 1]
                    q['explanation'] = f"<b>【正解】{corr_opt}</b>"
                
                total_updated += 1

            # Save updated json
            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Successfully updated all 60 N1 JSON files ({total_updated} questions total).")

if __name__ == '__main__':
    update_all_n1_json()
