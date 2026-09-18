import winocr
import asyncio
import sys
import re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

sys.path.append(r'D:\sudip_software\nihongo_playground')
async def check():
    from scripts.zenkamoku_n2.build_all_dokkai_json import get_page_lines
    lines = await get_page_lines(141)
    
    cleaned_lines = []
    for l in lines:
        t = l['text']
        if ('第' in t and '週' in t) or t == '読解' or re.match(r'^\(注\s*\d+\)', t):
            continue
        cleaned_lines.append(l)

    blocks = []
    curr_q = {'stem': [], 1: [], 2: [], 3: [], 4: []}
    curr_state = 'stem'
    
    for l in cleaned_lines:
        t = l['text']
        m = re.match(r'^([1-4])(.*)', t)
        is_stem_line = bool(m and t.endswith(('か', 'か。', '？', '?')))
        
        if m and not is_stem_line and int(m.group(1)) == 1 and curr_state == 4:
            blocks.append(curr_q)
            curr_q = {'stem': [], 1: [], 2: [], 3: [], 4: []}
            curr_state = 1
            rest = m.group(2)
            if rest: curr_q[1].append(rest)
        elif m and not is_stem_line and int(m.group(1)) in [1, 2, 3, 4]:
            curr_state = int(m.group(1))
            rest = m.group(2)
            if rest: curr_q[curr_state].append(rest)
        elif curr_state == 'stem' or is_stem_line:
            curr_q['stem'].append(t)
        elif isinstance(curr_state, int):
            if curr_state == 4 and (
                t.endswith(('か', 'か。', '？', '?')) or
                re.match(r'^[\[［【〔]\s*[^\]］】〕]*\s*[\]］】〕]', t) or
                re.match(r'^[1-9]\s*[\u4e00-\u9faf\u3040-\u309f]', t)
            ):
                blocks.append(curr_q)
                curr_q = {'stem': [t], 1: [], 2: [], 3: [], 4: []}
                curr_state = 'stem'
            else:
                curr_q[curr_state].append(t)
                
    if curr_q[1]:
        blocks.append(curr_q)

    print(f'Total blocks: {len(blocks)}')
    for i, b in enumerate(blocks):
        stem_str = "".join(b['stem'])
        print(f"Block {i+1}: stem={stem_str[:40]} | opts: 1({len(b[1])}), 2({len(b[2])}), 3({len(b[3])}), 4({len(b[4])})")

asyncio.run(check())
