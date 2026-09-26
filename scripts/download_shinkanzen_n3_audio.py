import os
import sys
import urllib.request
import zipfile
import shutil

ZIP_URL = "https://www.3anet.co.jp/np/secure/0-0001-01-364420/0-0001-01-364420-0.zip"
DEST_ZIP = "scripts/shinkanzen_n3_audio.zip"
TARGET_DIR = "public/audio/shinkanzen_listening"
DIST_TARGET_DIR = "dist/audio/shinkanzen_listening"

def reporthook(blocknum, blocksize, totalsize):
    readsofar = blocknum * blocksize
    if totalsize > 0:
        percent = readsofar * 100 / totalsize
        s = f"\rDownloading: {readsofar / (1024*1024):.2f}MB / {totalsize / (1024*1024):.2f}MB ({percent:.1f}%)"
        sys.stdout.write(s)
        sys.stdout.flush()

def main():
    print(f"Downloading Shinkanzen N3 Listening official audio from {ZIP_URL}...")
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    req = urllib.request.Request(ZIP_URL, headers=headers)
    
    with urllib.request.urlopen(req) as response, open(DEST_ZIP, 'wb') as out_file:
        total_length = response.headers.get('content-length')
        total_size = int(total_length) if total_length else 0
        read_so_far = 0
        block_size = 1024 * 64
        while True:
            chunk = response.read(block_size)
            if not chunk:
                break
            out_file.write(chunk)
            read_so_far += len(chunk)
            if total_size:
                percent = read_so_far * 100 / total_size
                sys.stdout.write(f"\rDownloading: {read_so_far / (1024*1024):.2f}MB / {total_size / (1024*1024):.2f}MB ({percent:.1f}%)")
                sys.stdout.flush()
    print("\nDownload complete! Extracting zip...")
    
    os.makedirs(TARGET_DIR, exist_ok=True)
    with zipfile.ZipFile(DEST_ZIP, 'r') as zip_ref:
        zip_ref.extractall(TARGET_DIR)
        print(f"Extracted {len(zip_ref.namelist())} files into {TARGET_DIR}")

    # Also sync to dist/
    os.makedirs(DIST_TARGET_DIR, exist_ok=True)
    for root, dirs, files in os.walk(TARGET_DIR):
        rel_path = os.path.relpath(root, TARGET_DIR)
        dest_path = os.path.join(DIST_TARGET_DIR, rel_path)
        os.makedirs(dest_path, exist_ok=True)
        for f in files:
            src_file = os.path.join(root, f)
            dest_file = os.path.join(dest_path, f)
            shutil.copy2(src_file, dest_file)
    print(f"Synced files to {DIST_TARGET_DIR}")

if __name__ == '__main__':
    main()
