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

def parse_all_kaisetsu():
    with open('scripts/zenkamoku_n1/kaisetsu_lines.json', 'r', encoding='utf-8') as f:
        lines = json.load(f)

    # Clean lines
    clean_lines = []
    for l in lines:
        l = l.strip()
        if not l:
            continue
        if '全科目攻略！JLPT' in l or '日本語能力試験ベスト総合問題集' in l:
            continue
        if re.fullmatch(r'\d+', l) and len(l) <= 2:
            continue
        clean_lines.append(l)

    # Parsing state
    db = {} # (w, d, sec_idx, q_num) or (w, d, q_seq) -> { 'ans': int, 'lines': [] }
    
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

    for line in clean_lines:
        # Check for Week & Day headers
        # e.g., "第１週 １日目", "第２週 3日目", "第10 週 １日目"
        m_wd = re.search(r'第\s*([１２３４５６７８９0-9]+)\s*週\s*([１２３４５0-9]+)\s*日目?', line)
        if m_wd:
            commit_q()
            current_w = int(to_half_width(m_wd.group(1)))
            current_d = int(to_half_width(m_wd.group(2)))
            current_sec_idx = 0
            continue
        
        # Check for standalone Day header within a week e.g., "１日目", "２日目"
        m_d_only = re.fullmatch(r'([１２３４５0-9])\s*日目?', line)
        if m_d_only and current_w is not None:
            commit_q()
            current_d = int(to_half_width(m_d_only.group(1)))
            current_sec_idx = 0
            continue

        # Check for Section header e.g., "◆漢字読み", "◆文脈規定", "◆用法", etc.
        if line.startswith('◆'):
            commit_q()
            current_sec_idx += 1
            continue

        # Check for question line: e.g., "1  答え ２", "1 答え 4", "1 答え （２）", "1 答え [3]"
        m_q = re.match(r'^([１２３４５６７８９0-9]+)\s*答え\s*[\(（\[]?\s*([１２３４1234])\s*[\)）\]]?', line)
        if m_q:
            commit_q()
            current_q_num = int(to_half_width(m_q.group(1)))
            current_q_ans = int(to_half_width(m_q.group(2)))
            rem = line[m_q.end():].strip()
            if rem:
                current_q_lines.append(rem)
            continue

        # Continuation lines for current question
        if current_q_num is not None:
            current_q_lines.append(line)

    commit_q()
    return db

if __name__ == '__main__':
    db = parse_all_kaisetsu()
    print(f"Parsed {len(db)} chapters from Kaisetsu.")
    total_parsed_qs = sum(len(qs) for qs in db.values())
    print(f"Total parsed questions: {total_parsed_qs}")
    for day_id in sorted(db.keys()):
        print(f"  {day_id}: {len(db[day_id])} questions")
