import pytesseract
from PIL import Image
import sys
import os

def extract_text_from_image(image_path, lang='eng'):
    """
    Extracts text from an image using Tesseract OCR.
    
    Args:
        image_path (str): The path to the image file.
        lang (str): The language to use for OCR (e.g., 'eng' for English, 'jpn' for Japanese).
    
    Returns:
        str: The extracted text.
    """
    try:
        # Open the image file
        img = Image.open(image_path)
        
        # IMPORTANT: If Tesseract is not in your system PATH, uncomment the line below 
        # and update the path to where you installed tesseract.exe.
        # pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        
        # Extract the text
        text = pytesseract.image_to_string(img, lang=lang)
        return text
    except FileNotFoundError:
        print(f"Error: The file '{image_path}' was not found.")
        return None
    except pytesseract.TesseractNotFoundError:
        print("Error: Tesseract is not installed or not added to your PATH.")
        print("Please install Tesseract OCR and ensure it's in your system PATH, or uncomment and set the tesseract_cmd path in this script.")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_text.py <path_to_image> [language_code]")
        print("Example (English): python extract_text.py sample.png")
        print("Example (Japanese): python extract_text.py sample.png jpn")
        sys.exit(1)
        
    image_file = sys.argv[1]
    language = sys.argv[2] if len(sys.argv) > 2 else 'eng'
    
    print(f"Extracting text from '{image_file}' using language '{language}'...\n")
    
    extracted_text = extract_text_from_image(image_file, lang=language)
    
    if extracted_text:
        print("--- Extracted Text ---")
        print(extracted_text)
        print("----------------------")
