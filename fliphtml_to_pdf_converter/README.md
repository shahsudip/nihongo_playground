# 📖 FlipHTML to PDF Converter (100% Free & Lossless)

A free, offline-capable Python tool suite to convert **FlipHTML / FlipHTML5 / FlipBuilder** files and web links into clean, high-resolution PDF documents with zero watermarks and no page limits.

---

## ✨ Features

- **100% Free & Open-Source**: No subscriptions, no paid APIs, no watermarks, unlimited pages.
- **Multiple Supported Formats**:
  - Offline FlipHTML folders (containing `files/large/`, `files/mobile/`, `files/extpages/`, `files/shot/`, `images/`, etc.)
  - Offline `index.html` or `book.html` files.
  - Online FlipHTML5 URLs (e.g. `https://online.fliphtml5.com/xxxx/yyyy/`).
  - Dynamic interactive HTML flipbooks (via Playwright headless browser fallback).
- **Lossless Quality**: Assembles direct original-resolution page images into PDF without quality degradation using PyMuPDF / PIL.
- **Natural Number Ordering**: Ensures page 1, 2, 10, 100 are ordered sequentially (`1 -> 2 -> ... -> 10 -> 100`).
- **3 Interfaces Included**:
  1. **Desktop GUI (`gui.py` / `run_gui.bat`)**: Interactive Tkinter window with file browser & progress bar.
  2. **Web UI (`web_ui.py` / `run_web.bat`)**: Clean dark-mode browser interface.
  3. **CLI (`fliphtml2pdf.py`)**: Powerful command line script with batch processing.

---

## 🚀 Quick Start

### 1. Graphical User Interface (GUI)
Double-click `run_gui.bat` or run:
```bash
python gui.py
```

### 2. Web Browser Interface
Double-click `run_web.bat` or run:
```bash
python web_ui.py
```
Open [http://127.0.0.1:5820](http://127.0.0.1:5820) in any browser.

### 3. Command Line Interface (CLI)

#### A. Convert an Offline FlipHTML Folder
```bash
python fliphtml2pdf.py "D:/MyBooks/ExtractedFlipBook" -o "Output.pdf"
```

#### B. Convert an `index.html` File
```bash
python fliphtml2pdf.py "D:/MyBooks/ExtractedFlipBook/index.html"
```

#### C. Convert an Online FlipHTML5 URL
```bash
python fliphtml2pdf.py "https://online.fliphtml5.com/abcde/fghi/" -o "MyOnlineBook.pdf"
```

#### D. Batch Convert Multiple Folders
```bash
python fliphtml2pdf.py "D:/AllBooksFolder" --batch
```

#### E. Browser Emulation Mode (For Canvas/JavaScript Flipbooks)
```bash
python fliphtml2pdf.py "D:/MyBooks/ComplexFlipBook/index.html" --engine browser
```

---

## 📁 Directory Layout

```text
fliphtml_to_pdf_converter/
├── core/
│   ├── __init__.py
│   ├── local_extractor.py      # Scans offline FlipHTML directory structures & metadata
│   ├── online_downloader.py    # Downloads pages from online FlipHTML5 URLs
│   ├── browser_renderer.py     # Playwright engine for dynamic Canvas/JS flipbooks
│   └── pdf_builder.py          # High-performance PyMuPDF PDF assembler
├── fliphtml2pdf.py             # Main CLI executable
├── gui.py                      # Modern Desktop GUI (Tkinter)
├── web_ui.py                   # Lightweight local Web UI
├── run_gui.bat                 # 1-click Windows GUI launcher
├── run_web.bat                 # 1-click Windows Web UI launcher
├── requirements.txt            # Dependency list
└── README.md                   # Documentation
```

---

## 🛠️ Requirements & Installation

All required libraries are standard free Python packages:
```bash
pip install -r requirements.txt
```
*(PyMuPDF, Pillow, and requests are already installed on your system)*
