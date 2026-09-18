import sys

file_path = 'src/components/BookChapterListPage.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_line = "import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';"
content = content.replace("import { useParams, Link, useLocation } from 'react-router-dom';", import_line)

redirect_logic = """
  const navigate = useNavigate();

  // Redirect Zenkamoku N3 directly to the book viewer (bypass chapter list)
  useEffect(() => {
    if (bookId === 'zenkamoku-n3-best-workbook') {
      navigate(`/books/${bookId}/chapters/w01-d01`, { replace: true });
    }
  }, [bookId, navigate]);

  if (bookId === 'zenkamoku-n3-best-workbook') return null;
"""

content = content.replace("const { bookId } = useParams();", "const { bookId } = useParams();\n" + redirect_logic)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Redirect injected!")
