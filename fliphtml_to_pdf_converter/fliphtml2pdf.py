#!/usr/bin/env python3
"""
FlipHTML to PDF Converter — Free, High-Speed, Universal Tool
Converts offline FlipHTML / FlipHTML5 folders, HTML files, or online links into high-quality PDFs.
"""

import sys
import os
import argparse
from pathlib import Path

# Ensure UTF-8 output on Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).parent.resolve()))

from core.local_extractor import convert_local_fliphtml, find_flipbook_pages
from core.online_downloader import convert_online_fliphtml
from core.browser_renderer import convert_browser_fliphtml


def print_progress(current: int, total: int, message: str):
    """Terminal progress printer."""
    bar_len = 30
    filled_len = int(bar_len * current // total)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)
    sys.stdout.write(f"\r[{bar}] {current:3d}% : {message:<45}")
    sys.stdout.flush()
    if current >= 100:
        sys.stdout.write("\n")


def process_input(input_path_or_url: str, output_path: str = None, engine: str = "auto") -> str:
    """Processes a single input target and generates a PDF."""
    is_url = input_path_or_url.startswith("http://") or input_path_or_url.startswith("https://")

    print(f"\n[*] Target: {input_path_or_url}")
    print(f"[*] Engine mode: {engine}")

    if engine == "browser":
        return convert_browser_fliphtml(
            input_path_or_url,
            output_pdf=output_path,
            progress_callback=print_progress
        )

    if is_url:
        return convert_online_fliphtml(
            input_path_or_url,
            output_pdf=output_path,
            progress_callback=print_progress
        )
    else:
        path = Path(input_path_or_url).resolve()
        if not path.exists():
            print(f"[Error] File or folder not found: {input_path_or_url}", file=sys.stderr)
            sys.exit(1)

        return convert_local_fliphtml(
            str(path),
            output_pdf=output_path,
            progress_callback=print_progress
        )


def main():
    parser = argparse.ArgumentParser(
        description="FlipHTML to PDF Converter (100% Free & Lossless)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Convert a local FlipHTML folder:
  python fliphtml2pdf.py "D:/Books/MyFlipBook" -o "MyBook.pdf"

  # Convert an index.html file:
  python fliphtml2pdf.py "D:/Books/MyFlipBook/index.html"

  # Convert an online FlipHTML5 book:
  python fliphtml2pdf.py "https://online.fliphtml5.com/abcde/fghi/" -o "OnlineBook.pdf"

  # Launch Graphical User Interface:
  python fliphtml2pdf.py --gui
        """
    )
    parser.add_argument("input", nargs="?", help="Path to local FlipHTML folder/file OR online FlipHTML URL")
    parser.add_argument("-o", "--output", help="Output PDF file path (optional)")
    parser.add_argument("-e", "--engine", choices=["auto", "local", "online", "browser"], default="auto",
                        help="Extraction engine (default: auto)")
    parser.add_argument("--gui", action="store_true", help="Launch Tkinter Desktop GUI")
    parser.add_argument("--batch", action="store_true",
                        help="Batch mode: converts all subfolders inside the input directory")

    args = parser.parse_args()

    if args.gui or len(sys.argv) == 1 and not args.input:
        from gui import launch_gui
        launch_gui()
        return

    if not args.input:
        parser.print_help()
        sys.exit(1)

    if args.batch:
        batch_root = Path(args.input).resolve()
        if not batch_root.is_dir():
            print(f"[Error] Batch input must be a directory: {batch_root}", file=sys.stderr)
            sys.exit(1)

        subdirs = [p for p in batch_root.iterdir() if p.is_dir()]
        print(f"[*] Found {len(subdirs)} subdirectories in {batch_root.name} for batch processing.")

        success_count = 0
        for idx, subdir in enumerate(subdirs, 1):
            print(f"\n[{idx}/{len(subdirs)}] Processing: {subdir.name}")
            try:
                out = subdir.parent / f"{subdir.name}.pdf"
                process_input(str(subdir), output_path=str(out), engine=args.engine)
                success_count += 1
            except Exception as ex:
                print(f"[!] Skipped {subdir.name}: {ex}")

        print(f"\n[OK] Batch complete! Successfully converted {success_count}/{len(subdirs)} folders.")
        return

    # Single file/url processing
    try:
        pdf_path = process_input(args.input, output_path=args.output, engine=args.engine)
        print(f"\n[OK] PDF created successfully at:\n    {pdf_path}\n")
    except Exception as e:
        print(f"\n[!] Error during conversion: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
