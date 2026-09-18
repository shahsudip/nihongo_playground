import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_line = "import LoadingSpinner from '../utils/loading_spinner.jsx';\n"
if 'LoadingSpinner from' not in content:
    content = content.replace("import { useParams, useNavigate } from 'react-router-dom';", "import { useParams, useNavigate } from 'react-router-dom';\n" + import_line)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Import injected successfully!")
