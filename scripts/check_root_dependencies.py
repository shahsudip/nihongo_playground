import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

src_dir = 'src'
root_files = [f for f in os.listdir('.') if os.path.isfile(f)]

print(f"Total files in root: {len(root_files)}")

# Check each file in src to see if it imports any root file
imported_by_src = set()

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.js', '.jsx', '.ts', '.tsx', '.json', '.css')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                for rf in root_files:
                    if rf in ['package.json', 'index.html', 'vite.config.js']:
                        continue
                    # Check if the filename appears in an import or require or fetch
                    pattern = rf.replace('.', r'\.')
                    if re.search(r'[\'\"/]' + pattern + r'[\'\"]', content):
                        imported_by_src.add(rf)
                        print(f"FOUND: {rf} is imported by {p}")

print("\nAll root files referenced by src/:", list(imported_by_src))
