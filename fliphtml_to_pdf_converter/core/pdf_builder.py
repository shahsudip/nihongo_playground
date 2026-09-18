"""
High-performance PDF builder from image lists or vector assets using PyMuPDF (fitz) and Pillow.
Guarantees 100% free, local, lossless or optimized PDF generation with zero watermarks.
Handles all image types (.webp, .png, .jpg, .tiff, etc.) seamlessly.
"""

import os
import io
from pathlib import Path
from typing import List, Union, Optional
from PIL import Image

try:
    import fitz  # PyMuPDF
    HAS_FITZ = True
except ImportError:
    HAS_FITZ = False


def images_to_pdf(
    image_paths: List[Union[str, Path]],
    output_pdf_path: Union[str, Path],
    quality: int = 95,
    title: Optional[str] = None
) -> str:
    """
    Converts an ordered list of image file paths into a single PDF document.
    Uses PyMuPDF for maximum speed and lossless embedding if available,
    falling back to Pillow.
    """
    output_pdf_path = Path(output_pdf_path).resolve()
    output_pdf_path.parent.mkdir(parents=True, exist_ok=True)

    if not image_paths:
        raise ValueError("No images provided for PDF generation.")

    valid_images = [Path(p) for p in image_paths if Path(p).is_file()]
    if not valid_images:
        raise FileNotFoundError(f"None of the {len(image_paths)} image files exist on disk.")

    if HAS_FITZ:
        doc = fitz.open()
        for img_path in valid_images:
            try:
                with Image.open(img_path) as img:
                    width, height = img.size
                    rect = fitz.Rect(0, 0, width, height)
                    page = doc.new_page(width=width, height=height)

                    if img_path.suffix.lower() == ".webp" or img.format == "WEBP":
                        # Convert WEBP to RGB buffer for PyMuPDF
                        buf = io.BytesIO()
                        img.convert("RGB").save(buf, format="JPEG", quality=quality)
                        page.insert_image(rect, stream=buf.getvalue())
                    else:
                        page.insert_image(rect, filename=str(img_path))
            except Exception as e:
                # Direct Pillow to PDF page fallback
                with Image.open(img_path) as img:
                    buf = io.BytesIO()
                    img.convert("RGB").save(buf, format="PDF")
                    img_pdf = fitz.open("pdf", buf.getvalue())
                    doc.insert_pdf(img_pdf)
                    img_pdf.close()

        if title:
            doc.set_metadata({"title": title, "creator": "FlipHTML2PDF Free Converter"})

        doc.save(str(output_pdf_path), garbage=4, deflate=True)
        doc.close()
    else:
        # Pillow fallback
        pil_images = []
        for img_path in valid_images:
            img = Image.open(img_path)
            if img.mode != "RGB":
                img = img.convert("RGB")
            pil_images.append(img)

        first_image = pil_images[0]
        remaining_images = pil_images[1:]
        first_image.save(
            str(output_pdf_path),
            save_all=True,
            append_images=remaining_images,
            quality=quality,
            optimize=True
        )

        for img in pil_images:
            img.close()

    return str(output_pdf_path)


def svgs_to_pdf(
    svg_paths_or_strings: List[Union[str, Path]],
    output_pdf_path: Union[str, Path],
    title: Optional[str] = None
) -> str:
    """
    Converts SVG files or SVG XML strings into a PDF.
    """
    output_pdf_path = Path(output_pdf_path).resolve()
    output_pdf_path.parent.mkdir(parents=True, exist_ok=True)

    if not HAS_FITZ:
        raise RuntimeError("PyMuPDF is required for vector SVG to PDF conversion.")

    doc = fitz.open()
    for item in svg_paths_or_strings:
        svg_content = ""
        if isinstance(item, (str, Path)) and os.path.exists(str(item)):
            with open(item, "r", encoding="utf-8", errors="ignore") as f:
                svg_content = f.read()
        else:
            svg_content = str(item)

        svg_doc = fitz.open(stream=svg_content.encode("utf-8"), filetype="svg")
        pdf_bytes = svg_doc.convert_to_pdf()
        svg_pdf = fitz.open("pdf", pdf_bytes)
        doc.insert_pdf(svg_pdf)
        svg_pdf.close()
        svg_doc.close()

    if title:
        doc.set_metadata({"title": title, "creator": "FlipHTML2PDF Free Converter"})

    doc.save(str(output_pdf_path), garbage=4, deflate=True)
    doc.close()
    return str(output_pdf_path)
