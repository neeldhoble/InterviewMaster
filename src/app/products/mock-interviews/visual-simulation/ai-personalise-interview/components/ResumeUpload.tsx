'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, AlertCircle, CheckCircle, X, FileText, Loader2, ArrowRight } from 'lucide-react';
import { parseResumeWithGemini } from '../services/resumeParser';
import { extractTextFromFile, validateFileType, validateFileSize, formatFileSize } from '../utils/fileReader';

interface ResumeUploadProps {
  onComplete: (resumeData?: any) => void;
  onSkip: () => void;
}

export function ResumeUpload({ onComplete, onSkip }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const resetState = () => {
    setFile(null);
    setError(null);
    setIsLoading(false);
    setUploadProgress(0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    await handleFile(droppedFile);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await handleFile(selectedFile);
    }
  };

  const handleFile = async (file: File) => {
    try {
      setError(null);
      setIsLoading(true);
      setFile(file);
      setUploadProgress(0);

      // Validate file size
      if (!validateFileSize(file)) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Validate file type
      if (!validateFileType(file)) {
        throw new Error('Invalid file format. Please upload a PDF, DOC, DOCX, TXT, or RTF file.');
      }

      // Start progress simulation
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      try {
        // Extract text from file
        const text = await extractTextFromFile(file);
        
        if (!text || text.length < 100) {
          throw new Error('Resume content is too short or empty. Please provide a more detailed resume.');
        }

        // Parse resume with AI
        const resumeData = await parseResumeWithGemini(text);

        // Complete upload
        setUploadProgress(100);
        clearInterval(progressInterval);
        
        // Notify parent component
        onComplete(resumeData);

      } catch (error: any) {
        clearInterval(progressInterval);
        throw error;
      }

    } catch (err: any) {
      console.error('Resume upload error:', err);
      setError(err.message || 'Failed to process resume');
      setFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Skip Option */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Upload Your Resume (Optional)</h2>
        <button
          onClick={onSkip}
          className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
        >
          Skip <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Info Message */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-200">
          Uploading your resume will help us personalize your interview experience, but it&apos;s completely optional. 
          You can skip this step and still proceed with the interview.
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-[#fcba28] transition-colors"
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt,.rtf"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#fcba28]/20 flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="w-8 h-8 text-[#fcba28] animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-[#fcba28]" />
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white">
              {file ? file.name : 'Upload Resume'}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Drag & drop your resume or click to browse
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX, TXT, RTF (max 10MB)
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadProgress > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Processing resume...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              className="h-full bg-[#fcba28]"
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/50 rounded-lg p-4"
        >
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-red-500 font-medium mb-1">Error</h4>
              <p className="text-gray-300 text-sm">{error}</p>
              <div className="mt-3 space-y-2 text-sm text-gray-400">
                <p>Tips:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Make sure your file is in a supported format</li>
                  <li>Ensure the file is not empty or scanned</li>
                  <li>Check that the file size is under 10MB</li>
                  <li>Verify that your resume contains basic information</li>
                  <li>Try converting scanned PDFs to text first</li>
                </ul>
              </div>
            </div>
            <button
              onClick={resetState}
              className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </motion.div>
      )}

      {/* File Info */}
      {file && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#fcba28]/20 rounded-lg">
              <FileText className="w-5 h-5 text-[#fcba28]" />
            </div>
            <div>
              <p className="text-white font-medium">{file.name}</p>
              <p className="text-sm text-gray-400">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>
          {uploadProgress === 100 && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onSkip}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Skip for now
        </button>
        <button
          onClick={() => onComplete()}
          className="px-6 py-2 bg-[#fcba28] text-black font-medium rounded-lg hover:bg-[#fcba28]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Continue {!isLoading && <ArrowRight className="w-4 h-4 inline-block ml-2" />}
        </button>
      </div>
    </div>
  );
}
