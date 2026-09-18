import sys

file_path = 'src/App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """          <Route
            path="/books/zenkamoku-n3-best-workbook/chapters/:chapterId"
            element={<ProtectedRoute><ZenkamokuPageViewer /></ProtectedRoute>}
          />"""

new_route = """          <Route
            path="/books/zenkamoku-n2-best-workbook/chapters/:chapterId"
            element={<ProtectedRoute><ZenkamokuPageViewer /></ProtectedRoute>}
          />
          <Route
            path="/books/zenkamoku-n3-best-workbook/chapters/:chapterId"
            element={<ProtectedRoute><ZenkamokuPageViewer /></ProtectedRoute>}
          />"""

if "zenkamoku-n2-best-workbook" not in content:
    content = content.replace(target, new_route)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
