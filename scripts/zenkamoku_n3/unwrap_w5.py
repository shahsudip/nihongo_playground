import json
import glob
import re

for f in glob.glob('src/data/zenkamoku_n3/w05-d*.json'):
    with open(f, encoding='utf-8') as fr:
        d = json.load(fr)
    changed = False
    for sec in d.get('subSections', []):
        passage = sec.get('passage', '')
        if passage.startswith('<div class="bg-white'):
            match = re.search(r'<div class="bg-white[^>]+>\n?(.*?)\n?</div>', passage, re.DOTALL)
            if match:
                inner = match.group(1).strip()
                
                # Check if it's an email (starts with To: or From: or has an email format)
                # Actually, the user asked to match layout of emails for W5.
                # Let's apply speed-master-lined-paper or speed-master-email-card appropriately!
                
                if 'orangemart' in inner or '送信者' in inner or '@' in inner:
                    # It's an email
                    sec['passage'] = f'''<div class="speed-master-email-card">
  <div class="speed-master-email-body">
{inner}
  </div>
</div>'''
                else:
                    # Generic lined paper / notice layout
                    sec['passage'] = f'''<div class="speed-master-lined-paper">
  <div class="speed-master-email-body">
{inner}
  </div>
</div>'''
                changed = True
    if changed:
        with open(f, 'w', encoding='utf-8') as fw:
            json.dump(d, fw, ensure_ascii=False, indent=2)
        print(f'Unwrapped and fixed layout for {f}')
