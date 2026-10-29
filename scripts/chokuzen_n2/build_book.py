import json
import re
from pathlib import Path

import cv2
import numpy
from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'src' / 'data' / 'chokuzen_n2'
WORK = ROOT / 'tmp_inspect' / 'chokuzen_n2'
ASSETS = ROOT / 'public' / 'books' / 'chokuzen_n2'
QUESTIONS_PER_PAGE = [6, 9, 7, 7, 3, 9, 3, 5, 0, 5]
PAGE_ORDER_CORRECTIONS = {17: 13, 18: 14, 15: 15, 16: 16, 118: 115, 117: 116}
VISUAL_MARKER_ADDITIONS = {67: [(160, 812)], 78: [(69, 815)], 128: [(79, 805)]}
VISUAL_PAGE_COUNTS = {81: 8, 82: 4, 101: 8, 102: 4}
INSTRUCTIONS = {
    1: '問題1　下線の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
    2: '問題2　下線の言葉を漢字で書くとき、最もよいものを1・2・3・4から一つ選びなさい。',
    3: '問題3　（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
    4: '問題4　（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
    5: '問題5　下線の言葉に意味が最も近いものを、1・2・3・4から一つ選びなさい。',
    6: '問題6　次の言葉の使い方として最もよいものを、1・2・3・4から一つ選びなさい。',
    7: '問題7　次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
    8: '問題8　次の文の★に入る最もよいものを、1・2・3・4から一つ選びなさい。',
    9: '問題9　次の文章を読んで、文中に入る最もよいものを、1・2・3・4から一つ選びなさい。',
}


def read_json(target):
    return json.loads(target.read_text(encoding='utf-8'))


def write_json(target, value):
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def source_image(page_number):
    return ASSETS / 'pages' / f'page-{page_number:03d}.jpeg'


def printed_to_pdf(printed_page):
    return PAGE_ORDER_CORRECTIONS.get(printed_page, printed_page - 2)


