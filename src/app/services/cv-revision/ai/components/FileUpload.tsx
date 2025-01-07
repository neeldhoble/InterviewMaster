'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { readFileContent } from '../utils/fileReader';

interface FileUploadProps {
  onFileContent: (content: string) => void;
  onError: (error: string) => void;
}

export const FileUpload = ({ onFileContent, onError }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    try {
      setIsProcessing(true);
      const content = await readFileContent(file);
      if (!content.trim()) {
        throw new Error('The file appears to be empty');
      }
      onFileContent(content);
    } catch (err: any) {
      console.error('File processing error:', err);
      onError(err.message || 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  }, [onFileContent, onError]);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  }, [handleFile]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  }, [handleFile]);

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
        isDragging
          ? 'border-[#fcba28] bg-[#fcba28]/10'
          : 'border-white/10 hover:border-[#fcba28]/50 hover:bg-[#fcba28]/5'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleFileSelect}
        accept=".txt,.doc,.docx,.pdf,.rtf,.md,.csv"
        className="hidden"
        id="file-upload"
      />
      
      <Upload className="w-12 h-12 text-[#fcba28] mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Drop your CV here</h3>
      <p className="text-gray-400 mb-6">or</p>
      
      <Button
        onClick={() => document.getElementById('file-upload')?.click()}
        className="bg-[#fcba28] hover:bg-[#fcba28]/90 text-black font-semibold"
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Browse Files'}
      </Button>
      
      <p className="text-sm text-gray-400 mt-4">
        Supported formats: TXT, DOC, DOCX, PDF, RTF, MD, CSV
      </p>

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl"
        >
          <div className="text-[#fcba28] flex items-center space-x-2">
            <motion.div
              className="w-4 h-4 border-2 border-[#fcba28] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Processing file...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
