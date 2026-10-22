import copy
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
APP_DATA_PATH = ROOT / "src" / "data" / "practice_sets_data.js"
FIREBASE_DUMP_PATH = ROOT / "15 practice sets to firebase" / "fixed_firebase_dump.json"
REPORT_PATH = ROOT / "tmp_inspect" / "chokuzen_n3_set5" / "set5_audit_report.json"

VOCABULARY_ANSWERS = [
    4, 1, 3, 3, 2, 3, 2, 1,
    4, 1, 1, 4, 2, 3,
    2, 3, 4, 1, 3, 1, 2, 3, 3, 2, 4,
    3, 4, 2, 3, 1,
    4, 2, 3, 2, 4,
]

GRAMMAR_ANSWERS = [
    2, 1, 3, 1, 2, 2, 4, 4, 1, 2, 4, 4, 3,
    4, 3, 1, 2, 4,
    2, 3, 3, 4, 2,
]

UNDERLINED_SYNONYM_STEMS = [
    "あの子どもは、水泳が<u>うまい</u>。",
    "両親は、今、<u>留守</u>にしています。",
    "お皿を<u>さげて</u>ください。",
    "私の父は<u>温厚</u>だ。",
    "彼の話し方はいつも<u>皮肉</u>だ。",
]


def load_app_data():
    source = APP_DATA_PATH.read_text(encoding="utf-8")
    prefix = "export const practiceSetsBook = "
    if not source.startswith(prefix) or not source.rstrip().endswith(";"):
        raise ValueError("Unexpected practice_sets_data.js wrapper")
    payload = source[len(prefix):].rstrip()[:-1]
    return json.loads(payload)


def write_app_data(data):
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    APP_DATA_PATH.write_text(
        f"export const practiceSetsBook = {payload};\n",
        encoding="utf-8",
        newline="\n",
    )


def get_set(data, set_id):
    return next(item for item in data["sets"] if item["id"] == set_id)


def repair_set5(set_data):
    vocabulary = set_data["sections"]["vocabulary-kanji"]["questions"]
    grammar = set_data["sections"]["grammar-reading"]["questions"]

    for offset, question_text in enumerate(UNDERLINED_SYNONYM_STEMS, start=25):
        vocabulary[offset]["questionText"] = question_text

    vocabulary[30]["explanation"] = vocabulary[30]["explanation"].replace(
        "集中（しゅうちょう）する", "集中（しゅうちゅう）する"
    )

    passage = grammar[18]["passageText"].replace("長い間読んでできた", "長い間読んできた")
    for question in grammar[18:23]:
        question["passageText"] = passage
        question.pop("imageSrc", None)

    grammar[18]["explanation"] = (
        "【正解】2（に限らず）\n"
        "【文脈】「日本語の新聞に限らず、英字新聞も読むようにしています。」\n"
        "【解説】「Aに限らずBも」は、対象がAだけではなくBにも及ぶことを表します。\n"
        "【英訳】not only Japanese newspapers but also English-language newspapers"
    )
    grammar[20]["explanation"] = (
        "【正解】3（考えられません）\n"
        "【文脈】「新聞を読むのが大好きな私にとって、古い新聞を捨てるということは考えられません。」\n"
        "【解説】可能形の否定「考えられません」は、捨てることが想像もできないという強い気持ちを表します。\n"
        "【英訳】I cannot imagine throwing away old newspapers."
    )
    grammar[21]["correctIndex"] = 3
    grammar[21]["explanation"] = (
        "【正解】4（とうとう）\n"
        "【文脈】「そのためいろいろやってみて、最近とうとうこの問題を解決する方法を見つけました。」\n"
        "【解説】「とうとう」は、長い経過の末に最終的な結果に達したことを表します。\n"
        "【英訳】finally / at last"
    )
    grammar[22]["options"][3] = grammar[22]["options"][3].replace(" 最終", "")
    grammar[22]["explanation"] = (
        "【正解】2（過去の新聞を見る）\n"
        "【文脈】「過去の新聞を見ることには、わくわくするような楽しさがあるのです。」\n"
        "【解説】前文では古い新聞を年月ごとに保存し、すぐ取り出せるようになったと述べています。\n"
        "【英訳】There is an exciting pleasure in looking through old newspapers."
    )