def find_markers(page_number, printed_page, offset):
    image = cv2.imread(str(source_image(page_number)), cv2.IMREAD_GRAYSCALE)
    _, binary = cv2.threshold(image, 150, 255, cv2.THRESH_BINARY_INV)
    horizontal = cv2.morphologyEx(binary, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (100, 1)))
    binary = cv2.morphologyEx(cv2.subtract(binary, horizontal), cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2)))
    contours, _ = cv2.findContours(binary, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    candidates = []
    minimum = 450 if offset == 0 else 210 if offset in [2, 3, 5, 7] else 150
    for contour in contours:
        xpos, ypos, width, height = cv2.boundingRect(contour)
        correct_column = 40 < xpos < 100 if printed_page % 2 == 0 else 140 < xpos < 200
        header = (offset == 0 and 920 < ypos < 1000) or (offset == 1 and 500 < ypos < 600) or (offset == 3 and 660 < ypos < 750)
        if not correct_column or header:
            continue
        if 12 <= width <= 21 and 11 <= height <= 22 and 0.65 < width / height < 1.5 and minimum < ypos < 1120:
            if cv2.contourArea(contour) / (width * height) > 0.58:
                candidates.append((xpos, ypos))
    best = []
    for anchor, _ in candidates:
        unique = []
        for position in sorted(set((xpos, ypos) for xpos, ypos in candidates if abs(xpos - anchor) < 7), key=lambda item: item[1]):
            if not unique or position[1] - unique[-1][1] > 15:
                unique.append(position)
        if len(unique) > len(best):
            best = unique
    best.extend(VISUAL_MARKER_ADDITIONS.get(page_number, []))
    best.sort(key=lambda item: item[1])
    expected = VISUAL_PAGE_COUNTS.get(page_number, QUESTIONS_PER_PAGE[offset])
    if len(best) != expected:
        raise ValueError(f'PDF page {page_number}: expected {expected} question markers, found {len(best)}.')
    return best


def question_group(number):
    for maximum, group in [(5, 1), (10, 2), (15, 3), (22, 4), (27, 5), (32, 6), (44, 7), (49, 8), (54, 9)]:
        if number <= maximum:
            return group
    raise ValueError(f'Invalid question number: {number}')


def body_words(page_ocr, start_y, end_y):
    return [word for line in page_ocr['lines'] for word in line['words'] if start_y <= word['y'] < end_y]


def crop_image(image, box, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    crop = image.crop(tuple(round(value) for value in box))
    crop.save(target, quality=95, subsampling=0)
    return '/books/chokuzen_n2/' + target.relative_to(ASSETS).as_posix()


def clean_ink(image):
    gray = cv2.cvtColor(numpy.array(image.convert('RGB')), cv2.COLOR_RGB2GRAY)
    ink = (gray < 145).astype('uint8')
    for kernel in [(100, 1), (1, 80)]:
        ink = cv2.subtract(ink, cv2.morphologyEx(ink, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, kernel)))
    return ink


def number_rows(ink, left, top, bottom):
    column = ink[top + 22:int(bottom), left + 17:left + 29].sum(axis=1) > 0
    rows = []
    start = None
    for offset, active in enumerate(column):
        if active and start is None:
            start = offset
        elif not active and start is not None:
            if 7 <= offset - start <= 16:
                rows.append(top + 22 + start)
            start = None
    return rows


def extract_choices(image, ink, words, left, top, bottom, number, set_number):
    base_x = left + 20
    anchors = [word for word in words if word['text'] in ['1', '2', '3', '4'] and word['y'] > top + 21 and word['height'] >= 6]
    modes = {'horizontal': [(0, 0), (150, 0), (302, 0), (454, 0)], 'two-row': [(0, 0), (302, 0), (0, 30.5), (302, 30.5)]}
    if 28 <= number <= 32:
        modes = {'vertical': [(0, 0), (0, 30.5), (0, 61), (0, 91.5)]}
    best = None
    for mode, positions in modes.items():
        for word in anchors:
            choice = int(word['text']) - 1
            delta_x, delta_y = positions[choice]
            if abs(word['x'] - base_x - delta_x) > 17:
                continue
            baseline = word['y'] - delta_y
            hits = sum(any(
                candidate['text'] == str(index + 1)
                and abs(candidate['x'] - base_x - column) < 17
                and abs(candidate['y'] - baseline - row) < 8
                for candidate in anchors
            ) for index, (column, row) in enumerate(positions))
            score = (hits, -abs(baseline - top - 32))
            if best is None or score > best[0]:
                best = (score, mode, baseline, positions)
    if best is None:
        mode = 'vertical' if 28 <= number <= 32 else 'horizontal'
        positions = modes.get(mode, next(iter(modes.values())))
        baseline = top + 31
        best = ((0, 0), mode, baseline, positions)
    _, mode, baseline, positions = best
    detected_rows = number_rows(ink, left, top, bottom)
    if len(detected_rows) == 4:
        mode = 'vertical'
        baseline = detected_rows[0]
        positions = [(0, ypos - baseline) for ypos in detected_rows]
    elif best[0][0] < 2 and detected_rows:
        baseline = detected_rows[0]
        if len(detected_rows) == 2:
            mode = 'two-row'
            spacing = detected_rows[1] - detected_rows[0]
            positions = [(0, 0), (302, 0), (0, spacing), (302, spacing)]
    images = []
    texts = []
    for index, (column, row) in enumerate(positions):
        option_left = base_x + column - 4
        option_top = baseline + row - 11
        option_width = 147 if mode == 'horizontal' else 298 if mode == 'two-row' else image.width - option_left - 40
        following_rows = [next_row for _, next_row in positions if next_row > row]
        option_bottom = min(bottom, baseline + min(following_rows) - 7) if following_rows else bottom
        if mode == 'horizontal':
            option_bottom = min(bottom, baseline + row + 25)
        if option_bottom <= option_top:
            raise ValueError(f'Invalid option crop for set {set_number}, question {number}, option {index + 1}.')
        option_words = sorted((word for word in words if option_left + 16 < word['x'] < option_left + option_width and baseline + row - 5 <= word['y'] <= baseline + row + 16), key=lambda item: item['x'])
        text = ''.join(word['text'] for word in option_words).strip()
        texts.append(text or f'選択肢{index + 1}')
        images.append(crop_image(image, (option_left, option_top, min(image.width - 25, option_left + option_width), option_bottom), ASSETS / 'options' / f'set-{set_number}-q-{number}-option-{index + 1}.jpeg'))
    return texts, images, {'layout': mode, 'anchorsRecognized': best[0][0], 'numberRows': detected_rows, 'baseline': round(baseline, 2)}


def main():
    source = read_json(DATA / 'source.json')
    answer_keys = {}
    for target in ['answer_keys_1_8.json', 'answer_keys_9_15.json']:
        if (DATA / target).exists():
            answer_keys.update({item['id']: item for item in read_json(DATA / target)['sets']})
    proofread_sets = {}
    for target in sorted(DATA.glob('proofread_set*.json')):
        for proofread_set in read_json(target)['sets']:
            if proofread_set['id'] in proofread_sets:
                raise ValueError(f'Duplicate proofreading overlay for {proofread_set["id"]}.')
            proofread_questions = proofread_set.get('questions', [])
            if len(proofread_questions) != 54 or [question['number'] for question in proofread_questions] != list(range(1, 55)):
                raise ValueError(f'{proofread_set["id"]}: proofreading overlay must contain questions 1 through 54 in order.')
            if any(question.get('textVerified') is not True for question in proofread_questions):
                raise ValueError(f'{proofread_set["id"]}: all question and choice text must be verified.')
            if proofread_set.get('passageVerified') is not True or not proofread_set.get('passage'):
                raise ValueError(f'{proofread_set["id"]}: shared passage must be verified.')
            proofread_sets[proofread_set['id']] = proofread_set
    study_explanations = {}
    for target in sorted(DATA.glob('study_explanations*.json')):
        for question_id, explanation in read_json(target).items():
            if question_id in study_explanations:
                raise ValueError(f'Duplicate study explanation for {question_id}.')
            study_explanations[question_id] = explanation
    used_study_explanations = set()
    sets = []
    layout = []
    for set_number in range(1, 16):
        set_id = f'set-{set_number}'
        key = answer_keys.get(set_id)
        proofread_set = proofread_sets.get(set_id, {})
        proofread_questions = {question['number']: question for question in proofread_set.get('questions', [])}
        questions = []
        source_pages = []
        passage_page = printed_to_pdf(8 + (set_number - 1) * 10 + 8)
        passage_image = Image.open(source_image(passage_page))
        passage_path = crop_image(passage_image, (45, 145, 835, 1050), ASSETS / 'passages' / f'{set_id}.jpeg')
        passage_ocr = read_json(WORK / 'ocr' / f'page-{passage_page:03d}.json')
        passage_text = '\n'.join(line['text'] for line in passage_ocr['lines'] if 245 < line['y'] < 1070)
        for offset, expected in enumerate(QUESTIONS_PER_PAGE):
            printed_page = 8 + (set_number - 1) * 10 + offset
            page_number = printed_to_pdf(printed_page)
            source_pages.append(page_number)
            if expected == 0:
                continue
            markers = find_markers(page_number, printed_page, offset)
            page_ocr = read_json(WORK / 'ocr' / f'page-{page_number:03d}.json')
            image = Image.open(source_image(page_number))
            ink = clean_ink(image)
            layout.append({'set': set_number, 'page': page_number, 'printedPage': printed_page, 'markers': markers})
            for rank, (left, top) in enumerate(markers):
                number = len(questions) + 1
                next_top = markers[rank + 1][1] - 19 if rank + 1 < len(markers) else 1125
                if number in [5, 10, 27]:
                    next_top = min(next_top, top + 99)
                words = body_words(page_ocr, top - 14, next_top)
                content_bottom = max((word['y'] + word['height'] for word in words), default=top + 70)
                ink_rows = ink[top:int(next_top), left + 15:min(image.width - 30, left + 735)].sum(axis=1)
                occupied_rows = ink_rows.nonzero()[0]
                if len(occupied_rows):
                    content_bottom = max(content_bottom, top + int(occupied_rows[-1]) + 1)
                bottom = min(next_top, content_bottom + 14)
                question_image = crop_image(image, (left - 10, top - 15, min(image.width - 30, left + 735), bottom), ASSETS / 'questions' / f'{set_id}-q-{number}.jpeg')
                options, option_images, choice_detection = extract_choices(image, ink, words, left, top, bottom, number, set_number)
                group = question_group(number)
                question_lines = [line for line in page_ocr['lines'] if top - 12 < line['y'] < choice_detection['baseline'] - 7 and line['x'] >= left - 5]
                question_text = '\n'.join(line['text'] for line in question_lines)
                if group == 9:
                    question_text = ''
                correct_index = key['answers'][number - 1] - 1 if key else None
                explanation = key.get('explanations', {}).get(str(number), '') if key else ''
                if correct_index is not None:
                    explanation = f'【正解】{correct_index + 1}（{options[correct_index]}）<br/>' + explanation
                record = {
                    'id': f'n2-{set_id}-q-{number}',
                    'number': number,
                    'questionText': question_text,
                    'questionImage': question_image,
                    'options': options,
                    'optionImages': option_images,
                    'correctIndex': correct_index,
                    'correctOption': options[correct_index] if correct_index is not None else None,
                    'sectionType': 'vocabulary-kanji' if number <= 32 else 'grammar-reading',
                    'instruction': INSTRUCTIONS[group],
                    'mondai': group,
                    'sourcePage': page_number,
                    'printedPage': printed_page,
                    'sourceBounds': [left - 10, top - 15, min(image.width - 30, left + 735), round(bottom)],
                    'explanation': explanation,
                    'explanationPage': key['answerPage'] if key else None,
                    'explanationImage': f'/books/chokuzen_n2/pages/page-{key["answerPage"]:03d}.jpeg' if key else None,
                    'verification': {
                        'sourceImagePreserved': True,
                        'answerKeyVerified': bool(key and key.get('verified')),
                        'ocrTextVerified': False,
                        'optionImageVerified': False,
                        'choiceDetection': choice_detection,
                    },
                }
                if group == 8 and key:
                    order = key.get('correctOrders', {}).get(str(number))
                    if order:
                        record['correctOrder'] = order
                        record['starPosition'] = order.index(correct_index + 1) + 1
                if group == 9:
                    record['passageImage'] = passage_path
                    record['passage'] = passage_text
                    record['passageSourcePage'] = passage_page
                proofread_question = proofread_questions.get(number)
                if proofread_question and proofread_question.get('textVerified'):
                    if len(proofread_question['options']) != 4:
                        raise ValueError(f'{set_id} Q{number}: proofread options must contain exactly four items.')
                    record['questionText'] = proofread_question['questionText']
                    record['options'] = proofread_question['options']
                    record['correctOption'] = record['options'][correct_index] if correct_index is not None else None
                    record['verification']['ocrTextVerified'] = True
                    if group == 9 and proofread_set.get('passageVerified'):
                        record['passage'] = proofread_set['passage']
                        record['verification']['passageTextVerified'] = True
                if correct_index is not None:
                    answer_label = f'【正解】{correct_index + 1}'
                    if record['verification']['ocrTextVerified']:
                        answer_label += f'（{record["correctOption"]}）'
                    printed_explanation = key.get('explanations', {}).get(str(number), '')
                    record['explanation'] = answer_label + (f'<br/>{printed_explanation}' if printed_explanation else '')
                if record['id'] in study_explanations:
                    if not record['verification']['ocrTextVerified']:
                        raise ValueError(f'{record["id"]}: English study explanation requires proofread question and choices.')
                    record['studyExplanation'] = study_explanations[record['id']]
                    used_study_explanations.add(record['id'])
                questions.append(record)
        if len(questions) != 54:
            raise ValueError(f'{set_id}: expected 54 questions, found {len(questions)}.')
        sets.append({
            'id': set_id,
            'title': f'第{set_number}回 模擬テスト',
            'description': f'第{set_number}回　文字・語彙・文法',
            'sourcePages': source_pages,
            'timeLimitMinutes': 45,
            'sections': {
                'vocabulary-kanji': {'title': 'Vocabulary and Kanji', 'titleJa': '文字・語彙', 'questions': questions[:32]},
                'grammar-reading': {'title': 'Grammar', 'titleJa': '文法', 'questions': questions[32:]},
            },
        })
    unknown_explanations = set(study_explanations) - used_study_explanations
    if unknown_explanations:
        raise ValueError(f'Study explanations refer to unknown questions: {sorted(unknown_explanations)}')
    for page in source['pages']:
        ocr = read_json(WORK / 'ocr' / f'page-{page["page"]:03d}.json')
        page['text'] = '\n'.join(line['text'] for line in ocr['lines'])
        page['textVerified'] = False
    source['pageOrderCorrections'] = {str(key): value for key, value in PAGE_ORDER_CORRECTIONS.items()}
    book = {
        'id': 'jlpt-n2-practice-sets',
        'title': '直前対策 日本語能力試験 N2 文字・語彙・文法',
        'level': 'N2',
        'category': 'Chokuzen Taisaku',
        'totalQuestions': 810,
        'totalChapters': 15,
        'coverUrl': '/books/chokuzen_n2/cover.jpeg',
        'contentMode': 'source-preserved-with-searchable-ocr',
        'source': source,
        'sets': sets,
    }
    cover = Image.open(source_image(211))
    crop_image(cover, (165, 150, 720, 1090), ASSETS / 'cover.jpeg')
    write_json(DATA / 'book.json', book)
    write_json(WORK / 'layout.json', layout)
    print(f'Created {len(sets)} tests, {sum(len(section["questions"]) for item in sets for section in item["sections"].values())} questions, and {len(source["pages"])} source pages.')
    print(f'Answer keys available for {len(answer_keys)}/15 tests.')
    verified_count = sum(question['verification']['ocrTextVerified'] for item in sets for section in item['sections'].values() for question in section['questions'])
    print(f'Proofread Japanese text: {verified_count}/810 questions; other text remains draft OCR.')


if __name__ == '__main__':
    main()
