'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInterviewStore } from '../store/interviewStore';
import { generateInterviewQuestions } from '../services/interview';

interface InterviewSetupProps {
  onComplete: () => void;
}

export function InterviewSetup({ onComplete }: InterviewSetupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { resumeData, setTargetRole, setQuestions, targetRole } = useInterviewStore();

  const handleStartInterview = async () => {
    if (!resumeData) {
      setError('Resume data is missing. Please upload your resume again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const questions = await generateInterviewQuestions(resumeData, targetRole);
      setQuestions(questions);
      onComplete();
    } catch (err) {
      console.error('Error starting interview:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to start interview. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!resumeData) return null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#fcba28] mb-4">Interview Setup</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Configure your interview settings and preferences.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">Resume Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <div className="text-white">{resumeData.fullName}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Current Role</label>
              <div className="text-white">{resumeData.currentRole}</div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">Interview Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Target Role (Optional)</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g., Senior Software Engineer"
                className="w-full px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartInterview}
            disabled={isLoading}
            className="px-6 py-3 bg-[#fcba28] text-black rounded-lg font-medium disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2 inline-block" />
                Preparing Interview...
              </>
            ) : (
              'Start Interview'
            )}
          </motion.button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500"
          >
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
