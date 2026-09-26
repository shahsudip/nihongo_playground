import subprocess
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

dist_dir = os.path.abspath("dist")
if not os.path.exists(dist_dir):
    print("dist directory does not exist! Running build first...")
    subprocess.run(["npm", "run", "build"], check=True)

print("Deploying dist directory to gh-pages branch...")

# Inside dist, initialize git, set remote, and push to gh-pages branch
commands = [
    ["git", "init"],
    ["git", "checkout", "-B", "gh-pages"],
    ["git", "add", "-A"],
    ["git", "commit", "-m", "Deploy to GitHub Pages"],
    ["git", "remote", "add", "origin", "https://github.com/shahsudip/nihongo_playground.git"],
    ["git", "push", "-u", "origin", "gh-pages", "--force"]
]

for cmd in commands:
    print(f"Running: {' '.join(cmd)}")
    try:
        res = subprocess.run(cmd, cwd=dist_dir, capture_output=True, text=True, encoding='utf-8')
        if res.returncode != 0 and "remote origin already exists" not in res.stderr:
            if "already exists" in res.stderr:
                # set url instead
                subprocess.run(["git", "remote", "set-url", "origin", "https://github.com/shahsudip/nihongo_playground.git"], cwd=dist_dir, check=True)
            else:
                print(f"Stderr: {res.stderr}")
        else:
            if res.stdout:
                print(f"Stdout: {res.stdout.strip()}")
    except Exception as e:
        print(f"Error: {e}")

print("GitHub Pages deployment complete!")
