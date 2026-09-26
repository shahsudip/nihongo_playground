import sys
import os
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

def to_half_width(s):
    if not s:
        return ""
    table = str.maketrans('０１２３４５６７８９', '0123456789')
    return s.translate(table)

def parse_n2_listening_kaisetsu():
    kaisetsu_file = "scripts/zenkamoku_n2/kaisetsu_choukai_text.txt"
    with open(kaisetsu_file, encoding='utf-8') as f:
        text = f.read()

    day_splits = re.split(r'第\s*([0-9１２３４５６７８９]+)\s*週\s*([0-9１２３４５]+)\s*日目', text)
    db = {}

    for i in range(1, len(day_splits), 3):
        w_num = int(to_half_width(day_splits[i]))
        d_num = int(to_half_width(day_splits[i+1]))
        block = day_splits[i+2]
        
        day_exps = []
        if w_num == 12:
            q_items = re.split(r'\n\s*(?:質問)?(\d+)\s+答え\s+([0-9１２３４]+)', block)
            for q_sub in range(1, len(q_items), 3):
                q_num = int(q_items[q_sub])
                ans = q_items[q_sub+1]
                lines = [line.strip() for line in q_items[q_sub+2].split('\n') if line.strip() and not line.strip().startswith('◆') and not '全科目攻略' in line and not re.match(r'^\d+$', line.strip()) and not 'comprehension' in line.lower() and not re.match(r'^\(p\.\d+\)', line.strip())]
                exp_text = '<br/>'.join(lines)
                day_exps.append(exp_text)
        else:
            q_items = re.split(r'\n\s*(\d+)\s+答え\s+([0-9１２３４]+)', block)
            for q_sub in range(1, len(q_items), 3):
                q_num = int(q_items[q_sub])
                ans = q_items[q_sub+1]
                lines = [line.strip() for line in q_items[q_sub+2].split('\n') if line.strip() and not line.strip().startswith('◆') and not '全科目攻略' in line and not re.match(r'^\d+$', line.strip()) and not 'comprehension' in line.lower() and not re.match(r'^\(p\.\d+\)', line.strip())]
                exp_text = '<br/>'.join(lines)
                day_exps.append(exp_text)

        db[(w_num, d_num)] = day_exps
    return db

def update_n2_files():
    db = parse_n2_listening_kaisetsu()
    for (w_num, d_num), exps in db.items():
        day_id = f"w{w_num:02d}-d{d_num:02d}"
        file_path = f"src/data/zenkamoku_n2/{day_id}.json"
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
            if idx < len(exps):
                exp_body = exps[idx]
                corr_opt = q.get('correctOption', '')
                if not corr_opt and 'options' in q and 'correct' in q:
                    corr_opt = q['options'][q['correct'] - 1]
                if exp_body:
                    q['explanation'] = f"<b>【正解】{corr_opt}</b><br/>{exp_body}"
                else:
                    q['explanation'] = f"<b>【正解】{corr_opt}</b>"

        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated N2 {day_id} ({len(target_qs)} questions)")

if __name__ == '__main__':
    update_n2_files()
