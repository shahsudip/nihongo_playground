import sys

file_path = 'src/components/BookListPage.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = "'zenkamoku-n3-best-workbook': '/images/zenkamoku_n3_cover.jpg',"
replacement = "'zenkamoku-n3-best-workbook': '/images/zenkamoku_n3_cover.jpg',\n    'zenkamoku-n2-best-workbook': '/images/zenkamoku_n2_cover.jpg',"

if "'zenkamoku-n2-best-workbook'" not in content:
    content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
