#!/usr/bin/env python3
"""
Grow with Kitty - JLPT N2 Complete High-Fidelity Crawler

Outputs in this folder:
  - jlpt_n2_grammar.json (All 25 lessons, 172 grammar points, formulas, explanations, Nepali structures, quizzes)
  - jlpt_n2_vocabulary_core.json (All 49 themes, ~130 parts, all 3,117 words with kanji, kana, romaji, en, ne, audio links)
  - jlpt_n2_vocabulary.json (All 3,117 words enriched with stroke order, frequency, and full example sentences)

Usage:
  python crawl_kitty_n2.py              # Runs full pipeline: Grammar -> Core Vocab -> Detail Enrichment
  python crawl_kitty_n2.py --grammar    # Only grammar (25 lessons, 172 points)
  python crawl_kitty_n2.py --vocab-core # Only core vocabulary from 49 themes (~130 pages)
  python crawl_kitty_n2.py --vocab-full # Only enrich vocabulary detail pages (resumable)
"""

from __future__ import annotations

import argparse
import json
import os
import random
import re
import sys
import time
import functools
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup, Tag
from tqdm import tqdm

# Force stdout to UTF-8 on Windows and unbuffered print
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")
print = functools.partial(print, flush=True)


# ============================================================
# CONFIGURATION
# ============================================================

BASE_URL = "https://growwithkitty.com"
N2_BASE = f"{BASE_URL}/jlpt/n2"
VOCAB_INDEX = f"{N2_BASE}/vocabulary"
GRAMMAR_INDEX = f"{N2_BASE}/grammar"

SCRIPT_DIR = Path(__file__).resolve().parent
GRAMMAR_OUTPUT = SCRIPT_DIR / "jlpt_n2_grammar.json"
VOCAB_CORE_OUTPUT = SCRIPT_DIR / "jlpt_n2_vocabulary_core.json"
VOCAB_FULL_OUTPUT = SCRIPT_DIR / "jlpt_n2_vocabulary.json"
VOCAB_CHECKPOINT = SCRIPT_DIR / "jlpt_n2_vocabulary_checkpoint.json"

EXPECTED_VOCABULARY = 3117
EXPECTED_THEMES = 49
EXPECTED_GRAMMAR_LESSONS = 25
EXPECTED_GRAMMAR_POINTS = 172

REQUEST_DELAY_MIN = 0.2
REQUEST_DELAY_MAX = 0.5
TIMEOUT = 25
MAX_RETRIES = 5

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36 "
        "GrowWithKitty-Study-Crawler/2.0"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,ja;q=0.8",
}

session = requests.Session()
session.headers.update(HEADERS)


# ============================================================
# UTILITIES
# ============================================================

def polite_sleep(min_s=REQUEST_DELAY_MIN, max_s=REQUEST_DELAY_MAX):
    time.sleep(random.uniform(min_s, max_s))


def clean_text(val) -> str:
    if val is None:
        return ""
    if isinstance(val, Tag):
        val = val.get_text(" ", strip=True)
    val = str(val)
    val = re.sub(r"\s+", " ", val)
    return val.strip()


def fetch(url: str, s: requests.Session = session) -> str:
    last_err = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = s.get(url, timeout=TIMEOUT)
            if resp.status_code == 429:
                wait_sec = 4 * attempt
                print(f"\n[!] 429 Rate Limit for {url} - waiting {wait_sec}s...")
                time.sleep(wait_sec)
                continue
            resp.raise_for_status()
            return resp.text
        except Exception as exc:
            last_err = exc
            if attempt < MAX_RETRIES:
                time.sleep(1.5 * attempt)
    raise RuntimeError(f"Failed to fetch {url} after {MAX_RETRIES} attempts: {last_err}")


# ============================================================
# GRAMMAR EXTRACTION
# ============================================================

