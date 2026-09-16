import os
import zipfile
import sqlite3
import json
import base64
import re
import zstandard

downloads_dir = r"C:\Users\sah_sudip_kumar\Downloads"
out_html_path = r"D:\sudip_software\nihongo_playground\public\apkg_original_showcase.html"
out_pdf_path = r"D:\sudip_software\nihongo_playground\public\apkg_original_showcase.pdf"
media_tmp_dir = r"D:\sudip_software\nihongo_playground\scripts\tmp_inspect_media"
os.makedirs(media_tmp_dir, exist_ok=True)

apkg_files = [
    "Japanese_N3_N2_N4_Anime_Sentence_images_audio.apkg",
    "Shin_Kanzen_Master_N3_Grammar__Sentence_Deck.apkg",
    "Shin_Kanzen_Master_Vocabulary_JLPT_N3_Official_Definitions.apkg",
    "_Standard_2400.apkg",
    "AnkiDrone Core10k.apkg",
    "JLPT Tango N3.apkg"
]

all_deck_summaries = []

def parse_anki_furigana(text):
    if not text:
        return ""
    # Convert Anki style `漢字[かんじ]` to `<ruby>漢字<rt>かんじ</rt></ruby>`
    def ruby_repl(m):
        base = m.group(1).strip()
        reading = m.group(2).strip()
        return f"<ruby>{base}<rt>{reading}</rt></ruby>"
    
    # Standard Anki bracket: `漢字[かんじ]` or ` 漢字[かんじ]`
    text = re.sub(r' ?([^\x00-\x7F]+)\[(.*?)\]', ruby_repl, text)
    return text

for fname in apkg_files:
    fpath = os.path.join(downloads_dir, fname)
    if not os.path.exists(fpath):
        continue
    
    deck_obj = {
        "fileName": fname,
        "deckTitle": fname.replace(".apkg", ""),
        "models": [],
        "sampleCards": []
    }

    try:
        with zipfile.ZipFile(fpath, 'r') as z:
            names = z.namelist()
            media_map = {}
            if "media" in names:
                m_raw = z.read("media")
                try:
                    media_map = json.loads(m_raw.decode('utf-8', errors='ignore'))
                except:
                    pass
            
            # Extract database
            db_bytes = None
            if "collection.anki21b" in names:
                raw = z.read("collection.anki21b")
                db_bytes = zstandard.ZstdDecompressor().decompress(raw, max_output_size=300000000)
            elif "collection.anki21" in names:
                db_bytes = z.read("collection.anki21")
            elif "collection.anki2" in names:
                db_bytes = z.read("collection.anki2")

            if not db_bytes:
                continue

            tmp_db = os.path.join(os.path.dirname(__file__), f"tmp_{fname}.sqlite")
            with open(tmp_db, "wb") as f_tmp:
                f_tmp.write(db_bytes)

            conn = sqlite3.connect(tmp_db)
            cur = conn.cursor()

            cur.execute("SELECT models, decks FROM col")
            col_row = cur.fetchone()
            models = json.loads(col_row[0]) if (col_row and col_row[0]) else {}
            decks = json.loads(col_row[1]) if (col_row and col_row[1]) else {}

            cur.execute("SELECT COUNT(*) FROM notes")
            total_notes = cur.fetchone()[0]
            cur.execute("SELECT COUNT(*) FROM cards")
            total_cards = cur.fetchone()[0]

            deck_obj["totalNotes"] = total_notes
            deck_obj["totalCards"] = total_cards
            
            # Map inverted media filename -> zip internal id
            inv_media = {v: k for k, v in media_map.items()}

            # Extract models
            for mid, minfo in models.items():
                f_names = [f.get('name') for f in minfo.get('flds', [])]
                tmpls = minfo.get('tmpls', [])
                deck_obj["models"].append({
                    "id": mid,
                    "name": minfo.get("name"),
                    "fields": f_names,
                    "css": minfo.get("css", ""),
                    "templates": [{"name": t.get("name"), "qfmt": t.get("qfmt"), "afmt": t.get("afmt")} for t in tmpls]
                })

            # Fetch up to 6 diverse sample notes
            cur.execute("SELECT id, mid, flds, tags FROM notes WHERE flds != '' LIMIT 6")
            for n in cur.fetchall():
                nid, mid, flds_raw, tags = n
                m_def = models.get(str(mid), {})
                f_names = [f.get('name') for f in m_def.get('flds', [])]
                f_vals = flds_raw.split('\x1f')
                
                fields_dict = {}
                for idx, v in enumerate(f_vals):
                    k = f_names[idx] if idx < len(f_names) else f"Field_{idx}"
                    
                    # If this field has an image ref <img src="...">, extract base64
                    img_matches = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', v)
                    for img_fn in img_matches:
                        zip_key = inv_media.get(img_fn)
                        if zip_key and zip_key in names:
                            try:
                                img_data = z.read(zip_key)
                                mime = "image/jpeg" if img_fn.lower().endswith(('.jpg', '.jpeg')) else "image/png"
                                b64 = base64.b64encode(img_data).decode('utf-8')
                                v = v.replace(img_fn, f"data:{mime};base64,{b64}")
                            except:
                                pass
                    
                    fields_dict[k] = v

                # Also render a nice preview for Japanese Furigana
                preview_front = fields_dict.get("Front") or fields_dict.get("FrontSentence") or fields_dict.get("Word") or fields_dict.get("vocabKanji") or fields_dict.get("Expression") or list(fields_dict.values())[0]
                preview_back = fields_dict.get("Back") or fields_dict.get("Translation") or fields_dict.get("PrimaryDefinition") or fields_dict.get("Meaning") or fields_dict.get("SentenceReading") or (list(fields_dict.values())[1] if len(fields_dict) > 1 else "")
                
                deck_obj["sampleCards"].append({
                    "noteId": nid,
                    "modelName": m_def.get("name", "Standard"),
                    "tags": tags,
                    "fields": fields_dict,
                    "previewFront": parse_anki_furigana(preview_front),
                    "previewBack": parse_anki_furigana(preview_back)
                })

            conn.close()
            if os.path.exists(tmp_db):
                os.remove(tmp_db)

    except Exception as e:
        print(f"Error reading {fname}: {e}")

    all_deck_summaries.append(deck_obj)

