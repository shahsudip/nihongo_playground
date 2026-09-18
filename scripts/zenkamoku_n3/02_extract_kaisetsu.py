import sys, fitz
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = 'tmp_inspect/zenkamoku_n3/English_Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N3.pdf'
out_path = 'scripts/zenkamoku_n3/kaisetsu_text.txt'

doc = fitz.open(pdf_path)
all_text = []
for page in doc:
    all_text.append(page.get_text())
doc.close()

full_text = '\n'.join(all_text)
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(full_text)

print(f'Total pages: {len(all_text)}')
print(f'Total chars: {len(full_text)}')
print('First 500 chars:')
print(full_text[:500])
