"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";

const StepCard = ({ number, title, description }: {
  number: number;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 relative"
  >
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#fcba28] rounded-full flex items-center justify-center text-black font-bold text-xl">
      {number}
    </div>
    <h3 className="text-xl font-bold text-[#fcba28] mb-3 mt-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export default function PersonalizedTestPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
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
              Personalized AI Test
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mb-12"
            >
              Take a customized aptitude test tailored to your specific needs and skill level
            </motion.p>
          </div>

          {/* Steps Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StepCard
                number={1}
                title="Initial Assessment"
                description="Complete a brief assessment to help our AI understand your current skill level"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StepCard
                number={2}
                title="AI Analysis"
                description="Our AI analyzes your performance and creates a personalized test plan"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <StepCard
                number={3}
                title="Custom Test"
                description="Take your personalized test with questions matched to your abilities"
              />
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-8 rounded-xl bg-black/30 backdrop-blur-lg"
            >
              <h3 className="text-2xl font-bold text-[#fcba28] mb-4">Why Personalized?</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-[#fcba28]">✓</span>
                  Tailored difficulty level
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#fcba28]">✓</span>
                  Focus on your weak areas
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#fcba28]">✓</span>
                  Adaptive question selection
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#fcba28]">✓</span>
                  Detailed performance insights
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-8 rounded-xl bg-black/30 backdrop-blur-lg"
            >
              <h3 className="text-2xl font-bold text-[#fcba28] mb-4">What You'll Get</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-[#fcba28]">✓</span>
                  Personalized question set
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#fcba28]">✓</span>
                  AI-powered explanations
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#fcba28]">✓</span>
                  Progress tracking
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#fcba28]">✓</span>
                  Improvement recommendations
                </li>
              </ul>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center py-16"
          >
            <Link
              href="/products/aptitude-ai/personalized/start"
              className="px-8 py-4 bg-[#fcba28] text-black rounded-full font-semibold hover:bg-[#ffd700] transition-colors inline-block"
            >
              Start Your Personalized Test
            </Link>
          </motion.div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
