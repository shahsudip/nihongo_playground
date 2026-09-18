import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/zenkamoku_n3/extracted_lines_stream.txt', 'r', encoding='utf-8') as f:
    raw_lines = [line.strip() for line in f if line.strip()]

# Remove file format prefix "P1 C1 y= 86.1 | "
clean_lines = []
for l in raw_lines:
    parts = l.split(' | ', 1)
    if len(parts) == 2:
        clean_lines.append(parts[1])
    else:
        clean_lines.append(l)

# Ignore document header lines like "解説言語知識(文字･語彙･文法)編"
clean_lines = [l for l in clean_lines if not l.startswith('解説言語知識')]

# Parse into hierarchy: Week -> Day -> Section -> Question -> Explanation lines
parsed_data = {}

current_week = None
current_day = None
current_section = None
current_q_num = None
current_q_lines = []

def save_current_q():
    global current_q_num, current_q_lines
    if current_week and current_day and current_section and current_q_num is not None:
        key = (current_week, current_day, current_section, current_q_num)
        parsed_data[key] = list(current_q_lines)
    current_q_lines = []

for line in clean_lines:
    # Check Week and Day
    m_day = re.match(r'第([１２３4567890\d]+)週\s*([１２３4567890\d]+)日目', line)
    if m_day:
        save_current_q()
        w = int(m_day.group(1).translate(str.maketrans('１２３４５６７８９０', '1234567890')))
        d = int(m_day.group(2).translate(str.maketrans('１２３４５６７８９０', '1234567890')))
        if w > 2: # Stop at Week 3
            break
        current_week = w
        current_day = d
        current_section = None
        current_q_num = None
        continue
    
    # Check Section
    if line.startswith('◆'):
        save_current_q()
        if '漢字読み' in line:
            current_section = 'kanji_reading'
        elif '表記' in line:
            current_section = 'orthography'
        elif '文脈' in line:
            current_section = 'contextually_defined_expressions'
        elif '言い換え' in line or '類義' in line:
            current_section = 'paraphrases'
        elif '用法' in line:
            break
        else:
            print(f"Unknown section header: {line}")
        current_q_num = None
        continue
        
    # Check Question
    m_q = re.match(r'^(\d+)\s*答え\s*([１２３４\d])', line)
    if m_q:
        save_current_q()
        q_num = int(m_q.group(1))
        ans_num = int(m_q.group(2).translate(str.maketrans('１２３４', '1234')))
        current_q_num = q_num
        # We can store the answer or the remaining line after answer if any
        rem = line[m_q.end():].strip()
        if rem:
            current_q_lines.append(rem)
        continue
        
    if current_q_num is not None:
        current_q_lines.append(line)

save_current_q()

print(f"Total questions parsed: {len(parsed_data)}")

# Verify count per week/day/section
expected_counts = {
    (1, 1, 'kanji_reading'): 8,
    (1, 1, 'orthography'): 6,
    (1, 2, 'kanji_reading'): 8,
    (1, 2, 'orthography'): 6,
    (1, 3, 'kanji_reading'): 8,
    (1, 3, 'orthography'): 6,
    (1, 4, 'kanji_reading'): 8,
    (1, 4, 'orthography'): 6,
    (1, 5, 'kanji_reading'): 8,
    (1, 5, 'orthography'): 6,
    (2, 1, 'contextually_defined_expressions'): 11,
    (2, 1, 'paraphrases'): 5,
    (2, 2, 'contextually_defined_expressions'): 11,
    (2, 2, 'paraphrases'): 5,
    (2, 3, 'contextually_defined_expressions'): 11,
    (2, 3, 'paraphrases'): 5,
    (2, 4, 'contextually_defined_expressions'): 11,
    (2, 4, 'paraphrases'): 5,
    (2, 5, 'contextually_defined_expressions'): 11,
    (2, 5, 'paraphrases'): 5,
}

for (w, d, sec), exp in expected_counts.items():
    actual_qs = [k[3] for k in parsed_data.keys() if k[0] == w and k[1] == d and k[2] == sec]
    status = "OK" if len(actual_qs) == exp else "MISMATCH"
    print(f"W{w} D{d} {sec:32s}: expected {exp}, got {len(actual_qs)} -> {status} (qs: {sorted(actual_qs)})")
