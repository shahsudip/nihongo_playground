import fitz

pdf_path = r"D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\Materi N3 総まとめ\日本語総まとめ N3, 読解  Nihongo sōmatome N3, Dokkai.pdf"

try:
    doc = fitz.open(pdf_path)
    with open("pdf_sample.txt", "w", encoding="utf-8") as f:
        f.write(f"Opened PDF: {doc.page_count} pages\n\n")
        
        # Read pages 6 to 15
        for page_num in range(6, 15):
            page = doc.load_page(page_num)
            text = page.get_text()
            f.write(f"--- Page {page_num + 1} ---\n")
            f.write(text + "\n\n")
    print("Success")
except Exception as e:
    print(f"Error: {e}")
