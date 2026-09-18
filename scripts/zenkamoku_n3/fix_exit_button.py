import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = "onClick={() => navigate('/books/zenkamoku-n3-best-workbook')}"
replacement = "onClick={() => navigate('/books')}"

content = content.replace(target, replacement)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
