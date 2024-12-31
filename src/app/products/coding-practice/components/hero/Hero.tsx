'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Brain, Rocket } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/50" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#ff8f71]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Master Your Coding Skills
            </motion.h1>
            <motion.p
              className="text-lg text-white/60 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Practice with real interview questions, get instant feedback, and improve your problem-solving abilities with our comprehensive coding platform.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {[
                {
                  icon: <Code2 className="w-5 h-5 text-[#fcba28]" />,
                  title: 'Multiple Languages',
                  description: 'Code in your preferred language'
                },
                {
                  icon: <Sparkles className="w-5 h-5 text-[#fcba28]" />,
                  title: 'Real-time Feedback',
                  description: 'Get instant code analysis'
                },
                {
                  icon: <Brain className="w-5 h-5 text-[#fcba28]" />,
                  title: 'Smart Testing',
                  description: 'Comprehensive test cases'
                },
                {
                  icon: <Rocket className="w-5 h-5 text-[#fcba28]" />,
                  title: 'Performance Tracking',
                  description: 'Monitor your progress'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {feature.icon}
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Animated Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <div className="bg-black/50 backdrop-blur-xl p-4">
                {/* Editor Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-sm text-white/60">main.py</div>
                </div>

                {/* Code Content */}
                <pre className="text-sm font-mono">
                  <code className="text-[#fcba28]">
                    {`def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test cases
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Result: {result}")  # [0, 1]`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-[#fcba28]/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
