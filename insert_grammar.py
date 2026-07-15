import json
import os
import re

def insert_grammar(new_chapters, data_dir='D:/sudip_software/nihongo_playground/nihongo power drill'):
    """
    Safely inserts or updates grammar chapters in both power_drill_grammar_data.json
    and power_drill_data.json. 
    Can be used for N2, N1 or any other future grammar batches.
    """
    grammar_db_path = os.path.join(data_dir, 'power_drill_grammar_data.json')
    main_db_path = os.path.join(data_dir, 'power_drill_data.json')

    # Update Grammar DB JSON
    with open(grammar_db_path, 'r', encoding='utf-8') as f:
        grammar_data = json.load(f)

    # Sanitize existing chapters (rename chapter- to grammar-)
    for ch in grammar_data['chapters']:
        if ch['id'].startswith('chapter-'):
            ch['id'] = ch['id'].replace('chapter-', 'grammar-')

    # Remove existing chapters with the same IDs as new ones
    new_ids = [ch['id'] for ch in new_chapters]
    grammar_data['chapters'] = [ch for ch in grammar_data['chapters'] if ch['id'] not in new_ids]
    
    # Append the new chapters
    grammar_data['chapters'].extend(new_chapters)

    # Sort chapters to maintain order: grammar-1, grammar-2 ... grammar-training-1 ...
    def sort_key(ch):
        m = re.match(r'grammar-(?:training-)?(\d+)', ch['id'])
        if m:
            is_training = 1 if 'training' in ch['id'] else 0
            return (is_training, int(m.group(1)))
        return (2, 0) # Fallback

    grammar_data['chapters'].sort(key=sort_key)

    with open(grammar_db_path, 'w', encoding='utf-8') as f:
        json.dump(grammar_data, f, ensure_ascii=False, indent=2)

    print(f"Updated {grammar_db_path} with {len(new_chapters)} new chapters.")

    # Update Main DB JSON
    with open(main_db_path, 'r', encoding='utf-8') as f:
        main_db = json.load(f)

    # Completely remove all grammar-* and chapter-* chapters from main_db, 
    # then append the full synchronized list from grammar_data
    main_db['chapters'] = [
        ch for ch in main_db['chapters'] 
        if not ch['id'].startswith('grammar-') and not ch['id'].startswith('chapter-')
    ]
    main_db['chapters'].extend(grammar_data['chapters'])

    with open(main_db_path, 'w', encoding='utf-8') as f:
        json.dump(main_db, f, ensure_ascii=False, indent=2)

    print(f"Synchronized {main_db_path} successfully.")
