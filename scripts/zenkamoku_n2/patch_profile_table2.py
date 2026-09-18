import sys

file_path = 'src/components/profile_screen.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the table headers
target_th = """<th>Date & Time</th>
                    <th>Activity</th>
                    <th>Level</th>
                    <th>Score</th>
                    <th>Status</th>"""
replacement_th = """<th>Date & Time</th>
                    <th>Book / Source</th>
                    <th>Activity</th>
                    <th>Level</th>
                    <th>Score</th>
                    <th>Status</th>"""

if target_th in content:
    content = content.replace(target_th, replacement_th)

# 2. Add the function to compute the book title
# I'll just insert a quick helper before `const getActivityTitle` if needed,
# or just compute it directly inside the render loop.
target_tr = """<tr key={item.id || item.timestamp || Math.random()}>
                        <td>{formatDateTime(item.timestamp || item.createdAt)}</td>
                        <td><strong>{getActivityTitle(item)}</strong></td>"""

replacement_tr = """<tr key={item.id || item.timestamp || Math.random()}>
                        <td className="text-gray-700 dark:text-gray-300">{formatDateTime(item.timestamp || item.createdAt)}</td>
                        <td className="text-gray-600 dark:text-gray-400 text-sm">
                          {item.bookId ? item.bookId.replace(/-/g, ' ').replace(/(^\\w|\\s\\w)/g, m => m.toUpperCase()) : (item.type === 'practice' ? 'Practice Test' : 'Custom Deck')}
                        </td>
                        <td><strong>{getActivityTitle(item)}</strong></td>"""

if target_tr in content:
    content = content.replace(target_tr, replacement_tr)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patch successfully applied")
