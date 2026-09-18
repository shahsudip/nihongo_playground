import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = "<p className=\"text-xl\">Score: {Object.values(answers).filter(Boolean).length} / {questions.length}</p>"
replacement = "<p className=\"text-xl font-medium\">Score: {Object.values(answers).filter(Boolean).length} / {questions.length} Points</p>"

if target in content:
    content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated score text.")
else:
    print("Not found.")
