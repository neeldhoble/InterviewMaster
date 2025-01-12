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
import ProgressDashboard from "./components/ProgressDashboard";
import LearningPath from "./components/LearningPath";

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

  const [view, setView] = useState<'practice' | 'progress' | 'path'>('practice');
  const [dailyProgress, setDailyProgress] = useState<{
    date: string;
    accuracy: number;
    questionsAttempted: number;
  }[]>([]);
  const [learningStyle, setLearningStyle] = useState({
    visual: 30,
    verbal: 25,
    logical: 25,
    mathematical: 20
  });
  const [achievements, setAchievements] = useState([
    {
      id: 'streak_master',
      name: 'Streak Master',
      description: 'Maintain a streak of 7 days',
      earned: false,
      progress: 3,
      maxProgress: 7
    },
    {
      id: 'speed_demon',
      name: 'Speed Demon',
      description: 'Complete 10 questions under time limit',
      earned: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: 'perfect_score',
      name: 'Perfect Score',
      description: 'Get 100% in any topic',
      earned: false,
      progress: 90,
      maxProgress: 100
    }
  ]);
  const [learningPath, setLearningPath] = useState({
    currentLevel: 2,
    pathProgress: [
      {
        level: 1,
        name: 'Fundamentals',
        description: 'Master the basics',
        completed: true,
        unlocked: true,
        topics: [
          {
            id: 'basic_math',
            name: 'Basic Mathematics',
            status: 'completed' as const,
            score: 95,
            requiredScore: 80
          },
          {
            id: 'logical_basics',
            name: 'Logical Reasoning Basics',
            status: 'completed' as const,
            score: 88,
            requiredScore: 80
          }
        ]
      },
      {
        level: 2,
        name: 'Intermediate',
        description: 'Advanced concepts and applications',
        completed: false,
        unlocked: true,
        topics: [
          {
            id: 'advanced_math',
            name: 'Advanced Mathematics',
            status: 'available' as const,
            score: 45,
            requiredScore: 80
          },
          {
            id: 'data_interpretation',
            name: 'Data Interpretation',
            status: 'available' as const,
            score: 0,
            requiredScore: 80
          }
        ]
      },
      {
        level: 3,
        name: 'Expert',
        description: 'Complex problem solving',
        completed: false,
        unlocked: false,
        topics: [
          {
            id: 'expert_math',
            name: 'Expert Mathematics',
            status: 'locked' as const,
            requiredScore: 90
          }
        ]
      }
    ]
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

  const updateDailyProgress = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setDailyProgress(prev => {
      const todayProgress = prev.find(p => p.date === today);
      if (todayProgress) {
        return prev.map(p => 
          p.date === today
            ? {
                ...p,
                accuracy: performanceMetrics.accuracy * 100,
                questionsAttempted: performanceMetrics.totalQuestionsAttempted
              }
            : p
        );
      }
      return [...prev, {
        date: today,
        accuracy: performanceMetrics.accuracy * 100,
        questionsAttempted: performanceMetrics.totalQuestionsAttempted
      }];
    });
  }, [performanceMetrics]);

  const updateAchievements = useCallback(() => {
    setAchievements(prev => prev.map(achievement => {
      switch (achievement.id) {
        case 'streak_master':
          return {
            ...achievement,
            progress: performanceMetrics.streaks.current,
            earned: performanceMetrics.streaks.current >= 7
          };
        case 'speed_demon':
          const fastQuestions = questionsHistory.filter((_, i) => {
            const timeSpent = answersHistory[i] ? 
              Math.floor((Date.now() - startTime) / 1000) : 0;
            return timeSpent < timeLeft * 0.5;
          }).length;
          return {
            ...achievement,
            progress: fastQuestions,
            earned: fastQuestions >= 10
          };
        case 'perfect_score':
          const topicScores = Object.values(performanceMetrics.topicWisePerformance)
            .map(({ correct, total }) => (correct / total) * 100);
          const maxScore = Math.max(...topicScores, 0);
          return {
            ...achievement,
            progress: Math.round(maxScore),
            earned: maxScore >= 100
          };
        default:
          return achievement;
      }
    }));
  }, [performanceMetrics, questionsHistory, answersHistory, startTime, timeLeft]);

  useEffect(() => {
    if (showExplanation) {
      updateDailyProgress();
      updateAchievements();
    }
  }, [showExplanation, updateDailyProgress, updateAchievements]);

  const renderMainContent = () => {
    switch (view) {
      case 'progress':
        return (
          <ProgressDashboard
            performanceMetrics={performanceMetrics}
            dailyProgress={dailyProgress}
            learningStyle={learningStyle}
            achievements={achievements}
          />
        );
      case 'path':
        return (
          <LearningPath
            currentLevel={learningPath.currentLevel}
            pathProgress={learningPath.pathProgress}
            onSelectTopic={(topicId) => {
              const topic = learningPath.pathProgress
                .flatMap(level => level.topics)
                .find(t => t.id === topicId);
              if (topic) {
                setSelectedTopic(topic.name);
                setView('practice');
              }
            }}
          />
        );
      default:
        return (
          <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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

                {!selectedTopic && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-4 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <p className="text-3xl font-bold text-[#fcba28]">
                          5+
                        </p>
                        <p className="text-gray-200">Topics</p>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-4 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <p className="text-3xl font-bold text-[#fcba28]">3</p>
                        <p className="text-gray-200">Difficulty Levels</p>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-4 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <p className="text-3xl font-bold text-[#fcba28]">AI</p>
                        <p className="text-gray-200">Powered</p>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-4 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <p className="text-3xl font-bold text-[#fcba28]">24/7</p>
                        <p className="text-gray-200">Available</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {selectedTopic ? (
                <div className="w-full">
                  <QuestionCard
                    question={currentQuestion}
                    timeLeft={timeLeft}
                    selectedOption={selectedOption}
                    onSelectOption={setSelectedOption}
                    difficulty={difficulty}
                    performanceMetrics={performanceMetrics}
                  />

                  {showExplanation && feedback && (
                    <FeedbackPanel
                      explanation={currentQuestion.explanation}
                      feedback={feedback}
                      skillsTested={currentQuestion.skillsTested}
                      performanceMetrics={performanceMetrics}
                    />
                  )}
                </div>
              ) : (
                <TopicSelector onSelectTopic={setSelectedTopic} />
              )}
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
                  className="mt-8 text-center relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-6 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-3xl font-bold text-[#fcba28]">
                      Score: {score}
                    </div>
                    <div className="text-gray-200">
                      Question {questionsHistory.length + 1}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden" ref={targetRef}>
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
          {/* Navigation */}
          <div className="pt-12 pb-8 px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between space-y-6 md:space-y-0">
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl font-bold text-[#fcba28]">
                Personalized Aptitude Training
              </h1>
              <p className="text-gray-400 text-lg">
                Master your skills with AI-powered adaptive learning
              </p>
            </div>
            <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-lg rounded-xl p-1.5">
              <Button
                variant="ghost"
                onClick={() => setView('practice')}
                className={`relative px-6 py-2.5 group ${
                  view === 'practice'
                    ? 'text-[#fcba28]'
                    : 'text-gray-400 hover:text-[#fcba28]'
                }`}
              >
                {view === 'practice' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20"
                  />
                )}
                <span className="relative">Practice</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setView('progress')}
                className={`relative px-6 py-2.5 group ${
                  view === 'progress'
                    ? 'text-[#fcba28]'
                    : 'text-gray-400 hover:text-[#fcba28]'
                }`}
              >
                {view === 'progress' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20"
                  />
                )}
                <span className="relative">Progress</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setView('path')}
                className={`relative px-6 py-2.5 group ${
                  view === 'path'
                    ? 'text-[#fcba28]'
                    : 'text-gray-400 hover:text-[#fcba28]'
                }`}
              >
                {view === 'path' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20"
                  />
                )}
                <span className="relative">Learning Path</span>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="py-8 px-4 md:px-8">
            {renderMainContent()}
          </div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
