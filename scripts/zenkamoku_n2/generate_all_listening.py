"""
generate_all_listening.py
Extracts, structures, and outputs all 20 JSON chapter files for
Week 9 through Week 12 (Choukai) of 全科目攻略JLPT日本語能力試験ベスト総合問題集N2.
Files: src/data/zenkamoku_n2/w09-d01.json through w12-d05.json.
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

# 1. Load Raw Answer Keys
with open(os.path.join(BASE_DIR, "scripts", "zenkamoku_n2", "answer_keys_raw.json"), encoding="utf-8") as f:
    RAW_KEYS = json.load(f)

# 2. Extract scripts from pages 198 to 238
print("Extracting script pages 198-238...")
track_pattern = re.compile(r'(?:^|[^a-zA-Z0-9])(?:N|n)\s*[2２]\s*[-ー—一]\s*(\d+)')

stream_lines = []
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
                stream_lines.append(txt)

# Segment by track
tracks_scripts = {}
curr_tr = None
for text in stream_lines:
    m = track_pattern.search(text)
    if m:
        t_num = int(m.group(1))
        if 9 <= t_num <= 163:
            curr_tr = f"N2-{t_num}"
            if curr_tr not in tracks_scripts:
                tracks_scripts[curr_tr] = []
            clean_first_line = track_pattern.sub('', text).strip()
            clean_first_line = re.sub(r'^(?:\[[0-9０-９]+\]|[0-9０-９]+|\s|答え\s*[0-9１-４質問:：]+)+', '', clean_first_line).strip()
            if clean_first_line:
                tracks_scripts[curr_tr].append(clean_first_line)
            continue
    if curr_tr:
        if any(h in text for h in ['聴解スクリプト', '第9週', '第10週', '第11週', '第12週', '課題理解', 'ポイント理解', '概要理解', '即時応答', '統合理解']) and len(text) < 35:
            continue
        if re.match(r'^\s*p\.\s*\d+\s*$', text) or re.match(r'^\s*\d+\s*$', text):
            continue
        tracks_scripts[curr_tr].append(text)

print(f"Captured {len(tracks_scripts)} tracks in scripts booklet.")

def format_script_html(lines):
    full_text = '\n'.join(lines)
    full_text = re.sub(r'(男|女|男１|男２|女１|女２|店員|先生|客|アナウンサー|司会|医者|患者|上司|部下|後輩|先輩)\s*[:：.]\s*', r'\n\1：', full_text)
    paras = [p.strip() for p in full_text.split('\n') if p.strip()]
    cleaned = []
    for p in paras:
        if len(p) <= 1 and p not in ['男', '女']:
            continue
        cleaned.append(p)
    return '<br />'.join(cleaned)

# 3. Extract Explanations from kaisetsu_choukai_text.txt
print("Parsing explanations...")
kaisetsu_file = os.path.join(BASE_DIR, "scripts", "zenkamoku_n2", "kaisetsu_choukai_text.txt")
with open(kaisetsu_file, encoding='utf-8') as f:
    kaisetsu_raw = f.read()

kanji_num = {'１': 1, '２': 2, '３': 3, '４': 4, '５': 5, '６': 6, '７': 7, '８': 8, '９': 9, '10': 10, '11': 11, '12': 12, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5}
day_splits = re.split(r'第\s*([0-9１２３４５６７８９]+)\s*週\s*([0-9１２３４５]+)\s*日目', kaisetsu_raw)
explanations_db = {}

for i in range(1, len(day_splits), 3):
    w_num = int(kanji_num.get(day_splits[i].strip(), day_splits[i].strip()))
    d_num = int(kanji_num.get(day_splits[i+1].strip(), day_splits[i+1].strip()))
    block = day_splits[i+2]
    
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
        q_items = re.split(r'\n\s*(\d+)\s+答え', block)
        for q_sub in range(1, len(q_items), 2):
            local_q = int(q_items[q_sub])
            exp_block = q_items[q_sub+1].strip()
            if local_q in [1, 2]:
                exp_clean = '\n'.join([line.strip() for line in exp_block.split('\n')[1:] if len(line.strip()) > 2])
                explanations_db[(w_num, d_num, local_q)] = exp_clean
            elif local_q == 3:
                sub_parts = re.split(r'質問([12１２])', exp_block)
                for sp in range(1, len(sub_parts), 2):
                    sub_idx = int(kanji_num.get(sub_parts[sp], sub_parts[sp]))
                    sub_txt = '\n'.join([line.strip() for line in sub_parts[sp+1].split('\n')[1:] if len(line.strip()) > 2])
                    explanations_db[(w_num, d_num, 2 + sub_idx)] = sub_txt
    else:
        q_items = re.split(r'\n\s*(\d+)\s+答え\s+([0-9１２３４]+)', block)
        for q_sub in range(1, len(q_items), 3):
            local_q = int(q_items[q_sub])
            exp_text = '\n'.join([line.strip() for line in q_items[q_sub+2].split('\n') if len(line.strip()) > 2 and not line.strip().startswith('◆')])
            explanations_db[(w_num, d_num, local_q)] = exp_text

print(f"Total explanations mapped: {len(explanations_db)}")

# 4. Extract Week 9 options from problem pages (pp. 168 to 177)
print("Extracting Week 9 problem page options...")
def extract_block_opts(crop):
    res = winocr.recognize_pil_sync(crop, lang='ja')
    words = []
    for line in res['lines']:
        for w in line['words']:
            r = w['bounding_rect']
            is_prolong = w['text'] in ['ー', '一', '-'] and r['width'] >= 6
            if r['x'] > 120 and (r['height'] >= 12 or is_prolong):
                words.append((r['y'], r['x'], w['text']))
    words.sort(key=lambda x: x[0])
    lines = []
    for y, x, text in words:
        placed = False
        for l in lines:
            if abs(l['y'] - y) < 13:
                l['words'].append((x, text))
                l['y'] = (l['y'] + y) / 2
                placed = True
                break
        if not placed:
            lines.append({'y': y, 'words': [(x, text)]})
    lines.sort(key=lambda l: l['y'])
    opts = []
    for l in lines:
        l['words'].sort(key=lambda w: w[0])
        opt_text = ''.join(w[1] for w in l['words']).strip()
        # Clean leading digit if included
        opt_text = re.sub(r'^[1-4１-４]\s*', '', opt_text)
        if len(opt_text) >= 1:
            opts.append(opt_text)
    return opts

even_ys = [380, 565, 750, 930, 1115]
odd_ys = [322, 506, 690, 874, 1058, 1242]

w09_page_options = {}
tr_idx = 9
for p in range(168, 178):
    img = Image.open(os.path.join(BASE_DIR, "tmp_inspect", "zenkamoku_n2", f"page_{p:03d}.jpg"))
    is_odd = (p % 2 != 0)
    ys = odd_ys if is_odd else even_ys
    for y in ys:
        crop = img.crop((200, y - 15, 1100, y + 170))
        opts = extract_block_opts(crop)
        w09_page_options[f"N2-{tr_idx}"] = opts
        tr_idx += 1

print(f"Extracted options for {len(w09_page_options)} Week 9 questions.")

# 5. Extract Week 10 options from scripts
print("Extracting Week 10 options from scripts...")
w10_options = {}
for tr_num in range(64, 89):
    tr_id = f"N2-{tr_num}"
    lines = tracks_scripts.get(tr_id, [])
    # Options are at the end: 1 ..., 2 ..., 3 ..., 4 ...
    opts = []
    for line in lines[-10:]:
        m = re.match(r'^([1-4１-４])\s*([^\n]+)', line)
        if m:
            opts.append((int(kanji_num.get(m.group(1), m.group(1))), m.group(2).strip()))
    # Sort and deduplicate by option number
    opts_dict = {num: text for num, text in opts}
    if len(opts_dict) == 4:
        w10_options[tr_id] = [f"{i}. {opts_dict[i]}" for i in range(1, 5)]
    else:
        # Fallback to standard 1, 2, 3, 4
        w10_options[tr_id] = ["1", "2", "3", "4"]

# 6. Extract Week 11 options from scripts
print("Extracting Week 11 options from scripts...")
w11_options = {}
for tr_num in range(89, 149):
    tr_id = f"N2-{tr_num}"
    lines = tracks_scripts.get(tr_id, [])
    opts = []
    for line in lines:
        m = re.match(r'^([1-3１-３])\s*([^\n]+)', line)
        if m:
            opts.append((int(kanji_num.get(m.group(1), m.group(1))), m.group(2).strip()))
    opts_dict = {num: text for num, text in opts}
    if len(opts_dict) == 3:
        w11_options[tr_id] = [f"{i}. {opts_dict[i]}" for i in range(1, 4)]
    else:
        w11_options[tr_id] = ["1", "2", "3"]

# 7. Extract Week 12 options
print("Extracting Week 12 options...")
w12_options = {
    # Day 1 (p.188)
    "N2-149": ["1. 赤井寿司", "2. 白木ダイニング", "3. 青山食堂", "4. 黒川ステーキ"],
    "N2-150": ["1. カロリーが低いカップ麺の種類を増やす", "2. 社員が新商品を食べてSNSで宣伝をする", "3. 今までにない味と容器にして新商品を売り出す", "4. 容器を軽くして安全性を高める"],
    "N2-151-q1": ["1. 神矢坂", "2. 三沢", "3. 浅倉", "4. 中谷"],
    "N2-151-q2": ["1. 神矢坂", "2. 三沢", "3. 浅倉", "4. 中谷"],

    # Day 2 (p.189)
    "N2-152": ["1. 『P-ボックス』", "2. 『スカイプロ』", "3. 『シネママスター』", "4. 『ピコプロ』"],
    "N2-153": ["1. 『スカイプロ』", "2. 『シネママスター』", "3. 『ピコプロ』", "4. 『P-ボックス』"],
    "N2-154-q1": ["1. Aコース", "2. Bコース", "3. Cコース", "4. Dコース"],
    "N2-154-q2": ["1. Aコース", "2. Bコース", "3. Cコース", "4. Dコース"],

    # Day 3 (p.190)
    "N2-155": ["1. 1か月", "2. 2か月", "3. 3か月", "4. 4か月"],
    "N2-156": ["1. 1か月", "2. 2か月", "3. 3か月", "4. 4か月"],
    "N2-157-q1": ["1. 『明日へ』", "2. 『理想のお部屋作りの3つの法則』", "3. 『深夜のフライト』", "4. 『やせたければラーメンを食べろ』"],
    "N2-157-q2": ["1. 『明日へ』", "2. 『理想のお部屋作りの3つの法則』", "3. 『深夜のフライト』", "4. 『やせたければラーメンを食べろ』"],

    # Day 4 (p.191)
    "N2-158": ["1. サッカー観戦", "2. 野球観戦", "3. バレーボール観戦", "4. バスケットボール観戦"],
    "N2-159": ["1. サッカー観戦", "2. 野球観戦", "3. バレーボール観戦", "4. バスケットボール観戦"],
    "N2-160-q1": ["1. Aコース", "2. Bコース", "3. Cコース", "4. Dコース"],
    "N2-160-q2": ["1. Aコース", "2. Bコース", "3. Cコース", "4. Dコース"],

    # Day 5 (p.192)
    "N2-161": ["1. 5千円", "2. 1万円", "3. 2万円", "4. 3万円"],
    "N2-162": ["1. 5千円", "2. 1万円", "3. 2万円", "4. 3万円"],
    "N2-163-q1": ["1. 道案内スタッフ", "2. 販売スタッフ", "3. 会場案内スタッフ", "4. 警備スタッフ"],
    "N2-163-q2": ["1. 道案内スタッフ", "2. 販売スタッフ", "3. 会場案内スタッフ", "4. 警備スタッフ"]
}

# 8. Build 20 Chapters
CHAPTERS_CONFIG = [
    # Week 9 (11 Qs each)
    (9, 1, "w09-d01", "課題理解・ポイント理解", "Task-based comprehension & Point comprehension", "listening_task_point", "pp.168-169", list(range(9, 20))),
    (9, 2, "w09-d02", "課題理解・ポイント理解", "Task-based comprehension & Point comprehension", "listening_task_point", "pp.170-171", list(range(20, 31))),
    (9, 3, "w09-d03", "課題理解・ポイント理解", "Task-based comprehension & Point comprehension", "listening_task_point", "pp.172-173", list(range(31, 42))),
    (9, 4, "w09-d04", "課題理解・ポイント理解", "Task-based comprehension & Point comprehension", "listening_task_point", "pp.174-175", list(range(42, 53))),
    (9, 5, "w09-d05", "課題理解・ポイント理解", "Task-based comprehension & Point comprehension", "listening_task_point", "pp.176-177", list(range(53, 64))),

    # Week 10 (5 Qs each)
    (10, 1, "w10-d01", "概要理解", "Summary comprehension", "listening_summary", "p.178", list(range(64, 69))),
    (10, 2, "w10-d02", "概要理解", "Summary comprehension", "listening_summary", "p.179", list(range(69, 74))),
    (10, 3, "w10-d03", "概要理解", "Summary comprehension", "listening_summary", "p.180", list(range(74, 79))),
    (10, 4, "w10-d04", "概要理解", "Summary comprehension", "listening_summary", "p.181", list(range(79, 84))),
    (10, 5, "w10-d05", "概要理解", "Summary comprehension", "listening_summary", "p.182", list(range(84, 89))),

    # Week 11 (12 Qs each)
    (11, 1, "w11-d01", "即時応答", "Quick response", "listening_response", "p.183", list(range(89, 101))),
    (11, 2, "w11-d02", "即時応答", "Quick response", "listening_response", "p.184", list(range(101, 113))),
    (11, 3, "w11-d03", "即時応答", "Quick response", "listening_response", "p.185", list(range(113, 125))),
    (11, 4, "w11-d04", "即時応答", "Quick response", "listening_response", "p.186", list(range(125, 137))),
    (11, 5, "w11-d05", "即時応答", "Quick response", "listening_response", "p.187", list(range(137, 149))),

    # Week 12 (4 Qs each)
    (12, 1, "w12-d01", "統合理解", "Integrated comprehension", "listening_integrated", "p.188", [149, 150, 151, 151]),
    (12, 2, "w12-d02", "統合理解", "Integrated comprehension", "listening_integrated", "p.189", [152, 153, 154, 154]),
    (12, 3, "w12-d03", "統合理解", "Integrated comprehension", "listening_integrated", "p.190", [155, 156, 157, 157]),
    (12, 4, "w12-d04", "統合理解", "Integrated comprehension", "listening_integrated", "p.191", [158, 159, 160, 160]),
    (12, 5, "w12-d05", "統合理解", "Integrated comprehension", "listening_integrated", "p.192", [161, 162, 163, 163]),
]

print("\nGenerating 20 chapter JSON files...")
total_saved = 0

for week, day, ch_id, sec_title, sec_title_en, sec_type, page_ref, track_list in CHAPTERS_CONFIG:
    w_key = f"w{week:02d}"
    d_key = f"d{day:02d}"
    day_keys = RAW_KEYS.get(w_key, {}).get(d_key, {})
    
    questions = []
    for q_idx, tr_num in enumerate(track_list, start=1):
        tr_id = f"N2-{tr_num}"
        correct_ans = day_keys.get(f"q{q_idx}")
        
        # Determine options
        if week == 9:
            raw_opts = w09_page_options.get(tr_id, [])
            if len(raw_opts) == 4:
                formatted_opts = [f"{i}. {text}" for i, text in enumerate(raw_opts, 1)]
            else:
                formatted_opts = [f"{i}. 選択肢 {i}" for i in range(1, 5)]
        elif week == 10:
            formatted_opts = w10_options.get(tr_id, ["1", "2", "3", "4"])
        elif week == 11:
            formatted_opts = w11_options.get(tr_id, ["1", "2", "3"])
        elif week == 12:
            if q_idx in [1, 2]:
                formatted_opts = w12_options.get(tr_id, ["1", "2", "3", "4"])
            elif q_idx == 3:
                formatted_opts = w12_options.get(f"{tr_id}-q1", ["1", "2", "3", "4"])
            else:
                formatted_opts = w12_options.get(f"{tr_id}-q2", ["1", "2", "3", "4"])
        
        # Determine correctOption text
        if correct_ans and 1 <= correct_ans <= len(formatted_opts):
            correct_opt_text = formatted_opts[correct_ans - 1]
        else:
            correct_opt_text = str(correct_ans)
        
        # Transcript / Script
        script_text = format_script_html(tracks_scripts.get(tr_id, []))
        
        # Explanation
        exp_text = explanations_db.get((week, day, q_idx), "")
        
        q_obj = {
            "number": q_idx,
            "trackId": tr_id,
            "audioSrc": f"/audio/zenkamoku_n2/{tr_id}.mp3",
            "options": formatted_opts,
            "correct": correct_ans,
            "correctOption": correct_opt_text,
            "script": script_text,
            "explanation": exp_text
        }
        questions.append(q_obj)
    
    chapter_data = {
        "bookId": "zenkamoku-n2-best-workbook",
        "chapterId": ch_id,
        "week": week,
        "day": day,
        "weekTitle": f"第{week}週",
        "dayTitle": f"{day}日目",
        "sectionTitle": sec_title,
        "sectionTitleEn": sec_title_en,
        "sectionType": sec_type,
        "pageRef": page_ref,
        "questions": questions
    }
    
    out_file = os.path.join(OUT_DIR, f"{ch_id}.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
    
    print(f"  Saved {ch_id}.json ({len(questions)} questions)")
    total_saved += 1

print(f"\nAll {total_saved} chapter files generated successfully in {OUT_DIR}!")