def extract_grammar_point_page(url: str, point_id: str, lesson_num: int, point_slug: str) -> dict:
    html = fetch(url)
    soup = BeautifulSoup(html, "lxml")

    # Header
    h1 = soup.find("h1")
    title_text = ""
    romaji_text = ""
    meaning_en = ""
    if h1:
        ja_span = h1.select_one("span[lang='ja']")
        title_text = clean_text(ja_span) if ja_span else clean_text(h1)
        romaji_span = h1.select_one(".text-ink-faint")
        romaji_text = clean_text(romaji_span).strip("()") if romaji_span else ""
        en_span = h1.find(lambda t: t.name == "span" and "—" in t.get_text())
        if en_span:
            meaning_en = clean_text(en_span).lstrip("—").strip()

    summary_el = soup.select_one("header p.text-ink-soft")
    summary = clean_text(summary_el) if summary_el else ""

    # Formula / Rules
    formula_rules = []
    for r in soup.select(".rule-row"):
        label = r.select_one(".rule-label")
        text = r.select_one(".rule-text")
        formula_rules.append({
            "label": clean_text(label),
            "rule": clean_text(text)
        })

    # Explanation
    explanation = ""
    for sec in soup.find_all("section"):
        h2 = sec.find("h2")
        if h2 and "Grammar rule" in h2.get_text():
            p = sec.find("p")
            if p:
                explanation = clean_text(p)
            break

    # Examples
    examples = []
    ex_sec = None
    for sec in soup.find_all("section"):
        h2 = sec.find("h2")
        if h2 and "Examples" in h2.get_text():
            ex_sec = sec
            break

    if ex_sec:
        for card in ex_sec.select(".rounded-2xl"):
            ja_p = card.select_one(".text-lang-ja")
            kana_p = card.find("p", class_="text-sm text-ink-soft", lang="ja")
            sbs_el = card.select_one(".gp-sbs-text")

            # English text is in a p that has text-ink-soft but not lang="ja"
            en_p = None
            for p in card.find_all("p"):
                classes = p.get("class", [])
                if "text-ink-soft" in classes and p.get("lang") != "ja" and not p.select_one(".gp-sbs-text"):
                    en_p = p
                    break

            parts = []
            for ep in card.select(".epart"):
                parts.append({
                    "text": clean_text(ep),
                    "role": " ".join([c for c in ep.get("class", []) if c.startswith("role-")])
                })

            if ja_p:
                examples.append({
                    "japanese": clean_text(ja_p),
                    "reading": clean_text(kana_p) if kana_p else "",
                    "english": clean_text(en_p) if en_p else "",
                    "structure_nepali": clean_text(sbs_el) if sbs_el else "",
                    "parts": parts
                })

    # Quiz / Knowledge check
    quiz_questions = []
    for q in soup.select(".gp-q"):
        prompt = q.select_one("p.font-semibold")
        options = [clean_text(opt) for opt in q.select(".gp-opt")]
        ans = q.get("data-answer")
        hint = q.select_one(".gp-hint")
        exp = q.select_one(".gp-exp")
        quiz_questions.append({
            "prompt": clean_text(prompt),
            "options": options,
            "answer_index": int(ans) if ans is not None and ans.isdigit() else None,
            "hint": clean_text(hint),
            "explanation": clean_text(exp)
        })

    return {
        "point_id": point_id,
        "point_slug": point_slug,
        "url": url,
        "title": title_text,
        "romaji": romaji_text,
        "meaning_en": meaning_en,
        "summary": summary,
        "formula": formula_rules,
        "explanation": explanation,
        "examples": examples,
        "quiz": quiz_questions,
    }


