'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { PracticeMode } from "../../components/PracticeMode";

const questions = [
  {
    id: "vr1",
    question: `Choose the word that best completes the analogy:
SYMPHONY : COMPOSER :: NOVEL : ?`,
    options: ["Reader", "Writer", "Publisher", "Editor"],
    answer: "Writer",
    explanation: "A symphony is created by a composer, just as a novel is created by a writer. The relationship is that of creator and creation.",
    difficulty: "Medium" as const,
    category: "Analogies",
    hints: [
      "Focus on the relationship between the first pair",
      "Look for a similar relationship in the second pair"
    ]
  },
  {
    id: "vr2",
    question: `Read the passage and answer the question:

The rise of artificial intelligence has sparked debates about its impact on employment. While some argue that AI will eliminate jobs, others contend that it will create new opportunities and transform existing roles. Historical precedents suggest that technological revolutions typically lead to job displacement in the short term but job creation in the long term.

What is the main argument of this passage?`,
    options: [
      "AI will definitely eliminate jobs",
      "AI will only create new jobs",
      "AI's impact on employment is complex and multifaceted",
      "Historical precedents are irrelevant to AI's impact"
    ],
    answer: "AI's impact on employment is complex and multifaceted",
    explanation: "The passage presents multiple perspectives on AI's impact on employment and uses historical context to suggest that the effects are not simple or one-dimensional.",
    difficulty: "Hard" as const,
    category: "Reading Comprehension",
    hints: [
      "Look for the overall theme that connects all points",
      "Notice how the passage presents different viewpoints"
    ]
  },
  {
    id: "vr3",
    question: `Choose the word that is most nearly OPPOSITE in meaning to PROLIFIC:`,
    options: ["Barren", "Fertile", "Abundant", "Productive"],
    answer: "Barren",
    explanation: "PROLIFIC means producing a lot or being highly productive. BARREN means unproductive or infertile, making it the opposite of prolific.",
    difficulty: "Medium" as const,
    category: "Antonyms",
    hints: [
      "Think about what PROLIFIC means in terms of production",
      "Look for a word that suggests lack of production"
    ]
  },
  {
    id: "vr4",
    question: `Complete the sentence with the most appropriate word:

Despite his _______ manner, he was actually quite kind and generous.`,
    options: ["Gregarious", "Austere", "Effusive", "Benevolent"],
    answer: "Austere",
    explanation: "The sentence suggests a contrast between appearance and reality. 'Austere' (stern or severe in manner) contrasts well with 'kind and generous'.",
    difficulty: "Hard" as const,
    category: "Sentence Completion",
    hints: [
      "Look for the contrast indicated by 'Despite'",
      "The word should contrast with 'kind and generous'"
    ]
  },
  {
    id: "vr5",
    question: `Arrange the following sentences in logical order:

1. However, the experiment yielded unexpected results.
2. The scientists had been working on the project for months.
3. This led to a completely new direction in their research.
4. They carefully documented all their findings.
5. These results challenged their initial hypothesis.`,
    options: [
      "2,1,5,3,4",
      "2,4,1,5,3",
      "1,2,3,4,5",
      "4,2,1,5,3"
    ],
    answer: "2,1,5,3,4",
    explanation: "The logical sequence is:\n1. Initial situation (working for months)\n2. Main event (unexpected results)\n3. Impact on hypothesis\n4. New direction\n5. Documentation",
    difficulty: "Hard" as const,
    category: "Sentence Arrangement",
    hints: [
      "Look for the opening sentence that sets the context",
      "Follow the cause-and-effect relationship"
    ]
  },
  {
    id: "vr6",
    question: `In the following question, two statements are given followed by two conclusions. Choose the conclusion that logically follows:

Statements:
All cats are animals.
Some animals are pets.

Conclusions:
I. Some cats are pets.
II. All pets are cats.`,
    options: [
      "Only I follows",
      "Only II follows",
      "Both I and II follow",
      "Neither I nor II follows"
    ],
    answer: "Neither I nor II follows",
    explanation: "From the statements:\n1. We know all cats are animals\n2. Some animals are pets\n3. We can't conclude that any cats are among the animals that are pets\n4. We also can't conclude that all pets are cats\nTherefore, neither conclusion logically follows.",
    difficulty: "Hard" as const,
    category: "Logical Deduction",
    hints: [
      "Draw a Venn diagram",
      "Check if there's a definite overlap between sets"
    ]
  }
];

export default function VerbalReasoningPracticePage() {
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
              href="/products/aptitude-ai/standard/verbal-reasoning"
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

              {/* Performance Analysis */}
              <div className="max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Topic Performance</h2>
                <div className="grid gap-4">
                  {["Analogies", "Reading Comprehension", "Antonyms", "Sentence Completion", "Logical Deduction"].map(topic => {
                    const topicQuestions = questions.filter(q => q.category === topic);
                    const correctAnswers = results.filter((r: any, i: number) => 
                      r.correct && questions[i].category === topic
                    ).length;
                    return (
                      <div key={topic} className="p-4 rounded-lg bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white">{topic}</span>
                          <span className="text-[#fcba28]">
                            {correctAnswers}/{topicQuestions.length}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#fcba28]"
                            style={{ width: `${(correctAnswers / topicQuestions.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-4">
                <Link
                  href="/products/aptitude-ai/standard/verbal-reasoning"
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
