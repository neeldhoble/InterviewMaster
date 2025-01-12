"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";

const TopicCard = ({ title, questionsCount, difficulty }: {
  title: string;
  questionsCount: number;
  difficulty: "Easy" | "Medium" | "Hard";
}) => {
  const difficultyColor = {
    Easy: "text-green-400",
    Medium: "text-yellow-400",
    Hard: "text-red-400"
  }[difficulty];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20"
    >
      <h3 className="text-xl font-bold text-[#fcba28] mb-2">{title}</h3>
      <p className="text-gray-300 text-sm mb-2">{questionsCount} questions</p>
      <p className={`${difficultyColor} text-sm`}>{difficulty}</p>
      <Link
        href={`/products/aptitude-ai/standard/${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="mt-4 inline-block px-4 py-2 bg-[#fcba28] text-black rounded-full text-sm font-semibold hover:bg-[#ffd700] transition-colors"
      >
        Practice Now
      </Link>
    </motion.div>
  );
};

export default function StandardPracticePage() {
  const topics = [
    { title: "Numerical Ability", questionsCount: 200, difficulty: "Medium" },
    { title: "Verbal Reasoning", questionsCount: 150, difficulty: "Hard" },
    { title: "Logical Reasoning", questionsCount: 180, difficulty: "Medium" },
    { title: "Data Interpretation", questionsCount: 120, difficulty: "Hard" },
    { title: "Non-verbal Reasoning", questionsCount: 160, difficulty: "Medium" },
    { title: "Basic Mathematics", questionsCount: 250, difficulty: "Easy" },
  ] as const;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10">
        <MaxWidthWrapper>
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center pt-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#ffd700] mb-6"
            >
              Standard Practice
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mb-12"
            >
              Practice with our comprehensive collection of AI-enhanced aptitude questions
            </motion.p>
          </div>

          {/* Topics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <TopicCard {...topic} />
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid md:grid-cols-3 gap-8 py-16 text-center"
          >
            <div>
              <h3 className="text-4xl font-bold text-[#fcba28]">1000+</h3>
              <p className="text-gray-300 mt-2">Practice Questions</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[#fcba28]">6</h3>
              <p className="text-gray-300 mt-2">Topic Categories</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[#fcba28]">24/7</h3>
              <p className="text-gray-300 mt-2">AI Assistance</p>
            </div>
          </motion.div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
