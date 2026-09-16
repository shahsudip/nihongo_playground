import sys
sys.stdout.reconfigure(encoding='utf-8')
import sqlite3, zipfile, tempfile, os, re, json
from collections import defaultdict

apkg_path = r'C:\Users\sah_sudip_kumar\Downloads\Shin_Kanzen_Master_N3_Grammar__Sentence_Deck.apkg'

with zipfile.ZipFile(apkg_path, 'r') as z:
    temp_dir = tempfile.mkdtemp()
    z.extractall(temp_dir)
    db_file = os.path.join(temp_dir, 'collection.anki21') if os.path.exists(os.path.join(temp_dir, 'collection.anki21')) else os.path.join(temp_dir, 'collection.anki2')
    conn = sqlite3.connect(db_file)
    cur = conn.cursor()
    cur.execute('SELECT models FROM col')
    models = json.loads(cur.fetchone()[0])
    field_names = [f['name'] for m in models.values() for f in m['flds']]
    
    cur.execute('SELECT flds FROM notes')
    notes = cur.fetchall()
    
    lesson_data = defaultdict(lambda: {'sub_points': defaultdict(list), 'card_count': 0})
    
    for (flds,) in notes:
        parts = flds.split('\x1f')
        d = dict(zip(field_names, parts))
        lesson_info = d.get('LessonInfo', '').strip()
        m = re.search(r'第?(\d+)課', lesson_info)
        lesson_num = int(m.group(1)) if m else 0
        rich_form = re.sub(r'<[^>]+>', '', d.get('RichGrammarFormation', '')).strip()
        lines = [l.strip() for l in rich_form.split('\n') if l.strip()]
        form_title = lines[0] if lines else lesson_info
        lesson_data[lesson_num]['card_count'] += 1
        lesson_data[lesson_num]['sub_points'][form_title].append(d)

print(f"TOTAL CARDS: {len(notes)}")
print(f"TOTAL LESSONS: 12")
total_grammar_points = sum(len(lesson_data[l]['sub_points']) for l in range(1, 13))
print(f"TOTAL GRAMMAR POINTS: {total_grammar_points}\n")

for l in range(1, 13):
    pts = lesson_data[l]['sub_points']
    cnt = lesson_data[l]['card_count']
    print(f"| Lesson {l:02d} (第{l}課) | {len(pts)} Grammar Points | {cnt} Cards |")
