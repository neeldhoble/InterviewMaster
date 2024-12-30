'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InterviewProvider, useInterview } from './context/InterviewContext';
import { useRecording } from './hooks/useRecording';
import { useAIInterviewer } from './hooks/useAIInterviewer';
import { useSimulationTimer } from './hooks/useSimulationTimer';
import { saveRecording, saveMetrics } from './utils/storage';
import VideoFeed from './components/VideoFeed';
import Chat from './components/Chat';
import Controls from './components/Controls';
import AudioControls from './components/AudioControls';
import QuestionManager from './components/QuestionManager';
import RecordingManager from './components/RecordingManager';

interface Message {
  text: string;
  sender: 'ai' | 'user';
}

const SimulationPage = () => {
  // Context and Hooks
  const { state, dispatch } = useInterview();
  const {
    isRecording,
    duration,
    error: recordingError,
    startRecording,
    stopRecording,
  } = useRecording();
  const {
    currentQuestion,
    isThinking,
    emotion,
    error: aiError,
    askQuestion,
    analyzeResponse,
  } = useAIInterviewer(state.settings.difficulty, state.settings.questionTypes);
  const { timeRemaining, startTimer, stopTimer } = useSimulationTimer(() => {
    handleStop();
  });

  // State
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userResponse, setUserResponse] = useState('');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const audioContext = useRef<AudioContext>();
  const audioAnalyser = useRef<AnalyserNode>();

  // Initialize audio analyzer
  useEffect(() => {
    if (stream && isAudioEnabled) {
      audioContext.current = new AudioContext();
      audioAnalyser.current = audioContext.current.createAnalyser();
      const source = audioContext.current.createMediaStreamSource(stream);
      source.connect(audioAnalyser.current);
      
      const updateAudioLevel = () => {
        if (audioAnalyser.current) {
          const dataArray = new Uint8Array(audioAnalyser.current.frequencyBinCount);
          audioAnalyser.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(Math.round((average / 255) * 100));
        }
        requestAnimationFrame(updateAudioLevel);
      };
      
      updateAudioLevel();
    }
  }, [stream, isAudioEnabled]);

  // Handle video stream
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStart = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      handleStartRecording();
      startTimer(state.settings.duration);
      dispatch({ type: 'START_SIMULATION' });
      
      // Ask first question
      const question = await askQuestion();
      if (question) {
        setMessages([{ text: question.text, sender: 'ai' }]);
      }
    } catch (error) {
      console.error('Failed to start interview:', error);
    }
  };

  const handleStop = async () => {
    try {
      handleStopRecording();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setStream(null);
      stopTimer();
      dispatch({ type: 'END_SIMULATION' });
    } catch (error) {
      console.error('Failed to stop interview:', error);
    }
  };

  const handleStartRecording = async () => {
    if (currentQuestion) {
      await startRecording({
        id: currentQuestion.id,
        text: currentQuestion.text
      });
    } else {
      console.error('No question selected to record');
    }
  };

  const handleStopRecording = async () => {
    const recordedBlob = await stopRecording();
    if (recordedBlob) {
      await saveRecording({
        id: Date.now().toString(),
        questionId: currentQuestion?.id || '',
        blob: recordedBlob,
        duration,
        timestamp: Date.now(),
      });
    }
  };

  const handleSendMessage = async () => {
    if (!userResponse.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: userResponse, sender: 'user' }]);
    setUserResponse('');

    try {
      // Analyze response
      const analysis = await analyzeResponse(new Blob());
      if (analysis) {
        await saveMetrics(analysis);
      }

      // Get next question
      const question = await askQuestion();
      if (question) {
        setMessages(prev => [...prev, { text: question.text, sender: 'ai' }]);
      }
    } catch (error) {
      console.error('Failed to process response:', error);
    }
  };

  const handleToggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const handleToggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const handleToggleSpeaker = () => {
    setIsSpeakerEnabled(!isSpeakerEnabled);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#111111] to-[#1a1a1a] text-white p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Video Feeds */}
          <div className="space-y-8">
            <VideoFeed
              isAI
              stream={null}
              isThinking={isThinking}
              currentQuestion={currentQuestion?.text}
            />
            <VideoFeed
              stream={stream}
              isRecording={isRecording}
              duration={duration}
              timeRemaining={timeRemaining}
              videoRef={videoRef}
              onToggleAudio={handleToggleAudio}
              onToggleVideo={handleToggleVideo}
              isAudioEnabled={isAudioEnabled}
              isVideoEnabled={isVideoEnabled}
            />
          </div>

          {/* Right Column - Chat and Controls */}
          <div className="space-y-8">
            <Chat
              messages={messages}
              userResponse={userResponse}
              isStarted={state.status === 'running'}
              isThinking={isThinking}
              onUserResponseChange={setUserResponse}
              onSendMessage={handleSendMessage}
              chatRef={chatRef}
            />
            <Controls
              isStarted={state.status === 'running'}
              isPaused={isPaused}
              isRecording={isRecording}
              onStart={handleStart}
              onStop={handleStop}
              onPause={() => setIsPaused(true)}
              onResume={() => setIsPaused(false)}
              onReset={() => window.location.reload()}
            />
            <AudioControls
              isAudioEnabled={isAudioEnabled}
              isVideoEnabled={isVideoEnabled}
              isSpeakerEnabled={isSpeakerEnabled}
              onToggleAudio={handleToggleAudio}
              onToggleVideo={handleToggleVideo}
              onToggleSpeaker={handleToggleSpeaker}
              audioLevel={audioLevel}
            />
          </div>
        </div>

        {/* Question Manager and Recording Manager */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <QuestionManager
            difficulty={state.settings.difficulty}
            onQuestionSelect={(question) => {
              if (question) {
                setMessages(prev => [...prev, { text: question.text, sender: 'ai' }]);
              }
            }}
          />
          <RecordingManager />
        </div>

        {/* Error Messages */}
        <AnimatePresence>
          {(recordingError || aiError) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-500"
            >
              {recordingError || aiError}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function SimulationWrapper() {
  return (
    <InterviewProvider>
      <SimulationPage />
    </InterviewProvider>
  );
}
