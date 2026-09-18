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
        # Clean Japanese punctuation spacing: don't add space between Japanese characters
        text = ""
        for w in line['words']:
            t = w['text'].strip()
            if not t: continue
            text += t
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
            # exclude side tabs and page footers
            if w.bounding_rect.x < 60 or w.bounding_rect.x > 1180:
                continue
            if w.bounding_rect.y > 1650: # footer page number
                continue
            words.append({
                'text': w.text,
                'x': w.bounding_rect.x,
                'y': w.bounding_rect.y,
                'w': w.bounding_rect.width,
                'h': w.bounding_rect.height
            })
    return group_words_into_lines(words)

# Define which pages contain which questions for each week & day
# Week 5: 5 short passages, 1 question each
# Day 1: q1(76), q2(77), q3(78 top), q4(78 bottom), q5(79)
# Day 2: q1(80), q2(81), q3(82 top), q4(82 bottom), q5(83)
# Day 3: q1(84), q2(85), q3(86 top), q4(86 bottom), q5(87)
# Day 4: q1(88), q2(89), q3(90 top), q4(90 bottom), q5(91)
# Day 5: q1(92), q2(93), q3(94 top), q4(94 bottom), q5(95)

# Week 6: 3 mid passages, 3 questions each
# Day 1: q1-3(97), q4-6(99), q7-9(101)
# Day 2: q1-3(103), q4-6(105), q7-9(107)
# Day 3: q1-3(109), q4-6(111), q7-9(113)
# Day 4: q1-3(115), q4-6(117), q7-9(119)
# Day 5: q1-3(121), q4-6(123), q7-9(125)

# Week 7: 2 passages: Integrated(q1-2) + Long(q3-5)
# Day 1: q1-2(127), q3-5(129)
# Day 2: q1-2(131), q3-5(133)
# Day 3: q1-2(135), q3-5(137)
# Day 4: q1-2(139), q3-5(141)
# Day 5: q1-2(143), q3-5(145)

# Week 8: 1 document: Information Retrieval (q1-2)
# Day 1: q1-2(146)
# Day 2: q1-2(148)
# Day 3: q1-2(150)
# Day 4: q1-2(152)
# Day 5: q1-2(154)

print("Extractor module initialized.")
