import sys
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/zenkamoku_n2/kaisetsu_w1_w2.txt', encoding='utf-8') as f:
    raw_text = f.read()

# Normalize full-width digits to half-width
def to_half_width(s):
    table = str.maketrans('０１２３４５６７８９', '0123456789')
    return s.translate(table)

# Let's find each day block: 第1週 1日目 to 第2週 5日目, and match 第3週 as terminator
day_matches = list(re.finditer(r'第([１２３123])週\s*([１２３４５12345])日目', raw_text))

explanations_data = {}

for idx, m in enumerate(day_matches):
    w_num = int(to_half_width(m.group(1)))
    if w_num > 2:
        break
    d_num = int(to_half_width(m.group(2)))
    day_id = f"w{w_num:02d}-d{d_num:02d}"
    
    start_pos = m.start()
    end_pos = day_matches[idx + 1].start() if idx + 1 < len(day_matches) else len(raw_text)
    day_chunk = raw_text[start_pos:end_pos]
    
    explanations_data[day_id] = {}
    
    # Identify subsections by ◆
    # In W1: ◆漢 (漢字読み), ◆表 (表記), ◆語 (語形成)
    # In W2: ◆文脈 (文脈規定), ◆言 (言い換え類義)
    sec_splits = list(re.finditer(r'◆(漢|表|語|文脈|言)', day_chunk))
    
    for s_idx, sm in enumerate(sec_splits):
        tag = sm.group(1)
        if tag == '漢':
            sec_type = 'kanji_reading'
        elif tag == '表':
            sec_type = 'orthography'
        elif tag == '語':
            sec_type = 'word_formation'
        elif tag == '文脈':
            sec_type = 'contextually_defined_expressions'
        elif tag == '言':
            sec_type = 'paraphrases'
        else:
            continue
            
        s_start = sm.start()
        s_end = sec_splits[s_idx + 1].start() if s_idx + 1 < len(sec_splits) else len(day_chunk)
        sec_chunk = day_chunk[s_start:s_end]
        
        # Split by question: ' 1  答え ２ '
        q_splits = list(re.finditer(r'\n\s*(\d+)\s+答え\s+([１２３４1234])', sec_chunk))
        
        explanations_data[day_id][sec_type] = {}
        
        for q_idx, qm in enumerate(q_splits):
            q_num = int(qm.group(1))
            ans = int(to_half_width(qm.group(2)))
            
            q_start = qm.end()
            q_end = q_splits[q_idx + 1].start() if q_idx + 1 < len(q_splits) else len(sec_chunk)
            q_body = sec_chunk[q_start:q_end].strip()
            
            # Format q_body:
            # Lines often have ruby: kanji line followed by kana line
            lines = [l.strip() for l in q_body.split('\n') if l.strip() and not l.startswith('=== PAGE') and not '全科目攻略' in l]
            
            # Reconstruct lines
            formatted_lines = []
            i = 0
            while i < len(lines):
                line = lines[i]
                # Check for kanji line followed by kana
                if i + 1 < len(lines) and re.fullmatch(r'[\u4e00-\u9fff]+', line) and re.fullmatch(r'[\u3040-\u309f]+', lines[i+1]):
                    # Check if single kanji or pair
                    if len(line) == 1:
                        ruby_part = f"<ruby>{line}<rt>{lines[i+1]}</rt></ruby>"
                        i += 2
                        # could be another ruby pair immediately following
                        while i + 1 < len(lines) and len(lines[i]) == 1 and re.fullmatch(r'[\u4e00-\u9fff]', lines[i]) and re.fullmatch(r'[\u3040-\u309f]+', lines[i+1]):
                            ruby_part += f"<ruby>{lines[i]}<rt>{lines[i+1]}</rt></ruby>"
                            i += 2
                        # Append any following definition text
                        if i < len(lines) and not lines[i].startswith('【') and not re.match(r'^\d', lines[i]):
                            ruby_part += lines[i]
                            i += 1
                        formatted_lines.append(ruby_part)
                        continue
                    else:
                        formatted_lines.append(f"<ruby>{line}<rt>{lines[i+1]}</rt></ruby>")
                        i += 2
                        continue
                formatted_lines.append(line)
                i += 1
            
            explanations_data[day_id][sec_type][str(q_num)] = {
                "correct": ans,
                "text": "<br/>".join(formatted_lines)
            }

out_path = 'scripts/zenkamoku_n2/kaisetsu_parsed.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(explanations_data, f, ensure_ascii=False, indent=2)

print(f"Saved parsed kaisetsu to {out_path}")
for day_id, secs in explanations_data.items():
    counts = {s: len(qs) for s, qs in secs.items()}
    print(f"  {day_id}: {counts}")
