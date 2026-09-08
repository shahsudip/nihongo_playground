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

### 4. Associated Rule Files
- Detailed standards: `.agents/rules/dokkai_extraction_standards.md`
- UI Verification: `.agents/rules/ui_verification_rule.md`
- Engineering standards: `.agents/rules/pro_developer_standards.md`
