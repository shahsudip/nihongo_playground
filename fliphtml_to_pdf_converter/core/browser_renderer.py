"""
Headless browser renderer using Playwright for dynamic HTML Flipbooks,
Turn.js, WebGL/Canvas books, and single-page HTML flip presentations.
"""

import os
import time
import tempfile
import shutil
from pathlib import Path
from typing import Optional, Callable, List
from .pdf_builder import images_to_pdf


def convert_browser_fliphtml(
    target_path_or_url: str,
    output_pdf: Optional[str] = None,
    total_pages: Optional[int] = None,
    page_turn_delay: float = 0.8,
    viewport_width: int = 1600,
    viewport_height: int = 2200,
    progress_callback: Optional[Callable[[int, int, str], None]] = None
) -> str:
    """
    Renders dynamic HTML flipbooks by automating a headless browser (Playwright),
    capturing clean screenshots per page and generating a high-res PDF.
    """
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        raise ImportError("Playwright is required for browser-based rendering. Run: pip install playwright")

    # Format URL / file path
    if os.path.exists(target_path_or_url):
        url = Path(target_path_or_url).resolve().as_uri()
    else:
        url = target_path_or_url

    repo_tmp = Path("tmp_inspect").resolve()
    repo_tmp.mkdir(parents=True, exist_ok=True)
    temp_dir = Path(tempfile.mkdtemp(prefix="fliphtml_browser_", dir=repo_tmp))
    screenshots: List[Path] = []

    try:
        if progress_callback:
            progress_callback(10, 100, "Launching headless browser...")

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                viewport={"width": viewport_width, "height": viewport_height},
                device_scale_factor=2  # High-DPI crisp capture
            )
            page = context.new_page()

            if progress_callback:
                progress_callback(20, 100, "Navigating to flipbook...")

            page.goto(url, wait_until="networkidle", timeout=60000)
            time.sleep(2.0)  # Allow animations / fonts to settle

            # Attempt native print-to-pdf first if supported
            if not total_pages:
                # Try to detect page count from common DOM attributes
                try:
                    count_text = page.evaluate("""() => {
                        const elem = document.querySelector('.total-page, .page-number, [data-total], #totalPage');
                        return elem ? elem.innerText : null;
                    }""")
                    if count_text:
                        digits = [int(s) for s in count_text.split() if s.isdigit()]
                        if digits:
                            total_pages = digits[-1]
                except Exception:
                    pass

            pages_to_capture = total_pages or 50
            if progress_callback:
                progress_callback(30, 100, f"Capturing flipbook pages (up to {pages_to_capture})...")

            for page_idx in range(1, pages_to_capture + 1):
                img_path = temp_dir / f"page_{page_idx:04d}.png"
                page.screenshot(path=str(img_path), full_page=True)
                screenshots.append(img_path)

                if progress_callback:
                    pct = int(30 + (page_idx / pages_to_capture) * 60)
                    progress_callback(pct, 100, f"Captured page {page_idx}/{pages_to_capture}")

                # Send page-turn key or click next button
                page.keyboard.press("ArrowRight")
                time.sleep(page_turn_delay)

            browser.close()

        if not screenshots:
            raise RuntimeError("Failed to capture any page screenshots.")

        if not output_pdf:
            output_pdf = str(Path.cwd() / "FlipBook_Output.pdf")

        if progress_callback:
            progress_callback(95, 100, "Merging captures into PDF...")

        res = images_to_pdf(screenshots, output_pdf)
        if progress_callback:
            progress_callback(100, 100, "PDF created successfully!")
        return res

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
