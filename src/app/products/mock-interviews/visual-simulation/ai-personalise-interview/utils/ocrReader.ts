import Tesseract from 'tesseract.js';

export async function extractTextFromImage(file: File): Promise<string> {
  try {
    const text = await Tesseract.recognize(
      file,
      'eng', // Language
      {
        logger: info => console.log(info) // Optional logging
      }
    );

    return text.data.text;
  } catch (error) {
    console.error('OCR extraction error:', error);
    throw new Error('Failed to extract text from image. Please ensure the image is clear and readable.');
  }
}
