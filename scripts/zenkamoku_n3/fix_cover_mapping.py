import sys

file_path = 'src/components/BookListPage.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to add our cover mapping to the bookCovers dictionary
target = "'shinkanzen-master-n3-reading':"
replacement = """'zenkamoku-n3-best-workbook': `${import.meta.env.BASE_URL.replace(/\\/$/, '')}/images/zenkamoku_n3_cover.jpg`,
    'shinkanzen-master-n3-reading':"""

if "'zenkamoku-n3-best-workbook':" not in content:
    content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Successfully added zenkamoku_n3_cover to BookListPage.jsx!")
else:
    print("✅ Already added.")
