import { useState } from 'react';

interface Question {
  id: string;
  text: string;
  type: string;
  difficulty: string;
}

export const useAIInterviewer = (difficulty: string, questionTypes: string[]) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [emotion, setEmotion] = useState('neutral');
  const [error, setError] = useState<string | null>(null);

  // Mock questions for development
  const mockQuestions = [
    {
      id: '1',
      text: 'Tell me about yourself and your background.',
      type: 'introduction',
      difficulty: 'easy',
    },
    {
      id: '2',
      text: 'What are your greatest strengths and weaknesses?',
      type: 'behavioral',
      difficulty: 'medium',
    },
    {
      id: '3',
      text: 'Where do you see yourself in five years?',
      type: 'career',
      difficulty: 'medium',
    },
  ];

  const askQuestion = async () => {
    try {
      setIsThinking(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For now, randomly select a question
      const randomQuestion = mockQuestions[Math.floor(Math.random() * mockQuestions.length)];
      setCurrentQuestion(randomQuestion);
      setEmotion('interested');

      return randomQuestion;
    } catch (err) {
      setError('Failed to get next question');
      return null;
    } finally {
      setIsThinking(false);
    }
  };

  const analyzeResponse = async (recordingBlob: Blob) => {
    try {
      setError(null);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock analysis response
      return {
        score: Math.random() * 100,
        feedback: 'Good response! Consider providing more specific examples.',
      };
    } catch (err) {
      setError('Failed to analyze response');
      throw err;
    }
  };

  return {
    currentQuestion,
    isThinking,
    emotion,
    error,
    askQuestion,
    analyzeResponse,
  };
};
