import os
import argparse
from pathlib import Path
import easyocr

SOURCE_DIR = Path('tmp_inspect/zenkamoku_n3')
DEFAULT_OUTPUT = Path('scripts/zenkamoku_n3/week4_ocr.txt')

parser = argparse.ArgumentParser(description='OCR Week 4 source pages.')
parser.add_argument('--start', type=int, default=46, help='First book page, inclusive')
parser.add_argument('--end', type=int, default=65, help='Last book page, inclusive')
parser.add_argument('--append', action='store_true', help='Append instead of replacing the output')
parser.add_argument('--output', type=Path, default=DEFAULT_OUTPUT, help='Destination text file')
args = parser.parse_args()

reader = easyocr.Reader(['ja', 'en'], gpu=False)
with args.output.open('a' if args.append else 'w', encoding='utf-8') as out:
    for book_page in range(args.start, args.end + 1):
        image = SOURCE_DIR / f'page_{book_page + 1:03d}.jpg'
        print(f'OCR book page {book_page}: {image}')
        lines = reader.readtext(str(image), detail=0, paragraph=False)
        out.write(f'\n===== BOOK PAGE {book_page} =====\n')
        out.write('\n'.join(lines))
        out.write('\n')

print(f'Saved pages {args.start}-{args.end} to {args.output}')
