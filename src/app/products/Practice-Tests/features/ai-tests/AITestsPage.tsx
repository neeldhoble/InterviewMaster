'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, FaCode, FaLightbulb, FaArrowLeft, FaClock, 
  FaList, FaBrain, FaCheckCircle, FaTimesCircle 
} from 'react-icons/fa';
import AITestForm from './components/AITestForm';
import CodeEditor from './components/CodeEditor';
import { generateTest } from './services/gemini';
import type { TestFormData } from './services/gemini';

const BackgroundGradient = () => {
  return (
    <motion.div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
    </motion.div>
  );
};

const GridPattern = () => {
  return (
    <motion.div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,#fcba2815,transparent)]" />
    </motion.div>
  );
};

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-[#fcba28]/20 backdrop-blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-lg border border-[#fcba28]/20 backdrop-blur-3xl rotate-12"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute top-1/3 left-1/3 w-32 h-32 rounded-lg border border-[#fcba28]/20 backdrop-blur-3xl -rotate-45"
      />
    </div>
  );
};

interface TestPerformance {
  correctAnswers: number;
  totalQuestions: number;
  topics: Record<string, number>;
}

export default function AITestsPage() {
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});
  const [performance, setPerformance] = useState<TestPerformance>({
    correctAnswers: 0,
    totalQuestions: 0,
    topics: {}
  });

  const handleSubmit = async (formData: TestFormData) => {
    setLoading(true);
    try {
      const test = await generateTest(formData);
      setGeneratedTest(test);
      setShowForm(false);
      setSelectedAnswers({});
      setShowFeedback({});
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answer: string, topic: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    const question = generatedTest.questions.find((q: any) => q.id === questionId);
    if (question) {
      const isCorrect = answer === question.correctAnswer;
      setPerformance(prev => {
        const topicPerformance = prev.topics[topic] || 0;
        const topicQuestions = generatedTest.questions.filter((q: any) => q.topic === topic).length;
        
        return {
          correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
          totalQuestions: prev.totalQuestions + 1,
          topics: {
            ...prev.topics,
            [topic]: (topicPerformance * (topicQuestions - 1) + (isCorrect ? 1 : 0)) / topicQuestions
          }
        };
      });
    }
  };

  const handleCodeResult = (questionId: string, passed: boolean, topic: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: passed ? 'correct' : 'incorrect' }));
    setShowFeedback(prev => ({ ...prev, [questionId]: true }));
    
    setPerformance(prev => {
      const topicPerformance = prev.topics[topic] || 0;
      const topicQuestions = generatedTest.questions.filter((q: any) => q.topic === topic).length;
      
      return {
        correctAnswers: passed ? prev.correctAnswers + 1 : prev.correctAnswers,
        totalQuestions: prev.totalQuestions + 1,
        topics: {
          ...prev.topics,
          [topic]: (topicPerformance * (topicQuestions - 1) + (passed ? 1 : 0)) / topicQuestions
        }
      };
    });
  };

  const toggleFeedback = (questionId: string) => {
    setShowFeedback(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <BackgroundGradient />
      <GridPattern />
      <FloatingShapes />

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-r from-[#fcba28]/10 to-[#fcd978]/10 backdrop-blur-sm mb-6">
              <FaRobot className="w-12 h-12 text-[#fcba28]" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-[#fcba28]">AI Interview Test Generator</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Generate customized technical interview tests powered by AI. Practice with real-world questions and get instant feedback.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-4xl mx-auto"
              >
                <AITestForm 
                  onSubmit={handleSubmit} 
                  loading={loading}
                  previousPerformance={performance.totalQuestions > 0 ? performance : undefined}
                />
              </motion.div>
            ) : (
              <motion.div
                key="test"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 text-[#fcba28] hover:text-[#fcd978] transition-colors"
                  >
                    <FaArrowLeft />
                    Back to Form
                  </motion.button>
                  {generatedTest?.metadata && (
                    <div className="flex gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-[#fcba28]" />
                        <span>{generatedTest.metadata.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaList className="text-[#fcba28]" />
                        <span>{generatedTest.metadata.questionCount} questions</span>
                      </div>
                      {generatedTest.metadata.adaptiveMode && (
                        <div className="flex items-center gap-2">
                          <FaBrain className="text-[#fcba28]" />
                          <span>Adaptive</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Performance Summary */}
                {performance.totalQuestions > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#fcba28] font-medium">Performance Summary</h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>Success Rate:</span>
                        <span className={`font-medium ${
                          (performance.correctAnswers / performance.totalQuestions) >= 0.7
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}>
                          {((performance.correctAnswers / performance.totalQuestions) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {Object.entries(performance.topics).map(([topic, rate]) => (
                        <motion.div
                          key={topic}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20"
                        >
                          <div className="text-sm text-gray-400 mb-2">{topic}</div>
                          <div className={`text-lg font-medium ${
                            rate >= 0.7 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {(rate * 100).toFixed(0)}%
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {generatedTest && (
                  <div className="space-y-8">
                    <div className="grid gap-6">
                      {generatedTest.questions.map((question: any, index: number) => (
                        <motion.div
                          key={question.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-[#fcba28]/20 space-y-6"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-[#fcba28] mb-2">
                                <span className="text-sm font-medium">Question {index + 1}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20">
                                  {question.topic}
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20">
                                  {question.difficulty}
                                </span>
                              </div>
                              <p className="text-white">{question.question}</p>
                            </div>
                          </div>

                          {question.type === 'multiple-choice' ? (
                            <div className="grid gap-3">
                              {question.options.map((option: string, optIndex: number) => {
                                const optionLetter = String.fromCharCode(65 + optIndex);
                                const isSelected = selectedAnswers[question.id] === optionLetter;
                                const showingFeedback = showFeedback[question.id];
                                const isCorrect = question.correctAnswer === optionLetter;

                                return (
                                  <motion.button
                                    key={optIndex}
                                    onClick={() => {
                                      handleAnswerSelect(question.id, optionLetter, question.topic);
                                      if (!showFeedback[question.id]) {
                                        toggleFeedback(question.id);
                                      }
                                    }}
                                    className={`p-4 rounded-lg text-left transition-all flex items-center gap-3
                                      ${isSelected 
                                        ? showingFeedback
                                          ? isCorrect
                                            ? 'bg-green-500/20 border-green-500/40'
                                            : 'bg-red-500/20 border-red-500/40'
                                          : 'bg-[#fcba28] text-black'
                                        : 'bg-black/20 hover:bg-[#fcba28]/10 text-white border border-[#fcba28]/20'
                                      }
                                    `}
                                  >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                      ${isSelected
                                        ? showingFeedback
                                          ? isCorrect
                                            ? 'border-green-500 text-green-500'
                                            : 'border-red-500 text-red-500'
                                          : 'border-black text-black'
                                        : 'border-[#fcba28]/50 text-[#fcba28]'
                                      }
                                    `}>
                                      {optionLetter}
                                    </div>
                                    <span className={isSelected && !showingFeedback ? 'text-black' : 'text-gray-300'}>
                                      {option.replace(/^[A-D]\)\s*/, '')}
                                    </span>
                                    {showingFeedback && isSelected && (
                                      <span className="ml-auto">
                                        {isCorrect 
                                          ? <FaCheckCircle className="w-5 h-5 text-green-500" />
                                          : <FaTimesCircle className="w-5 h-5 text-red-500" />
                                        }
                                      </span>
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>
                          ) : question.type === 'coding' ? (
                            <CodeEditor
                              question={{
                                id: question.id,
                                language: question.language || 'javascript',
                                starterCode: question.starterCode || '// Your code here',
                                testCases: question.testCases || [
                                  {
                                    input: 'Example input',
                                    expectedOutput: 'Example output'
                                  }
                                ]
                              }}
                              onTestResult={(passed) => handleCodeResult(question.id, passed, question.topic)}
                            />
                          ) : (
                            <div className="space-y-4">
                              <textarea
                                placeholder="Type your answer here..."
                                className="w-full h-32 p-4 rounded-lg bg-black/20 border border-[#fcba28]/20 text-white placeholder-gray-400 focus:border-[#fcba28]/40 focus:ring-1 focus:ring-[#fcba28]/40"
                                onChange={(e) => {
                                  handleAnswerSelect(question.id, e.target.value, question.topic);
                                  if (!showFeedback[question.id]) {
                                    toggleFeedback(question.id);
                                  }
                                }}
                              />
                            </div>
                          )}

                          {showFeedback[question.id] && question.explanation && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="p-4 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20"
                            >
                              <div className="flex items-center gap-2 text-[#fcba28] mb-2">
                                <FaLightbulb className="w-4 h-4" />
                                <span className="font-medium">Explanation</span>
                              </div>
                              <p className="text-gray-300">{question.explanation}</p>
                            </motion.div>
                          )}

                          {showFeedback[question.id] && question.practiceQuestion && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20"
                            >
                              <div className="flex items-center gap-2 text-[#fcba28] mb-2">
                                <FaCode className="w-4 h-4" />
                                <span className="font-medium">Practice Question</span>
                              </div>
                              <p className="text-gray-300 mb-4">{question.practiceQuestion.question}</p>
                              <div className="p-4 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20">
                                <div className="text-[#fcba28] mb-2 font-medium">Solution</div>
                                <p className="text-gray-300">{question.practiceQuestion.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
