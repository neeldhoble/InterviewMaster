'use client';

import React from 'react';
import { Hero } from './components/hero/Hero';
import { Features } from './components/features/Features';
import { ProblemsList } from './components/problems/ProblemsList';
import { motion } from 'framer-motion';
import { Code2, Brain, BookOpen, Target } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Practice Problems',
    description: 'Solve coding problems with real-time feedback and hints',
    link: '/products/coding-practice/problems'
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Learning Paths',
    description: 'Follow structured paths to master algorithms and data structures',
    link: '/products/coding-practice/learning-paths'
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI Assistant',
    description: 'Get personalized help and explanations from our AI tutor',
    link: '/products/coding-practice/problems'
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Company Focus',
    description: 'Practice problems from top tech companies',
    link: '/products/coding-practice/problems'
  }
];

export default function CodingPracticePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-16"> {/* Added padding-top to account for header */}
        <Hero />
        
        {/* Feature Cards */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link href={feature.link} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#fcba28]/50 transition-all cursor-pointer h-full"
                >
                  <div className="p-3 rounded-lg bg-white/10 text-[#fcba28] w-fit mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#fcba28] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60">
                    {feature.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        <Features />

        {/* Recent Problems Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              Recent Problems
            </h2>
            <Link 
              href="/products/coding-practice/problems"
              className="text-[#fcba28] hover:text-[#ff8f71] transition-colors"
            >
              View All Problems →
            </Link>
          </div>
          <ProblemsList />
        </div>
      </div>
    </main>
  );
}
