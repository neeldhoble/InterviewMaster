'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, List } from 'lucide-react';
import { Question } from '../data/questions';

interface QuestionPanelProps {
  questions: Question[];
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
}

export const QuestionPanel: React.FC<QuestionPanelProps> = ({
  questions,
  currentQuestionIndex,
  onSelectQuestion,
}) => {
  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg p-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-[#fcba28]" />
          <h3 className="text-lg font-semibold text-white">Question List</h3>
        </div>
        <span className="text-sm text-gray-400">{currentQuestionIndex + 1}/{questions.length}</span>
      </div>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
        {questions.map((question, index) => (
          <button
            key={question.id}
            onClick={() => onSelectQuestion(index)}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              index === currentQuestionIndex
                ? 'bg-[#fcba28]/20 text-[#fcba28]'
                : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium truncate flex-1 mr-2">
                {question.question}
              </span>
              {index === currentQuestionIndex && (
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">
                {question.type}
              </span>
              {question.category && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">
                  {question.category}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionPanel;
