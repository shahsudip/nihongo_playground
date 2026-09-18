import winocr
import asyncio
import sys
import os
import re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

IN_DIR = r"D:\sudip_software\nihongo_playground\tmp_inspect\zenkamoku_n2"

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
            if w.bounding_rect.x < 60 or w.bounding_rect.x > 1180:
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
    # Remove leading boxed question numbers like [1], [エ], [ズ], [日], etc.
    s = re.sub(r'^[\[［【]\s*[^\]］】]*\s*[\]］】]\s*', '', raw)
    # Remove leading number like "1 " or "1."
    s = re.sub(r'^\d+[\s\.\、]+', '', s)
    # Remove OCR noise
    s = s.strip()
    return s

def clean_option(raw, opt_num):
    # Remove leading digit like "1", "1.", "1 ", etc.
    s = re.sub(r'^\s*' + str(opt_num) + r'[\s\.\、]*', '', raw)
    return f"{opt_num}. {s.strip()}"

async def parse_day_questions(pages_info):
    """
    pages_info is list of (page_num, y_min, y_max, expected_q_numbers)
    """
    extracted_questions = []
    for p_num, y_min, y_max, q_nums in pages_info:
        lines = await get_page_lines(p_num)
        # Filter lines between y_min and y_max
        q_lines = [l for l in lines if y_min <= l['y'] <= y_max]
        
        # Split into question blocks
        # In a block, find stem, then 1, 2, 3, 4
        for q_target in q_nums:
            # Look for stem and options
            stem_lines = []
            options = {1: [], 2: [], 3: [], 4: []}
            current_state = "stem"
            
            for l in q_lines:
                t = l['text']
                # Check for option start
                m = re.match(r'^([1-4])(.*)', t)
                if m and int(m.group(1)) in options:
                    current_state = int(m.group(1))
                    rest = m.group(2)
                    if rest: options[current_state].append(rest)
                elif current_state == "stem":
                    # Check if another question starts
                    stem_lines.append(t)
                elif isinstance(current_state, int):
                    # Wrapped line for option
                    options[current_state].append(t)
            
            # Reconstruct stem
            full_stem = clean_stem("".join(stem_lines))
            opts_list = []
            for num in [1, 2, 3, 4]:
                opt_text = "".join(options[num])
                opts_list.append(clean_option(opt_text, num))
            
            extracted_questions.append({
                "number": q_target,
                "stem": full_stem,
                "options": opts_list
            })
    return extracted_questions

# Test Week 5 Day 1
async def main():
    w5d1_pages = [
        (76, 780, 1600, [1]),
        (77, 1300, 1650, [2]),
        (78, 500, 800, [3]),
        (78, 1200, 1600, [4]),
        (79, 650, 1600, [5])
    ]
    qs = await parse_day_questions(w5d1_pages)
    print("=== Extracted Week 5 Day 1 ===")
    for q in qs:
        print(f"Q{q['number']}: {q['stem']}")
        for opt in q['options']:
            print(f"   {opt}")

asyncio.run(main())
