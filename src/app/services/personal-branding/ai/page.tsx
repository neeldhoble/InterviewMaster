"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import { BrandingForm } from './components/BrandingForm';
import { BrandingResults } from './components/BrandingResults';
import { usePersonalBranding } from './hooks/usePersonalBranding';

export default function AIPersonalBrandingPage() {
  const {
    analyzePersonalBrand,
    resetAnalysis,
    exportAnalysis,
    loading,
    error,
    result,
    progress
  } = usePersonalBranding();

  return (
    <div className="min-h-screen bg-background text-white pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {!loading && !result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6">
                <FaRobot className="w-8 h-8 text-[#fcba28]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AI Personal Brand Builder
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Let our AI analyze and optimize your professional profiles for maximum impact
              </p>
            </div>

            <BrandingForm onSubmit={analyzePersonalBrand} />
          </motion.div>
        )}

        {loading && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#fcba28]/20 border-t-[#fcba28] rounded-full animate-spin" />
              <div className="mt-8 text-center">
                <div className="text-xl font-semibold mb-2">Analyzing Your Brand</div>
                <div className="text-gray-300">This may take a few moments...</div>
                <div className="mt-4 w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-[#fcba28] rounded-full"
                  />
                </div>
                <div className="mt-2 text-sm text-gray-400">{progress}% Complete</div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mt-12"
          >
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-lg text-center">
              <div className="text-lg font-semibold mb-2">Analysis Error</div>
              <p className="text-sm">{error}</p>
              <button
                onClick={resetAnalysis}
                className="mt-4 px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {result && !loading && (
          <BrandingResults
            result={result}
            onReset={resetAnalysis}
            onExport={exportAnalysis}
          />
        )}
      </div>
    </div>
  );
}
