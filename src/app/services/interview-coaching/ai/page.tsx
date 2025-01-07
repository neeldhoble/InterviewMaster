"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaPlay, FaStop, FaForward, FaLightbulb, 
         FaChalkboardTeacher, FaCheck, FaArrowRight, FaChartLine } from 'react-icons/fa';
import Avatar from '@/components/Avatar';
import { geminiService } from '@/services/gemini';
import { speechService } from '@/services/speech';

interface InterviewStats {
  relevance: number;
  clarity: number;
  confidence: number;
  structure: number;
  technicalAccuracy: number;
  overallScore: number;
}

export default function AIInterviewCoachingPage() {
  const [role, setRole] = useState('Software Engineer');
  const [experience, setExperience] = useState('5+ years');
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [avatarState, setAvatarState] = useState<'idle' | 'speaking' | 'thinking' | 'demonstrating'>('idle');
  const [showingExample, setShowingExample] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [stats, setStats] = useState<InterviewStats | null>(null);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [interimTranscript, finalTranscript]);

  const startSession = async () => {
    setIsSessionStarted(true);
    setAvatarState('speaking');
    await speechService.speak(
      "Welcome to your interview practice session. I'll ask you questions and provide real-time feedback. I can also demonstrate how to answer each question effectively. Let's begin!",
      () => {},
      () => {
        setAvatarState('idle');
        getNextQuestion();
      }
    );
  };

  const getNextQuestion = async () => {
    setShowingExample(false);
    setFinalTranscript('');
    setInterimTranscript('');
    setFeedback(null);
    setStats(null);
    setAvatarState('thinking');

    const question = await geminiService.getNextQuestion(role, previousQuestions);
    setCurrentQuestion(question);
    setPreviousQuestions(prev => [...prev, question.question]);

    setAvatarState('speaking');
    await speechService.speak(
      question.question,
      () => {},
      () => setAvatarState('idle')
    );
  };

  const startRecording = () => {
    setIsRecording(true);
    setInterimTranscript('');
    setFinalTranscript('');
    setFeedback(null);
    setStats(null);
    
    speechService.startRecognition(
      (text, isFinal) => {
        if (isFinal) {
          setFinalTranscript(prev => prev + ' ' + text);
          setInterimTranscript('');
        } else {
          setInterimTranscript(text);
        }
      },
      (error) => {
        console.error('Recognition error:', error);
        setIsRecording(false);
      }
    );
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsProcessingAnswer(true);
    speechService.stopRecognition();
    
    const fullTranscript = (finalTranscript + ' ' + interimTranscript).trim();
    
    if (fullTranscript && currentQuestion) {
      setAvatarState('thinking');
      
      try {
        const analysis = await geminiService.analyzeResponse(
          currentQuestion.question,
          fullTranscript
        );

        setStats({
          relevance: analysis.relevance || 0,
          clarity: analysis.clarity || 0,
          confidence: analysis.confidence || 0,
          structure: analysis.structure || 0,
          technicalAccuracy: analysis.technicalAccuracy || 0,
          overallScore: Math.round((
            (analysis.relevance || 0) +
            (analysis.clarity || 0) +
            (analysis.confidence || 0) +
            (analysis.structure || 0) +
            (analysis.technicalAccuracy || 0)
          ) / 5)
        });

        setFeedback(analysis);
        
        setAvatarState('speaking');
        await speechService.speak(
          `Here's my feedback on your answer: ${analysis.feedback}`,
          () => {},
          () => setAvatarState('idle')
        );
      } catch (error) {
        console.error('Error analyzing response:', error);
      }
    }
    
    setIsProcessingAnswer(false);
  };

  const demonstrateAnswer = async () => {
    if (!currentQuestion) return;

    setShowingExample(true);
    setAvatarState('demonstrating');
    
    try {
      const demonstration = await geminiService.demonstrateAnswer(currentQuestion.question, role);
      
      await speechService.speak(
        "Let me demonstrate how to answer this question effectively.",
        () => {},
        async () => {
          await speechService.speak(
            demonstration,
            () => {},
            () => {
              setAvatarState('idle');
              setCurrentQuestion(prev => prev ? {
                ...prev,
                exampleAnswer: demonstration
              } : null);
            }
          );
        }
      );
    } catch (error) {
      console.error('Error demonstrating answer:', error);
      setAvatarState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
              AI Interview Coach
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">Master Your Interview Skills with AI-Powered Coaching</p>

          {!isSessionStarted && (
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-[#ffffff15] text-white px-4 py-2 rounded-lg"
                >
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="UX Designer">UX Designer</option>
                </select>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="bg-[#ffffff15] text-white px-4 py-2 rounded-lg"
                >
                  <option value="0-2 years">Entry Level (0-2 years)</option>
                  <option value="2-5 years">Mid Level (2-5 years)</option>
                  <option value="5+ years">Senior Level (5+ years)</option>
                </select>
              </div>
              <motion.button
                onClick={startSession}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black font-bold py-4 px-8 rounded-xl text-xl"
              >
                Start Practice Session
              </motion.button>
            </div>
          )}
        </motion.div>

        {isSessionStarted && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Avatar Section */}
              <div className="relative h-[400px] bg-gradient-to-b from-[#fcba2810] to-transparent rounded-2xl mb-8">
                <Avatar 
                  avatarState={avatarState}
                  className="w-full h-full max-w-[300px] mx-auto"
                />
              </div>

              {/* Question and Controls */}
              <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6 mb-8">
                {currentQuestion && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">Current Question</h3>
                      <p className="text-lg mb-2">{currentQuestion.question}</p>
                      <p className="text-sm text-gray-400">{currentQuestion.context}</p>
                    </div>

                    <div className="flex gap-4">
                      {!isRecording ? (
                        <>
                          <motion.button
                            onClick={startRecording}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black px-6 py-3 rounded-xl font-semibold"
                          >
                            <FaMicrophone />
                            Start Answer
                          </motion.button>
                          <motion.button
                            onClick={demonstrateAnswer}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-[#ffffff15] px-6 py-3 rounded-xl font-semibold"
                          >
                            <FaChalkboardTeacher />
                            Show Example
                          </motion.button>
                          <motion.button
                            onClick={getNextQuestion}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-[#ffffff15] px-6 py-3 rounded-xl font-semibold"
                          >
                            <FaForward />
                            Next Question
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          onClick={stopRecording}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold"
                        >
                          <FaStop />
                          Stop Recording
                        </motion.button>
                      )}
                    </div>

                    {(isRecording || finalTranscript) && (
                      <div className="bg-[#ffffff15] p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Your Answer:</h4>
                        <div 
                          ref={transcriptRef}
                          className="max-h-48 overflow-y-auto space-y-2"
                        >
                          {finalTranscript && (
                            <p className="text-white">{finalTranscript}</p>
                          )}
                          {interimTranscript && (
                            <p className="text-gray-400 italic">{interimTranscript}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {showingExample && currentQuestion.exampleAnswer && (
                      <div className="bg-[#ffffff15] p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Example Answer:</h4>
                        <p className="text-white leading-relaxed">
                          {currentQuestion.exampleAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Tips and Feedback */}
            <div className="lg:col-span-4 space-y-6">
              {stats && (
                <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Response Analysis</h3>
                    <div className="flex items-center gap-2">
                      <FaChartLine className="text-[#fcba28]" />
                      <span className="text-2xl font-bold">{stats.overallScore}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(stats).map(([key, value]) => (
                      key !== 'overallScore' && (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span>{Math.round(value)}%</span>
                          </div>
                          <div className="h-2 bg-[#ffffff15] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-[#fcba28]"
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {currentQuestion && (
                <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Points to Cover</h3>
                  <ul className="space-y-3">
                    {currentQuestion.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheck className="text-[#fcba28] mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback && (
                <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Feedback</h3>
                  <div className="space-y-4">
                    {feedback.positiveAspects?.map((aspect: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <FaCheck className="text-green-400 mt-1" />
                        <p className="text-gray-300">{aspect}</p>
                      </div>
                    ))}
                    {feedback.improvements?.map((improvement: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <FaArrowRight className="text-[#fcba28] mt-1" />
                        <p className="text-gray-300">{improvement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isProcessingAnswer && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#fcba28] mx-auto mb-4" />
              <p>Analyzing your response...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