# Build HTML report
html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Anki .apkg Master Structure & Original Card Showcase</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;900&family=JetBrains+Mono:wght@400;600&display=swap');

  @page {{
    size: A4 portrait;
    margin: 12mm 15mm;
    @bottom-right {{
      content: counter(page);
    }}
  }}

  body {{
    font-family: 'Inter', 'Noto Sans JP', sans-serif;
    color: #1e293b;
    background-color: #f8fafc;
    margin: 0;
    padding: 24px;
    line-height: 1.5;
  }}

  .container {{
    max-width: 900px;
    margin: 0 auto;
    background: #ffffff;
    padding: 32px 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }}

  .header {{
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 20px;
    margin-bottom: 28px;
  }}

  .header h1 {{
    font-size: 26px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }}

  .header p {{
    font-size: 14px;
    color: #64748b;
    margin: 0;
  }}

  .deck-section {{
    margin-bottom: 40px;
    page-break-inside: avoid;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    background: #ffffff;
  }}

  .deck-header {{
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    color: #ffffff;
    padding: 16px 20px;
  }}

  .deck-title {{
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 4px 0;
    word-break: break-all;
  }}

  .deck-stats {{
    font-size: 12px;
    color: #94a3b8;
    display: flex;
    gap: 16px;
  }}

  .badge {{
    background: rgba(255,255,255,0.15);
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 600;
  }}

  .schema-box {{
    background: #f1f5f9;
    padding: 14px 20px;
    border-bottom: 1px solid #e2e8f0;
  }}

  .schema-title {{
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #475569;
    margin-bottom: 8px;
  }}

  .fields-list {{
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }}

  .field-tag {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #0f172a;
    padding: 3px 8px;
    border-radius: 6px;
    font-weight: 600;
  }}

  .cards-container {{
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }}

  .sample-card {{
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  }}

  .card-topbar {{
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 8px 14px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #64748b;
    font-weight: 600;
  }}

  .card-split {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #f1f5f9;
  }}

  @media print {{
    .card-split {{
      grid-template-columns: 1fr 1fr;
    }}
  }}

  .card-side {{
    padding: 16px;
  }}

  .card-side.front {{
    border-right: 1px solid #f1f5f9;
    background: #fafbfc;
  }}

  .side-label {{
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
    margin-bottom: 10px;
  }}

  .japanese-text {{
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.6;
    margin-bottom: 8px;
  }}

  ruby rt {{
    font-size: 11px;
    color: #3b82f6;
    font-weight: 600;
  }}

  .card-side img {{
    max-width: 100%;
    max-height: 180px;
    border-radius: 6px;
    object-fit: cover;
    display: block;
    margin: 8px 0;
  }}

  .field-table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    margin-top: 10px;
  }}

  .field-table th, .field-table td {{
    padding: 6px 10px;
    border-top: 1px solid #f1f5f9;
    text-align: left;
    vertical-align: top;
  }}

  .field-table th {{
    width: 25%;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #64748b;
    font-weight: 600;
    background: #f8fafc;
  }}

  .field-table td {{
    color: #1e293b;
    word-break: break-word;
  }}

  .field-table td img {{
    max-height: 120px;
    border-radius: 4px;
  }}

  .print-btn {{
    position: fixed;
    top: 20px;
    right: 20px;
    background: #2563eb;
    color: #ffffff;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(37,99,235,0.3);
  }}

  @media print {{
    .print-btn {{
      display: none;
    }}
    body {{
      background: #ffffff;
      padding: 0;
    }}
    .container {{
      box-shadow: none;
      padding: 0;
      max-width: 100%;
    }}
  }}
