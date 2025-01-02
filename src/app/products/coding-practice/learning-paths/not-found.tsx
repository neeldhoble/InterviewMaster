"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LearningLayout } from './components/LearningLayout';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <LearningLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-[#fcba28] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-white/60 mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
            Try going back to the learning paths home.
          </p>
          <Link
            href="/products/coding-practice/learning-paths"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#fcba28]/20 text-[#fcba28] hover:bg-[#fcba28]/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Learning Paths
          </Link>
        </motion.div>
      </div>
    </LearningLayout>
  );
}
