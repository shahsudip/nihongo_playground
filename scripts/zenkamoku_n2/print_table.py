import sys

file_path = 'src/components/profile_screen.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

table_block = content.split('<table className="profile-diagnostic-table">')[1].split('</table>')[0]
print(table_block)
