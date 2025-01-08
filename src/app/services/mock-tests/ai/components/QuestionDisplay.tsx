"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaStop, FaRedo } from 'react-icons/fa';
import { Question } from '../types';

interface QuestionDisplayProps {
  question: Question;
  onSubmitAnswer: (answer: string) => void;
  onRestart: () => void;
  isRecording: boolean;
  toggleRecording: () => void;
}

export default function QuestionDisplay({
  question,
  onSubmitAnswer,
  onRestart,
  isRecording,
  toggleRecording,
}: QuestionDisplayProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmitAnswer(answer);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-sm ${
            question.difficulty === 'entry' ? 'bg-green-500/20 text-green-400' :
            question.difficulty === 'mid' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {question.difficulty} Level
          </span>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
            {question.type}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-white">{question.question}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-48 p-4 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleRecording}
              className={`p-2 rounded-full ${
                isRecording ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {isRecording ? <FaStop /> : <FaMicrophone />}
            </motion.button>
          </div>
        </div>

        <div className="flex space-x-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!answer.trim()}
            className={`flex-1 py-3 rounded-lg font-semibold ${
              !answer.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Submit Answer
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
          >
            <FaRedo />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
