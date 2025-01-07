"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaVideo, FaChartLine, FaLightbulb, FaUserTie, FaComments, 
         FaClock, FaStar, FaPlay, FaStop, FaPause, FaForward, FaList, FaCheck } from 'react-icons/fa';
import Avatar from '@/components/Avatar';
import { geminiService } from '@/services/gemini';
import { speechService } from '@/services/speech';

interface InterviewSession {
  duration: number;
  questionsAnswered: number;
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  responses: {
    question: string;
    answer: string;
    feedback: any;
  }[];
}

export default function AIInterviewCoachingPage() {
  // State Management
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [avatarState, setAvatarState] = useState<'idle' | 'speaking' | 'thinking' | 'analyzing'>('idle');
  const [selectedRole, setSelectedRole] = useState('Software Engineer');
  const [experience, setExperience] = useState('5+ years');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [mockQuestions, setMockQuestions] = useState<any[]>([]);
  const [personalizedPlan, setPersonalizedPlan] = useState<any>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Feature Initialization
  useEffect(() => {
    if (session) {
      loadMockQuestions();
      generatePersonalizedPlan();
    }
  }, [session]);

  // Video Stream Management
  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }
    return () => {
      videoStream?.getTracks().forEach(track => track.stop());
    };
  }, [videoStream]);

  // Session Management
  const startNewSession = async () => {
    setSession({
      duration: 0,
      questionsAnswered: 0,
      overallScore: 0,
      technicalScore: 0,
      communicationScore: 0,
      confidenceScore: 0,
      responses: []
    });

    setAvatarState('speaking');
    await speechService.speak(
      "Welcome to your personalized interview coaching session. I'll help you prepare for your upcoming interviews with real-time feedback and personalized guidance. Let's begin!",
      () => {},
      () => setAvatarState('idle')
    );
  };

  // Mock Interview Features
  const loadMockQuestions = async () => {
    const questions = await geminiService.generateMockInterview(
      selectedRole,
      experience,
      'technical and behavioral'
    );
    setMockQuestions(questions);
  };

  const startMockInterview = async () => {
    if (mockQuestions.length === 0) return;
    
    setCurrentQuestion(mockQuestions[0]);
    setAvatarState('speaking');
    
    await speechService.speak(
      mockQuestions[0].question,
      () => {},
      () => {
        setAvatarState('idle');
        startRecording();
      }
    );
  };

  // Recording and Analysis
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
    
    if (transcript) {
      setAvatarState('analyzing');
      const analysis = await geminiService.analyzeResponse(
        currentQuestion?.question || '',
        transcript
      );
      
      setFeedback(analysis);
      updateSessionStats(analysis);
      
      // Provide vocal feedback
      setAvatarState('speaking');
      await speechService.speak(
        analysis.feedback,
        () => {},
        () => setAvatarState('idle')
      );
    }
  };

  // Video Analysis
  const startVideoAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      
      // Start body language analysis
      const bodyLanguageTips = await geminiService.analyzeBodyLanguage({});
      setFeedback(prev => ({
        ...prev,
        bodyLanguageTips
      }));
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Personalized Planning
  const generatePersonalizedPlan = async () => {
    const plan = await geminiService.getPersonalizedTips(
      selectedRole,
      experience,
      ['Technical knowledge', 'Communication'],
      ['Body language', 'Confidence']
    );
    setPersonalizedPlan(plan);
  };

  // Session Statistics
  const updateSessionStats = (analysis: any) => {
    if (!session) return;
    
    setSession(prev => ({
      ...prev!,
      questionsAnswered: prev!.questionsAnswered + 1,
      overallScore: (prev!.overallScore + analysis.relevance) / 2,
      technicalScore: (prev!.technicalScore + analysis.technicalAccuracy) / 2,
      communicationScore: (prev!.communicationScore + analysis.clarity) / 2,
      confidenceScore: Math.min(100, prev!.confidenceScore + 5),
      responses: [...prev!.responses, {
        question: currentQuestion?.question,
        answer: transcript,
        feedback: analysis
      }]
    }));
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
          <p className="text-xl text-gray-400">Master Your Interview Skills with AI-Powered Coaching</p>
          
          {!session && (
            <div className="mt-8 space-y-4">
              <div className="flex justify-center gap-4">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
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
                onClick={startNewSession}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black font-bold py-4 px-8 rounded-xl text-xl"
              >
                Start Coaching Session
              </motion.button>
            </div>
          )}
        </motion.div>

        {session && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              {/* Avatar and Video Section */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="relative h-[300px] bg-gradient-to-b from-[#fcba2810] to-transparent rounded-2xl">
                  <Avatar 
                    avatarState={avatarState}
                    className="w-full h-full max-w-[250px] mx-auto"
                  />
                </div>
                <div className="relative h-[300px] bg-[#ffffff08] rounded-2xl overflow-hidden">
                  {videoStream ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <button
                        onClick={startVideoAnalysis}
                        className="flex items-center gap-2 bg-[#ffffff15] px-4 py-2 rounded-lg"
                      >
                        <FaVideo />
                        Enable Video Analysis
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Interview Controls */}
              <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold">Mock Interview</h3>
                  <div className="flex gap-4">
                    <motion.button
                      onClick={startMockInterview}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black px-4 py-2 rounded-lg font-semibold"
                      disabled={isRecording}
                    >
                      <FaPlay />
                      Start Practice
                    </motion.button>
                    {isRecording && (
                      <motion.button
                        onClick={stopRecording}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        <FaStop />
                        Stop Recording
                      </motion.button>
                    )}
                  </div>
                </div>

                {currentQuestion && (
                  <div className="space-y-4">
                    <div className="bg-[#ffffff15] p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Current Question:</h4>
                      <p>{currentQuestion.question}</p>
                    </div>
                    {transcript && (
                      <div className="bg-[#ffffff15] p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Your Response:</h4>
                        <p>{transcript}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'technical', icon: <FaLightbulb />, title: 'Technical Skills' },
                  { id: 'behavioral', icon: <FaComments />, title: 'Behavioral Questions' },
                  { id: 'leadership', icon: <FaUserTie />, title: 'Leadership' },
                  { id: 'communication', icon: <FaMicrophone />, title: 'Communication' },
                  { id: 'body-language', icon: <FaVideo />, title: 'Body Language' },
                  { id: 'progress', icon: <FaChartLine />, title: 'Progress Tracking' }
                ].map((feature) => (
                  <motion.button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl text-center transition-all ${
                      activeFeature === feature.id
                        ? 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black'
                        : 'bg-[#ffffff08] hover:bg-[#ffffff12]'
                    }`}
                  >
                    <div className={`text-2xl mb-2 ${
                      activeFeature === feature.id ? 'text-black' : 'text-[#fcba28]'
                    }`}>
                      {feature.icon}
                    </div>
                    <div className="font-medium">{feature.title}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right Sidebar - Analytics and Feedback */}
            <div className="lg:col-span-4 space-y-6">
              {/* Session Stats */}
              <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Session Progress</h3>
                <div className="space-y-4">
                  {Object.entries({
                    'Overall Score': session.overallScore,
                    'Technical': session.technicalScore,
                    'Communication': session.communicationScore,
                    'Confidence': session.confidenceScore
                  }).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{key}</span>
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
                  ))}
                </div>
              </div>

              {/* Current Feedback */}
              {feedback && (
                <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">AI Feedback</h3>
                  <div className="space-y-4">
                    {feedback.positiveAspects?.map((aspect: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <FaCheck className="text-green-400 mt-1" />
                        <p className="text-gray-300">{aspect}</p>
                      </div>
                    ))}
                    {feedback.improvements?.map((improvement: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <FaLightbulb className="text-[#fcba28] mt-1" />
                        <p className="text-gray-300">{improvement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Personalized Plan */}
              {personalizedPlan && (
                <div className="bg-[#ffffff08] backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Your Learning Path</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Short-term Goals</h4>
                      <ul className="list-disc list-inside text-sm text-gray-300">
                        {personalizedPlan.shortTermGoals.map((goal: string, index: number) => (
                          <li key={index}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Daily Practice</h4>
                      <ul className="list-disc list-inside text-sm text-gray-300">
                        {personalizedPlan.dailyPracticeTips.map((tip: string, index: number) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
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
