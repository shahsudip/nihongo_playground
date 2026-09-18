import winocr
import asyncio
import sys
import os
import re
import json
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

IN_DIR = r"D:\sudip_software\nihongo_playground\tmp_inspect\zenkamoku_n2"
KEY_FILE = r"D:\sudip_software\nihongo_playground\scripts\zenkamoku_n2\answer_keys_raw.json"

with open(KEY_FILE, 'r', encoding='utf-8') as f:
    ANSWER_KEYS = json.load(f)

def group_words_into_lines(words, y_thresh=16):
    sorted_words = sorted(words, key=lambda w: (w['y'], w['x']))
    lines = []
    for w in sorted_words:
        matched = False
        for line in lines:
            if abs(line['y'] - w['y']) <= y_thresh:
                line['words'].append(w)
                line['y'] = sum(x['y'] for x in line['words']) / len(line['words'])
                matched = True
                break
        if not matched:
            lines.append({'y': w['y'], 'words': [w]})
    for line in lines:
        line['words'].sort(key=lambda w: w['x'])
        text = "".join(w['text'].strip() for w in line['words'] if w['text'].strip())
        line['text'] = text
        line['x'] = line['words'][0]['x']
    lines.sort(key=lambda l: l['y'])
    return lines

async def get_page_lines(p):
    im = Image.open(os.path.join(IN_DIR, f"page_{p:03d}.jpg"))
    res = await winocr.recognize_pil(im, lang='ja')
    words = []
    for l in res.lines:
        for w in l.words:
            if w.bounding_rect.x < 50 or w.bounding_rect.x > 1180:
                continue
            if w.bounding_rect.y > 1650:
                continue
            words.append({
                'text': w.text,
                'x': w.bounding_rect.x,
                'y': w.bounding_rect.y,
                'w': w.bounding_rect.width,
                'h': w.bounding_rect.height
            })
    return group_words_into_lines(words)

def clean_stem(raw):
    s = re.sub(r'^[\[［【]\s*[^\]］】]*\s*[\]］】]\s*', '', raw)
    s = re.sub(r'^\d+[\s\.\、]+', '', s)
    s = re.sub(r'^[・ー\s]+', '', s)
    return s.strip()

def clean_opt(raw, num):
    s = re.sub(r'^\s*' + str(num) + r'[\s\.\、]*', '', raw)
    return f"{num}. {s.strip()}"

def parse_w7_page(lines, start_q, expected_count):
    # Filter out footnote lines (e.g. (注 1)...) at the top of the page
    valid_lines = []
    found_first_q = False
    for l in lines:
        t = l['text']
        if not found_first_q:
            # Check if this line is part of a question stem
            if any(k in t for k in ['[1]', '[2]', '[3]', '[4]', '[5]', '[エ]', '[イ]', '[町]', '[こ]', '[ロ]', '[ズ]', '[新]', '[日]', '[巨]', '筆者', 'について', '共通', '合う', 'どう', 'なぜ', '何が', '誰が', 'どこ']):
                found_first_q = True
                valid_lines.append(l)
            elif re.match(r'^[1-5]\s*[\u4e00-\u9faf\u3040-\u309f]', t): # e.g. "1 マンションを..."
                found_first_q = True
                valid_lines.append(l)
        else:
            valid_lines.append(l)
            
    blocks = []
    curr_q = {"stem_lines": [], 1: [], 2: [], 3: [], 4: []}
    curr_state = "stem"
    
    for l in valid_lines:
        t = l['text']
        m = re.match(r'^([1-4])(.*)', t)
        if m and int(m.group(1)) == 1 and curr_state == 4:
            blocks.append(curr_q)
            curr_q = {"stem_lines": [], 1: [], 2: [], 3: [], 4: []}
            curr_state = 1
            rest = m.group(2)
            if rest: curr_q[1].append(rest)
        elif m and int(m.group(1)) in [1, 2, 3, 4]:
            curr_state = int(m.group(1))
            rest = m.group(2)
            if rest: curr_q[curr_state].append(rest)
        elif curr_state == "stem":
            curr_q["stem_lines"].append(t)
        elif isinstance(curr_state, int):
            if curr_state == 4 and (
                any(k in t for k in ['筆者', '合う', '合っ', '理由', 'どう', 'なぜ', 'どれ', 'ことか', 'ものか', '何が', '誰が', 'どこ', '共通']) or
                re.match(r'^[\[［【]\s*[^\]］】]*\s*[\]］】]', t) or
                re.match(r'^[1-5]\s*[\u4e00-\u9faf\u3040-\u309f]', t)
            ):
                blocks.append(curr_q)
                curr_q = {"stem_lines": [t], 1: [], 2: [], 3: [], 4: []}
                curr_state = "stem"
            else:
                curr_q[curr_state].append(t)
                
    if curr_q[1]:
        blocks.append(curr_q)
        
    questions = []
    for i, b in enumerate(blocks):
        q_num = start_q + i
        stem = clean_stem("".join(b["stem_lines"]))
        opts = [clean_opt("".join(b[k]), k) for k in [1, 2, 3, 4]]
        questions.append({
            "number": q_num,
            "stem": stem,
            "options": opts
        })
    return questions

async def test_w7():
    w7_days = {
        1: [(127, 1, 2), (129, 3, 3)],
        2: [(131, 1, 2), (133, 3, 3)],
        3: [(135, 1, 2), (137, 3, 3)],
        4: [(139, 1, 2), (141, 3, 3)],
        5: [(143, 1, 2), (145, 3, 3)],
    }
    for d, pages in w7_days.items():
        print(f"\n=================== WEEK 7 DAY {d} ===================")
        day_qs = []
        for p, start_q, exp_count in pages:
            lines = await get_page_lines(p)
            qs = parse_w7_page(lines, start_q, exp_count)
            day_qs.extend(qs)
        print(f"Total questions extracted: {len(day_qs)} (Expected 5)")
        for q in day_qs:
            ans = ANSWER_KEYS["w07"][f"d{d:02d}"][f"q{q['number']}"]
            print(f"Q{q['number']}: {q['stem'][:40]} | Opts: {len(q['options'])} | Ans: {ans}")
            if len(q['options']) != 4 or not q['options'][ans-1]:
                print(f"  ERROR ON Q{q['number']}!")

asyncio.run(test_w7())
