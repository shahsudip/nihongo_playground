import json
import re

grammar_file = r'D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_grammar_data.json'
main_file = r'D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_data.json'

def convert(ch):
    ch_id = ch['id']  # e.g. "grammar-16"
    ch_num = ch_id.split('-')[1]
    
    passages = []
    
    # Mondai 1
    m1 = ch.pop('mondai_1', {})
    m1_qs = []
    for i, q in enumerate(m1.get('questions', [])):
        parts = q.get('parts', [])
        # reconstruct questionText
        qText = "（　）".join(parts) if isinstance(parts, list) else str(parts)
        if len(parts) == 1 and isinstance(parts, list):
            qText = parts[0]
            
        m1_qs.append({
            "correctIndex": q.get('correct_index', 0),
            "explanation": "",
            "id": f"g{ch_num}-m1-q{i+1}",
            "options": q.get('options', []),
            "questionText": qText
        })
    passages.append({
        "id": f"{ch_id}-mondai1",
        "mondaiHeader": "つぎの文の（　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
        "questions": m1_qs,
        "title": "問題1"
    })
    
    # Mondai 2
    m2 = ch.pop('mondai_2', {})
    m2_qs = []
    for i, q in enumerate(m2.get('questions', [])):
        parts = q.get('parts', [])
        qText = parts[0] if isinstance(parts, list) and len(parts) > 0 else ""
        m2_qs.append({
            "correctIndex": q.get('correct_index', 0),
            "explanation": "",
            "id": f"g{ch_num}-m2-q{i+1}",
            "options": q.get('options', []),
            "questionText": qText
        })
    passages.append({
        "id": f"{ch_id}-mondai2",
        "mondaiHeader": "つぎの文の　★　に入る最もよいものを、1・2・3・4から一つえらびなさい。",
        "questions": m2_qs,
        "title": "問題2"
    })
    
    # Mondai 3
    m3 = ch.pop('mondai_3', {})
    m3_qs = []
    for i, q in enumerate(m3.get('questions', [])):
        m3_qs.append({
            "correctIndex": q.get('correct_index', 0),
            "explanation": "",
            "id": f"g{ch_num}-m3-q{i+1}",
            "options": q.get('options', []),
            "questionText": f"[ {i+1} ]"
        })
    passages.append({
        "id": f"{ch_id}-mondai3",
        "mondaiHeader": "つぎの文章を読んで、[ 1 ]から[ 5 ]の中に入る最もよいものを、1・2・3・4から一つえらびなさい。",
        "passageText": m3.get('passage', ''),
        "questions": m3_qs,
        "title": "問題3"
    })
    
    ch['passages'] = passages
    ch['type'] = "questions-only"
    ch['description'] = f"第{ch_num}回 practice drills."

fixed = 0
for filepath in [grammar_file, main_file]:
    with open(filepath, 'r', encoding='utf-8') as f:
        d = json.load(f)
    
    for ch in d['chapters']:
        if ch['id'].startswith('grammar-') and not ch['id'].startswith('grammar-training-'):
            parts = ch['id'].split('-')
            if len(parts) > 1 and parts[1].isdigit():
                ch_num = int(parts[1])
                if ch_num >= 16 and 'mondai_1' in ch:
                    convert(ch)
                    fixed += 1
                
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)

print(f"Fixed {fixed} chapter occurrences.")
