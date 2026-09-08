# Universal Dokkai (Reading Comprehension) Digitization Standards
Applicable to: **Speed Master (N3, N2, N1)**, **Shin Kanzen Master (N3, N2, N1)**, and all Japanese reading modules.

In every Japanese reading book, passages are categorized into distinct visual genres. Every extraction must inspect the scanned page and classify the passage into its authentic visual archetype:

---

## 1. Passage Types & Mandatory Visual Archetypes

### A. 短文 (Short Passages — 1 to 4 paragraphs, 1 Question)
- **Email / Notice / Memo**: Render in a memo card container (`.speed-master-memo-card` / `.dokkai-notice-box`) with clean header, date, recipient, and sender.
- **Signs & Announcements**: Keep bulletin borders subtle, matching the scan's outline.
- **Footnote / Margin Sketches**: Check footnote areas for illustrations (e.g. tools, objects, actions). Extract as transparent PNGs (`footnotesDiagramRight` / `footnotesDiagramLeft`).

### B. 中文 (Medium Passages — 500 words, 2-3 Questions)
- **Product Instructions & User Manuals** (e.g., electronic devices, pedometers, software): Render bullet points, steps `1)`, `2)`, `3)`, and note markers `☆`, `●` cleanly inside structured rule cards.
- **Explanatory Diagrams / Comparison Figures**: If the textbook contains an illustration explaining the mechanism or experiment, extract transparent line-art or draw as vector SVG.

### C. 長文 (Long Passages — 1000 words, 3-4 Questions)
- **Personal Letters & Formal Correspondence**: When printed on lined stationery letter paper in the textbook, **must be rendered using ruled paper styling** (`.speed-master-lined-paper` with `.speed-master-ruled-row`).
- **Postcards & Reply Slips (出欠はがき)**: Render reply forms, checkboxes, underline fill-ins (`お名前：_______`), and option circles (`ご出席・ご欠席`) in bordered postal card boxes.

### D. 情報検索 (Information Retrieval — Flyers, Menus, Maps, Graphs, 2 Questions)
- **Promotional Flyers & Store Ads**: **Never convert into artificial solid HTML tables**. If stylized with bubble fonts, decorative prices, and banners, crop at high resolution (min 1500px wide), whiten background, and render inside `.speed-master-flyer-card`.
- **Coordinate & Bar Graphs**: **Always draw natively in vector SVG** (with complete Y-axis `(秒)`, X-axis `(歳)`, tick marks, and dashed guide lines). Never use poorly cropped or blurry screenshots.
- **Transit, Bus & Train Routes**: Use authentic scan arrow symbols (`□`, `○`, `⇩`, `⇩⇧`, `【乗り換え】`) instead of heavy artificial boxes.
- **Timetables & Price Schedules**: Use clean dashed borders matching the original scan's row hierarchy.

### E. 模擬試験 (Mock Exams — 16 Questions across 4 Mondai)
- **Mandatory Section Architecture**: Never bundle multiple distinct passages into one giant text block.
- Structure with a `sections: [...]` array where each sub-passage (Mondai 1 短文 1–4, Mondai 2 中文 1–2, Mondai 3 長文, Mondai 4 情報検索) is an independent object with its own `questionIndices`, `footnotes`, and diagrams.
- Provide dual-mode UI:
  1. **📋 Question Focus Mode**: Displays the specific passage, footnotes, and diagrams synced to the active question with `◀` / `▶` navigation.
  2. **📄 Full Paper Mode**: Displays all passages in sequence with questions and options positioned right under each passage.

---

## 2. Visual Quality & Image Extraction Standards
- **Whitened Backgrounds**: All cropped scans must be normalized so the paper texture is pure white `#ffffff`, and dark text is high contrast `#0f172a`.
- **Transparent Drawings**: Footnote diagrams and sketches must have alpha transparency (`RGBA`) so they display seamlessly across Light, Sepia, and Dark themes.
- **Generous Bounding Boxes**: When cropping any image, include generous margins around titles, axes, footnotes, and borders to prevent clipped labels.

---

## 3. Strict Schema & Furigana Quality
- **Questions**: Exactly 4 options for all JLPT questions.
- **Options Match**: `correct` must be an integer `1..4`, and `correctOption` must match `options[correct - 1]` character-for-character (ignoring ruby markup).
- **Ruby Tag Integrity**: Every `<ruby>` and `<rt>` tag must be properly paired and closed.
- **Zero Missing Assets**: Every asset referenced in JSON or HTML must physically exist in `public/`.
- **CI / Build Check**: Every book module must pass its dedicated verification script (e.g. `npm run verify:speedmaster`) and `npm run build` before completion.
