"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaVideo, FaComments } from 'react-icons/fa';
import Avatar from '@/components/Avatar';

export default function AIInterviewCoachingPage() {
  const [avatarState, setAvatarState] = useState<'idle' | 'speaking' | 'thinking' | 'greeting'>('idle');
  const [currentTip, setCurrentTip] = useState('');
  const [isSessionActive, setIsSessionActive] = useState(false);

  const interviewTips = [
    {
      category: 'Posture',
      tips: [
        'Keep your back straight and shoulders relaxed',
        'Maintain an open posture to show confidence',
        'Keep your feet planted firmly on the ground'
      ]
    },
    {
      category: 'Voice',
      tips: [
        'Speak clearly and at a moderate pace',
        'Use appropriate volume - not too loud or soft',
        'Take brief pauses to emphasize key points'
      ]
    },
    {
      category: 'Body Language',
      tips: [
        'Maintain good eye contact',
        'Use natural hand gestures while speaking',
        'Show engagement through subtle nodding'
      ]
    }
  ];

  const startSession = () => {
    setIsSessionActive(true);
    setAvatarState('speaking');
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI Interview{' '}
            <span className="bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
              Coach
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Perfect your interview skills with our AI-powered virtual coach
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Avatar Section */}
          <div className="relative h-[600px] bg-gradient-to-b from-[#fcba2810] to-transparent rounded-2xl p-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <Avatar 
                avatarState={avatarState}
                className="w-full h-full max-w-[400px] mx-auto"
              />
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-8">
            {/* Session Controls */}
            <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-4">Interview Session</h3>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={startSession}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <FaMicrophone />
                  Start Session
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 bg-[#ffffff15] py-3 px-6 rounded-lg hover:bg-[#ffffff20] transition-colors"
                >
                  <FaVideo />
                  Enable Camera
                </motion.button>
              </div>
            </div>

            {/* Real-time Feedback */}
            <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-4">Real-time Feedback</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-24">Posture</div>
                  <motion.div 
                    className="flex-1 bg-[#ffffff15] rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                  >
                    <motion.div 
                      className="bg-[#fcba28] rounded-full h-2"
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-24">Voice</div>
                  <motion.div 
                    className="flex-1 bg-[#ffffff15] rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                  >
                    <motion.div 
                      className="bg-[#fcba28] rounded-full h-2"
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-24">Eye Contact</div>
                  <motion.div 
                    className="flex-1 bg-[#ffffff15] rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                  >
                    <motion.div 
                      className="bg-[#fcba28] rounded-full h-2"
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Current Tip */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6"
              >
                <h3 className="text-2xl font-semibold mb-4">Coach's Tip</h3>
                <p className="text-gray-300">
                  {currentTip || "Click 'Start Session' to begin receiving real-time coaching tips"}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
