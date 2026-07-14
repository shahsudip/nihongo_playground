import zipfile
import xml.etree.ElementTree as ET
import os

def docx_to_text(docx_path):
    namespaces = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    }
    
    texts = []
    if not os.path.exists(docx_path):
        return f"Error: File {docx_path} does not exist."
        
    try:
        with zipfile.ZipFile(docx_path) as docx:
            tree = ET.parse(docx.open('word/document.xml'))
            root = tree.getroot()
            for paragraph in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                p_text = []
                for run in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                    if run.text:
                        p_text.append(run.text)
                if p_text:
                    texts.append("".join(p_text))
                else:
                    texts.append("")
        return "\n".join(texts)
    except Exception as e:
        return f"Error unzipping/parsing DOCX: {e}"

docx_file = "../JLPT N2 SHIN 500 MON.docx"
text = docx_to_text(docx_file)

with open("extracted_text_n2.txt", "w", encoding="utf-8") as f:
    f.write(text)

print(f"Extracted {len(text)} characters to extracted_text_n2.txt")
