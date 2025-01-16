'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-[#fcba28] text-4xl font-bold">Oops!</div>
          <div className="text-white text-xl">Something went wrong</div>
          <div className="text-gray-400">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </div>
          
          <div className="flex justify-center gap-4 pt-6">
            <Link
              href="/products/mock-interviews/visual-simulation"
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Link>
            <button
              onClick={reset}
              className="px-6 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcba28]/90 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
