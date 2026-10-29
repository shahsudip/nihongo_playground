import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'src' / 'data' / 'chokuzen_n2'


class MarkupValidator(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag in ['ruby', 'rt', 'u', 'b']:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in ['ruby', 'rt', 'u', 'b']:
            if not self.stack or self.stack.pop() != tag:
                self.errors.append(f'Unbalanced {tag} tag')


def audit(book):
    errors = []
    summaries = []
    all_ids = set()
    question_count = 0
    for test in book.get('sets', []):
        test_errors = []
        questions = [question for section in test['sections'].values() for question in section['questions']]
        expected_numbers = list(range(1, 55))
        if [question['number'] for question in questions] != expected_numbers:
            test_errors.append('Question numbers must be 1 through 54 in order.')
        if len(test['sections']['vocabulary-kanji']['questions']) != 32:
            test_errors.append('Expected 32 vocabulary questions.')
        if len(test['sections']['grammar-reading']['questions']) != 22:
            test_errors.append('Expected 22 grammar questions.')
        for question in questions:
            label = f'{test["id"]} Q{question["number"]}'
            if question['id'] in all_ids:
                test_errors.append(f'{label}: duplicate question ID.')
            all_ids.add(question['id'])
            if len(question.get('options', [])) != 4 or any(not option for option in question['options']):
                test_errors.append(f'{label}: exactly four nonempty options are required.')
            if type(question.get('correctIndex')) is not int or not 0 <= question['correctIndex'] <= 3:
                test_errors.append(f'{label}: invalid correctIndex.')
            elif question.get('correctOption') != question['options'][question['correctIndex']]:
                test_errors.append(f'{label}: correctOption does not match options[correctIndex].')
            if not question.get('explanation'):
                test_errors.append(f'{label}: missing answer/explanation.')
            if not question.get('verification', {}).get('answerKeyVerified'):
                test_errors.append(f'{label}: printed answer key has not been verified.')
            study = question.get('studyExplanation')
            if study:
                if not question['verification'].get('ocrTextVerified'):
                    test_errors.append(f'{label}: English study explanation requires proofread text.')
                if not isinstance(study.get('translation'), str) or not study['translation'].strip():
                    test_errors.append(f'{label}: missing English question translation.')
                if not isinstance(study.get('correctAnswerEnglish'), str) or not study['correctAnswerEnglish'].strip():
                    test_errors.append(f'{label}: missing correct answer in English.')
                choices = study.get('choices')
                if not isinstance(choices, list) or len(choices) != 4 or any(not isinstance(choice.get('reason'), str) or not choice['reason'].strip() for choice in choices if isinstance(choice, dict)) or any(not isinstance(choice, dict) for choice in choices):
                    test_errors.append(f'{label}: all four options need English breakdowns.')
            if question.get('mondai') == 9:
                if question.get('questionText') != '':
                    test_errors.append(f'{label}: text-grammar questionText must be empty.')
                if not question.get('passageImage') or not question.get('passageSourcePage'):
                    test_errors.append(f'{label}: missing shared passage.')
                if question['verification'].get('ocrTextVerified') and not question['verification'].get('passageTextVerified'):
                    test_errors.append(f'{label}: proofread choices require a proofread shared passage.')
            if 'correctOrder' in question:
                order = question['correctOrder']
                if sorted(order) != [1, 2, 3, 4]:
                    test_errors.append(f'{label}: invalid sentence order.')
                elif order[question['starPosition'] - 1] != question['correctIndex'] + 1:
                    test_errors.append(f'{label}: star position does not match the printed answer.')
            for field in ['questionText', 'explanation', 'passage']:
                validator = MarkupValidator()
                validator.feed(question.get(field, ''))
                if validator.stack or validator.errors:
                    test_errors.append(f'{label}: invalid HTML in {field}.')
            for index, option in enumerate(question['options']):
                validator = MarkupValidator()
                validator.feed(option)
                if validator.stack or validator.errors:
                    test_errors.append(f'{label}: invalid HTML in option {index + 1}.')
            if question['verification'].get('ocrTextVerified') and question.get('mondai') == 8:
                before_star = question['questionText'].split('★', 1)[0]
                if '★' not in question['questionText'] or len(re.findall('＿＿＿', before_star)) + 1 != question['starPosition']:
                    test_errors.append(f'{label}: transcribed star blank position is incorrect.')
            paths = [question.get('questionImage'), question.get('explanationImage'), question.get('passageImage')]
            option_images = question.get('optionImages', [])
            if len(option_images) != 4:
                test_errors.append(f'{label}: expected four source option images.')
            for asset in paths + option_images:
                if not asset:
                    continue
                target = ROOT / 'public' / asset.lstrip('/')
                if not target.is_file():
                    test_errors.append(f'{label}: missing asset {asset}.')
                    continue
                with Image.open(target) as image:
                    if image.width < 30 or image.height < 18:
                        test_errors.append(f'{label}: asset is too small: {asset}.')
            if len(question.get('sourceBounds', [])) != 4:
                test_errors.append(f'{label}: source crop provenance is missing.')
        question_count += len(questions)
        errors.extend(test_errors)
        summaries.append({
            'id': test['id'],
            'questions': len(questions),
            'vocabularyQuestions': len(test['sections']['vocabulary-kanji']['questions']),
            'grammarQuestions': len(test['sections']['grammar-reading']['questions']),
            'errors': test_errors,
            'printedExplanations': sum(33 <= question['number'] <= 49 for question in questions),
            'englishStudyExplanations': sum(bool(question.get('studyExplanation')) for question in questions),
            'ocrTextPending': sum(not question.get('verification', {}).get('ocrTextVerified') for question in questions),
            'passageTextPending': sum(question.get('mondai') == 9 and not question.get('verification', {}).get('passageTextVerified') for question in questions),
            'optionImagesPending': sum(not question.get('verification', {}).get('optionImageVerified') for question in questions),
        })
    if len(book.get('sets', [])) != 15 or question_count != 810:
        errors.append('Expected 15 tests and 810 questions.')
    pages = book.get('source', {}).get('pages', [])
    if len(pages) != 240 or [page['page'] for page in pages] != list(range(1, 241)):
        errors.append('Expected 240 source pages in PDF order.')
    for page in pages:
        if not (ROOT / 'public' / page['image'].lstrip('/')).is_file():
            errors.append(f'Missing source page {page["page"]}.')
    return {'errors': errors, 'sets': summaries, 'questionCount': question_count, 'sourcePages': len(pages)}


def write_checklists(report):
    directory = ROOT / 'scripts' / 'chokuzen_n2' / 'checklists'
    directory.mkdir(parents=True, exist_ok=True)
    for summary in report['sets']:
        passed = not summary['errors']
        marker = 'x' if passed else ' '
        content = [
            f'# Chokuzen N2 {summary["id"]}',
            '',
            f'- [{marker}] 54 questions: 32 vocabulary and 22 grammar.',
            f'- [{marker}] Exactly four options and matching zero-based correctIndex/correctOption.',
            f'- [{marker}] Printed answer key checked against the source answer booklet.',
            f'- [{marker}] Source images, choice images, and passage links exist.',
            f'- [{marker}] Original source pages retained for internal cross-checking.',
            f'- [{marker}] Shared text-grammar passage linked to Q50-54; empty question stems retained.',
            f'- [{marker}] Answer references and printed grammar explanations are attached.',
            f'- [{marker}] Balanced ruby/underline/explanation HTML; stable unique question IDs.',
            f'- [{"x" if summary["ocrTextPending"] == 0 else " "}] All 54 native Japanese stems and four choices proofread; underlines, ruby, dialogue, and star blanks checked.',
            f'- [{"x" if summary["passageTextPending"] == 0 else " "}] Shared grammar passage proofread and linked to Q50-54.',
            f'- [{"x" if summary["englishStudyExplanations"] == 54 else " "}] All 54 English full-question translations, correct-answer meanings, and four-option breakdowns reviewed ({summary["englishStudyExplanations"]}/54).',
            '- [ ] Independent visual comparison of every question and option against the source pages.',
            '- [ ] Every individual source option crop visually reviewed.',
            '- [ ] This test manually reviewed in desktop and mobile text-only UI.',
            '',
        'Source scans are internal proofreading evidence only; the UI displays no image or PDF reference.',
        'The source prints grammar explanations for Q33-49; other questions need independently reviewed English breakdowns.',
            'Unchecked gates must stay unchecked until their evidence exists.',
            '',
        ]
        (directory / f'{summary["id"]}.md').write_text('\n'.join(content), encoding='ascii')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--checklists', action='store_true')
    parser.add_argument('--require-proofread', action='store_true')
    parser.add_argument('--require-complete', action='store_true')
    arguments = parser.parse_args()
    book = json.loads((DATA / 'book.json').read_text(encoding='utf-8'))
    report = audit(book)
    if arguments.require_proofread and any(summary['ocrTextPending'] or summary['passageTextPending'] for summary in report['sets']):
        report['errors'].append('Native text gate: question, choice, or passage text still requires proofreading.')
    if arguments.checklists:
        write_checklists(report)
    if arguments.require_complete:
        for summary in report['sets']:
            if summary['ocrTextPending'] or summary['passageTextPending'] or summary['englishStudyExplanations'] != 54:
                report['errors'].append(f'{summary["id"]}: native text or English study explanations remain incomplete.')
            checklist = ROOT / 'scripts' / 'chokuzen_n2' / 'checklists' / f'{summary["id"]}.md'
            if not checklist.is_file() or '- [ ]' in checklist.read_text(encoding='ascii'):
                report['errors'].append(f'{summary["id"]}: manual checklist gates are not all signed off.')
    (ROOT / 'tmp_inspect' / 'chokuzen_n2' / 'audit.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    for summary in report['sets']:
        print(f'{summary["id"]}: {summary["questions"]} questions, {len(summary["errors"])} structural errors, {summary["ocrTextPending"]} text records pending, {54 - summary["englishStudyExplanations"]} English explanations pending')
    print(f'Total: {report["questionCount"]} questions, {report["sourcePages"]} source pages, {len(report["errors"])} errors')
    for error in report['errors'][:30]:
        print(error)
    raise SystemExit(1 if report['errors'] else 0)


if __name__ == '__main__':
    main()
