import os
import sys
import json
import glob

sys.stdout.reconfigure(encoding='utf-8')

files = sorted(glob.glob('src/data/speed_master_n3_reading/*.json'))
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        d = json.load(fp)
    imgs = []
    if 'imageSrc' in d: imgs.append('imageSrc: ' + str(d['imageSrc']))
    if 'footnotesDiagram' in d: imgs.append('footnotesDiagram: ' + str(d['footnotesDiagram']))
    if 'footnotesDiagramLeft' in d: imgs.append('footnotesDiagramLeft: ' + str(d['footnotesDiagramLeft']))
    if 'footnotesDiagramRight' in d: imgs.append('footnotesDiagramRight: ' + str(d['footnotesDiagramRight']))
    pt = d.get('passageText', '') or ''
    if '<img' in pt: imgs.append('inline_img_in_pt')
    for q in d.get('questions', []):
        if '<img' in q.get('questionText', '') or '<img' in q.get('passage', ''):
            imgs.append('inline_img_in_q')
        for opt in q.get('options', []):
            if '<img' in opt:
                imgs.append('inline_img_in_opt')
    title = d.get('title', '')
    print(f"{os.path.basename(f):15s} | {title:25s} | {imgs}")
