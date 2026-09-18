import sys

file_path = 'src/components/profile_screen.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = 'className="text-gray-700 dark:text-gray-300"'
replacement = 'className="!text-gray-800 dark:!text-gray-300 font-medium"'

if target in content:
    content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched date color with !important.")
else:
    print("Target not found")
