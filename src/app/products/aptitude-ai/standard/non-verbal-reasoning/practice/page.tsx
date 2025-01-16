'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { PracticeMode } from "../../components/PracticeMode";

const questions = [
  {
    id: "nvr1",
    question: `Complete the pattern series:

[Square] → [Circle] → [Triangle] → [Square] → [Circle] → ?`,
    options: ["Square", "Circle", "Triangle", "Pentagon"],
    answer: "Triangle",
    explanation: "The pattern follows a sequence: Square → Circle → Triangle, which repeats. After [Square] → [Circle], the next shape should be [Triangle] to continue the pattern.",
    difficulty: "Easy" as const,
    category: "Series Completion",
    hints: [
      "Look for repeating patterns",
      "Count the number of shapes in one complete cycle"
    ]
  },
  {
    id: "nvr2",
    question: `If a cube has the following numbers on its faces:
Front: 1, Right: 2, Top: 3
Back: 4, Left: 5, Bottom: 6

What number will be on the top face if the cube is rolled once to the right?`,
    options: ["1", "2", "3", "5"],
    answer: "1",
    explanation: "When a cube rolls to the right:\n1. The right face (2) becomes the top\n2. The top face (3) becomes the left\n3. The front face (1) becomes the top",
    difficulty: "Medium" as const,
    category: "Cubes & Dice",
    hints: [
      "Visualize the cube rolling to the right",
      "Track the movement of each face"
    ]
  },
  {
    id: "nvr3",
    question: `Which figure completes the analogy?

[Triangle in Circle] : [Circle in Square] :: [Square in Pentagon] : ?`,
    options: [
      "Pentagon in Hexagon",
      "Pentagon in Circle",
      "Hexagon in Pentagon",
      "Circle in Pentagon"
    ],
    answer: "Pentagon in Hexagon",
    explanation: "The pattern shows:\n1. First pair: smaller shape inside larger shape\n2. Second pair follows same logic\n3. Pattern is: Shape A in Shape B : Shape B in Shape C :: Shape C in Shape D : Shape D in Shape E",
    difficulty: "Hard" as const,
    category: "Analogy & Classification",
    hints: [
      "Identify the relationship between shapes in first pair",
      "Apply same relationship to second pair"
    ]
  },
  {
    id: "nvr4",
    question: `If the following figure is folded to form a cube, which face will be opposite to the face marked with 'X'?

[Paper folding diagram with faces: X, A, B, C, D, E]`,
    options: ["A", "B", "C", "D"],
    answer: "C",
    explanation: "To solve:\n1. Identify adjacent faces to X\n2. Faces A and B are adjacent to X\n3. Face C is three steps away from X\n4. In a cube, opposite faces are three steps apart",
    difficulty: "Hard" as const,
    category: "Mirror Images & Water Images",
    hints: [
      "Count the steps between faces",
      "Remember opposite faces never share an edge"
    ]
  },
  {
    id: "nvr5",
    question: `Find the odd one out:

1. [Circle with dot]
2. [Square with dot]
3. [Triangle with line]
4. [Pentagon with dot]`,
    options: ["1", "2", "3", "4"],
    answer: "3",
    explanation: "All figures except option 3 have a dot in the center. Option 3 has a line instead, making it the odd one out.",
    difficulty: "Medium" as const,
    category: "Analogy & Classification",
    hints: [
      "Look for common elements in the figures",
      "Identify any pattern breaks"
    ]
  }
];

export default function NonVerbalReasoningPracticePage() {
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
              href="/products/aptitude-ai/standard/non-verbal-reasoning"
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
                  href="/products/aptitude-ai/standard/non-verbal-reasoning"
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
