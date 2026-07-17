import json
import re

grammar_file = r'D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_grammar_data.json'
main_file = r'D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_data.json'

with open(grammar_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

def fix_chapter(ch):
    if not ('grammar-drill-' in ch.get('id', '') or 'grammar-' in ch.get('id', '')): return False
    if 'questions' not in ch: return False
    qs = ch['questions']
    if len(qs) != 15: return False

    # Fix ID
    ch['id'] = ch['id'].replace('-drill-', '-')

    # Mondai 1
    m1_qs = []
    for q in qs[0:7]:
        text = q.get('questionText', '')
        parts = re.split(r'（\s*）|（\s*　\s*）', text)
        m1_qs.append({
            'parts': parts if len(parts) > 1 else [text, ""],
            'options': q.get('options', []),
            'correct_index': q.get('correctIndex', 0)
        })

    # Mondai 2
    m2_qs = []
    for q in qs[7:10]:
        text = q.get('questionText', '')
        m2_qs.append({
            'parts': [text],
            'options': q.get('options', []),
            'correct_index': q.get('correctIndex', 0)
        })

    # Mondai 3
    m3_qs = []
    passage_text = ""
    for i, q in enumerate(qs[10:15]):
        text = q.get('questionText', '')
        if i == 0:
            match = re.search(r'（\[?1\]?.*?）', text)
            if match:
                passage_text = text[:match.start()].strip()
            else:
                passage_text = text
        m3_qs.append({
            'options': q.get('options', []),
            'correct_index': q.get('correctIndex', 0)
        })

    ch['mondai_1'] = {'questions': m1_qs}
    ch['mondai_2'] = {'questions': m2_qs}
    ch['mondai_3'] = {'passage': passage_text, 'questions': m3_qs}
    
    del ch['questions']
    if 'type' in ch: del ch['type']
    
    return True

fixed_count = 0
for ch in data['chapters']:
    if fix_chapter(ch):
        fixed_count += 1

if fixed_count > 0:
    with open(grammar_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
    with open(main_file, 'r', encoding='utf-8') as f:
        main_data = json.load(f)
        
    main_data['chapters'] = [c for c in main_data['chapters'] if not c['id'].startswith('grammar-')]
    main_data['chapters'].extend(data['chapters'])
    
    # Sort just in case
    def sort_key(ch):
        m = re.match(r'grammar-(?:training-)?(\d+)', ch['id'])
        if m:
            is_training = 1 if 'training' in ch['id'] else 0
            return (is_training, int(m.group(1)))
        return (2, 0)
    main_data['chapters'].sort(key=sort_key)
    
    with open(main_file, 'w', encoding='utf-8') as f:
        json.dump(main_data, f, ensure_ascii=False, indent=2)
        
    print(f"Fixed {fixed_count} chapters in JSON files successfully.")
else:
    print("No chapters needed fixing.")