</style>
</head>
<body>

<button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>

<div class="container">
  <div class="header">
    <h1><span>🎴</span> Anki .apkg Master Deck Structure & Card Showcase</h1>
    <p>Visual inspection of SQLite models, original fields, templates, images, and card anatomy across all downloaded Japanese Anki packages.</p>
  </div>
"""

for d in all_deck_summaries:
    m_info = d["models"][0] if d["models"] else {"name": "Default", "fields": []}
    fields_html = "".join([f'<span class="field-tag">{f}</span>' for f in m_info.get("fields", [])])
    
    html_content += f"""
    <div class="deck-section">
      <div class="deck-header">
        <h2 class="deck-title">{d["deckTitle"]}</h2>
        <div class="deck-stats">
          <span class="badge">{d.get("totalNotes", 0):,} Total Notes</span>
          <span class="badge">{d.get("totalCards", 0):,} Total Cards</span>
          <span>Model: <strong>{m_info.get("name", "Unknown")}</strong></span>
        </div>
      </div>
      
      <div class="schema-box">
        <div class="schema-title">📂 Note Field Schema ({len(m_info.get("fields", []))} Fields)</div>
        <div class="fields-list">
          {fields_html}
        </div>
      </div>

      <div class="cards-container">
    """

    for idx, card in enumerate(d.get("sampleCards", [])[:3]):
        # Render fields table
        table_rows = ""
        for fk, fv in card.get("fields", {}).items():
            if not fv or fv.strip() == "":
                continue
            # sanitize audio markup for display
            clean_val = fv
            if "[sound:" in clean_val:
                clean_val = re.sub(r'\[sound:([^\]]+)\]', r'<span style="background:#e0e7ff;color:#3730a3;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:600">🔊 \1</span>', clean_val)
            table_rows += f"""
            <tr>
              <th>{fk}</th>
              <td>{clean_val}</td>
            </tr>
            """

        html_content += f"""
        <div class="sample-card">
          <div class="card-topbar">
            <span>Sample Card #{idx + 1} (Note ID: {card["noteId"]})</span>
            <span>Model: {card["modelName"]}</span>
          </div>
          
          <div class="card-split">
            <div class="card-side front">
              <div class="side-label">Original Front (Question)</div>
              <div class="japanese-text">{card["previewFront"]}</div>
            </div>
            <div class="card-side back">
              <div class="side-label">Original Back (Answer / Meaning)</div>
              <div>{card["previewBack"]}</div>
            </div>
          </div>

          <table class="field-table">
            <tbody>
              {table_rows}
            </tbody>
          </table>
        </div>
        """

    html_content += """
      </div>
    </div>
    """

html_content += """
</div>
</body>
</html>
"""

with open(out_html_path, "w", encoding="utf-8") as f_out:
    f_out.write(html_content)

print(f"HTML showcase generated at {out_html_path}")
