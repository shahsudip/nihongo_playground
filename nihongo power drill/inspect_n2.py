import json

with open('power_drill_n2_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

vocab_chapters = [c for c in data.get('chapters', []) if c['id'].startswith('vocab')]

out = {
    'total': len(vocab_chapters),
    'first_keys': list(vocab_chapters[0].keys()) if vocab_chapters else [],
    'first': vocab_chapters[0] if vocab_chapters else None
}

with open('temp_n2_vocab_audit.json', 'w', encoding='utf-8') as f:
    json.dump(out, f, indent=2, ensure_ascii=False)
