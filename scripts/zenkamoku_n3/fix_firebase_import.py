import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("from '../firebase'", "from '../firebaseConfig.js'")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
    
print("Fixed firebase import!")
