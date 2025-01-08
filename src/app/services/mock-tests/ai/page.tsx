"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaExclamationTriangle, FaRobot } from 'react-icons/fa';
import TestForm from './components/TestForm';
import QuestionDisplay from './components/QuestionDisplay';
import FeedbackDisplay from './components/FeedbackDisplay';
import { mockTestService } from './service';
import { Question, Feedback, Topic, Difficulty } from './types';

export default function AIMockInterviewPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');

  const handleStartTest = async (topic: Topic, difficulty: Difficulty) => {
    setIsLoading(true);
    setError('');
    setLoadingMessage('Generating your interview question...');
    console.log('Starting test with:', { topic, difficulty });

    try {
      const question = await mockTestService.generateQuestion(topic, difficulty);
      console.log('Generated question:', question);
      setCurrentQuestion(question);
      setIsStarted(true);
      setFeedback(null);
    } catch (err) {
      console.error('Failed to start test:', err);
      setError('Failed to generate question. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleSubmitAnswer = async (answer: string) => {
    if (!currentQuestion) return;

    setIsLoading(true);
    setLoadingMessage('Analyzing your answer...');
    console.log('Submitting answer:', { questionId: currentQuestion.id, answerLength: answer.length });

    try {
      const feedbackResult = await mockTestService.generateFeedback(currentQuestion, answer);
      console.log('Generated feedback:', feedbackResult);
      setFeedback(feedbackResult);
    } catch (err) {
      console.error('Failed to generate feedback:', err);
      setError('Failed to generate feedback. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            setIsRecording(true);
            // Here you would implement actual recording logic
            console.log('Recording started');
          })
          .catch(err => {
            console.error('Error accessing microphone:', err);
            setError('Unable to access microphone. Please check your permissions.');
          });
      } else {
        setError('Voice recording is not supported in your browser.');
      }
    } else {
      // Stop recording
      setIsRecording(false);
      console.log('Recording stopped');
      // Here you would implement stop recording logic
    }
  };

  const handleRestart = () => {
    setIsStarted(false);
    setCurrentQuestion(null);
    setFeedback(null);
    setError('');
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-3 rounded-full bg-blue-500/20 mb-4"
          >
            <FaRobot className="text-4xl text-blue-400" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">AI Mock Interview</h1>
          <p className="text-gray-400">Practice with our AI interviewer and get instant feedback</p>
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-red-500/20 text-red-400 rounded-lg flex items-center space-x-3"
            >
              <FaExclamationTriangle />
              <span>{error}</span>
              <button
                onClick={() => setError('')}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-4">
                <FaSpinner className="text-blue-500 text-2xl animate-spin" />
                <span className="text-white font-medium">{loadingMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!isStarted && (
            <motion.div
              key="test-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TestForm
                onStartTest={handleStartTest}
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {isStarted && currentQuestion && !feedback && (
            <motion.div
              key="question-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <QuestionDisplay
                question={currentQuestion}
                onSubmitAnswer={handleSubmitAnswer}
                onRestart={handleRestart}
                isRecording={isRecording}
                toggleRecording={toggleRecording}
              />
            </motion.div>
          )}

          {feedback && (
            <motion.div
              key="feedback-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <FeedbackDisplay
                feedback={feedback}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
