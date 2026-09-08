import sys
from PIL import Image
import numpy as np

img91 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0091.jpg')
# Let's inspect the exact lines of the table by scanning horizontal and vertical lines in grayscale
gray = np.array(img91.convert('L'))
print("Gray shape:", gray.shape)

# Let's crop the table area and save as a clear high-res image
# We can find table bounding box
# Let's save a cropped view of page 91 table
crop91 = img91.crop((100, 300, 1800, 1500))
crop91.save('tmp_vocab/p91_table_view.jpg')
print("Saved p91_table_view.jpg")
