'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { PracticeMode } from "../../components/PracticeMode";

const questions = [
  {
    id: "di1",
    question: `Study the following line graph and answer the question:

Monthly Sales (in thousands)
Jan: 50
Feb: 45
Mar: 60
Apr: 55
May: 70
Jun: 65

What was the percentage increase in sales from January to May?`,
    options: ["30%", "35%", "40%", "45%"],
    answer: "40%",
    explanation: "To find the percentage increase:\n1. Initial value (Jan) = 50\n2. Final value (May) = 70\n3. Increase = 70 - 50 = 20\n4. Percentage increase = (20/50) × 100 = 40%",
    difficulty: "Medium" as const,
    category: "Line Graphs",
    hints: [
      "Find the absolute increase first",
      "Use the formula: (Increase ÷ Initial Value) × 100"
    ]
  },
  {
    id: "di2",
    question: `The following pie chart shows the distribution of a company's expenses:

Marketing: 25%
Operations: 30%
R&D: 20%
Admin: 15%
Others: 10%

If the total budget is $200,000, what is the amount spent on R&D?`,
    options: ["$35,000", "$40,000", "$45,000", "$50,000"],
    answer: "$40,000",
    explanation: "To find the R&D expense:\n1. Total budget = $200,000\n2. R&D percentage = 20%\n3. R&D amount = (20/100) × $200,000 = $40,000",
    difficulty: "Easy" as const,
    category: "Pie Charts",
    hints: [
      "Convert percentage to decimal",
      "Multiply total budget by the decimal"
    ]
  },
  {
    id: "di3",
    question: `Study the table and answer the question:

Product Sales by Quarter (units)
       Q1  Q2  Q3  Q4
Prod A: 100 120 90  150
Prod B: 80  100 110 130
Prod C: 120 110 130 140

Which product showed the highest growth from Q1 to Q4?`,
    options: ["Product A", "Product B", "Product C", "All showed equal growth"],
    answer: "Product B",
    explanation: "Let's calculate growth for each:\nProd A: 150-100 = 50 (50%)\nProd B: 130-80 = 50 (62.5%)\nProd C: 140-120 = 20 (16.7%)\nProduct B had the highest percentage growth.",
    difficulty: "Hard" as const,
    category: "Tables & Caselets",
    hints: [
      "Calculate both absolute and percentage growth",
      "Compare the percentage changes"
    ]
  },
  {
    id: "di4",
    question: `The bar graph shows monthly website visitors (in thousands):

Jan: 100
Feb: 120
Mar: 110
Apr: 150
May: 140
Jun: 160

What was the average monthly increase in visitors?`,
    options: ["10k", "12k", "15k", "18k"],
    answer: "12k",
    explanation: "To find average monthly increase:\n1. Total increase = 160k - 100k = 60k\n2. Number of intervals = 5\n3. Average increase = 60k ÷ 5 = 12k per month",
    difficulty: "Medium" as const,
    category: "Bar Charts",
    hints: [
      "Find total increase from first to last month",
      "Divide by number of intervals (months - 1)"
    ]
  }
];

export default function DataInterpretationPracticePage() {
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
              href="/products/aptitude-ai/standard/data-interpretation"
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
                  href="/products/aptitude-ai/standard/data-interpretation"
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
