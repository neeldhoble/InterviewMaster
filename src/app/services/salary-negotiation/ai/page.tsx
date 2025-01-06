"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Calculator, TrendingUp, Building2, BrainCircuit, ArrowLeft } from 'lucide-react';
import { SalaryForm } from './components/SalaryForm';
import { SalaryResults } from './components/SalaryResults';
import { useSalaryPrediction } from './hooks/useSalaryPrediction';
import Link from 'next/link';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

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
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/services/salary-negotiation" className="inline-block">
            <Button variant="ghost" className="mb-4 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Salary Negotiation
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-[#fcba28]" />
            <h1 className="text-3xl font-bold text-white">AI Salary Calculator</h1>
          </div>
          <p className="text-gray-400">
            Get precise salary predictions powered by advanced AI and real market data
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            {
              icon: <Calculator className="w-6 h-6" />,
              title: "Accurate Predictions",
              description: "Get precise salary estimates based on real market data"
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: "Market Insights",
              description: "Understand industry trends and market demand"
            },
            {
              icon: <Building2 className="w-6 h-6" />,
              title: "Industry Specific",
              description: "Tailored insights for your industry and role"
            },
            {
              icon: <DollarSign className="w-6 h-6" />,
              title: "Negotiation Tips",
              description: "Get personalized advice for salary negotiations"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-colors hover:bg-white/10"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-[#fcba28]/10 rounded-full text-[#fcba28]">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {!showResults && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-8"
              >
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold text-center mb-8 text-white">
                    Calculate Your Worth
                  </h2>
                  <SalaryForm onSubmit={handleSubmit} />
                </div>
              </motion.div>
            )}

            {showResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-8"
              >
                {error ? (
                  <div className="text-center text-red-400 p-4">
                    <p>Error: {error}</p>
                    <Button
                      onClick={handleReset}
                      className="mt-4 border-white/10 hover:bg-white/10"
                      variant="outline"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : loading ? (
                  <div className="flex flex-col items-center justify-center p-8 space-y-4">
                    <div className="w-12 h-12 border-4 border-[#fcba28] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white/70">Analyzing market data...</p>
                  </div>
                ) : result ? (
                  <>
                    <div className="flex justify-end mb-6">
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="text-sm border-white/10 hover:bg-white/10 text-white"
                      >
                        New Calculation
                      </Button>
                    </div>
                    <SalaryResults result={result} />
                  </>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-gray-400 mt-8"
          >
            <p>
              Our AI model is trained on millions of data points and updated regularly.
              <br />
              Results are for informational purposes and may vary based on specific circumstances.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
