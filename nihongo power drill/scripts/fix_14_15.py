import json

with open('power_drill_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

changed = False
for c in data['chapters']:
    if c['id'] in ('grammar-14', 'grammar-15'):
        for k in ['mondai_1', 'mondai_2', 'mondai_3']:
            if k in c:
                del c[k]
                changed = True
        if 'type' not in c:
            c['type'] = 'questions-only'
            changed = True
        if 'description' not in c:
            c['description'] = 'N3文法ドリル' + c['title'] + '：文の文法、並べ替え、文章の文法'
            changed = True

if changed:
    with open('power_drill_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print('Fixed Drills 14 and 15')
else:
    print('No changes needed')
