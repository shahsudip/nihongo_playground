"""
Online FlipHTML / FlipHTML5 downloader and PDF generator.
Handles standard FlipHTML manifests, legacy numeric image schemes, and modern
obfuscated / WebAssembly-protected FlipHTML5 books with automatic extraction.
"""

import os
import re
import shutil
import tempfile
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Optional, Callable, List, Tuple
import requests

from .pdf_builder import images_to_pdf

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,ja;q=0.8",
}


def normalize_fliphtml_url(url: str) -> str:
    """Ensures URL ends with a trailing slash or directory path and removes hash fragments."""
    # Strip hash fragments like #p=1
    url = url.split("#")[0]
    parsed = urllib.parse.urlparse(url.strip())
    path = parsed.path
    if path.endswith(".html") or path.endswith(".htm"):
        path = path.rsplit("/", 1)[0]
    if not path.endswith("/"):
        path += "/"
    return urllib.parse.urlunparse((parsed.scheme, parsed.netloc, path, "", "", ""))


def extract_pages_via_browser(url: str) -> Tuple[List[str], Optional[str]]:
    """
    Extracts page image URLs and book title using a headless browser
    to resolve FlipHTML5 WebAssembly/JS deobfuscation.
    """
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        return [], None

    page_urls = []
    book_title = None

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(user_agent=HEADERS["User-Agent"])
            page = context.new_page()

            page.goto(url, wait_until="load", timeout=45000)
            # Wait up to 5 seconds for WebAssembly runtime and fliphtml5_pages to populate
            for _ in range(10):
                page.wait_for_timeout(500)
                extracted = page.evaluate("""() => {
                    let title = document.title || (window.bookConfig ? window.bookConfig.bookTitle : null);
                    let pages = [];
                    if (window.fliphtml5_pages && Array.isArray(window.fliphtml5_pages)) {
                        pages = window.fliphtml5_pages.map(p => p.n || p.l || p.t || p.p);
                    } else if (window.slideBook && window.slideBook.pages) {
                        pages = window.slideBook.pages.map(p => p.n || p.url);
                    }
                    return { title: title, pages: pages };
                }""")
                if extracted and extracted.get("pages") and len(extracted["pages"]) > 0:
                    book_title = extracted.get("title")
                    raw_pages = extracted["pages"]
                    base = page.url.split("#")[0]
                    if not base.endswith("/"):
                        base = base.rsplit("/", 1)[0] + "/"
                    for p_url in raw_pages:
                        if p_url:
                            full_url = urllib.parse.urljoin(base, p_url)
                            page_urls.append(full_url)
                    break

            browser.close()
    except Exception as e:
        print(f"Browser extraction note: {e}")

    return page_urls, book_title


def download_single_image(
    idx: int,
    img_url: str,
    save_dir: Path,
    session: requests.Session
) -> Optional[Path]:
    """Downloads a single image from direct URL."""
    # Determine extension
    parsed = urllib.parse.urlparse(img_url)
    ext = Path(parsed.path).suffix or ".jpg"
    dest_file = save_dir / f"page_{idx:04d}{ext}"

    try:
        resp = session.get(img_url, headers=HEADERS, timeout=20)
        if resp.status_code == 200 and len(resp.content) > 100:
            if not (resp.content.startswith(b"<!DOCTYPE") or resp.content.startswith(b"<html")):
                dest_file.write_bytes(resp.content)
                return dest_file
    except Exception:
        pass
    return None


def convert_online_fliphtml(
    url: str,
    output_pdf: Optional[str] = None,
    max_workers: int = 16,
    progress_callback: Optional[Callable[[int, int, str], None]] = None
) -> str:
    """
    Downloads an online FlipHTML publication and creates a PDF.
    """
    clean_url = normalize_fliphtml_url(url)
    session = requests.Session()

    if progress_callback:
        progress_callback(5, 100, "Inspecting FlipHTML book manifest...")

    # Method 1: Extract via headless browser deobfuscation
    page_urls, book_title = extract_pages_via_browser(clean_url)

    # Keep temp downloads strictly inside the repository tmp_inspect folder
    repo_tmp = Path("tmp_inspect").resolve()
    repo_tmp.mkdir(parents=True, exist_ok=True)
    temp_dir = Path(tempfile.mkdtemp(prefix="fliphtml_", dir=repo_tmp))
    downloaded_files: List[Path] = []

    try:
        if page_urls:
            total_pages = len(page_urls)
            if progress_callback:
                progress_callback(15, 100, f"Found {total_pages} pages. Downloading in parallel...")

            with ThreadPoolExecutor(max_workers=max_workers) as executor:
                futures = {
                    executor.submit(download_single_image, i + 1, p_url, temp_dir, session): i
                    for i, p_url in enumerate(page_urls)
                }

                completed_count = 0
                for future in as_completed(futures):
                    res = future.result()
                    if res:
                        downloaded_files.append(res)
                    completed_count += 1
                    pct = int(15 + (completed_count / total_pages) * 75)
                    if progress_callback:
                        progress_callback(pct, 100, f"Downloaded {completed_count}/{total_pages} pages")
        else:
            # Fallback Method 2: Sequential URL probing
            candidate_folders = ["files/large", "files/mobile", "files/pages", "files/shot"]
            best_folder = "files/large"
            for folder in candidate_folders:
                test_url = urllib.parse.urljoin(clean_url, f"{folder}/1.jpg")
                try:
                    r = session.get(test_url, headers=HEADERS, timeout=5)
                    if r.status_code == 200 and len(r.content) > 100:
                        best_folder = folder
                        break
                except Exception:
                    pass

            page_num = 1
            consecutive_failures = 0
            while consecutive_failures < 3 and page_num <= 1000:
                img_url = urllib.parse.urljoin(clean_url, f"{best_folder}/{page_num}.jpg")
                res = download_single_image(page_num, img_url, temp_dir, session)
                if res:
                    downloaded_files.append(res)
                    consecutive_failures = 0
                    if progress_callback:
                        progress_callback(10 + (page_num % 80), 100, f"Downloaded page {page_num}")
                else:
                    consecutive_failures += 1
                page_num += 1

        if not downloaded_files:
            raise RuntimeError(
                f"Could not download any pages from {url}. "
                "The flipbook might be private or unreachable."
            )

        # Sort downloaded files naturally by page number
        downloaded_files.sort(key=lambda x: x.name)

        if not output_pdf:
            safe_title = re.sub(r'[\\/*?:"<>|]', "_", book_title or "FlipHTML_Book").strip()
            # If title is generic, include domain path
            if safe_title in ["fliphtml5", "FlipHTML5", ""]:
                safe_title = "FlipHTML5_" + clean_url.strip("/").split("/")[-1]
            output_pdf = str(Path.cwd() / f"{safe_title}.pdf")
        else:
            output_pdf = str(Path(output_pdf).resolve())

        if progress_callback:
            progress_callback(92, 100, f"Compiling {len(downloaded_files)} pages into high-res PDF...")

        result_pdf = images_to_pdf(downloaded_files, output_pdf, title=book_title)

        if progress_callback:
            progress_callback(100, 100, f"Complete! Saved to {Path(result_pdf).name}")

        return result_pdf

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
