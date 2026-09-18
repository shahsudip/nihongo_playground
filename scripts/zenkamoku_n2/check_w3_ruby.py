import glob
for f in glob.glob('src/data/zenkamoku_n2/w03-*.json'):
    content = open(f, encoding='utf-8').read()
    print(f'{f}: {content.count("<ruby>")} ruby tags')
