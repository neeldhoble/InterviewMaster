'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';
import { useInterviewStore } from '../store/interviewStore';
import { generateFeedback, generateFollowUpResponse } from '../services/interview';

interface InterviewSessionProps {
  onComplete: () => void;
}

export function InterviewSession({ onComplete }: InterviewSessionProps) {
  const {
    questions,
    currentQuestionIndex,
    addFeedback,
    nextQuestion,
    resumeData
  } = useInterviewStore();

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [metrics, setMetrics] = useState({
    clarity: 0,
    relevance: 0,
    confidence: 0,
    timeRemaining: 30,
    wordsPerMinute: 0,
    lastResponseLength: 0
  });
  const [hasSpokenQuestion, setHasSpokenQuestion] = useState(false);

  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map(result => result.transcript)
            .join('');
          
          setTranscript(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };
      }
    }

    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (currentQuestionIndex >= questions.length && questions.length > 0) {
      onComplete();
    }
  }, [currentQuestionIndex, questions.length, onComplete]);

  useEffect(() => {
    if (!hasSpokenQuestion && currentQuestion) {
      speakText(currentQuestion.question);
    }
  }, [currentQuestion, hasSpokenQuestion]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current?.start();
      setIsRecording(true);
      setVoiceMode(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const handleResponse = async () => {
    if (!transcript.trim() || isThinking) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    setIsThinking(true);

    try {
      const feedback = await generateFeedback(currentQuestion, transcript);
      addFeedback({
        questionId: currentQuestion.id,
        ...feedback
      });

      const followUp = await generateFollowUpResponse(
        currentQuestion,
        transcript,
        transcript
      );

      setAiResponse(followUp.response);
      
      if (followUp.nextQuestion) {
        setTimeout(() => {
          nextQuestion();
          setTranscript('');
          resetMetrics();
        }, 2000);
      }
    } catch (err) {
      console.error('Error processing response:', err);
    } finally {
      setIsThinking(false);
    }
  };

  const resetMetrics = () => {
    setMetrics({
      clarity: 0,
      relevance: 0,
      confidence: 0,
      timeRemaining: 30,
      wordsPerMinute: 0,
      lastResponseLength: 0
    });
  };

  const speakText = (text: string) => {
    if (!speechSynthesisRef.current) return;

    // Get available voices
    const voices = speechSynthesisRef.current.getVoices();
    const indianVoice = voices.find(voice => voice.name.toLowerCase().includes('indian'));

    speechSynthesisRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (indianVoice) {
        utterance.voice = indianVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
        setIsSpeaking(false);
        setHasSpokenQuestion(true); // Mark question as spoken
    };
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesisRef.current.speak(utterance);
  };

  if (!questions.length || currentQuestionIndex >= questions.length) return null;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      {/* Interview Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#fcba28]">Interview Session</h2>
          <p className="text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setVoiceMode(!voiceMode)}
          className={`p-2 rounded-lg ${voiceMode ? 'bg-[#fcba28]' : 'bg-gray-700'}`}
        >
          {voiceMode ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Question Display */}
      <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20">
        <h3 className="text-xl text-white mb-2">Question:</h3>
        <p className="text-gray-300">{currentQuestion.question}</p>
      </div>

      {/* Response Area */}
      <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20">
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? stopRecording : startRecording}
            className="p-3 rounded-full bg-[#fcba28]"
          >
            {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </motion.button>
          <div className="flex-1">
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your response..."
              className="w-full px-4 py-2 bg-black/20 border border-[#fcba28]/20 rounded-lg text-white placeholder-gray-400 resize-none"
              rows={3}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResponse}
            disabled={!transcript.trim() || isThinking}
            className="p-3 rounded-full bg-[#fcba28] disabled:opacity-50"
          >
            <Send className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* AI Response */}
      {aiResponse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20"
        >
          <h3 className="text-xl text-white mb-2">Interviewer Response:</h3>
          <p className="text-gray-300">{aiResponse}</p>
        </motion.div>
      )}

      {/* Metrics Display */}
      <div className="fixed bottom-4 right-4 w-64">
        <div className="p-4 rounded-lg bg-black/90 border border-[#fcba28]/20">
          <h3 className="text-[#fcba28] font-medium mb-2">Real-time Metrics</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Clarity</span>
                <span className="text-white">{metrics.clarity}%</span>
              </div>
              <div className="w-full h-2 bg-black/20 rounded-full">
                <div 
                  className="h-full bg-[#fcba28] rounded-full transition-all"
                  style={{ width: `${metrics.clarity}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Relevance</span>
                <span className="text-white">{metrics.relevance}%</span>
              </div>
              <div className="w-full h-2 bg-black/20 rounded-full">
                <div 
                  className="h-full bg-[#fcba28] rounded-full transition-all"
                  style={{ width: `${metrics.relevance}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Confidence</span>
                <span className="text-white">{metrics.confidence}%</span>
              </div>
              <div className="w-full h-2 bg-black/20 rounded-full">
                <div 
                  className="h-full bg-[#fcba28] rounded-full transition-all"
                  style={{ width: `${metrics.confidence}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
