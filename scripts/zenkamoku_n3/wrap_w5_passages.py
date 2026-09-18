import json
import glob
import os

wrapper = """<div class="bg-white dark:bg-slate-100 text-gray-900 border border-gray-400 p-5 md:p-8 rounded shadow-sm font-sans text-base leading-loose max-w-3xl mx-auto whitespace-pre-line">
{text}
</div>"""

for f in glob.glob('src/data/zenkamoku_n3/w05-d*.json'):
    with open(f, encoding='utf-8') as fr:
        d = json.load(fr)
    changed = False
    for sec in d.get('subSections', []):
        passage = sec.get('passage', '')
        if passage and not passage.startswith('<div class="bg-white'):
            sec['passage'] = wrapper.replace('{text}', passage.strip())
            changed = True
    
    if changed:
        with open(f, 'w', encoding='utf-8') as fw:
            json.dump(d, fw, ensure_ascii=False, indent=2)
        print(f'Wrapped {f}')
