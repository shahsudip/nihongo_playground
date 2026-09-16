import sys
sys.stdout.reconfigure(encoding='utf-8')

import sqlite3
import zipfile
import tempfile
import os
import re
import json
from collections import defaultdict

apkg_path = r'C:\Users\sah_sudip_kumar\Downloads\Shin_Kanzen_Master_N3_Grammar__Sentence_Deck.apkg'

if os.path.exists(apkg_path):
    with zipfile.ZipFile(apkg_path, 'r') as z:
        temp_dir = tempfile.mkdtemp()
        z.extractall(temp_dir)
        db_file = os.path.join(temp_dir, 'collection.anki21') if os.path.exists(os.path.join(temp_dir, 'collection.anki21')) else os.path.join(temp_dir, 'collection.anki2')
        conn = sqlite3.connect(db_file)
        cur = conn.cursor()
        
        cur.execute('SELECT models FROM col')
        models = json.loads(cur.fetchone()[0])
        field_names = []
        for mid, m in models.items():
            field_names = [f['name'] for f in m['flds']]
            break
            
        cur.execute('SELECT flds FROM notes')
        notes = cur.fetchall()
        
        lesson_data = defaultdict(lambda: {
            'sub_points': defaultdict(list),
            'card_count': 0
        })
        
        for (flds,) in notes:
            parts = flds.split('\x1f')
            d = dict(zip(field_names, parts))
            
            lesson_info = d.get('LessonInfo', '').strip()
            # extract clean grammar pattern from RichGrammarFormation or LessonInfo
            m = re.search(r'第?(\d+)課(?:\s*-\s*(\d+))?', lesson_info)
            if m:
                lesson_num = int(m.group(1))
            else:
                lesson_num = 0
                
            rich_form = re.sub(r'<[^>]+>', '', d.get('RichGrammarFormation', '')).strip()
            # Clean form to get core grammar title
            lines = [l.strip() for l in rich_form.split('\n') if l.strip()]
            form_title = lines[0] if lines else lesson_info
            
            lesson_data[lesson_num]['card_count'] += 1
            lesson_data[lesson_num]['sub_points'][form_title].append(d)
            
        total_unique_pts = sum(len(v['sub_points']) for v in lesson_data.values() if v)
        print(f"Total Sentences/Cards: {len(notes)}")
        print(f"Total Lessons: {len([k for k in lesson_data.keys() if k > 0])}")
        print(f"Total Unique Grammar Formations across 12 Lessons: {total_unique_pts}\n")
        
        for l in sorted([k for k in lesson_data.keys() if k > 0]):
            sub_pts = lesson_data[l]['sub_points']
            print(f"=== Lesson {l:02d} (第{l}課) ===")
            print(f"  • Unique Grammar Points: {len(sub_pts)}")
            print(f"  • Sentence Cards: {lesson_data[l]['card_count']}")
            for pt, cards in sorted(sub_pts.items()):
                expl = re.sub(r'<[^>]+>', '', cards[0].get('GrammarExplanation', '')).strip()
                print(f"    - {pt}  ({len(cards)} cards) -> {expl[:60]}")
            print()
