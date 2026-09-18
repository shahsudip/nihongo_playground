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
    # clean out stray furigana artifact if needed
    return f"{num}. {s.strip()}"

# Let's test parsing all 5 days of Week 5
async def parse_w5():
    days_config = {
        1: [
            (76, 780, 1600, 1, "w05_d01_p1.png"),
            (77, 1300, 1650, 2, "w05_d01_p2.png"),
            (78, 500, 800, 3, "w05_d01_p3.png"),
            (78, 1200, 1600, 4, "w05_d01_p4.png"),
            (79, 650, 1600, 5, "w05_d01_p5.png"),
        ],
        2: [
            (80, 750, 1600, 1, "w05_d02_p1.png"),
            (81, 1200, 1650, 2, "w05_d02_p2.png"),
            (82, 550, 800, 3, "w05_d02_p3.png"),
            (82, 1200, 1600, 4, "w05_d02_p4.png"),
            (83, 550, 1600, 5, "w05_d02_p5.png"),
        ],
        3: [
            (84, 1000, 1600, 1, "w05_d03_p1.png"),
            (85, 680, 1600, 2, "w05_d03_p2.png"),
            (86, 580, 850, 3, "w05_d03_p3.png"),
            (86, 1350, 1650, 4, "w05_d03_p4.png"),
            (87, 1220, 1650, 5, "w05_d03_p5.png"),
        ],
        4: [
            (88, 880, 1600, 1, "w05_d04_p1.png"),
            (89, 1350, 1650, 2, "w05_d04_p2.png"),
            (90, 380, 650, 3, "w05_d04_p3.png"),
            (90, 1100, 1600, 4, "w05_d04_p4.png"),
            (91, 720, 1600, 5, "w05_d04_p5.png"),
        ],
        5: [
            (92, 900, 1600, 1, "w05_d05_p1.png"),
            (93, 600, 1600, 2, "w05_d05_p2.png"),
            (94, 480, 750, 3, "w05_d05_p3.png"),
            (94, 1150, 1600, 4, "w05_d05_p4.png"),
            (95, 1350, 1650, 5, "w05_d05_p5.png"),
        ],
    }

    for d, items in days_config.items():
        print(f"\n=================== WEEK 5 DAY {d} ===================")
        for page_num, y_min, y_max, q_num, img in items:
            lines = await get_page_lines(page_num)
            q_lines = [l for l in lines if y_min <= l['y'] <= y_max]
            
            stem_parts = []
            opts = {1: [], 2: [], 3: [], 4: []}
            curr_state = 0
            
            for l in q_lines:
                t = l['text']
                m = re.match(r'^([1-4])(.*)', t)
                if m and int(m.group(1)) in opts:
                    curr_state = int(m.group(1))
                    rest = m.group(2)
                    if rest: opts[curr_state].append(rest)
                elif curr_state == 0:
                    stem_parts.append(t)
                elif 1 <= curr_state <= 4:
                    opts[curr_state].append(t)
            
            stem = clean_stem("".join(stem_parts))
            opt_list = [clean_opt("".join(opts[i]), i) for i in [1, 2, 3, 4]]
            
            # Answer key
            ans_key = ANSWER_KEYS["w05"][f"d{d:02d}"][f"q{q_num}"]
            
            print(f"Q{q_num} (p.{page_num}): {stem}")
            for opt in opt_list:
                print(f"   {opt}")
            print(f"   --> Correct: {ans_key} ({opt_list[ans_key-1]})")

asyncio.run(parse_w5())
