import sys, os

file_path = 'src/data/book_data.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_book = """  {
    "id": "zenkamoku-n3-best-workbook",
    "title": "全科目攻略！JLPT日本語能力試験ベスト総合問題集N3",
    "description": "12-week complete JLPT N3 workbook covering vocabulary, grammar, reading, and listening.",
    "coverUrl": "/images/zenkamoku_n3_cover.jpg",
    "level": "N3",
    "category": "All Subjects",
    "chapters": []
  },
"""

if 'zenkamoku-n3-best-workbook' not in content:
    content = content.replace('export const sampleBooks = [\n', 'export const sampleBooks = [\n' + new_book)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('✅ Added zenkamoku-n3-best-workbook to book_data.jsx')
else:
    print('✅ Already exists in book_data.jsx')
