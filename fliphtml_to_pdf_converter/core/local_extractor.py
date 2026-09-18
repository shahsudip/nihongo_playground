"""
Local FlipHTML / FlipBook package analyzer and PDF generator.
Detects pages from offline directories (FlipHTML5, FlipBuilder, 3D PageFlip, etc.)
and compiles them into a high-quality PDF.
"""

import os
import re
from pathlib import Path
from typing import List, Optional, Callable
from .pdf_builder import images_to_pdf, svgs_to_pdf


def natural_sort_key(s: str):
    """
    Sort strings with numbers naturally:
    ['1.jpg', '2.jpg', '10.jpg'] instead of ['1.jpg', '10.jpg', '2.jpg']
    """
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', str(s))]


def find_flipbook_pages(root_dir: Path) -> List[Path]:
    """
    Scans a directory for FlipHTML page image sequences or SVGs.
    Prioritizes highest resolution folders (large > extpages > mobile > pages > shot).
    """
    if not root_dir.exists():
        raise FileNotFoundError(f"Directory not found: {root_dir}")

    # If user provided a specific HTML file (e.g. index.html), use its parent folder
    if root_dir.is_file():
        root_dir = root_dir.parent

    # Known standard FlipHTML subdirectories in priority order
    candidate_folders = [
        root_dir / "files" / "large",
        root_dir / "files" / "extpages",
        root_dir / "files" / "pages",
        root_dir / "files" / "page",
        root_dir / "files" / "mobile",
        root_dir / "files" / "shot",
        root_dir / "files" / "thumb",
        root_dir / "pages",
        root_dir / "page",
        root_dir / "images" / "pages",
        root_dir / "images",
    ]

    valid_extensions = {".jpg", ".jpeg", ".png", ".webp", ".svg", ".bmp", ".tif", ".tiff"}

    # 1. Check known directories
    for folder in candidate_folders:
        if folder.exists() and folder.is_dir():
            files = [
                f for f in folder.iterdir()
                if f.is_file() and f.suffix.lower() in valid_extensions
            ]
            if files:
                # Filter out obvious UI icons or thumbnails if pages are numbered
                numbered_files = [f for f in files if re.search(r'\d+', f.stem)]
                target_files = numbered_files if numbered_files else files
                return sorted(target_files, key=lambda x: natural_sort_key(x.name))

    # 2. Search recursively for folders containing sequences of numbered images
    best_candidate_files: List[Path] = []
    max_count = 0

    for dirpath, _, filenames in os.walk(root_dir):
        current_dir = Path(dirpath)
        # Skip node_modules or system folders
        if "node_modules" in current_dir.parts or ".git" in current_dir.parts:
            continue

        image_files = [
            current_dir / f for f in filenames
            if Path(f).suffix.lower() in valid_extensions and re.search(r'\d+', Path(f).stem)
        ]

        if len(image_files) > max_count:
            # Check if majority are sequential numbers
            max_count = len(image_files)
            best_candidate_files = sorted(image_files, key=lambda x: natural_sort_key(x.name))

    if best_candidate_files:
        return best_candidate_files

    # 3. Fallback: all images in root
    all_images = [
        f for f in root_dir.iterdir()
        if f.is_file() and f.suffix.lower() in valid_extensions
    ]
    if all_images:
        return sorted(all_images, key=lambda x: natural_sort_key(x.name))

    return []


def parse_fliphtml_config(root_dir: Path) -> dict:
    """
    Parses javascript/config.js or book_config.js if available to extract metadata.
    """
    if root_dir.is_file():
        root_dir = root_dir.parent

    config_files = [
        root_dir / "javascript" / "config.js",
        root_dir / "javascript" / "book_config.js",
        root_dir / "javascript" / "main.js",
        root_dir / "config.js"
    ]

    metadata = {"title": None, "page_count": None}

    for cfg in config_files:
        if cfg.exists():
            try:
                content = cfg.read_text(encoding="utf-8", errors="ignore")
                # Look for book title
                title_match = re.search(r'bookTitle\s*[:=]\s*["\']([^"\']+)["\']', content)
                if title_match:
                    metadata["title"] = title_match.group(1)
                
                # Look for page count
                count_match = re.search(r'totalPageCount\s*[:=]\s*(\d+)', content)
                if count_match:
                    metadata["page_count"] = int(count_match.group(1))
            except Exception:
                pass

    return metadata


def convert_local_fliphtml(
    source_path: str,
    output_pdf: Optional[str] = None,
    progress_callback: Optional[Callable[[int, int, str], None]] = None
) -> str:
    """
    Main function to convert a local FlipHTML folder or file to a PDF.
    
    Args:
        source_path: Path to the FlipHTML folder or index.html file.
        output_pdf: Path to output PDF (defaults to <foldername>.pdf).
        progress_callback: Optional callback func(current, total, message).
    
    Returns:
        Absolute path to the created PDF.
    """
    path_obj = Path(source_path).resolve()
    if not path_obj.exists():
        raise FileNotFoundError(f"Source path does not exist: {source_path}")

    folder_dir = path_obj if path_obj.is_dir() else path_obj.parent

    if progress_callback:
        progress_callback(0, 100, f"Scanning {folder_dir.name} for FlipHTML pages...")

    pages = find_flipbook_pages(folder_dir)
    if not pages:
        raise ValueError(
            f"No page images or assets found in '{folder_dir}'. "
            "Ensure the folder contains standard FlipHTML assets (e.g. files/large/ or images/)."
        )

    meta = parse_fliphtml_config(folder_dir)
    title = meta.get("title") or folder_dir.name

    if not output_pdf:
        output_pdf = folder_dir.parent / f"{folder_dir.name}.pdf"
    else:
        output_pdf = Path(output_pdf).resolve()

    if progress_callback:
        progress_callback(20, 100, f"Found {len(pages)} pages. Generating PDF...")

    # Check if files are SVGs
    if all(p.suffix.lower() == ".svg" for p in pages):
        result = svgs_to_pdf(pages, output_pdf, title=title)
    else:
        result = images_to_pdf(pages, output_pdf, title=title)

    if progress_callback:
        progress_callback(100, 100, f"Successfully created PDF: {Path(result).name}")

    return result
