import * as pdfjs from 'pdfjs-dist';
import { ResumeData } from '../types';
import mammoth from 'mammoth';

// Set worker path for PDF.js
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

export async function extractTextFromFile(file: File): Promise<string> {
  try {
    const fileType = file.type.toLowerCase();
    let text = '';

    // PDF files
    if (fileType === 'application/pdf') {
      text = await extractFromPDF(file);
    }
    // Word documents
    else if (
      fileType === 'application/msword' || // .doc
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || // .docx
      file.name.toLowerCase().endsWith('.doc') ||
      file.name.toLowerCase().endsWith('.docx')
    ) {
      text = await extractFromWord(file);
    }
    // Text files
    else if (
      fileType === 'text/plain' ||
      file.name.toLowerCase().endsWith('.txt')
    ) {
      text = await extractFromText(file);
    }
    // RTF files
    else if (
      fileType === 'application/rtf' ||
      fileType === 'text/rtf' ||
      file.name.toLowerCase().endsWith('.rtf')
    ) {
      text = await extractFromRTF(file);
    }
    // OpenDocument Text files
    else if (
      fileType === 'application/vnd.oasis.opendocument.text' ||
      file.name.toLowerCase().endsWith('.odt')
    ) {
      text = await extractFromODT(file);
    }
    else {
      throw new Error('Unsupported file format. Please use PDF, DOC, DOCX, TXT, RTF, or ODT files.');
    }

    // Validate extracted text
    if (!text || text.trim().length === 0) {
      throw new Error('No text content could be extracted from the file. Please ensure the file is not empty or corrupted.');
    }

    // Basic content validation
    if (!containsBasicResumeContent(text)) {
      throw new Error('The file does not appear to be a resume. Please ensure it contains basic resume information.');
    }

    return text;
  } catch (error: any) {
    console.error('Error extracting text:', error);
    throw new Error(error.message || 'Failed to extract text from file. Please try another file or format.');
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
      fullText += pageText + ' ';
    }

    return fullText.trim();
  } catch (error) {
    throw new Error('Error reading PDF file. Please ensure the file is not corrupted.');
  }
}

async function extractFromWord(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    throw new Error('Error reading Word document. Please ensure the file is not corrupted.');
  }
}

async function extractFromText(file: File): Promise<string> {
  try {
    return await file.text();
  } catch (error) {
    throw new Error('Error reading text file. Please ensure the file is not corrupted.');
  }
}

async function extractFromRTF(file: File): Promise<string> {
  try {
    const text = await file.text();
    // Remove RTF formatting
    return text.replace(/[\\{}\[\]]/g, ' ')
              .replace(/\\[a-z]+/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
  } catch (error) {
    throw new Error('Error reading RTF file. Please ensure the file is not corrupted.');
  }
}

async function extractFromODT(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    // Use mammoth for ODT as well
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    throw new Error('Error reading ODT file. Please ensure the file is not corrupted.');
  }
}

function containsBasicResumeContent(text: string): boolean {
  const normalizedText = text.toLowerCase();
  
  // Check for common resume sections
  const requiredSections = [
    // Contact Information
    /(?:e[-]?mail|phone|address|location)/,
    
    // Education or Experience
    /(?:education|qualification|degree|experience|work|employment)/,
    
    // Skills
    /(?:skills|expertise|proficiency|competencies)/
  ];

  // Check if at least 2 out of 3 section types are present
  const sectionsFound = requiredSections.filter(pattern => pattern.test(normalizedText));
  return sectionsFound.length >= 2;
}

export function cleanResumeText(text: string): string {
  return text
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove special characters but keep important punctuation
    .replace(/[^\w\s.,;:()\-&@]/g, ' ')
    // Remove multiple periods
    .replace(/\.{2,}/g, '.')
    // Remove multiple commas
    .replace(/,{2,}/g, ',')
    // Clean up spaces around punctuation
    .replace(/\s+([.,;:])/g, '$1')
    // Normalize line breaks
    .replace(/[\r\n]+/g, '\n')
    // Remove extra spaces after line breaks
    .replace(/\n\s+/g, '\n')
    // Trim whitespace
    .trim();
}

export function validateFileType(file: File): boolean {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/rtf',
    'text/rtf',
    'application/vnd.oasis.opendocument.text'
  ];

  const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.odt'];
  const fileName = file.name.toLowerCase();

  return allowedTypes.includes(file.type) ||
         allowedExtensions.some(ext => fileName.endsWith(ext));
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
