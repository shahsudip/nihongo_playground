import json
import glob

for f in glob.glob('src/data/zenkamoku_n2/*.json'):
    try:
        with open(f, encoding='utf-8') as fr:
            d = json.load(fr)
        for sec in d.get('sections', []) + d.get('subSections', []):
            if 'imageSrc' in sec:
                print(f"{f} section has imageSrc: {sec['imageSrc']}")
            if 'passage' in sec and '<img' in sec['passage']:
                print(f"{f} has <img tag in passage")
    except Exception as e:
        print(f"Error {f}: {e}")
