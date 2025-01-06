"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Calculator, TrendingUp, Building2, BrainCircuit, ArrowLeft } from 'lucide-react';
import { SalaryForm } from './components/SalaryForm';
import { SalaryResults } from './components/SalaryResults';
import { useSalaryPrediction } from './hooks/useSalaryPrediction';
import { BackgroundEffects } from './components/BackgroundEffects';
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from 'next/link';

export default function SalaryNegotiationPage() {
  const [showResults, setShowResults] = useState(false);
  const { result, loading, error, getPrediction } = useSalaryPrediction();

  useEffect(() => {
    if (error) {
      setShowResults(false);
    }
  }, [error]);

  const handleSubmit = async (formData: any) => {
    try {
      await getPrediction(formData);
      setShowResults(true);
    } catch (err) {
      setShowResults(false);
    }
  };

  const handleReset = () => {
    setShowResults(false);
  };

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Content */}
      <div className="relative z-10">
        <MaxWidthWrapper>
          <div className="py-20">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12 text-center"
            >
              <Link
                href="/services"
                className="inline-flex items-center text-[#fcba28] hover:text-[#fcba28]/80 mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Link>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
              >
                AI Salary Negotiation
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
              >
                Get accurate salary insights powered by AI. Make informed decisions about your career and negotiate with confidence.
              </motion.p>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto relative">
              <AnimatePresence mode="wait">
                {!showResults ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SalaryForm onSubmit={handleSubmit} />
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
                    <div className="flex justify-end">
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="text-[#fcba28] border-[#fcba28] hover:bg-[#fcba28]/10 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Start Over
                      </Button>
                    </div>
                    <SalaryResults result={result} />
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
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-gray-900/90 p-8 rounded-xl shadow-xl text-center backdrop-blur-lg border border-[#fcba28]/20"
                    >
                      <div className="relative w-16 h-16 mx-auto mb-4">
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-[#fcba28]/30"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-[#fcba28] border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white"
                      >
                        Analyzing salary data...
                      </motion.p>
                    </motion.div>
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
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="text-red-400 mb-2 text-lg font-semibold"
                    >
                      Error Processing Request
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-red-300"
                    >
                      {error}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
