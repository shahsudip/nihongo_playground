import sys

file_path = 'src/components/profile_screen.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add "Book / Source" column header
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

content = content.replace(target_th, replacement_th)

# 2. Add "Book / Source" cell and fix date color
target_tr = """<tr key={item.quizId || idx}>
                    <td>{formatDateTime(item.timestamp || item.createdAt)}</td>
                    <td className="font-bold">{item.title || item.chapterId || item.deckId}</td>
                    <td>
                      <span className={`profile-level-pill ${itemLvl ? 'pill-' + itemLvl.toLowerCase() : ''}`}>
                        {itemLvl}
                      </span>
                    </td>"""

# We format the date cell with Tailwind to handle light/dark mode correctly: className="text-gray-600 dark:text-gray-300"
# We also compute the book title. Often `item.bookId` exists. We can map `item.bookId` to its friendly title, or just display the ID.
# Since STATIC_BOOKS is available, we could import it, but it might not be in scope. We can just parse `item.bookId` roughly or display it as is.
replacement_tr = """<tr key={item.quizId || idx}>
                    <td className="text-gray-700 dark:text-gray-300">{formatDateTime(item.timestamp || item.createdAt)}</td>
                    <td className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.bookId ? item.bookId.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) : (item.type === 'practice' ? 'Practice Test' : 'Custom Deck')}
                    </td>
                    <td className="font-bold">{item.title || item.chapterId || item.deckId}</td>
                    <td>
                      <span className={`profile-level-pill ${itemLvl ? 'pill-' + itemLvl.toLowerCase() : ''}`}>
                        {itemLvl}
                      </span>
                    </td>"""

content = content.replace(target_tr, replacement_tr)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch complete")
