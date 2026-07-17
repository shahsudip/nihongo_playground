import json

with open('power_drill_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

grammar_chapters = [c for c in data['chapters'] if c['id'].startswith('grammar')]

errors = []

for c in grammar_chapters:
    c_id = c['id']
    
    # Check for legacy keys
    for k in ['mondai_1', 'mondai_2', 'mondai_3']:
        if k in c:
            errors.append(f"{c_id}: Contains legacy key '{k}'")
            
    # Check sections presence
    if 'sections' not in c and 'questions' not in c:
        errors.append(f"{c_id}: Missing both 'sections' and 'questions' keys")
        continue

    # New structure check
    if 'questions' in c:
        qs = c['questions']
        q1_count = len([q for q in qs if q['type'] == 'grammar-1'])
        q2_count = len([q for q in qs if q['type'] == 'grammar-2'])
        q3_count = len([q for q in qs if q['type'] == 'grammar-3'])
        
        if q1_count == 0 and not c_id.startswith('grammar-training'):
            errors.append(f"{c_id}: Missing grammar-1 questions")
        if q2_count == 0 and not c_id.startswith('grammar-training'):
            errors.append(f"{c_id}: Missing grammar-2 (star) questions")
        if q3_count == 0 and not c_id.startswith('grammar-training'):
            errors.append(f"{c_id}: Missing grammar-3 (passage) questions")
            
    elif 'sections' in c:
        sections = c['sections']
        if not c_id.startswith('grammar-training'):
            if len(sections) < 3:
                errors.append(f"{c_id}: Has {len(sections)} sections, expected 3")
            
            has_mondai1 = False
            has_mondai2 = False
            has_mondai3 = False
            
            for s in sections:
                s_id = s.get('id', '')
                if s_id.endswith('-1') or s_id == 'mondai-1':
                    has_mondai1 = True
                elif s_id.endswith('-2') or s_id == 'mondai-2':
                    has_mondai2 = True
                    # Check if mondai-2 has questions
                    if 'questions' not in s or len(s['questions']) == 0:
                        errors.append(f"{c_id}: mondai-2 has no questions")
                elif s_id.endswith('-3') or s_id == 'mondai-3':
                    has_mondai3 = True
                    # Check for passage
                    if 'passage' not in s and 'passageText' not in s:
                        errors.append(f"{c_id}: mondai-3 missing passage text")
                    if 'questions' not in s or len(s['questions']) == 0:
                        errors.append(f"{c_id}: mondai-3 has no questions")

            if not has_mondai1: errors.append(f"{c_id}: Missing mondai-1")
            if not has_mondai2: errors.append(f"{c_id}: Missing mondai-2 (star)")
            if not has_mondai3: errors.append(f"{c_id}: Missing mondai-3 (passage)")

if not errors:
    print("Database audit complete. No structural errors found.")
else:
    print("Errors found:")
    for e in errors:
        print(e)
