import sys

file_path = 'src/components/BookChapterListPage.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = "if (bookId === 'zenkamoku-n3-best-workbook') {"
replacement = "if (bookId.startsWith('zenkamoku')) {"
content = content.replace(target, replacement)

target2 = "if (bookId === 'zenkamoku-n3-best-workbook') return null;"
replacement2 = "if (bookId.startsWith('zenkamoku')) return null;"
content = content.replace(target2, replacement2)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
