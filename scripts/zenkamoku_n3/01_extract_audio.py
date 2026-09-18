import os, sys, zipfile
sys.stdout.reconfigure(encoding='utf-8')

zip_path = 'tmp_inspect/zenkamoku_n3/audio.zip'
out_dir = 'public/audio/zenkamoku_n3'
os.makedirs(out_dir, exist_ok=True)

with zipfile.ZipFile(zip_path) as z:
    for name in z.namelist():
        if name.endswith('.mp3'):
            basename = os.path.basename(name)
            out_path = os.path.join(out_dir, basename)
            if not os.path.exists(out_path):
                with z.open(name) as src, open(out_path, 'wb') as dst:
                    dst.write(src.read())

files = os.listdir(out_dir)
print(f'Audio extracted: {len(files)} files')
print('Sample:', sorted(files)[:5])
