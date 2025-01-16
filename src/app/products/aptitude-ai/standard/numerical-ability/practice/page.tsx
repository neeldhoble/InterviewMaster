'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { PracticeMode } from "../../components/PracticeMode";

// Sample questions - replace with your actual questions
const questions = [
  {
    id: "na1",
    question: "If a shirt's price is reduced by 20% from $100, what is the final price?",
    options: ["$80", "$85", "$75", "$90"],
    answer: "$80",
    explanation: "To find the final price after a 20% discount:\n1. Calculate 20% of $100 = $20\n2. Subtract the discount from original price: $100 - $20 = $80",
    difficulty: "Easy" as const,
    category: "Percentages",
    hints: [
      "Convert percentage to decimal: 20% = 0.2",
      "Use the formula: Original - (Original × Discount%)"
    ]
  },
  {
    id: "na2",
    question: "What is the ratio of 15 to 25 in its simplest form?",
    options: ["3:5", "5:3", "2:5", "5:2"],
    answer: "3:5",
    explanation: "To simplify a ratio:\n1. Find the GCD of 15 and 25 (5)\n2. Divide both numbers by GCD: 15÷5 : 25÷5 = 3:5",
    difficulty: "Medium" as const,
    category: "Ratios",
    hints: [
      "Find the Greatest Common Divisor (GCD)",
      "Divide both numbers by the GCD"
    ]
  }
];

export default function NumericalAbilityPracticePage() {
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleComplete = (practiceResults: any) => {
    setResults(practiceResults);
    setPracticeComplete(true);
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10">
        <MaxWidthWrapper className="py-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              href="/products/aptitude-ai/standard/numerical-ability"
              className="inline-flex items-center text-[#fcba28] hover:text-[#ffd700] transition-colors gap-2 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Overview
            </Link>
          </div>

          {practiceComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <h1 className="text-4xl font-bold text-white mb-6">Practice Complete!</h1>
              <p className="text-gray-300 mb-8">
                You've completed {questions.length} questions. Here's your performance:
              </p>
              
              {/* Results summary */}
              <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
                <div className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                  <div className="text-3xl font-bold text-[#fcba28] mb-2">
                    {results.filter((r: any) => r.correct).length}/{questions.length}
                  </div>
                  <div className="text-gray-400">Correct Answers</div>
                </div>
                <div className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                  <div className="text-3xl font-bold text-[#fcba28] mb-2">
                    {Math.round((results.filter((r: any) => r.correct).length / questions.length) * 100)}%
                  </div>
                  <div className="text-gray-400">Accuracy</div>
                </div>
                <div className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                  <div className="text-3xl font-bold text-[#fcba28] mb-2">
                    {Math.round(results.reduce((acc: number, r: any) => acc + r.timeSpent, 0) / results.length)}s
                  </div>
                  <div className="text-gray-400">Avg. Time per Question</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-4">
                <Link
                  href="/products/aptitude-ai/standard/numerical-ability"
                  className="px-6 py-3 bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 text-[#fcba28] rounded-xl hover:border-[#fcba28]/40 transition-colors"
                >
                  Back to Topics
                </Link>
                <button
                  onClick={() => {
                    setPracticeComplete(false);
                    setResults(null);
                  }}
                  className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#ffd700] transition-colors"
                >
                  Practice Again
                </button>
              </div>
            </motion.div>
          ) : (
            <PracticeMode 
              questions={questions}
              onComplete={handleComplete}
            />
          )}
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
