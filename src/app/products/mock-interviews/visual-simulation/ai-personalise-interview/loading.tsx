'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[#fcba28] text-4xl font-bold mb-4"
        >
          InterviewMaster.ai
        </motion.div>
        <div className="flex justify-center gap-2">
          <motion.div
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0,
            }}
            className="w-3 h-3 bg-[#fcba28] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.2,
            }}
            className="w-3 h-3 bg-[#fcba28] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4,
            }}
            className="w-3 h-3 bg-[#fcba28] rounded-full"
          />
        </div>
        <p className="text-gray-400 mt-4">Preparing your personalized interview experience...</p>
      </div>
    </div>
  );
}
