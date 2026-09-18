import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_line = "import LoadingSpinner from '../utils/loading_spinner.jsx';\n"
if 'LoadingSpinner' not in content:
    content = content.replace("import { useAuth } from '../context/AuthContext.jsx';", "import { useAuth } from '../context/AuthContext.jsx';\n" + import_line)

target_loading = 'if (loading) return <div className="text-center py-20 text-gray-500 dark:text-gray-400 font-bold text-xl">Loading authentic layout...</div>;'
new_loading = 'if (loading) return <div className="pt-32"><LoadingSpinner /></div>;'

content = content.replace(target_loading, new_loading)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
