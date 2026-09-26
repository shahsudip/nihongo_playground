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

def extract_n3_listening_lines():
    pdf_path = 'tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf'
    doc = fitz.open(pdf_path)
    all_lines = []
    # Pages 28 to 37 (index 27 to 36)
    for pno in range(27, len(doc)):
        page = doc[pno]
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
                        spans.append({
                            'col': col,
                            'bbox': s['bbox'],
                            'size': s['size'],
                            'text': s['text']
                        })
        for col_idx in [1, 2]:
            col_spans = [s for s in spans if s['col'] == col_idx]
            col_spans.sort(key=lambda s: s['bbox'][1])
            lines = []
            for s in col_spans:
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
            for line in lines:
                line_str = "".join([s['text'] for s in line]).strip()
                if line_str and not '全科目攻略' in line_str and not re.fullmatch(r'\d+', line_str):
                    all_lines.append(line_str)
    return all_lines

def parse_n3_listening_db():
    lines = extract_n3_listening_lines()
    db = {}
    current_w = None
    current_d = None
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
            continue

        m_d_only = re.fullmatch(r'([１２３４５0-9])\s*日目?', line)
        if m_d_only and current_w is not None:
            commit_q()
            current_d = int(to_half_width(m_d_only.group(1)))
            continue

        if line.startswith('◆'):
            commit_q()
            continue

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

def update_n3_listening_files():
    db = parse_n3_listening_db()
    for day_id, q_list in db.items():
        file_path = f"src/data/zenkamoku_n3/{day_id}.json"
        if not os.path.exists(file_path):
            continue
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        target_qs = []
        if 'sections' in data and data['sections']:
            for s in data['sections']:
                for q in s.get('questions', []):
                    target_qs.append(q)
        elif 'questions' in data and data['questions']:
            for q in data['questions']:
                target_qs.append(q)

        for idx, q in enumerate(target_qs):
            if idx < len(q_list):
                item = q_list[idx]
                exp_body = "<br/>".join(item['lines'])
                corr_opt = q.get('correctOption', '')
                if not corr_opt and 'options' in q and 'correct' in q:
                    corr_opt = q['options'][q['correct'] - 1]
                if exp_body:
                    q['explanation'] = f"<b>【正解】{corr_opt}</b><br/>{exp_body}"
                else:
                    q['explanation'] = f"<b>【正解】{corr_opt}</b>"

        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated N3 {day_id} ({len(target_qs)} questions)")

if __name__ == '__main__':
    update_n3_listening_files()
