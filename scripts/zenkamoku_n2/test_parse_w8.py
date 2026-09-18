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

def parse_w8_page(lines):
    # Skip header instruction (ends around y=350)
    q_lines = [l for l in lines if l['y'] > 350]
    
    blocks = []
    curr_q = {"stem_lines": [], 1: [], 2: [], 3: [], 4: []}
    curr_state = "stem"
    
    for l in q_lines:
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
                re.match(r'^[\[［【]\s*[^\]］】]*\s*[\]］】]', t) or
                re.match(r'^[1-2]\s*[\u4e00-\u9faf\u3040-\u309f]', t) or
                any(k in t for k in ['さん', 'について', 'どれか', '正しい', '合って'])
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
        q_num = i + 1
        stem = clean_stem("".join(b["stem_lines"]))
        opts = [clean_opt("".join(b[k]), k) for k in [1, 2, 3, 4]]
        questions.append({
            "number": q_num,
            "stem": stem,
            "options": opts
        })
    return questions

async def test_w8():
    w8_pages = {1: 146, 2: 148, 3: 150, 4: 152, 5: 154}
    for d, p in w8_pages.items():
        print(f"\n=================== WEEK 8 DAY {d} (p.{p}) ===================")
        lines = await get_page_lines(p)
        qs = parse_w8_page(lines)
        print(f"Total questions: {len(qs)} (Expected 2)")
        for q in qs:
            ans = ANSWER_KEYS["w08"][f"d{d:02d}"][f"q{q['number']}"]
            print(f"Q{q['number']}: {q['stem'][:50]} | Opts: {len(q['options'])} | Ans: {ans} ({q['options'][ans-1]})")

asyncio.run(test_w8())
