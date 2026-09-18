import sys
import fitz
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf')

# Extract all column lines
all_lines = []

for pno in range(1, 11):
    page = doc[pno]
    d = page.get_text("dict")
    
    spans = []
    for b in d["blocks"]:
        if "lines" in b:
            for l in b["lines"]:
                for s in l["spans"]:
                    text = s["text"].strip()
                    if not text:
                        continue
                    if s["bbox"][1] < 40 or s["bbox"][1] > 695:
                        continue
                    if s["size"] < 7.0:
                        continue
                    col = 1 if s["bbox"][0] < 258 else 2
                    spans.append({
                        "pno": pno,
                        "col": col,
                        "bbox": s["bbox"],
                        "size": s["size"],
                        "text": s["text"]
                    })

    for col_idx in [1, 2]:
        col_spans = [s for s in spans if s["col"] == col_idx]
        col_spans.sort(key=lambda s: s["bbox"][1])
        
        lines = []
        for s in col_spans:
            placed = False
            for line in lines:
                avg_y = sum(x["bbox"][1] for x in line) / len(line)
                if abs(s["bbox"][1] - avg_y) < 4.0:
                    line.append(s)
                    placed = True
                    break
            if not placed:
                lines.append([s])
                
        for line in lines:
            line.sort(key=lambda s: s["bbox"][0])
            
        lines.sort(key=lambda line: sum(s["bbox"][1] for s in line) / len(line))
        
        for line in lines:
            line_text = "".join([s["text"] for s in line]).strip()
            if line_text:
                all_lines.append(line_text)

# Ignore document header
clean_lines = [l for l in all_lines if not l.startswith('解説言語知識')]

# Parse into hierarchy
parsed_questions = {}

current_week = None
current_day = None
current_section = None
current_q_num = None
current_q_lines = []

def save_q():
    global current_q_num, current_q_lines
    if current_week and current_day and current_section and current_q_num is not None:
        key = (current_week, current_day, current_section, current_q_num)
        parsed_questions[key] = list(current_q_lines)
    current_q_num = None
    current_q_lines = []

for line in clean_lines:
    m_day = re.match(r'第([１２３4567890\d]+)週\s*([１２３4567890\d]+)日目', line)
    if m_day:
        save_q()
        w = int(m_day.group(1).translate(str.maketrans('１２３４５６７８９０', '1234567890')))
        d = int(m_day.group(2).translate(str.maketrans('１２３４５６７８９０', '1234567890')))
        if w > 2:
            break
        current_week = w
        current_day = d
        current_section = None
        continue
        
    if line.startswith('◆'):
        save_q()
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
        continue
        
    m_q = re.match(r'^(\d+)\s*答え\s*([１２３４\d])', line)
    if m_q:
        save_q()
        q_num = int(m_q.group(1))
        current_q_num = q_num
        rem = line[m_q.end():].strip()
        if rem:
            current_q_lines.append(rem)
        continue
        
    if current_q_num is not None:
        current_q_lines.append(line)

save_q()

print(f"Successfully extracted {len(parsed_questions)} questions.")

# Function to clean and format lines into HTML
def format_explanation(lines, correct_option=None):
    # Combine wrapped lines intelligently
    merged_blocks = []
    curr_block = ""
    
    for l in lines:
        l = l.strip()
        if not l:
            continue
            
        # Check if line starts a new bullet/section:
        # 1) Starts with 【 (kanji reading entry)
        # 2) Starts with ※ (note)
        # 3) Starts with option explanation like "1 ", "１ ", "Choice "
        # 4) If curr_block is empty
        is_new_item = (
            not curr_block or
            l.startswith('【') or
            l.startswith('※') or
            re.match(r'^[1-4１-４]\s', l) or
            re.match(r'^Choice\s+\d', l)
        )
        
        if is_new_item:
            if curr_block:
                merged_blocks.append(curr_block)
            curr_block = l
        else:
            # Merge with previous line
            # Check if last char of curr_block is ascii and first char of l is ascii
            if curr_block[-1].isascii() and l[0].isascii():
                curr_block += " " + l
            else:
                curr_block += l
                
    if curr_block:
        merged_blocks.append(curr_block)
        
    # Build final HTML
    parts = []
    if correct_option:
        parts.append(f"<b>【正解】{correct_option}</b>")
    
    for b in merged_blocks:
        parts.append(b)
        
    return "<br/>".join(parts)

# Test formatting for several questions
print("\n--- SAMPLE FORMATTED OUTPUT ---")
sample_keys = [
    (1, 1, 'kanji_reading', 1),
    (1, 1, 'kanji_reading', 4),
    (1, 1, 'orthography', 5),
    (2, 1, 'contextually_defined_expressions', 1),
    (2, 1, 'contextually_defined_expressions', 6),
    (2, 5, 'paraphrases', 5)
]

for k in sample_keys:
    lines = parsed_questions[k]
    fmt = format_explanation(lines, "3. Sample")
    print(f"\nKey {k}:")
    print(fmt)
