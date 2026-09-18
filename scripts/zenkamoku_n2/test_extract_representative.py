import winocr
import asyncio
import sys
import os
import re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

IN_DIR = r"D:\sudip_software\nihongo_playground\tmp_inspect\zenkamoku_n2"

def group_words(words, y_thresh=18):
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
        line['text'] = ''.join(w['text'] for w in line['words'])
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
            words.append({
                'text': w.text,
                'x': w.bounding_rect.x,
                'y': w.bounding_rect.y,
                'w': w.bounding_rect.width,
                'h': w.bounding_rect.height
            })
    return group_words(words)

async def test_all():
    print("Testing question extraction across all question pages...")
    # Test a few representative pages
    pages = [76, 77, 78, 79, 97, 99, 101, 127, 129, 146]
    for p in pages:
        lines = await get_page_lines(p)
        print(f"\n--- Page {p} ---")
        for l in lines:
            t = l['text']
            # print if looks like question stem or option
            if re.match(r'^[1-4][^\d]', t) or any(k in t for k in ['[1]', '[2]', '[3]', '[4]', '[5]', '[エ]', '[イ]', '[町]', '[こ]', '[ロ]', '筆者', '合っ', '理由', 'どう', 'なぜ', 'どれ', 'ことか', 'ものか']):
                print(f"  y={l['y']:4.0f} | {t}")

asyncio.run(test_all())
