'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, Upload, Brain, MessageSquare, 
  Mic, BarChart, Play, AlertCircle
} from 'lucide-react';
import { AIInterviewContainer } from './components/AIInterviewContainer';

const features = [
  {
    icon: Brain,
    title: 'Smart Resume Analysis',
    description: 'Our AI analyzes your resume to create personalized interview questions based on your experience'
  },
  {
    icon: MessageSquare,
    title: 'Real-time Feedback',
    description: 'Get instant feedback on your responses, including clarity, relevance, and confidence metrics'
  },
  {
    icon: Mic,
    title: 'Voice Interaction',
    description: 'Natural voice interaction with our AI interviewer for a more immersive experience'
  },
  {
    icon: BarChart,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed performance metrics and improvement suggestions'
  }
];

export default function AIPersonalizedInterviewPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/products/mock-interviews/visual-simulation" 
            className="inline-flex items-center text-gray-400 hover:text-[#fcba28] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Interview Modes
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
          >
            <Brain className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
          >
            AI-Personalized Interview
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Experience a tailored interview session with our AI interviewer. 
            Upload your resume and get instant feedback on your responses.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[#fcba28]/20">
                  <feature.icon className="w-6 h-6 text-[#fcba28]" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Interview Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg"
        >
          <AIInterviewContainer />
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center text-gray-400 mb-4">
            <AlertCircle className="w-5 h-5 mr-2 text-[#fcba28]" />
            Need help?
          </div>
          <p className="text-gray-500">
            If you encounter any issues or have questions, our support team is here to help.
            <br />
            Contact us at support@interviewmaster.ai
          </p>
        </motion.div>
      </div>
    </div>
  );
}
