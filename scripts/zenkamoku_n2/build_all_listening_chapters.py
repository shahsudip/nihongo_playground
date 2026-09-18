"""
build_all_listening_chapters.py
Digitizes Weeks 9-12 (Choukai) of 全科目攻略JLPT日本語能力試験ベスト総合問題集N2.
Produces 20 chapter files: src/data/zenkamoku_n2/w09-d01.json through w12-d05.json.
"""
import sys
import os
import re
import json
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\sudip_software\nihongo_playground"
OUT_DIR = os.path.join(BASE_DIR, "src", "data", "zenkamoku_n2")
os.makedirs(OUT_DIR, exist_ok=True)

# 1. Load Master Answer Keys
with open(os.path.join(BASE_DIR, "scripts", "zenkamoku_n2", "answer_keys_raw.json"), encoding="utf-8") as f:
    RAW_KEYS = json.load(f)

# 2. Extract Scripts from pages 198 to 238
print("Extracting scripts from pages 198 to 238...")
all_stream = []
track_pattern = re.compile(r'(?:^|[^a-zA-Z0-9])(?:N|n)\s*[2２]\s*[-ー—一]\s*(\d+)')

for p in range(198, 239):
    img_path = os.path.join(BASE_DIR, "tmp_inspect", "zenkamoku_n2", f"page_{p:03d}.jpg")
    img = Image.open(img_path)
    w, h = img.size
    cols = [
        img.crop((35, 120, w // 2, h - 60)),
        img.crop((w // 2, 120, w - 35, h - 60))
    ]
    for c_idx, col in enumerate(cols):
        res = winocr.recognize_pil_sync(col, lang='ja')
        lines_dict = {}
        for line in res['lines']:
            for w_item in line['words']:
                r = w_item['bounding_rect']
                is_prolong = w_item['text'] in ['ー', '一', '-'] and r['width'] >= 6
                if r['height'] >= 12 or is_prolong:
                    y_key = round(r['y'] / 8) * 8
                    if y_key not in lines_dict:
                        lines_dict[y_key] = []
                    lines_dict[y_key].append((r['x'], w_item['text']))
        for y in sorted(lines_dict.keys()):
            words = sorted(lines_dict[y], key=lambda x: x[0])
            txt = ''.join(w[1] for w in words).strip()
            if txt:
                all_stream.append((p, c_idx, y, txt))

# Group lines by track
tracks_raw_lines = {}
curr_track = None

for p, c, y, text in all_stream:
    m = track_pattern.search(text)
    if m:
        t_num = int(m.group(1))
        if 9 <= t_num <= 163:
            curr_track = f"N2-{t_num}"
            if curr_track not in tracks_raw_lines:
                tracks_raw_lines[curr_track] = []
            # Keep post-badge text on this line if any
            clean_first_line = track_pattern.sub('', text).strip()
            clean_first_line = re.sub(r'^(?:\[[0-9０-９]+\]|[0-9０-９]+|\s|答え\s*[0-9１-４質問:：]+)+', '', clean_first_line).strip()
            if clean_first_line:
                tracks_raw_lines[curr_track].append(clean_first_line)
            continue
    
    if curr_track:
        # Filter headers / page numbers
        if any(h in text for h in ['聴解スクリプト', '第9週', '第10週', '第11週', '第12週', '課題理解', 'ポイント理解', '概要理解', '即時応答', '統合理解']) and len(text) < 35:
            continue
        if re.match(r'^\s*p\.\s*\d+\s*$', text) or re.match(r'^\s*\d+\s*$', text):
            continue
        tracks_raw_lines[curr_track].append(text)

print(f"Total tracks captured in script booklet: {len(tracks_raw_lines)}")

# Format scripts cleanly into HTML
def format_dialogue(lines):
    # Join and clean dialogue
    full_text = '\n'.join(lines)
    # Normalize speaker markers
    full_text = re.sub(r'(男|女|男１|男２|女１|女２|店員|先生|客|アナウンサー)\s*[:：.]\s*', r'\n\1：', full_text)
    # Split into paragraphs
    raw_paras = [p.strip() for p in full_text.split('\n') if p.strip()]
    cleaned_paras = []
    for p in raw_paras:
        # Ignore spurious short artifacts
        if len(p) <= 1 and p not in ['男', '女']:
            continue
        cleaned_paras.append(p)
    return '<br />'.join(cleaned_paras)

formatted_scripts = {}
for tr_id, lns in tracks_raw_lines.items():
    formatted_scripts[tr_id] = format_dialogue(lns)

# 3. Extract Explanations from kaisetsu_choukai_text.txt
print("Parsing explanations...")
kaisetsu_file = os.path.join(BASE_DIR, "scripts", "zenkamoku_n2", "kaisetsu_choukai_text.txt")
with open(kaisetsu_file, encoding='utf-8') as f:
    kaisetsu_raw = f.read()

# Map explanations by track or week-day
kanji_num = {'１': 1, '２': 2, '３': 3, '４': 4, '５': 5, '６': 6, '７': 7, '８': 8, '９': 9, '10': 10, '11': 11, '12': 12, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5}
day_splits = re.split(r'第\s*([0-9１２３４５６７８９]+)\s*週\s*([0-9１２３４５]+)\s*日目', kaisetsu_raw)
explanations_db = {} # key: (w, d, q_idx)

for i in range(1, len(day_splits), 3):
    w_num = int(kanji_num.get(day_splits[i].strip(), day_splits[i].strip()))
    d_num = int(kanji_num.get(day_splits[i+1].strip(), day_splits[i+1].strip()))
    block = day_splits[i+2]
    
    # Split by section if Week 9
    if w_num == 9:
        sec_parts = re.split(r'◆(課題理解|ポイント理解)', block)
        sec_q_offset = 0
        for s_idx in range(1, len(sec_parts), 2):
            s_name = sec_parts[s_idx]
            s_content = sec_parts[s_idx + 1]
            q_items = re.split(r'\n\s*(\d+)\s+答え\s+([0-9１２３４]+)', s_content)
            for q_sub in range(1, len(q_items), 3):
                local_q = int(q_items[q_sub])
                global_q = sec_q_offset + local_q
                exp_text = '\n'.join([line.strip() for line in q_items[q_sub+2].split('\n') if len(line.strip()) > 2 and not line.strip().startswith('◆')])
                explanations_db[(w_num, d_num, global_q)] = exp_text
            if '課題理解' in s_name:
                sec_q_offset = 5
    elif w_num == 12:
        # In Week 12: 1, 2, then 3 has 質問1 and 質問2
        q_items = re.split(r'\n\s*(\d+)\s+答え', block)
        for q_sub in range(1, len(q_items), 2):
            local_q = int(q_items[q_sub])
            exp_block = q_items[q_sub+1].strip()
            if local_q in [1, 2]:
                exp_clean = '\n'.join([line.strip() for line in exp_block.split('\n')[1:] if len(line.strip()) > 2])
                explanations_db[(w_num, d_num, local_q)] = exp_clean
            elif local_q == 3:
                # contains 質問1 and 質問2
                sub_parts = re.split(r'質問([12１２])', exp_block)
                for sp in range(1, len(sub_parts), 2):
                    sub_idx = int(kanji_num.get(sub_parts[sp], sub_parts[sp]))
                    sub_txt = '\n'.join([line.strip() for line in sub_parts[sp+1].split('\n')[1:] if len(line.strip()) > 2])
                    explanations_db[(w_num, d_num, 2 + sub_idx)] = sub_txt
    else:
        # Week 10 (5 Qs) and Week 11 (12 Qs)
        q_items = re.split(r'\n\s*(\d+)\s+答え\s+([0-9１２３４]+)', block)
        for q_sub in range(1, len(q_items), 3):
            local_q = int(q_items[q_sub])
            exp_text = '\n'.join([line.strip() for line in q_items[q_sub+2].split('\n') if len(line.strip()) > 2 and not line.strip().startswith('◆')])
            explanations_db[(w_num, d_num, local_q)] = exp_text

print(f"Total explanations mapped: {len(explanations_db)}")

# 4. Save metadata dictionary
WEEK_METADATA = {
    9: {
        "title": "第9週",
        "sectionTitle": "課題理解・ポイント理解",
        "sectionTitleEn": "Task-based comprehension & Point comprehension",
        "sectionType": "listening_task_point",
        "days": {
            1: {"pageRef": "pp.168-169", "tracks": list(range(9, 20))},
            2: {"pageRef": "pp.170-171", "tracks": list(range(20, 31))},
            3: {"pageRef": "pp.172-173", "tracks": list(range(31, 42))},
            4: {"pageRef": "pp.174-175", "tracks": list(range(42, 53))},
            5: {"pageRef": "pp.176-177", "tracks": list(range(53, 64))},
        }
    },
    10: {
        "title": "第10週",
        "sectionTitle": "概要理解",
        "sectionTitleEn": "Summary comprehension",
        "sectionType": "listening_summary",
        "days": {
            1: {"pageRef": "p.178", "tracks": list(range(64, 69))},
            2: {"pageRef": "p.179", "tracks": list(range(69, 74))},
            3: {"pageRef": "p.180", "tracks": list(range(74, 79))},
            4: {"pageRef": "p.181", "tracks": list(range(79, 84))},
            5: {"pageRef": "p.182", "tracks": list(range(84, 89))},
        }
    },
    11: {
        "title": "第11週",
        "sectionTitle": "即時応答",
        "sectionTitleEn": "Quick response",
        "sectionType": "listening_response",
        "days": {
            1: {"pageRef": "p.183", "tracks": list(range(89, 101))},
            2: {"pageRef": "p.184", "tracks": list(range(101, 113))},
            3: {"pageRef": "p.185", "tracks": list(range(113, 125))},
            4: {"pageRef": "p.186", "tracks": list(range(125, 137))},
            5: {"pageRef": "p.187", "tracks": list(range(137, 149))},
        }
    },
    12: {
        "title": "第12週",
        "sectionTitle": "統合理解",
        "sectionTitleEn": "Integrated comprehension",
        "sectionType": "listening_integrated",
        "days": {
            1: {"pageRef": "p.188", "tracks": [149, 150, 151, 151]},
            2: {"pageRef": "p.189", "tracks": [152, 153, 154, 154]},
            3: {"pageRef": "p.190", "tracks": [155, 156, 157, 157]},
            4: {"pageRef": "p.191", "tracks": [158, 159, 160, 160]},
            5: {"pageRef": "p.192", "tracks": [161, 162, 163, 163]},
        }
    }
}

print("Metadata configured.")
