"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaPlay, FaStop, FaForward, FaLightbulb, 
         FaChalkboardTeacher, FaCheck, FaArrowRight } from 'react-icons/fa';
import Avatar from '@/components/Avatar';
import { geminiService } from '@/services/gemini';
import { speechService } from '@/services/speech';

interface InterviewQuestion {
  question: string;
  context: string;
  exampleAnswer: string;
  keyPoints: string[];
  tips: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function AIInterviewCoachingPage() {
  const [role, setRole] = useState('Software Engineer');
  const [experience, setExperience] = useState('5+ years');
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [avatarState, setAvatarState] = useState<'idle' | 'speaking' | 'thinking' | 'demonstrating'>('idle');
  const [showingExample, setShowingExample] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

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
    setTranscript('');
    setFeedback(null);
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

  const demonstrateAnswer = async () => {
    if (!currentQuestion) return;

    setShowingExample(true);
    setAvatarState('demonstrating');
    const demonstration = await geminiService.demonstrateAnswer(currentQuestion.question, role);

    await speechService.speak(
      "Let me demonstrate how to answer this question effectively.",
      () => {},
      async () => {
        await speechService.speak(
          demonstration,
          () => {},
          () => setAvatarState('idle')
        );
      }
    );
  };

  const startRecording = () => {
    setIsRecording(true);
    setTranscript('');
    
    speechService.startRecognition(
      (text, isFinal) => {
        setTranscript(prev => prev + ' ' + text);
      },
      (error) => console.error('Recognition error:', error)
    );
  };

  const stopRecording = async () => {
    setIsRecording(false);
    speechService.stopRecognition();
    
    if (transcript && currentQuestion) {
      setAvatarState('thinking');
      const analysis = await geminiService.analyzeResponse(
        currentQuestion.question,
        transcript
      );
      setFeedback(analysis);
      
      setAvatarState('speaking');
      await speechService.speak(
        analysis.feedback,
        () => {},
        () => setAvatarState('idle')
      );
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

                    {transcript && (
                      <div className="bg-[#ffffff15] p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Your Answer:</h4>
                        <p>{transcript}</p>
                      </div>
                    )}

                    {showingExample && (
                      <div className="bg-[#ffffff15] p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Example Answer:</h4>
                        <p>{currentQuestion.exampleAnswer}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Tips and Feedback */}
            <div className="lg:col-span-4 space-y-6">
              {currentQuestion && (
                <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Points to Cover</h3>
                  <ul className="space-y-3">
                    {currentQuestion.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheck className="text-[#fcba28] mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentQuestion && (
                <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Tips</h3>
                  <ul className="space-y-3">
                    {currentQuestion.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaLightbulb className="text-[#fcba28] mt-1 flex-shrink-0" />
                        <span>{tip}</span>
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
      </div>
    </div>
  );
}
