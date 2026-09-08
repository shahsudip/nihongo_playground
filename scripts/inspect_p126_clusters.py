import os, sys
from PIL import Image
import numpy as np

img = Image.open('tmp_inspect/individual_checks/p126_non_text_map.png').convert('L')
arr = np.array(img) == 0  # True where black ink is

# Find clusters
# Let's count ink in 100x100 blocks
H, W = arr.shape
for r in range(0, H, 100):
    for c in range(0, W, 100):
        block = arr[r:r+100, c:c+100]
        cnt = np.sum(block)
        if cnt > 500:
            print(f"Block at y=[{r}:{r+100}], x=[{c}:{c+100}] has {cnt} pixels")
