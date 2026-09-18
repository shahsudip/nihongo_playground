import json
import glob

for f in glob.glob('src/data/zenkamoku_n3/w05-d*.json'):
    with open(f, encoding='utf-8') as fr:
        d = json.load(fr)
    for sec in d.get('subSections', []):
        passage = sec.get('passage', '')
        if '<div class="speed-master-lined-paper">' in passage:
            passage = passage.replace('<div class="speed-master-email-body">\n', '')
            passage = passage.replace('\n  </div>\n</div>', '\n</div>')
            sec['passage'] = passage
    with open(f, 'w', encoding='utf-8') as fw:
        json.dump(d, fw, ensure_ascii=False, indent=2)
