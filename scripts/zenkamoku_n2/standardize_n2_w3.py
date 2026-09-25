import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for day in range(1, 6):
    fpath = f'src/data/zenkamoku_n2/w03-d0{day}.json'
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    sections = data.get('sections', []) + data.get('subSections', [])
    for sec in sections:
        if sec.get('type') == 'sentence_composition' or '文の組み立て' in sec.get('title', ''):
            for q in sec.get('questions', []):
                stem = q.get('stem', '')
                star_pos = q.get('starPosition')
                order = q.get('correctOrder')
                correct = q.get('correct')
                
                # Reconstruct stem with standard blanks and <u>　★　</u>
                # Find prefix and suffix
                # Match anything before first blank/star and after last blank/star
                m = re.match(r'^(.*?)(?:[＿＿＿_★\s|<u>|</u>]+)([^＿＿_★]*)$', stem)
                if m:
                    prefix = m.group(1).strip()
                    suffix = m.group(2).strip()
                else:
                    prefix = stem
                    suffix = ''
                
                # Build standard 4 blanks with <u>　★　</u>
                blanks = []
                for i in range(1, 5):
                    if i == star_pos:
                        blanks.append('<u>　★　</u>')
                    else:
                        blanks.append('＿＿＿')
                
                new_stem = f"{prefix}  {' '.join(blanks)}  {suffix}".strip()
                q['stem'] = new_stem
                
                # Re-format explanation
                exp = q.get('explanation', '')
                if order and len(order) == 4:
                    # Clean options
                    clean_opts = [re.sub(r'^\d+\.\s*', '', opt).strip() for opt in q.get('options', [])]
                    
                    # Build rearranged underlined sentence
                    arranged_parts = []
                    for idx, opt_num in enumerate(order, 1):
                        opt_text = clean_opts[opt_num - 1]
                        if idx == star_pos:
                            arranged_parts.append(f"<u>★{opt_text}</u>")
                        else:
                            arranged_parts.append(f"<u>{opt_text}</u>")
                    
                    arranged_sentence = f"{prefix}{' '.join(arranged_parts)}{suffix}"
                    
                    # Extract grammar note from existing explanation
                    grammar_note = ""
                    # Look for <b>〜... or <b>～... or 〜...
                    g_match = re.search(r'(<b>[~〜～].*?)$', exp)
                    if g_match:
                        grammar_note = "<br/>" + g_match.group(1)
                    elif '<b>' in exp:
                        parts = exp.split('<br/>')
                        notes = [p for p in parts if not p.startswith('<b>【正解】') and not p.startswith('【文の並び替え】')]
                        if notes:
                            grammar_note = "<br/>" + "<br/>".join(notes)
                    
                    new_exp = f"<b>【正解】{correct}</b><br/>【文の並び替え】{arranged_sentence}{grammar_note}"
                    q['explanation'] = new_exp

    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Standardized N2 w03-d0{day}.json")

