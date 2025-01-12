"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGeminiAI } from "@/hooks/useGeminiAI";
import { Button } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import TopicSelector from "./components/TopicSelector";
import QuestionCard from "./components/QuestionCard";
import FeedbackPanel from "./components/FeedbackPanel";
import HeroAnimation from "./components/HeroAnimation";
import { FaBrain, FaRobot, FaChartLine, FaClock } from "react-icons/fa6";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  timeEstimate: number;
  topic: string;
  skillsTested: string[];
  category?: string;
  subTopic?: string;
}

interface PerformanceMetrics {
  accuracy: number;
  averageTimePerQuestion: number;
  totalQuestionsAttempted: number;
  topicWisePerformance: Record<string, { correct: number; total: number }>;
  skillWisePerformance: Record<string, { score: number; count: number }>;
  streaks: { current: number; best: number };
}

interface PerformanceAnalysis {
  overallScore: string;
  strengths: string[];
  weaknesses: string[];
  recommendedTopics: string[];
  recommendedDifficulty: string;
  detailedFeedback: string;
  suggestedResources?: string[];
  nextSteps?: string[];
}

export default function PersonalizedAptitudePage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [questionsHistory, setQuestionsHistory] = useState<Question[]>([]);
  const [answersHistory, setAnswersHistory] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    accuracy: 0,
    averageTimePerQuestion: 0,
    totalQuestionsAttempted: 0,
    topicWisePerformance: {},
    skillWisePerformance: {},
    streaks: { current: 0, best: 0 }
  });

  const [userPreferences, setUserPreferences] = useState({
    preferredTopics: [] as string[],
    dailyGoal: 10,
    studyReminders: false,
    difficultyPreference: 'adaptive'
  });

  const { generateQuestion, analyzePerfomance, generatePersonalizedFeedback } = useGeminiAI();

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const handleAnswerSubmission = useCallback(async () => {
    if (!selectedOption || !currentQuestion) return;
    
    clearTimer();
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    setPerformanceMetrics(prev => {
      const newMetrics = { ...prev };
      const totalQuestions = prev.totalQuestionsAttempted + 1;
      
      // Update accuracy
      const totalCorrect = (prev.accuracy * prev.totalQuestionsAttempted + (isCorrect ? 1 : 0));
      newMetrics.accuracy = totalCorrect / totalQuestions;
      
      // Update average time
      newMetrics.averageTimePerQuestion = 
        (prev.averageTimePerQuestion * prev.totalQuestionsAttempted + timeSpent) / totalQuestions;
      
      // Update total questions
      newMetrics.totalQuestionsAttempted = totalQuestions;
      
      // Update streaks
      if (isCorrect) {
        newMetrics.streaks.current += 1;
        newMetrics.streaks.best = Math.max(newMetrics.streaks.current, newMetrics.streaks.best);
      } else {
        newMetrics.streaks.current = 0;
      }
      
      // Update topic performance
      if (currentQuestion?.topic) {
        const topic = currentQuestion.topic;
        const topicStats = prev.topicWisePerformance[topic] || { correct: 0, total: 0 };
        newMetrics.topicWisePerformance[topic] = {
          correct: topicStats.correct + (isCorrect ? 1 : 0),
          total: topicStats.total + 1
        };
      }
      
      return newMetrics;
    });

    setScore(prev => prev + (isCorrect ? 1 : 0));
    
    try {
      const newFeedback = await generatePersonalizedFeedback(
        currentQuestion,
        selectedOption,
        timeSpent,
        performanceMetrics
      );
      
      setFeedback(newFeedback);
      setShowExplanation(true);
      
      // Add to history
      setQuestionsHistory(prev => [...prev, currentQuestion]);
      setAnswersHistory(prev => [...prev, selectedOption]);
      
      // Adjust difficulty based on performance
      if (userPreferences.difficultyPreference === 'adaptive') {
        const recentPerformance = answersHistory.slice(-5).filter(
          (ans, idx) => questionsHistory[idx]?.correctAnswer === ans
        ).length;
        
        if (recentPerformance >= 4) {
          setDifficulty(prev => prev === 'easy' ? 'medium' : prev === 'medium' ? 'hard' : 'hard');
        } else if (recentPerformance <= 1) {
          setDifficulty(prev => prev === 'hard' ? 'medium' : prev === 'medium' ? 'easy' : 'easy');
        }
      }
    } catch (error) {
      console.error('Error generating feedback:', error);
    }
  }, [selectedOption, currentQuestion, startTime, generatePersonalizedFeedback, performanceMetrics, userPreferences.difficultyPreference, clearTimer]);

  const loadQuestion = useCallback(async () => {
    clearTimer();
    
    try {
      setIsLoading(true);
      setSelectedOption(null);
      setShowExplanation(false);
      setFeedback(null);
      
      const newQuestion = await generateQuestion(selectedTopic, difficulty);
      
      if (newQuestion) {
        setCurrentQuestion(newQuestion);
        setTimeLeft(newQuestion.timeEstimate);
        setStartTime(Date.now());
      }
    } catch (error) {
      console.error('Error loading question:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic, difficulty, generateQuestion, clearTimer]);

  useEffect(() => {
    if (currentQuestion && timeLeft > 0 && !showExplanation) {
      clearTimer();
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearTimer();
            handleAnswerSubmission();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return clearTimer;
  }, [currentQuestion, timeLeft, showExplanation, clearTimer, handleAnswerSubmission]);

  useEffect(() => {
    if (selectedTopic) {
      loadQuestion();
    }
    
    return clearTimer;
  }, [selectedTopic, loadQuestion, clearTimer]);

  const handleNextQuestion = useCallback(() => {
    loadQuestion();
  }, [loadQuestion]);

  // Clean up on unmount
  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const renderContent = () => {
    if (!selectedTopic) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <TopicSelector onSelectTopic={setSelectedTopic} />
        </motion.div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fcba28]"></div>
        </div>
      );
    }

    if (!currentQuestion) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6 max-w-xl"
        >
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-[#fcba28]/20 p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-[#fcba28]">Select Difficulty</h2>
            <div className="space-y-4">
              {["Easy", "Medium", "Hard"].map((d) => (
                <Button
                  key={d}
                  variant={difficulty === d.toLowerCase() ? "default" : "outline"}
                  onClick={() => {
                    setDifficulty(d.toLowerCase());
                    loadQuestion();
                  }}
                  className={`w-full h-12 text-lg ${
                    difficulty === d.toLowerCase()
                      ? "bg-[#fcba28] hover:bg-[#fcba28]/90 text-black"
                      : "border-[#fcba28]/50 text-[#fcba28] hover:bg-[#fcba28]/10"
                  }`}
                >
                  {d}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setSelectedTopic("")}
              className="w-full mt-4 border-[#fcba28]/50 text-[#fcba28] hover:bg-[#fcba28]/10"
            >
              Back to Topics
            </Button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <QuestionCard
          question={currentQuestion}
          timeLeft={timeLeft}
          selectedOption={selectedOption}
          onSelectOption={setSelectedOption}
          difficulty={difficulty}
          performanceMetrics={performanceMetrics}
        />

        {showExplanation && feedback && (
          <>
            <FeedbackPanel
              explanation={currentQuestion.explanation}
              feedback={feedback}
              skillsTested={currentQuestion.skillsTested}
              performanceMetrics={performanceMetrics}
            />
            <div className="flex justify-center">
              <Button
                onClick={handleNextQuestion}
                className="bg-[#fcba28] hover:bg-[#fcba28]/90 text-black px-8 py-3 text-lg"
              >
                Next Question
              </Button>
            </div>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden" ref={targetRef}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
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
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        />
      </div>

      <div className="relative z-10">
        <MaxWidthWrapper>
          <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-20">
            {/* Left Side - Content */}
            <div className="flex flex-col items-start text-left space-y-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center gap-4 text-[#fcba28] mb-6"
                >
                  <FaBrain className="text-3xl" />
                  <FaRobot className="text-3xl" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                  Personalized{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#ffd700]">
                    AI-Powered
                  </span>{" "}
                  Practice
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-200 mb-8"
                >
                  Experience adaptive learning that evolves with your progress. Our AI creates a unique
                  path tailored to your learning style.
                </motion.p>

                {/* Quick Stats */}
                {!selectedTopic && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-4 gap-8 mt-12"
                  >
                    <div>
                      <p className="text-3xl font-bold text-[#fcba28]">5+</p>
                      <p className="text-gray-200">Topics</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[#fcba28]">3</p>
                      <p className="text-gray-200">Difficulty Levels</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[#fcba28]">AI</p>
                      <p className="text-gray-200">Powered</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[#fcba28]">24/7</p>
                      <p className="text-gray-200">Available</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {renderContent()}
            </div>

            {/* Right Side - Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="sticky top-8"
            >
              <HeroAnimation />
              {currentQuestion && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center bg-black/40 backdrop-blur-lg rounded-xl border border-[#fcba28]/20 p-6"
                >
                  <div className="text-3xl font-bold text-[#fcba28]">
                    Score: {score}
                  </div>
                  <div className="text-gray-200">
                    Question {questionsHistory.length + 1}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
