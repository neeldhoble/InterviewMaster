"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCVAnalysis } from './hooks/useCVAnalysis';
import { FileUpload } from './components/FileUpload';

export default function CVRevisionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { analyzeCv, loading, error, result } = useCVAnalysis();

  const handleFileContent = async (content: string) => {
    try {
      await analyzeCv(content);
      setShowResults(true);
    } catch (err) {
      console.error('Analysis error:', err);
    }
  };

  const handleReset = () => {
    setFile(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
          >
            <FileText className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            AI CV Analysis
          </h1>
          <p className="text-xl text-gray-300">
            Get instant feedback and recommendations to improve your CV
          </p>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <FileUpload 
                onFileContent={handleFileContent}
                onError={(message) => console.error(message)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <FileText className="w-5 h-5 text-[#fcba28]" />
                  <span className="text-gray-300">{file?.name}</span>
                </div>
                <div className="flex space-x-4">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="text-[#fcba28] border-[#fcba28] hover:bg-[#fcba28]/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Analyze Another CV
                  </Button>
                  <Button
                    onClick={() => window.print()}
                    className="bg-[#fcba28] hover:bg-[#fcba28]/90 text-black"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Analysis
                  </Button>
                </div>
              </div>
              <div className="bg-[#fcba28]/5 border border-[#fcba28]/20 rounded-lg p-8">
                <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">
                  {result}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-black/80 p-8 rounded-xl shadow-xl text-center backdrop-blur-lg border border-[#fcba28]/20">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-[#fcba28] border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <p className="text-lg text-[#fcba28]">Analyzing your CV...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mt-4 text-center backdrop-blur-sm"
            >
              <div className="text-red-400 mb-2 text-lg font-semibold">
                Error Processing Request
              </div>
              <p className="text-red-300">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
