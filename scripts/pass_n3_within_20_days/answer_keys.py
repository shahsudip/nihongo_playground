from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_INPUT = REPO_ROOT / "tmp_inspect/pass_n3_20_days/ocr-mobile"
DEFAULT_OUTPUT = Path(__file__).with_name("source_answers.json")
FIRST_SOURCE_PAGE = 205
LAST_SOURCE_PAGE = 214
QUESTIONS_PER_DAY = 58

ROW_CENTERS = {
    **dict(
        zip(
            range(1, 26),
            [
                250,
                288,
                326,
                364,
                402,
                440,
                478,
                516,
                630,
                668,
                706,
                744,
                782,
                820,
                934,
                972,
                1010,
                1048,
                1086,
                1124,
                1162,
                1200,
                1238,
                1276,
                1314,
            ],
        )
    ),
    **dict(
        zip(
            range(26, 49),
            [
                247,
                288,
                326,
                364,
                402,
                516,
                554,
                592,
                630,
                668,
                782,
                820,
                858,
                896,
                934,
                972,
                1010,
                1048,
                1086,
                1124,
                1162,
                1200,
                1238,
            ],
        )
    ),
    **dict(zip(range(49, 59), [247, 285, 323, 361, 399, 513, 551, 589, 627, 665])),
}

COLUMN_ANSWER_OFFSETS = ((1, 25, -148), (26, 48, -10), (49, 58, 126))

VISUAL_CORRECTIONS = {
    (1, 50): {
        "answer": 1,
        "reason": "The answer glyph was OCRed as a greater-than sign.",
    },
    (6, 7): {
        "answer": 1,
        "reason": "The answer glyph was omitted by OCR.",
    },
    (10, 50): {
        "answer": 1,
        "reason": "The answer glyph was omitted by OCR.",
    },
}


def center(bbox: list[int]) -> tuple[float, float]:
    return ((bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2)


def load_page(input_dir: Path, page_number: int) -> dict:
    path = input_dir / f"page-{page_number:03d}.json"
    if not path.exists():
        raise FileNotFoundError(f"Missing OCR cache: {path}")
    payload = json.loads(path.read_text(encoding="utf-8"))
    if payload.get("pdfPage") != page_number:
        raise ValueError(f"Unexpected pdfPage in {path}")
    return payload


def find_day_centers(payload: dict, expected_days: tuple[int, int]) -> dict[int, float]:
    centers = {}
    for line in payload["lines"]:
        _, y = center(line["bbox"])
        numbers = re.findall(r"\d+", line["text"])
        if y >= 200 or not numbers:
            continue
        day = int(numbers[0])
        if day in expected_days:
            centers[day] = center(line["bbox"])[0]
    if set(centers) != set(expected_days):
        raise ValueError(
            f"Could not locate day headers {expected_days} on page {payload['pdfPage']}"
        )
    return centers


def answer_x_offset(question: int) -> int:
    for first, last, offset in COLUMN_ANSWER_OFFSETS:
        if first <= question <= last:
            return offset
    raise ValueError(f"Invalid question number: {question}")


def extract_ocr_answer(payload: dict, day_center: float, question: int) -> int:
    expected_x = day_center + answer_x_offset(question)
    expected_y = ROW_CENTERS[question]
    hits = []
    for line in payload["lines"]:
        x, y = center(line["bbox"])
        if expected_x - 58 <= x <= expected_x + 28 and abs(y - expected_y) <= 21:
            if re.search(r"\d", line["text"]):
                hits.append((x, y, line["text"]))

    if not hits:
        raise ValueError(
            f"No OCR row found for day {day_from_page(payload, day_center)}, "
            f"question {question}"
        )

    closest_distance = min(abs(hit[1] - expected_y) for hit in hits)
    row_hits = [
        hit for hit in hits if abs(hit[1] - expected_y) <= closest_distance + 10
    ]
    row_text = "".join(hit[2] for hit in sorted(row_hits))
    digits = re.findall(r"[1-4]", row_text)
    if not digits:
        raise ValueError(f"OCR did not produce an answer for question {question}")
    return int(digits[-1])


def day_from_page(payload: dict, day_center: float) -> int:
    page_index = payload["pdfPage"] - FIRST_SOURCE_PAGE
    return page_index * 2 + (1 if day_center < payload["imageSize"][0] / 2 else 2)


def extract(input_dir: Path) -> dict:
    days = []
    applied_corrections = []
    source_hashes = set()

    for page_number in range(FIRST_SOURCE_PAGE, LAST_SOURCE_PAGE + 1):
        payload = load_page(input_dir, page_number)
        source_hashes.add(payload["sourceSha256"])
        first_day = (page_number - FIRST_SOURCE_PAGE) * 2 + 1
        expected_days = (first_day, first_day + 1)
        day_centers = find_day_centers(payload, expected_days)

        for day in expected_days:
            answers = []
            for question in range(1, QUESTIONS_PER_DAY + 1):
                correction = VISUAL_CORRECTIONS.get((day, question))
                if correction:
                    answer = correction["answer"]
                    applied_corrections.append(
                        {
                            "day": day,
                            "question": question,
                            "answer": answer,
                            "reason": correction["reason"],
                        }
                    )
                else:
                    answer = extract_ocr_answer(payload, day_centers[day], question)
                answers.append(answer)

            days.append(
                {
                    "day": day,
                    "pdfPage": page_number,
                    "answers": answers,
                }
            )

    if len(source_hashes) != 1:
        raise ValueError("OCR caches do not share one source PDF hash")

    result = {
        "bookId": "pass-n3-within-20-days",
        "sourcePdfSha256": source_hashes.pop(),
        "sourcePages": [FIRST_SOURCE_PAGE, LAST_SOURCE_PAGE],
        "days": days,
        "visualCorrections": applied_corrections,
        "summary": {
            "dayCount": len(days),
            "questionsPerDay": QUESTIONS_PER_DAY,
            "answerCount": sum(len(day["answers"]) for day in days),
        },
    }
    validate(result)
    return result


def validate(result: dict) -> None:
    days = result["days"]
    if [day["day"] for day in days] != list(range(1, 21)):
        raise ValueError("Expected sequential days 1 through 20")
    for day in days:
        answers = day["answers"]
        if len(answers) != QUESTIONS_PER_DAY:
            raise ValueError(
                f"Day {day['day']} has {len(answers)} answers, expected 58"
            )
        invalid = [answer for answer in answers if answer not in (1, 2, 3, 4)]
        if invalid:
            raise ValueError(f"Day {day['day']} has invalid answers: {invalid}")
    if result["summary"]["answerCount"] != 1160:
        raise ValueError("Expected exactly 1160 answers")


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract answer keys from OCR caches.")
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    result = extract(args.input)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(
        "validated: "
        f"{result['summary']['dayCount']} days, "
        f"{result['summary']['questionsPerDay']} answers per day, "
        f"{result['summary']['answerCount']} answers total"
    )


if __name__ == "__main__":
    main()
