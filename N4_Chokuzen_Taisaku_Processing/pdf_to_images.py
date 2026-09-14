#!/usr/bin/env python3
"""
PDF to Images Converter
Converts PDF pages to high-resolution images (JPG/PNG/WEBP) using PyMuPDF (fitz).

Usage:
    python scripts/pdf_to_images.py path/to/document.pdf
    python scripts/pdf_to_images.py document.pdf -o output_folder --dpi 300 --format jpg
    python scripts/pdf_to_images.py document.pdf --pages 1-10,15,20-25
"""

import os
import sys
import argparse
import fitz  # PyMuPDF
from pathlib import Path

# Force utf-8 encoding on standard streams to avoid charmap errors on Windows
if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except AttributeError:
        pass


def parse_page_ranges(pages_str: str, max_pages: int) -> list[int]:
    """
    Parses a page string like "1-5,8,11-13" into a 0-indexed list of integers.
    Page numbers provided by users are 1-indexed.
    """
    if not pages_str or pages_str.strip().lower() == "all":
        return list(range(max_pages))

    pages = set()
    parts = pages_str.split(",")
    for part in parts:
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            start_str, end_str = part.split("-", 1)
            start = int(start_str.strip()) if start_str.strip() else 1
            end = int(end_str.strip()) if end_str.strip() else max_pages
            for p in range(start, end + 1):
                if 1 <= p <= max_pages:
                    pages.add(p - 1)
        else:
            p = int(part)
            if 1 <= p <= max_pages:
                pages.add(p - 1)

    return sorted(list(pages))


def convert_pdf_to_images(
    pdf_path: str,
    output_dir: str = None,
    dpi: int = 200,
    img_format: str = "jpg",
    pages_str: str = "all",
    prefix: str = None,
    zero_pad: int = 4
):
    pdf_file = Path(pdf_path)
    if not pdf_file.exists():
        print(f"Error: File not found: {pdf_path}")
        sys.exit(1)

    # Determine output folder
    if not output_dir:
        output_dir = pdf_file.parent / f"{pdf_file.stem}_pages"
    else:
        output_dir = Path(output_dir)

    output_dir.mkdir(parents=True, exist_ok=True)

    # Determine naming prefix
    if not prefix:
        prefix = f"{pdf_file.stem}_page-"

    # Open PDF document
    doc = fitz.open(pdf_file)
    total_pages = len(doc)
    selected_pages = parse_page_ranges(pages_str, total_pages)

    print("========================================")
    print(f"PDF File:          {pdf_file.name}")
    print(f"Total Pages:       {total_pages}")
    print(f"Pages to Convert:  {len(selected_pages)}")
    print(f"DPI / Resolution:  {dpi} DPI")
    print(f"Image Format:      {img_format.upper()}")
    print(f"Output Folder:     {output_dir.resolve()}")
    print("========================================")

    # Scale factor from 72 DPI (default PDF point size)
    zoom = dpi / 72.0
    matrix = fitz.Matrix(zoom, zoom)

    saved_files = []
    for idx, page_num in enumerate(selected_pages, start=1):
        page = doc[page_num]
        pix = page.get_pixmap(matrix=matrix, alpha=False)

        # 1-indexed page number for file name
        page_no_1_indexed = page_num + 1
        filename = f"{prefix}{page_no_1_indexed:0{zero_pad}d}.{img_format.lower()}"
        out_path = output_dir / filename

        pix.save(str(out_path))
        saved_files.append(out_path)

        percent = (idx / len(selected_pages)) * 100
        print(f"[{idx}/{len(selected_pages)}] ({percent:5.1f}%) Converted Page {page_no_1_indexed} -> {filename}")

    doc.close()
    print(f"\nSuccessfully converted {len(saved_files)} page(s) into images in '{output_dir}'.")
    return saved_files


def main():
    parser = argparse.ArgumentParser(
        description="Convert PDF pages into high-resolution JPG/PNG images.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/pdf_to_images.py book.pdf
  python scripts/pdf_to_images.py book.pdf -o ./output --dpi 300 --format png
  python scripts/pdf_to_images.py book.pdf --pages 1-20 --prefix "N3_page-"
  python scripts/pdf_to_images.py book.pdf --pages 1,3,5,10-15 -d 250 -f jpg
        """
    )

    parser.add_argument("pdf_path", help="Path to the PDF file")
    parser.add_argument("-o", "--output-dir", help="Directory to save images (default: <pdf_name>_pages)")
    parser.add_argument("-d", "--dpi", type=int, default=200, help="Image resolution DPI (default: 200, recommended 150-300)")
    parser.add_argument("-f", "--format", choices=["jpg", "png", "webp"], default="jpg", help="Image format (default: jpg)")
    parser.add_argument("-p", "--pages", default="all", help="Pages to convert, e.g. 'all', '1-10', '1,3,5-8' (default: all)")
    parser.add_argument("--prefix", help="Filename prefix (default: <pdf_name>_page-)")
    parser.add_argument("--zero-pad", type=int, default=4, help="Zero padding digits for page numbers (default: 4, e.g. 0001)")

    args = parser.parse_args()

    convert_pdf_to_images(
        pdf_path=args.pdf_path,
        output_dir=args.output_dir,
        dpi=args.dpi,
        img_format=args.format,
        pages_str=args.pages,
        prefix=args.prefix,
        zero_pad=args.zero_pad
    )


if __name__ == "__main__":
    main()
