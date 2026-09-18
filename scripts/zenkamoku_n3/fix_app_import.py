import sys

file_path = 'src/App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = "const BookQuizTakerPage = lazy(() => import('./components/BookQuizTakerPage.jsx'));"
replacement = "const BookQuizTakerPage = lazy(() => import('./components/BookQuizTakerPage.jsx'));\nconst ZenkamokuPageViewer = lazy(() => import('./components/ZenkamokuPageViewer.jsx'));"

if "const ZenkamokuPageViewer = lazy" not in content:
    content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Successfully added lazy import for ZenkamokuPageViewer in App.jsx!")
else:
    print("Already added.")
