import zipfile
import xml.etree.ElementTree as ET

docx_path = '15 sets of question.docx'
texts = []
with zipfile.ZipFile(docx_path) as docx:
    tree = ET.parse(docx.open('word/document.xml'))
    root = tree.getroot()
    for paragraph in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        p_text = []
        for run in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
            if run.text:
                p_text.append(run.text)
        texts.append("".join(p_text))

with open('15_sets_new_extracted.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(texts))
print("Done")
