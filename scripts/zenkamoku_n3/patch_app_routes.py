import sys

file_path = 'src/App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_line = "import ZenkamokuPageViewer from './components/ZenkamokuPageViewer';\n"
if "import ZenkamokuPageViewer" not in content:
    content = content.replace("import BookQuizTakerPage", import_line + "import BookQuizTakerPage")

target_route = """<Route
            path="/books/:bookId/chapters/:chapterId"
            element={<ProtectedRoute><BookQuizTakerPage /></ProtectedRoute>}
          />"""

new_route = """<Route
            path="/books/zenkamoku-n3-best-workbook/chapters/:chapterId"
            element={<ProtectedRoute><ZenkamokuPageViewer /></ProtectedRoute>}
          />
          <Route
            path="/books/:bookId/chapters/:chapterId"
            element={<ProtectedRoute><BookQuizTakerPage /></ProtectedRoute>}
          />"""

if "path=\"/books/zenkamoku-n3-best-workbook/chapters/:chapterId\"" not in content:
    content = content.replace(target_route, new_route)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched App.jsx successfully.")
else:
    print("Already patched.")
