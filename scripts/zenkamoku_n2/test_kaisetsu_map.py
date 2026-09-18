import sys
import os
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

KEY_FILE = r"D:\sudip_software\nihongo_playground\scripts\zenkamoku_n2\answer_keys_raw.json"
with open(KEY_FILE, 'r', encoding='utf-8') as f:
    ANSWER_KEYS = json.load(f)

# Load all kaisetsu pages
pages_text = {}
for p in range(258, 268):
    with open(f"tmp_inspect/zenkamoku_n2/kaisetsu_page_{p:03d}.txt", "r", encoding="utf-8") as f:
        pages_text[p] = f.read()

def parse_kaisetsu_map():
    # Day headers to page mappings:
    # We know which pages contain which days:
    day_pages = {
        ("w05", "d01"): [258],
        ("w05", "d02"): [258],
        ("w05", "d03"): [259],
        ("w05", "d04"): [259],
        ("w05", "d05"): [260],
        ("w06", "d01"): [260],
        ("w06", "d02"): [261],
        ("w06", "d03"): [261, 262],
        ("w06", "d04"): [262],
        ("w06", "d05"): [263],
        ("w07", "d01"): [264],
        ("w07", "d02"): [264],
        ("w07", "d03"): [264, 265],
        ("w07", "d04"): [265],
        ("w07", "d05"): [265, 266],
        ("w08", "d01"): [266],
        ("w08", "d02"): [266],
        ("w08", "d03"): [266],
        ("w08", "d04"): [267],
        ("w08", "d05"): [267],
    }

    kaisetsu_dict = {}
    
    for (w_key, d_key), p_list in day_pages.items():
        w_num = int(w_key[1:])
        d_num = int(d_key[1:])
        expected_qs = len(ANSWER_KEYS[w_key][d_key])
        combined = "\n".join(pages_text[p] for p in p_list)
        
        # Locate the section for this day
        # e.g. "第 5 週 1 日 目"
        day_pattern = rf"第\s*{w_num}\s*週\s*{d_num}\s*日\s*目"
        m = re.search(day_pattern, combined)
        if not m:
            print(f"Warning: day header {w_key}-{d_key} not found!")
            continue
        start_pos = m.start()
        
        # Next day header or end
        # Find next header
        next_m = re.search(r"第\s*[5-8]\s*週\s*[1-5]\s*日\s*目", combined[start_pos + len(m.group(0)):])
        if next_m:
            day_text = combined[start_pos : start_pos + len(m.group(0)) + next_m.start()]
        else:
            day_text = combined[start_pos:]
            
        # Split day_text by question answers
        # Question markers in kaisetsu:
        # e.g. "答え 3", "[新答え 3", "国答え 3", "[ロ答え 4", "日]答え 2", "巨]答え 3", etc.
        lines = day_text.split("\n")
        q_blocks = []
        curr_q_lines = []
        for l in lines:
            clean = l.strip().replace(" ", "")
            if "答え" in clean and any(clean.endswith(str(k)) or f"答え{k}" in clean for k in [1, 2, 3, 4]):
                if curr_q_lines:
                    q_blocks.append(curr_q_lines)
                curr_q_lines = [l]
            elif curr_q_lines:
                curr_q_lines.append(l)
        if curr_q_lines:
            q_blocks.append(curr_q_lines)
            
        # Store in dict
        for q_idx, block in enumerate(q_blocks, 1):
            if q_idx <= expected_qs:
                # Clean up lines
                exp_text = "".join(l.strip() for l in block if l.strip())
                # Format with bold correct answer
                corr_ans = ANSWER_KEYS[w_key][d_key][f"q{q_idx}"]
                kaisetsu_dict[(w_key, d_key, q_idx)] = f"<b>【正解】{corr_ans}</b><br/>{exp_text}"
                
        found_count = min(len(q_blocks), expected_qs)
        print(f"{w_key}-{d_key}: {found_count}/{expected_qs} explanations extracted")

    return kaisetsu_dict

kmap = parse_kaisetsu_map()
print(f"Total explanations mapped: {len(kmap)} / 105")