def audit_set5(set_data):
    errors = []
    sections = set_data["sections"]
    vocabulary = sections["vocabulary-kanji"]["questions"]
    grammar = sections["grammar-reading"]["questions"]

    if len(vocabulary) != 35:
        errors.append(f"Expected 35 vocabulary questions, found {len(vocabulary)}")
    if len(grammar) != 23:
        errors.append(f"Expected 23 grammar questions, found {len(grammar)}")

    expected_answers = {
        "vocabulary-kanji": VOCABULARY_ANSWERS,
        "grammar-reading": GRAMMAR_ANSWERS,
    }
    for section_name, answers in expected_answers.items():
        questions = sections[section_name]["questions"]
        for question_number, (question, expected_answer) in enumerate(zip(questions, answers), start=1):
            if len(question.get("options", [])) != 4:
                errors.append(f"{section_name} Q{question_number}: expected 4 options")
            if question.get("correctIndex") != expected_answer - 1:
                errors.append(
                    f"{section_name} Q{question_number}: correctIndex does not match source answer"
                )
            if not question.get("explanation", "").strip():
                errors.append(f"{section_name} Q{question_number}: missing explanation")

            fields = [question.get("questionText", ""), *question.get("options", [])]
            if "passageText" in question:
                fields.append(question["passageText"])
            markup = "".join(fields)
            for opening, closing in (("<u>", "</u>"), ("<ruby>", "</ruby>"), ("<rt>", "</rt>")):
                if markup.count(opening) != markup.count(closing):
                    errors.append(f"{section_name} Q{question_number}: unbalanced {opening} markup")

            explanation_match = re.match(r"【正解】([1-4])", question.get("explanation", ""))
            if explanation_match and int(explanation_match.group(1)) != expected_answer:
                errors.append(f"{section_name} Q{question_number}: explanation answer mismatch")

            image_source = question.get("imageSrc")
            if image_source:
                asset_path = ROOT / "public" / image_source.lstrip("/")
                if not asset_path.is_file():
                    errors.append(f"{section_name} Q{question_number}: missing asset {image_source}")

    for offset, expected_text in enumerate(UNDERLINED_SYNONYM_STEMS, start=26):
        if vocabulary[offset - 1]["questionText"] != expected_text:
            errors.append(f"vocabulary-kanji Q{offset}: incorrect underline target")

    passage_questions = grammar[18:23]
    if len({question.get("passageText") for question in passage_questions}) != 1:
        errors.append("grammar-reading Q19-Q23: passage text is not synchronized")

    return errors


def main():
    app_data = load_app_data()
    firebase_data = json.loads(FIREBASE_DUMP_PATH.read_text(encoding="utf-8"))

    app_set5 = get_set(app_data, "set-5")
    repair_set5(app_set5)
    firebase_data["sets"][firebase_data["sets"].index(get_set(firebase_data, "set-5"))] = copy.deepcopy(app_set5)

    errors = audit_set5(app_set5)
    synchronized = app_set5 == get_set(firebase_data, "set-5")
    if not synchronized:
        errors.append("App data and Firebase dump are not synchronized")

    report = {
        "setId": "set-5",
        "vocabularyQuestions": len(app_set5["sections"]["vocabulary-kanji"]["questions"]),
        "grammarQuestions": len(app_set5["sections"]["grammar-reading"]["questions"]),
        "synchronized": synchronized,
        "errors": errors,
    }
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    if errors:
        raise SystemExit("\n".join(errors))

    write_app_data(app_data)
    FIREBASE_DUMP_PATH.write_text(
        json.dumps(firebase_data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )
    print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    main()
