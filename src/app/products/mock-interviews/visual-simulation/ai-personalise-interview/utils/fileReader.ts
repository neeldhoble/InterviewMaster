import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';
import { extractTextFromImage } from './ocrReader';

// Set worker for PDF.js
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

export async function extractTextFromFile(file: File): Promise<string> {
  try {
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();

    // PDF files
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      return await extractFromPDF(file);
    }
    
    // Word documents (DOC, DOCX)
    if (fileType === 'application/msword' || 
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileName.endsWith('.doc') || 
        fileName.endsWith('.docx')) {
      return await extractFromWord(file);
    }
    
    // RTF files
    if (fileType === 'application/rtf' || 
        fileType === 'text/rtf' || 
        fileName.endsWith('.rtf')) {
      return await extractFromRTF(file);
    }
    
    // Plain text files
    if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      return await extractFromText(file);
    }
    
    // Image files (for OCR)
    if (fileType.startsWith('image/')) {
      return await extractTextFromImage(file);
    }

    throw new Error('Unsupported file format');
  } catch (error: any) {
    console.error('Error extracting text:', error);
    throw new Error(error.message || 'Failed to read file content');
  }
}

async function extractFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\\n';
    }

    const cleanedText = fullText.trim();
    if (!cleanedText) {
      throw new Error('No readable text found in PDF');
    }

    return cleanedText;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF. Please ensure the PDF is not scanned or image-based.');
  }
}

async function extractFromWord(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    const cleanedText = result.value.trim();
    if (!cleanedText) {
      throw new Error('No readable text found in Word document');
    }

    return cleanedText;
  } catch (error) {
    console.error('Word extraction error:', error);
    throw new Error('Failed to extract text from Word document. Please ensure the file is not corrupted.');
  }
}

async function extractFromRTF(file: File): Promise<string> {
  try {
    const text = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string || '');
      reader.onerror = () => reject(new Error('Failed to read RTF file'));
      reader.readAsText(file);
    });

    // Remove RTF formatting
    const cleanedText = text
      .replace(/[\\{}\[\]]/g, ' ')
      .replace(/\\[a-z]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanedText) {
      throw new Error('No readable text found in RTF file');
    }

    return cleanedText;
  } catch (error) {
    console.error('RTF extraction error:', error);
    throw new Error('Failed to extract text from RTF file. Please try another format.');
  }
}

async function extractFromText(file: File): Promise<string> {
  try {
    const text = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string || '');
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    });

    const cleanedText = text.trim();
    if (!cleanedText) {
      throw new Error('Text file is empty');
    }

    return cleanedText;
  } catch (error) {
    console.error('Text extraction error:', error);
    throw new Error('Failed to read text file. Please ensure the file is not empty.');
  }
}

export function validateFileType(file: File): boolean {
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/rtf',
    'text/rtf',
    'image/jpeg',
    'image/png',
    'image/gif'
  ];

  const validExtensions = ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.jpg', '.jpeg', '.png', '.gif'];
  const fileName = file.name.toLowerCase();

  return validTypes.includes(file.type) ||
         validExtensions.some(ext => fileName.endsWith(ext));
}

export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
