'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Question, QuestionType, interviewQuestions, getQuestionsByType, getAllCategories } from '../data/questions';

interface QuestionPanelProps {
  currentQuestion: number;
  onQuestionSelect: (index: number) => void;
  onCustomQuestionAdd: (question: Question) => void;
}

export const QuestionPanel: React.FC<QuestionPanelProps> = ({
  currentQuestion,
  onQuestionSelect,
  onCustomQuestionAdd,
}) => {
  const [selectedType, setSelectedType] = useState<QuestionType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [customQuestion, setCustomQuestion] = useState({
    text: '',
    type: 'custom' as QuestionType,
    category: '',
  });

  const filteredQuestions = interviewQuestions.filter(q => {
    if (selectedType !== 'all' && q.type !== selectedType) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const questionTypes: { value: QuestionType | 'all'; label: string }[] = [
    { value: 'all', label: 'All Types' },
    { value: 'behavioral', label: 'Behavioral' },
    { value: 'technical', label: 'Technical' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'problem-solving', label: 'Problem Solving' },
  ];

  const difficultyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const handleAddCustomQuestion = () => {
    if (customQuestion.text.trim() && customQuestion.category.trim()) {
      const newQuestion: Question = {
        id: `custom-${Date.now()}`,
        text: customQuestion.text,
        type: customQuestion.type,
        category: customQuestion.category,
      };
      onCustomQuestionAdd(newQuestion);
      setCustomQuestion({ text: '', type: 'custom', category: '' });
      setShowAddQuestion(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 w-full max-w-2xl mx-auto">
      {/* Header with Filters */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#fcba28]">Interview Questions</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Filter size={20} className="text-[#fcba28]" />
          </button>
          <button
            onClick={() => setShowAddQuestion(!showAddQuestion)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {showAddQuestion ? (
              <X size={20} className="text-[#fcba28]" />
            ) : (
              <Plus size={20} className="text-[#fcba28]" />
            )}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Question Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as QuestionType | 'all')}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white"
                >
                  {questionTypes.map((type) => (
                    <option key={type.value} value={type.value} className="bg-gray-800">
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as 'all' | 'easy' | 'medium' | 'hard')}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white"
                >
                  {difficultyLevels.map((level) => (
                    <option key={level.value} value={level.value} className="bg-gray-800">
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Custom Question Panel */}
      <AnimatePresence>
        {showAddQuestion && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="p-4 bg-white/5 rounded-lg">
              <textarea
                value={customQuestion.text}
                onChange={(e) => setCustomQuestion({ ...customQuestion, text: e.target.value })}
                placeholder="Enter your custom question..."
                className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white mb-2 min-h-[100px]"
              />
              <input
                type="text"
                value={customQuestion.category}
                onChange={(e) => setCustomQuestion({ ...customQuestion, category: e.target.value })}
                placeholder="Category (e.g., System Design, Algorithms)"
                className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white mb-2"
              />
              <button
                onClick={handleAddCustomQuestion}
                className="w-full bg-[#fcba28] hover:bg-[#fcd978] text-black font-medium py-2 rounded-lg transition-colors"
              >
                Add Question
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questions List */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        {filteredQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-lg transition-colors cursor-pointer ${
              currentQuestion === index
                ? 'bg-[#fcba28] text-black'
                : 'bg-white/5 hover:bg-white/10 text-white'
            }`}
            onClick={() => onQuestionSelect(index)}
          >
            <div className="flex justify-between items-start gap-4">
              <p className="flex-1">{question.text}</p>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs px-2 py-1 rounded-full bg-black/20">
                  {question.type}
                </span>
                {question.difficulty && (
                  <span className="text-xs px-2 py-1 rounded-full bg-black/20">
                    {question.difficulty}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 text-xs opacity-70">{question.category}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;
