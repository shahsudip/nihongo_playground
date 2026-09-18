import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = 'className="mt-4 border border-gray-300 p-2 inline-block bg-white"'
replacement = 'className="mt-4 inline-block"'

content = content.replace(target, replacement)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
