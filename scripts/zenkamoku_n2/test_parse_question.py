import winocr
import asyncio
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

def group_words_into_lines(words, y_thresh=12):
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

async def test_page(p):
    im = Image.open(f'tmp_inspect/zenkamoku_n2/page_{p:03d}.jpg')
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
    lines = group_words_into_lines(words)
    print(f'=== Page {p} ===')
    for l in lines:
        if l['y'] > 800:
            print(f"  y={l['y']:4.0f} x={l['x']:4.0f} | {l['text']}")

asyncio.run(test_page(76))
