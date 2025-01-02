'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Database, Code2, ArrowRight } from 'lucide-react';
import { learningPaths } from '../data/learning-paths';
import { cn } from '@/lib/utils';

const icons = {
  Database,
  Code2,
};

export default function LearningPathsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#ff8f71]">
            Learning Paths
          </span>
        </h1>
        <p className="text-white/60 text-lg">
          Choose a learning path to master data structures, algorithms, and more
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => {
          const Icon = icons[path.icon as keyof typeof icons];
          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative"
            >
              <Link
                href={`/products/coding-practice/learning-paths/${path.id}`}
                className={cn(
                  'block p-6 rounded-xl border border-white/10',
                  'bg-white/5 hover:bg-white/10 transition-colors',
                  'group-hover:border-[#fcba28]/50'
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white/10 text-[#fcba28]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#fcba28] transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#fcba28] transition-colors">
                  {path.title}
                </h3>
                <p className="text-white/60">
                  {path.description}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="text-sm text-white/40">
                    {path.sections.length} sections
                  </div>
                  <div className="text-sm text-white/40">
                    {path.sections.reduce((acc, section) => acc + section.topics.length, 0)} topics
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
