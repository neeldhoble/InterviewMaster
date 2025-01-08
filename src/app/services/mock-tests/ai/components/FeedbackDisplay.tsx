"use client";

import { motion } from 'framer-motion';
import { FaChartLine, FaStar, FaCheck, FaTimes, FaRedo } from 'react-icons/fa';
import { Feedback } from '../types';

interface FeedbackDisplayProps {
  feedback: Feedback;
  onRestart: () => void;
}

export default function FeedbackDisplay({ feedback, onRestart }: FeedbackDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Overall Score */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#fcba28]">Interview Score</h3>
          <div className="text-3xl font-bold text-[#fcba28]">{feedback.score}%</div>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${feedback.score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-[#fcba28]"
          />
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Technical Accuracy</h3>
          <div className="text-3xl font-bold text-white">{feedback.technicalAccuracy}%</div>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Communication</h3>
          <div className="text-3xl font-bold text-white">{feedback.communicationClarity}%</div>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Structured Thinking</h3>
          <div className="text-3xl font-bold text-white">{feedback.structuredThinking}%</div>
        </div>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Strengths</h3>
          <ul className="space-y-2">
            {feedback.strengths.map((strength, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-300">
                <FaCheck className="text-green-400" />
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Areas for Improvement</h3>
          <ul className="space-y-2">
            {feedback.improvements.map((improvement, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-300">
                <FaTimes className="text-red-400" />
                {improvement}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedback.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10"
            >
              <FaStar className="text-[#fcba28] flex-shrink-0 mt-1" />
              <span className="text-gray-300">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300 flex items-center gap-2"
        >
          <FaRedo /> Practice Again
        </button>
      </div>
    </motion.div>
  );
}
