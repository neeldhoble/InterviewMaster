import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, AlertCircle } from 'lucide-react';
import questionsData from '../../data/questions.json';

interface Question {
  id: string;
  text: string;
  difficulty: string;
  followUp: string;
}

interface Category {
  name: string;
  questions: Question[];
}

interface QuestionManagerProps {
  difficulty: string;
  onQuestionSelect: (question: Question) => void;
}

const QuestionManager: React.FC<QuestionManagerProps> = ({
  difficulty,
  onQuestionSelect,
}) => {
  const [currentCategory, setCurrentCategory] = useState<string>('introduction');
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const categories = questionsData.categories as Record<string, Category>;

  useEffect(() => {
    selectNextQuestion();
  }, [currentCategory, difficulty]);

  const selectNextQuestion = () => {
    const category = categories[currentCategory];
    if (!category) return;

    // Filter questions by difficulty and unused status
    const availableQuestions = category.questions.filter(
      q => q.difficulty === difficulty && !usedQuestions.has(q.id)
    );

    if (availableQuestions.length === 0) {
      // Move to next category if all questions in current category are used
      const categoryKeys = Object.keys(categories);
      const currentIndex = categoryKeys.indexOf(currentCategory);
      const nextCategory = categoryKeys[currentIndex + 1];

      if (nextCategory) {
        setCurrentCategory(nextCategory);
        return;
      }
      
      // Reset if we've used all questions
      setUsedQuestions(new Set());
      return;
    }

    // Randomly select a question
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    setCurrentQuestion(selectedQuestion);
    setUsedQuestions(prev => new Set([...prev, selectedQuestion.id]));
    onQuestionSelect(selectedQuestion);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-1"
    >
      <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            Current Category: {categories[currentCategory]?.name}
          </h3>
          <button
            onClick={selectNextQuestion}
            className="flex items-center gap-2 px-4 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcba28]/90 transition-colors"
          >
            Next Question
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-white">{currentQuestion.text}</p>
              {currentQuestion.followUp && (
                <div className="mt-4 flex items-start gap-2 text-sm text-gray-400">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-[#fcba28]" />
                  <p>Follow-up: {currentQuestion.followUp}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <div className="mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="px-2 py-1 bg-white/5 rounded">
              Questions Used: {usedQuestions.size}
            </span>
            <span className="px-2 py-1 bg-white/5 rounded">
              Difficulty: {difficulty}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionManager;
