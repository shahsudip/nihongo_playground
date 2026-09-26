import os
import shutil

AUDIO_DIR = "public/audio/shinkanzen_listening"
DIST_AUDIO_DIR = "dist/audio/shinkanzen_listening"

def organize():
    cd1_dir = os.path.join(AUDIO_DIR, "CD1")
    cd2_dir = os.path.join(AUDIO_DIR, "CD2")
    os.makedirs(cd1_dir, exist_ok=True)
    os.makedirs(cd2_dir, exist_ok=True)

    files = [f for f in os.listdir(AUDIO_DIR) if f.endswith('.mp3')]
    print(f"Found {len(files)} MP3 files in {AUDIO_DIR}")

    for f in files:
        src = os.path.join(AUDIO_DIR, f)
        # e.g., shinkanzen_chokai_n3_CD-A_001.mp3
        if "CD-A_" in f:
            track_num = int(f.split("CD-A_")[1].replace(".mp3", ""))
            # Alias 1: 01 Track 1.mp3
            alias1 = f"{track_num:02d} Track {track_num}.mp3"
            alias2 = f"track_{track_num:03d}.mp3"
            alias3 = f"{track_num}.mp3"
            
            shutil.copy2(src, os.path.join(cd1_dir, alias1))
            shutil.copy2(src, os.path.join(cd1_dir, alias2))
            shutil.copy2(src, os.path.join(cd1_dir, alias3))
            shutil.copy2(src, os.path.join(cd1_dir, f))
        elif "CD-B_" in f:
            track_num = int(f.split("CD-B_")[1].replace(".mp3", ""))
            alias1 = f"{track_num:02d} Track {track_num}.mp3"
            alias2 = f"track_{track_num:03d}.mp3"
            alias3 = f"{track_num}.mp3"
            
            shutil.copy2(src, os.path.join(cd2_dir, alias1))
            shutil.copy2(src, os.path.join(cd2_dir, alias2))
            shutil.copy2(src, os.path.join(cd2_dir, alias3))
            shutil.copy2(src, os.path.join(cd2_dir, f))

    # Mirror to dist/audio/shinkanzen_listening
    if os.path.exists("dist/audio"):
        for root, dirs, fnames in os.walk(AUDIO_DIR):
            rel = os.path.relpath(root, AUDIO_DIR)
            dest_folder = os.path.join(DIST_AUDIO_DIR, rel)
            os.makedirs(dest_folder, exist_ok=True)
            for fname in fnames:
                shutil.copy2(os.path.join(root, fname), os.path.join(dest_folder, fname))
        print("Mirrored all audio files to dist/audio/shinkanzen_listening")

if __name__ == '__main__':
    organize()
