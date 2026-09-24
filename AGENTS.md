# Nihongo Playground — Master Project Instructions & Permanent Guidelines

## 🛡️ Core Directives: Zero-Defect Dokkai & Book Digitization

These rules are permanently active for all book extractions (Shin Kanzen Master, Speed Master N3/N2/N1, Power Drill, etc.):

### 1. Mandatory Visual-First Inspection (NEVER do blind text OCR)
Before writing or generating any JSON or passage text:
- **Inspect the high-resolution scanned page first**.
- **Classify the visual archetype**:
  1. *Lined Stationery / Letter* -> Must use `.speed-master-lined-paper` with `.speed-master-ruled-row`.
  2. *Promotional Flyer / Pamphlet / Menu* -> **NEVER** use plain HTML tables. Crop edge-cleaned HD visual assets and wrap in `.speed-master-flyer-card`.
  3. *Coordinate / Bar Graph* -> **ALWAYS** draw as a precision vector SVG or provide generous unclipped HD crop preserving all axes `(秒)`, `(歳)`, tick marks, and headers.
  4. *Footnote / Margin Sketches* -> Crop with generous margins, remove background to transparent PNG, and link via `footnotesDiagram` or inline `<img>`.
  5. *Mock Exam* -> **NEVER** flatten into one text block. Must be broken down into structured `sections` with synchronized question mappings.

### 2. Pre-Extraction Asset Harvesting
- **All images, diagrams, SVGs, and line-art must be extracted, verified, and placed in `public/` BEFORE creating JSON.**

### 3. Strict Schema & Verification Gate
- Every JLPT question must strictly contain 4 options with exact `correctOption` matching `options[correct-1]`.
- All ruby `<ruby>...<rt>...</rt></ruby>` tags must be perfectly paired.
- Automated audit scripts (`scripts/dokkai_guardian.py` and `scripts/verify_speedmaster.cjs` or equivalent) must pass with 0 errors before presenting work to the user.
- Production build `npm run build` must succeed with zero errors.

### 4. Golden Master Cross-Referencing Invariant
When working on parallel series books (e.g. Zenkamoku N2 vs Zenkamoku N3):
- **ALWAYS inspect the existing completed sister book first** as the authoritative structural Golden Master.
- Match all schemas, stem conventions, star question representation (`＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿`), explanation markup (`<b>【正解】...</b><br/>【文の並び替え】...<br/><b>～...</b>：...`), and container classes.
- NEVER invent new, unstandardized formats when a validated precedent exists.

### 5. Full Context & Multi-Speaker Dialogue Invariant
- Never extract partial stems or drop introductory lines.
- For conversations, include all speaker labels and scene indicators:
  `（学校で）<br/>太田「...」<br/>江口「...」`
- Verify that question numbers, options, and full sentences match the scanned page 100%.

### 6. Layout & CSS Invariants
- **NO hardcoded `bg-white`** inside passage JSON HTML (breaks dark mode and creates stark bright cards). Use theme-adaptive classes (`.speed-master-lined-paper`, `.speed-master-flyer-card`, or `border border-gray-400 dark:border-gray-600 bg-amber-50/20 dark:bg-slate-900/60`).
- **NO unhandled multi-line HTML in `whitespace-pre-line` containers**.

### 7. Associated Rule Files
- Detailed standards: `.agents/rules/dokkai_extraction_standards.md`
- UI Verification: `.agents/rules/ui_verification_rule.md`
- Engineering standards: `.agents/rules/pro_developer_standards.md`


## Workspace File Generation Rule
- All generated files (.md notes, graphs, charts, images, scratch scripts, OCR outputs) MUST be generated directly inside this repository under scripts/, images/, or tmp_inspect/.
- NEVER generate files in C:\ or in Windows Temp (%TEMP%).
