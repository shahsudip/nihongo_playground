import sys

file_path = 'src/components/profile_screen.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add the asset imports at the top
imports = """
import coverN1 from '../assets/shin_cover_n1.jpg';
import coverN2 from '../assets/shin_cover_n2.jpg';
import coverN3 from '../assets/shin_cover_n3.jpg';
import coverN4N5 from '../assets/shin_cover_n4n5.jpg';
import powerDrillN1 from '../assets/power_drill_n1_cover.jpg';
import powerDrillN2 from '../assets/power_drill_n2_cover.jpg';
import powerDrillN3 from '../assets/power_drill_n3_cover.jpg';
import tangoN1Cover from '../assets/tango_n1_cover.jpg';
import tangoN2Cover from '../assets/tango_n2_cover.jpg';
import tangoN3Cover from '../assets/tango_n3_cover.jpg';
"""
if "import coverN1" not in content:
    content = content.replace("import { STATIC_BOOKS } from '../data/static_books_catalog.js';", "import { STATIC_BOOKS } from '../data/static_books_catalog.js';\n" + imports)

# 2. Add the bookCovers mapping inside the component before bookProgressMap
book_covers_map = """
  const bookCovers = {
    'shin-nihongo-500-n1': coverN1,
    'shin-nihongo-500-n2': coverN2,
    'shin-nihongo-500-n3': coverN3,
    'shin-nihongo-500-n4-n5': coverN4N5,
    'nihongo-power-drill-n1': powerDrillN1,
    'nihongo-power-drill-n2': powerDrillN2,
    'nihongo-power-drill-n3': powerDrillN3,
    'tango_n1': tangoN1Cover,
    'tango_n2': tangoN2Cover,
    'tango_n3': tangoN3Cover,
    'zenkamoku-n3-best-workbook': `${import.meta.env.BASE_URL.replace(/\\/$/, '')}/images/zenkamoku_n3_cover.jpg`,
    'shinkanzen-master-n3-reading': `${import.meta.env.BASE_URL.replace(/\\/$/, '')}/shinkanzen_n3_reading_cover.jpg`,
    'shinkanzen-master-n3-listening': `${import.meta.env.BASE_URL.replace(/\\/$/, '')}/shinkanzen_n3_listening_cover.jpg`,
    'sou-matome-n3-reading': `${import.meta.env.BASE_URL.replace(/\\/$/, '')}/sou_matome_n3_reading_cover.jpg`,
    'speed-master-n3-reading': `${import.meta.env.BASE_URL.replace(/\\/$/, '')}/speed_master_n3_reading_cover.jpg`,
    'jlpt-n3-practice-sets': `${import.meta.env.BASE_URL.replace(/\\/$/, '')}/n3_practice_sets_cover.jpg`,
    'chokuzen-taisaku-n4': `${import.meta.env.BASE_URL.replace(/\\/$/, '')}/n4_chokuzen_taisaku_cover.jpg`,
  };

  const getBookCover = (book) => {
    if (book.coverUrl) return book.coverUrl;
    return bookCovers[book.id];
  };
"""

if "const bookCovers =" not in content:
    content = content.replace("const bookProgressMap = useMemo(", book_covers_map + "\n  const bookProgressMap = useMemo(")

# 3. Replace the thumb rendering
old_thumb = """<div className={`profile-book-thumb ${book.thumbClass}`}>
                        {book.level}<br />{book.category.slice(0, 3)}
                      </div>"""

new_thumb = """<div className={`profile-book-thumb`} style={{ padding: 0, overflow: 'hidden', background: '#0f172a' }}>
                        {getBookCover(book) ? (
                          <img src={getBookCover(book)} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: 'top' }} />
                        ) : (
                          <div className={book.thumbClass} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {book.level}<br />{book.category.slice(0, 3)}
                          </div>
                        )}
                      </div>"""

content = content.replace(old_thumb, new_thumb)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("success")
