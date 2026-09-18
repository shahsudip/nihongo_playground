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

def parse_multi_questions_on_page(lines, start_q_num, count=3):
    """
    On an odd page of Week 6 or 7, there are 2 or 3 questions.
    Each question has a stem followed by options 1, 2, 3, 4.
    """
    questions = []
    # Identify stem starts and option starts
    # Find all lines starting with 1, 2, 3, 4
    # A new question begins either before a '1' (preceding lines are stem),
    # or after an option '4' has been completed.
    blocks = []
    curr_q = {"stem_lines": [], 1: [], 2: [], 3: [], 4: []}
    curr_state = "stem"
    
    for l in lines:
        t = l['text']
        m = re.match(r'^([1-4])(.*)', t)
        
        # Did we find a new option 1 while already at state 4? -> That was previous question, this is new question!
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
            # If we are in state 4, check if this line looks like the NEXT question stem
            if curr_state == 4 and (
                any(k in t for k in ['筆者', '合う', '合っ', '理由', 'どう', 'なぜ', 'どれ', 'ことか', 'ものか', '何が', '誰が', 'どこ']) or
                re.match(r'^[\[［【]\s*[^\]］】]*\s*[\]］】]', t) or
                re.match(r'^[①-⑩]', t)
            ):
                # Transition to next question!
                blocks.append(curr_q)
                curr_q = {"stem_lines": [t], 1: [], 2: [], 3: [], 4: []}
                curr_state = "stem"
            else:
                curr_q[curr_state].append(t)
                
    if curr_q[1]:
        blocks.append(curr_q)
        
    for i, b in enumerate(blocks):
        q_num = start_q_num + i
        stem = clean_stem("".join(b["stem_lines"]))
        opts = [clean_opt("".join(b[k]), k) for k in [1, 2, 3, 4]]
        questions.append({
            "number": q_num,
            "stem": stem,
            "options": opts
        })
    return questions

async def test_w6():
    w6_days = {
        1: [(97, 1), (99, 4), (101, 7)],
        2: [(103, 1), (105, 4), (107, 7)],
        3: [(109, 1), (111, 4), (113, 7)],
        4: [(115, 1), (117, 4), (119, 7)],
        5: [(121, 1), (123, 4), (125, 7)],
    }
    for d, pages in w6_days.items():
        print(f"\n=================== WEEK 6 DAY {d} ===================")
        day_qs = []
        for p, start_q in pages:
            lines = await get_page_lines(p)
            qs = parse_multi_questions_on_page(lines, start_q, 3)
            day_qs.extend(qs)
        print(f"Total questions extracted: {len(day_qs)} (Expected 9)")
        for q in day_qs:
            ans = ANSWER_KEYS["w06"][f"d{d:02d}"][f"q{q['number']}"]
            print(f"Q{q['number']}: {q['stem'][:40]} | Opts: {len(q['options'])} | Ans: {ans}")
            if len(q['options']) != 4 or not q['options'][ans-1]:
                print(f"  ERROR ON Q{q['number']}!")

asyncio.run(test_w6())
