'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { PracticeMode } from "../../components/PracticeMode";

const questions = [
  {
    id: "lr1",
    question: "In a certain code, 'COMPUTER' is written as 'RFUVQNPC'. How will 'PRINTER' be written in that code?",
    options: ["SFUOJSQ", "SFUOJSF", "QSJOUFQ", "QSJOUFS"],
    answer: "QSJOUFQ",
    explanation: "The code is formed by replacing each letter with the letter that comes before it in the alphabet.\nP → Q\nR → S\nI → J\nN → O\nT → U\nE → F\nR → S",
    difficulty: "Medium" as const,
    category: "Coding-Decoding",
    hints: [
      "Look for the pattern in how each letter is transformed",
      "Try writing out the alphabet and see how letters shift"
    ]
  },
  {
    id: "lr2",
    question: "Find the missing number in the series: 2, 6, 12, 20, ?, 42",
    options: ["30", "32", "34", "36"],
    answer: "30",
    explanation: "The pattern is adding consecutive even numbers:\n2 + 4 = 6\n6 + 6 = 12\n12 + 8 = 20\n20 + 10 = 30\n30 + 12 = 42",
    difficulty: "Easy" as const,
    category: "Number Series",
    hints: [
      "Look at the difference between consecutive numbers",
      "Is the difference following a pattern?"
    ]
  },
  {
    id: "lr3",
    question: "If A + B means A is the mother of B; A × B means A is the sister of B; A ÷ B means A is the father of B; A - B means A is the brother of B, then which of the following means M is the uncle of N?",
    options: [
      "M - P + N",
      "M × P + N",
      "M - P ÷ N",
      "M + P × N"
    ],
    answer: "M - P + N",
    explanation: "To be an uncle, M must be the brother of N's parent.\nM - P means M is brother of P\nP + N means P is mother of N\nTherefore, M - P + N means M is brother of N's mother, making M the uncle of N",
    difficulty: "Hard" as const,
    category: "Blood Relations",
    hints: [
      "Break down what makes someone an uncle",
      "Follow the relationships one at a time"
    ]
  },
  {
    id: "lr4",
    question: "Statement: All cats are animals. Some animals are pets.\nConclusion: Some cats are pets.",
    options: [
      "Definitely true",
      "Probably true",
      "Insufficient data",
      "Definitely false"
    ],
    answer: "Insufficient data",
    explanation: "While all cats are animals, and some animals are pets, we cannot definitively conclude that any cats fall into the 'pets' subset of animals. The pets could be other animals.",
    difficulty: "Medium" as const,
    category: "Syllogisms",
    hints: [
      "Draw a Venn diagram",
      "Consider if there's a guaranteed overlap between sets"
    ]
  }
];

export default function LogicalReasoningPracticePage() {
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
              href="/products/aptitude-ai/standard/logical-reasoning"
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
                  href="/products/aptitude-ai/standard/logical-reasoning"
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
