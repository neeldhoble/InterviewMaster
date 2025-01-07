"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaPlay, FaStop, FaForward, FaTimes, FaVideo } from 'react-icons/fa';
import Avatar from '@/components/Avatar';
import { geminiService } from '@/services/gemini';
import { speechService } from '@/services/speech';

interface CoachingTopic {
  title: string;
  description: string;
  keyPoints: string[];
}

export default function AIInterviewCoachingPage() {
  const [role, setRole] = useState('Software Engineer');
  const [experience, setExperience] = useState('5+ years');
  const [topics, setTopics] = useState<CoachingTopic[]>([]);
  const [currentTopic, setCurrentTopic] = useState<CoachingTopic | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [avatarState, setAvatarState] = useState<'idle' | 'speaking' | 'thinking' | 'greeting'>('idle');
  const [feedback, setFeedback] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    loadTopics();
  }, [role, experience]);

  const loadTopics = async () => {
    const coachingTopics = await geminiService.getCoachingTopics(role, experience);
    setTopics(coachingTopics);
  };

  const startCoaching = async (topic: CoachingTopic) => {
    setCurrentTopic(topic);
    setAvatarState('speaking');
    
    // Get and speak the coaching advice
    const advice = await geminiService.getCoachingAdvice(topic.title, role);
    speechService.speak(
      advice,
      () => setIsSpeaking(true),
      () => {
        setIsSpeaking(false);
        setAvatarState('idle');
      }
    );
  };

  const startPractice = () => {
    if (!currentTopic) return;
    
    setIsRecording(true);
    setAvatarState('thinking');
    
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(prev => prev + ' ' + transcript);
      };

      recognition.start();
    }
  };

  const stopPractice = async () => {
    setIsRecording(false);
    setAvatarState('speaking');

    if (currentTopic && transcript) {
      const feedback = await geminiService.analyzePractice(
        currentTopic.title,
        transcript,
        30 // duration in seconds
      );
      setFeedback(feedback);

      // Provide vocal feedback
      speechService.speak(
        feedback.feedback,
        () => setIsSpeaking(true),
        () => {
          setIsSpeaking(false);
          setAvatarState('idle');
        }
      );
    }
  };

  const getExample = async () => {
    if (!currentTopic) return;
    
    setAvatarState('speaking');
    const demonstration = await geminiService.getExampleDemonstration(currentTopic.title);
    
    speechService.speak(
      demonstration,
      () => setIsSpeaking(true),
      () => {
        setIsSpeaking(false);
        setAvatarState('idle');
      }
    );
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Interview{' '}
            <span className="bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
              Coach AI
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Master your interview skills with personalized AI coaching
          </p>

          {/* Role Selection */}
          {!currentTopic && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
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
          )}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Avatar Section */}
          <div className="relative h-[600px] bg-gradient-to-b from-[#fcba2810] to-transparent rounded-2xl p-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <Avatar 
                avatarState={avatarState}
                className="w-full h-full max-w-[400px] mx-auto"
              />
            </div>
            
            {/* Current Topic Overlay */}
            {currentTopic && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 left-8 right-8 bg-[#00000080] backdrop-blur-sm p-4 rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-2">{currentTopic.title}</h3>
                <p className="text-sm text-gray-300">{currentTopic.description}</p>
              </motion.div>
            )}
          </div>

          {/* Controls Section */}
          <div className="space-y-8">
            {!currentTopic ? (
              // Topics List
              <div className="grid gap-4">
                {topics.map((topic, index) => (
                  <motion.button
                    key={topic.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => startCoaching(topic)}
                    className="bg-[#ffffff08] backdrop-blur-sm p-4 rounded-xl hover:bg-[#ffffff15] transition-colors text-left"
                  >
                    <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-gray-400">{topic.description}</p>
                  </motion.button>
                ))}
              </div>
            ) : (
              // Practice Controls
              <>
                <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4">Practice Session</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {!isRecording ? (
                      <>
                        <motion.button
                          onClick={startPractice}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                          disabled={isSpeaking}
                        >
                          <FaMicrophone />
                          Start Practice
                        </motion.button>
                        <motion.button
                          onClick={getExample}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 bg-[#ffffff15] py-3 px-6 rounded-lg hover:bg-[#ffffff20] transition-colors"
                          disabled={isSpeaking}
                        >
                          <FaPlay />
                          See Example
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        onClick={stopPractice}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors col-span-2"
                      >
                        <FaStop />
                        Stop Practice
                      </motion.button>
                    )}
                  </div>
                </div>

                {feedback && (
                  <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-2xl font-semibold mb-4">Feedback</h3>
                    <p className="text-gray-300 mb-4">{feedback.feedback}</p>
                    
                    <h4 className="font-semibold mb-2">Suggestions:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                      {feedback.suggestions.map((suggestion: string, index: number) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                    
                    <div className="mt-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="w-24">Confidence</div>
                        <motion.div 
                          className="flex-1 bg-[#ffffff15] rounded-full h-2"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                        >
                          <motion.div 
                            className="bg-[#fcba28] rounded-full h-2"
                            initial={{ width: 0 }}
                            animate={{ width: `${feedback.confidence}%` }}
                            transition={{ duration: 1 }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}

                <motion.button
                  onClick={() => {
                    speechService.stop();
                    setCurrentTopic(null);
                    setFeedback(null);
                    setTranscript('');
                  }}
                  className="w-full bg-[#ffffff15] py-2 rounded-lg hover:bg-[#ffffff20] transition-colors"
                >
                  Choose Another Topic
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
