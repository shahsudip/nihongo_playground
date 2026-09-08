import os, sys, json, glob
sys.stdout.reconfigure(encoding='utf-8')

for pattern in ['short-*.json', 'medium-*.json', 'long-*.json', 'search-*.json', 'mock-exam.json']:
    files = sorted(glob.glob(os.path.join('src', 'data', 'speed_master_n3_reading', pattern)),
                   key=lambda x: int(os.path.basename(x).split('.')[0].split('-')[1]) if '-' in os.path.basename(x) and os.path.basename(x).split('.')[0].split('-')[1].isdigit() else 999)
    for f in files:
        with open(f, 'r', encoding='utf-8') as fp:
            d = json.load(fp)
        img = d.get('imageSrc', '')
        fn_diag = d.get('footnotesDiagram', '') or d.get('footnotesDiagramLeft', '') or d.get('footnotesDiagramRight', '')
        print(f"{os.path.basename(f):16s} | {d.get('title',''):20s} | img: {img} | diag: {fn_diag}")
