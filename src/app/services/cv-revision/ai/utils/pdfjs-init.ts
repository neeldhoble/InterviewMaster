import * as PDFJS from 'pdfjs-dist';

// Initialize PDF.js worker
if (typeof window !== 'undefined') {
  PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;
}

export default PDFJS;
