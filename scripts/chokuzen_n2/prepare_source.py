import argparse
import asyncio
import hashlib
import json
import re
from pathlib import Path

import fitz
from PIL import Image
from winrt.windows.globalization import Language
from winrt.windows.graphics.imaging import BitmapPixelFormat, SoftwareBitmap
from winrt.windows.media.ocr import OcrEngine
from winrt.windows.storage.streams import Buffer


ROOT = Path(__file__).resolve().parents[2]
ASSETS = ROOT / 'public' / 'books' / 'chokuzen_n2' / 'pages'
WORK = ROOT / 'tmp_inspect' / 'chokuzen_n2'
DATA = ROOT / 'src' / 'data' / 'chokuzen_n2'


def write_json(target, value):
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding='utf-8')


def harvest_pages(document):
    ASSETS.mkdir(parents=True, exist_ok=True)
    pages = []
    for index, page in enumerate(document):
        image_name = re.search(rb'/(I\d+)\s+Do', page.read_contents())
        if image_name is None:
            raise ValueError(f'Page {index + 1} does not contain the expected scanned image.')
        resource_name = image_name[1].decode('ascii')
        reference = next(image for image in page.get_images(full=True) if image[7] == resource_name)
        extracted = document.extract_image(reference[0])
        target = ASSETS / f'page-{index + 1:03d}.{extracted["ext"]}'
        if not target.exists():
            target.write_bytes(extracted['image'])
        pages.append({
            'page': index + 1,
            'image': f'/books/chokuzen_n2/pages/{target.name}',
            'width': extracted['width'],
            'height': extracted['height'],
        })
    return pages


async def recognize_page(engine, source, page_number):
    image = Image.open(source).convert('RGBA')
    image = image.resize((image.width * 3, image.height * 3), Image.Resampling.LANCZOS)
    pixels = image.tobytes('raw', 'BGRA')
    buffer = Buffer(len(pixels))
    buffer.length = len(pixels)
    memoryview(buffer)[:] = pixels
    bitmap = SoftwareBitmap(BitmapPixelFormat.BGRA8, image.width, image.height)
    bitmap.copy_from_buffer(buffer)
    result = await engine.recognize_async(bitmap)
    lines = []
    for line in result.lines:
        words = []
        for word in line.words:
            rectangle = word.bounding_rect
            words.append({
                'text': word.text,
                'x': round(rectangle.x / 3, 2),
                'y': round(rectangle.y / 3, 2),
                'width': round(rectangle.width / 3, 2),
                'height': round(rectangle.height / 3, 2),
            })
        if words:
            lines.append({
                'text': ''.join(word['text'] for word in words),
                'words': words,
                'x': min(word['x'] for word in words),
                'y': min(word['y'] for word in words),
            })
    lines.sort(key=lambda line: (round(line['y'] / 5), line['x']))
    bitmap.close()
    return {'page': page_number, 'engine': 'Windows Japanese OCR', 'lines': lines}


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('pdf', type=Path)
    parser.add_argument('--assets-only', action='store_true')
    arguments = parser.parse_args()
    document = fitz.open(arguments.pdf)
    if document.needs_pass and not document.authenticate('unojapano.com'):
        raise ValueError('The PDF could not be opened with the supplied book password.')
    pages = harvest_pages(document)
    WORK.mkdir(parents=True, exist_ok=True)
    DATA.mkdir(parents=True, exist_ok=True)
    source = {
        'fileName': arguments.pdf.name,
        'sha256': hashlib.sha256(arguments.pdf.read_bytes()).hexdigest(),
        'pageCount': len(pages),
        'embeddedTextPages': sum(bool(page.get_text().strip()) for page in document),
        'pages': pages,
    }
    write_json(DATA / 'source.json', source)
    print(f'Harvested {len(pages)} original page images.', flush=True)
    if arguments.assets_only:
        return
    engine = OcrEngine.try_create_from_language(Language('ja'))
    if engine is None:
        raise RuntimeError('Windows Japanese OCR is unavailable.')
    for page in pages:
        result_path = WORK / 'ocr' / f'page-{page["page"]:03d}.json'
        if result_path.exists():
            continue
        result = await recognize_page(engine, ROOT / 'public' / page['image'].lstrip('/'), page['page'])
        write_json(result_path, result)
        print(f'OCR {page["page"]}/{len(pages)}: {len(result["lines"])} lines', flush=True)


if __name__ == '__main__':
    asyncio.run(main())