def crawl_grammar() -> dict:
    print("\n[STAGE 1/3] Crawling Grammar Lessons and Points...")
    index_html = fetch(GRAMMAR_INDEX)
    soup = BeautifulSoup(index_html, "lxml")

    # Discover lesson stops
    stops = soup.find_all("div", class_="stop")
    print(f"[*] Discovered {len(stops)} grammar lessons on roadmap.")

    lessons = []
    total_points_crawled = 0

    for s in stops:
        slug = s.get("data-slug")
        if not slug or not slug.startswith("lesson-"):
            continue

        lesson_num_match = re.search(r"lesson-(\d+)", slug)
        lesson_num = int(lesson_num_match.group(1)) if lesson_num_match else len(lessons) + 1
        lesson_url = f"{N2_BASE}/grammar/{slug}"

        print(f"\n--- Fetching Lesson {lesson_num}: {slug} ---")
        try:
            lesson_html = fetch(lesson_url)
            l_soup = BeautifulSoup(lesson_html, "lxml")

            # Lesson title
            h1 = l_soup.find("h1")
            lesson_title = clean_text(h1) if h1 else slug

            # Lesson check quiz (8 questions on the lesson page)
            lesson_quiz = []
            for q in l_soup.select(".lq-q"):
                prompt = q.select_one("p.font-semibold")
                opts = [clean_text(opt) for opt in q.select(".gp-opt")]
                ans = q.get("data-answer")
                exp = q.select_one(".lq-exp")
                hint = q.find(lambda t: t.name in ["span", "p"] and "font-semibold" in t.get("class", []) and "Hint" in t.get_text())
                hint_text = clean_text(hint.parent) if hint and hint.parent else ""

                lesson_quiz.append({
                    "prompt": clean_text(prompt),
                    "options": opts,
                    "answer_index": int(ans) if ans is not None and ans.isdigit() else None,
                    "hint": hint_text,
                    "explanation": clean_text(exp)
                })

            # Grammar point links in this lesson
            point_links = []
            for a in l_soup.select(".gp-lesson li a.gp-prow"):
                href = a.get("href", "")
                point_id = a.get("data-point-id", "")
                if href:
                    point_slug = href.rstrip("/").split("/")[-1]
                    point_url = urljoin(BASE_URL, href)
                    point_links.append((point_url, point_id, point_slug))

            print(f"    Discovered {len(point_links)} grammar point subpages.")

            # Crawl each grammar point
            points = []
            for p_url, p_id, p_slug in point_links:
                try:
                    pt_data = extract_grammar_point_page(p_url, p_id, lesson_num, p_slug)
                    points.append(pt_data)
                    total_points_crawled += 1
                    print(f"    [+] {p_slug}: {pt_data['title']} ({len(pt_data['examples'])} ex, {len(pt_data['quiz'])} quiz)")
                except Exception as ex:
                    print(f"    [!] Error crawling grammar point {p_url}: {ex}")
                    points.append({"url": p_url, "point_id": p_id, "error": str(ex)})
                polite_sleep()

            lessons.append({
                "lesson_number": lesson_num,
                "lesson_slug": slug,
                "url": lesson_url,
                "title": lesson_title,
                "lesson_quiz": lesson_quiz,
                "point_count": len(points),
                "points": points
            })

        except Exception as ex:
            print(f"[!] Error fetching lesson {lesson_url}: {ex}")
            lessons.append({"lesson_number": lesson_num, "lesson_slug": slug, "error": str(ex)})

        polite_sleep()

    result = {
        "source": BASE_URL,
        "level": "N2",
        "dataset": "grammar",
        "total_lessons": len(lessons),
        "total_points": total_points_crawled,
        "lessons": lessons
    }

    with open(GRAMMAR_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    # Also save to src/data/n2_kitty_grammar.json matching N3 structure
    src_data_grammar = Path("src/data/n2_kitty_grammar.json")
    if src_data_grammar.parent.exists():
        flat_grammar = []
        for l in lessons:
            for p in l.get("points", []):
                flat_grammar.append({
                    "lesson": l.get("lesson_slug", ""),
                    "url": p.get("url", ""),
                    "title": p.get("title", ""),
                    "meaning_en": p.get("meaning_en", ""),
                    "point_id": p.get("point_id", "")
                })
        with open(src_data_grammar, "w", encoding="utf-8") as f:
            json.dump(flat_grammar, f, ensure_ascii=False, indent=2)
        print(f"[DONE] Synced grammar list to {src_data_grammar} ({len(flat_grammar)} points)")

    print(f"\n[DONE] Saved grammar data to {GRAMMAR_OUTPUT} ({len(lessons)} lessons, {total_points_crawled} points)")
    return result


# ============================================================
# VOCABULARY CORE EXTRACTION (THEMES & PARTS)
# ============================================================

def discover_themes() -> list[dict]:
    print("\n[STAGE 2/3] Discovering Vocabulary Themes from Index...")
    html = fetch(VOCAB_INDEX)
    soup = BeautifulSoup(html, "lxml")

    themes = []
    # Extract themes from JSON-LD schema
    for script in soup.find_all("script", type="application/ld+json"):
        text = script.string or script.get_text()
        if "itemListElement" in text:
            try:
                data = json.loads(text)
                for item in data.get("itemListElement", []):
                    theme_url = item.get("url")
                    theme_name = item.get("name", "")
                    if theme_url:
                        slug = theme_url.rstrip("/").split("/")[-1]
                        themes.append({
                            "name": theme_name,
                            "slug": slug,
                            "url": theme_url
                        })
            except Exception:
                pass

    if not themes:
        # Fallback to links
        for a in soup.find_all("a", href=True):
            href = a["href"]
            if href.startswith("/jlpt/n2/") and href not in {"/jlpt/n2/vocabulary", "/jlpt/n2/grammar"}:
                slug = href.strip("/").split("/")[-1]
                full_url = urljoin(BASE_URL, href)
                if not any(t["slug"] == slug for t in themes):
                    themes.append({
                        "name": clean_text(a),
                        "slug": slug,
                        "url": full_url
                    })

    print(f"[*] Discovered {len(themes)} vocabulary themes (Expected: {EXPECTED_THEMES}).")
    return themes


def crawl_theme_words(theme: dict) -> list[dict]:
    theme_words = []
    theme_url = theme["url"]

    # 1. Fetch Part 1
    html = fetch(theme_url)
    soup = BeautifulSoup(html, "lxml")

    # Discover all part links for this theme
    part_urls = [theme_url]
    for a in soup.select("ol.vparts-row a.vpart"):
        href = a.get("href")
        if href:
            p_url = urljoin(BASE_URL, href)
            if p_url not in part_urls:
                part_urls.append(p_url)

    # Theme names
    h1 = soup.find("h1")
    theme_title = clean_text(h1) if h1 else theme["name"]
    ja_title_el = soup.select_one("span.text-lang-ja")
    ja_title = clean_text(ja_title_el) if ja_title_el else ""
    ne_title_el = soup.select_one("span.text-lang-ne")
    ne_title = clean_text(ne_title_el) if ne_title_el else ""

    # Parse each part
    for part_idx, p_url in enumerate(part_urls, start=1):
        if part_idx > 1:
            html = fetch(p_url)
            soup = BeautifulSoup(html, "lxml")
            polite_sleep()

        rows = soup.select("li.row")
        for row in rows:
            word_id = row.get("data-id", "")
            audio_btn = row.select_one("button.audio")
            audio_rel = audio_btn.get("data-audio", "") if audio_btn else ""
            audio_url = urljoin(BASE_URL, audio_rel) if audio_rel else ""

            kana_el = row.select_one(".col-ja span.block")
            kanji_el = row.select_one(".col-ja span.text-lang-ja")
            romaji_el = row.select_one(".col-ja span.ml-2")

            en_el = row.select_one(".col-en")
            ne_el = row.select_one(".col-ne")

            link_el = row.find("a", href=lambda h: h and "/jlpt/n2/w/" in h)
            detail_url = urljoin(BASE_URL, link_el.get("href")) if link_el else ""

            kana = clean_text(kana_el)
            kanji = clean_text(kanji_el) or kana
            romaji = clean_text(romaji_el)
            english = clean_text(en_el)
            nepali = clean_text(ne_el)

            theme_words.append({
                "id": word_id,
                "page_url": p_url,
                "theme_slug": theme["slug"],
                "theme_name": theme_title,
                "theme_name_ja": ja_title,
                "theme_name_ne": ne_title,
                "part": part_idx,
                "kanji": kanji,
                "kana": kana,
                "romaji": romaji,
                "english": english,
                "nepali": nepali,
                "audioUrl": audio_url,
                "audio_url": audio_url,
                "detailUrl": detail_url,
                "detail_url": detail_url
            })

    return theme_words


def crawl_vocabulary_core() -> list[dict]:
    themes = discover_themes()
    all_words = []

    print("\nCrawling all themes and parts for core vocabulary...")
    for idx, theme in enumerate(tqdm(themes, desc="Themes", unit="theme"), start=1):
        try:
            words = crawl_theme_words(theme)
            all_words.extend(words)
        except Exception as ex:
            print(f"\n[!] Error crawling theme {theme['slug']}: {ex}")
        polite_sleep()

    # Deduplicate by id
    unique_words = []
    seen_ids = set()
    for w in all_words:
        wid = w["id"] or w["detail_url"]
        if wid not in seen_ids:
            seen_ids.add(wid)
            unique_words.append(w)

    result = {
        "source": BASE_URL,
        "level": "N2",
        "dataset": "vocabulary_core",
        "expected_count": EXPECTED_VOCABULARY,
        "discovered_count": len(unique_words),
        "themes_count": len(themes),
        "records": unique_words
    }

    with open(VOCAB_CORE_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    # Also save directly to src/data/n2_kitty_vocab.json matching N3 format
    src_data_vocab = Path("src/data/n2_kitty_vocab.json")
    if src_data_vocab.parent.exists():
        with open(src_data_vocab, "w", encoding="utf-8") as f:
            json.dump(unique_words, f, ensure_ascii=False, indent=2)
        print(f"[DONE] Synced core vocabulary to {src_data_vocab} ({len(unique_words)} words)")

    print(f"\n[DONE] Saved core vocabulary to {VOCAB_CORE_OUTPUT} ({len(unique_words)} words)")
    return unique_words


# ============================================================
# VOCABULARY DETAIL ENRICHMENT (EXAMPLES & STROKES)
# ============================================================

def enrich_word_detail(word: dict, s: requests.Session) -> dict:
    url = word.get("detail_url")
    if not url:
        return word

    try:
        html = fetch(url, s=s)
        soup = BeautifulSoup(html, "lxml")

        # Frequency stars
        freq_stars = 0
        freq_label = ""
        freq_p = soup.select_one("header p.text-ink-soft")
        if freq_p:
            stars_span = freq_p.select_one(".tracking-tight")
            if stars_span:
                # Count filled stars (outside text-border-strong)
                filled = [c for c in stars_span.contents if isinstance(c, str) and "★" in c]
                freq_stars = sum(c.count("★") for c in filled)
            label_span = freq_p.find(lambda t: t.name == "span" and not t.get("class"))
            if label_span:
                freq_label = clean_text(label_span)

        # Examples
        examples = []
        for li in soup.select("section ol li"):
            ja_p = li.select_one("p.ex-ja")
            ne_p = li.select_one("p.text-lang-ne")
            audio_btn = li.select_one("button.audio")
            if ja_p:
                examples.append({
                    "japanese": clean_text(ja_p),
                    "nepali": clean_text(ne_p) if ne_p else "",
                    "speak": audio_btn.get("data-speak", "") if audio_btn else ""
                })

        # Kanji Stroke Counts
        kanji_strokes = []
        for fig in soup.select("figure.stroke-order"):
            char_el = fig.select_one(".so-char")
            count_el = fig.select_one(".so-count")
            if char_el:
                strokes_match = re.search(r"\d+", clean_text(count_el))
                stroke_num = int(strokes_match.group(0)) if strokes_match else None
                kanji_strokes.append({
                    "character": clean_text(char_el),
                    "stroke_count": stroke_num
                })

        enriched = dict(word)
        enriched["frequency_stars"] = freq_stars
        enriched["frequency_label"] = freq_label
        enriched["kanji_strokes"] = kanji_strokes
        enriched["examples"] = examples
        return enriched

    except Exception as ex:
        enriched = dict(word)
        enriched["detail_error"] = str(ex)
        return enriched


def crawl_vocabulary_full(core_words: list[dict] = None) -> list[dict]:
    print("\n[STAGE 3/3] Enriching Vocabulary with Details (Examples & Stroke counts)...")

    # Load core words if not passed
    if not core_words:
        if VOCAB_CORE_OUTPUT.exists():
            with open(VOCAB_CORE_OUTPUT, "r", encoding="utf-8") as f:
                data = json.load(f)
                core_words = data.get("records", [])
        else:
            core_words = crawl_vocabulary_core()

    # Load checkpoint if exists
    enriched_dict = {}
    if VOCAB_CHECKPOINT.exists():
        try:
            with open(VOCAB_CHECKPOINT, "r", encoding="utf-8") as f:
                saved = json.load(f)
                for item in saved:
                    enriched_dict[item["id"]] = item
            print(f"[*] Resumed from checkpoint: {len(enriched_dict)}/{len(core_words)} words already processed.")
        except Exception as ex:
            print(f"[!] Could not load checkpoint: {ex}")

    total_words = len(core_words)
    words_to_process = [w for w in core_words if w["id"] not in enriched_dict]

    print(f"[*] Remaining words to enrich: {len(words_to_process)} (using polite connection pool)...")

    # Multithreaded polite crawler (3 threads with randomized delays to avoid rate limits)
    pbar = tqdm(total=total_words, initial=len(enriched_dict), desc="Detail Enrichment", unit="word")
    checkpoint_counter = 0

    thread_session = requests.Session()
    thread_session.headers.update(HEADERS)

    def worker(w):
        polite_sleep(REQUEST_DELAY_MIN, REQUEST_DELAY_MAX)
        return enrich_word_detail(w, thread_session)

    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(worker, w): w for w in words_to_process}
        for future in as_completed(futures):
            try:
                res = future.result()
                enriched_dict[res["id"]] = res
            except Exception as ex:
                orig = futures[future]
                enriched_dict[orig["id"]] = orig

            pbar.update(1)
            checkpoint_counter += 1

            if checkpoint_counter >= 100:
                # Save checkpoint
                with open(VOCAB_CHECKPOINT, "w", encoding="utf-8") as cf:
                    json.dump(list(enriched_dict.values()), cf, ensure_ascii=False)
                checkpoint_counter = 0

    pbar.close()

    # Reassemble in original order
    final_records = [enriched_dict.get(w["id"], w) for w in core_words]

    final_result = {
        "source": BASE_URL,
        "level": "N2",
        "dataset": "vocabulary",
        "total_words": len(final_records),
        "records": final_records
    }

    with open(VOCAB_FULL_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(final_result, f, ensure_ascii=False, indent=2)

    print(f"\n[DONE] Saved complete enriched vocabulary to {VOCAB_FULL_OUTPUT} ({len(final_records)} words)")
    return final_records


# ============================================================
# MAIN
# ============================================================

def main():
    parser = argparse.ArgumentParser(description="Grow with Kitty JLPT N2 Complete Crawler")
    parser.add_argument("--grammar", action="store_true", help="Crawl grammar only")
    parser.add_argument("--vocab-core", action="store_true", help="Crawl core vocabulary from themes only")
    parser.add_argument("--vocab-full", action="store_true", help="Enrich vocabulary detail pages only")
    parser.add_argument("--all", action="store_true", help="Run full pipeline (grammar + core vocab + detail enrichment)")

    args = parser.parse_args()

    # Default to running all if no flags specified
    if not (args.grammar or args.vocab_core or args.vocab_full or args.all):
        args.all = True

    print("=" * 60)
    print(" GROW WITH KITTY - JLPT N2 PRECISE CRAWLER")
    print("=" * 60)
    print(f"Output directory: {SCRIPT_DIR.resolve()}")

    if args.grammar or args.all:
        crawl_grammar()

    if args.vocab_core or args.all:
        core_words = crawl_vocabulary_core()
    else:
        core_words = None

    if args.vocab_full or args.all:
        crawl_vocabulary_full(core_words)

    print("\n" + "=" * 60)
    print(" ALL CRAWLING TASKS FINISHED SUCCESSFULLY")
    print("=" * 60)


if __name__ == "__main__":
    main()
