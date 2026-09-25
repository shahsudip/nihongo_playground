# Zenkamoku N2 — Standardized Extraction Guidelines & Scripts

## 🛡️ Core Rules for N2 Book Processing
1. **Never use outdated/scratch scripts** — Always run `scripts/zenkamoku_shared/zenkamoku_validator.py` before committing.
2. **Passage Formatting**:
   - Mid-size & Long reading passages must use `.speed-master-lined-paper` with `whitespace-pre-line font-serif leading-loose`.
   - Never hardcode `bg-white` (breaks dark mode). Use theme-adaptive classes or `.speed-master-lined-paper`.
   - Never insert artificial hardcoded line numbers (`[1, 5, 10, 15, ...]`).
3. **Ruby & Furigana**:
   - All `<ruby>...<rt>...</rt></ruby>` tags must be strictly paired.
4. **Star Questions (並び替え)**:
   - Must use `＿＿＿ ＿＿＿ <u>　★　</u> ＿＿＿` with `correctOrder` and `starPosition`.
5. **Text Grammar (文章の文法)**:
   - Stems must strictly be `""` (empty string) with no synthetic prompt.
6. **Audit & Validation**:
   - Run: `python scripts/zenkamoku_shared/zenkamoku_validator.py`
   - Zero issues required.
