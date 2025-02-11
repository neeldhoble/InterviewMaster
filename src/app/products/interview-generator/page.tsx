'use client';

import { useState } from 'react';
import InterviewForm from './components/InterviewForm';
import ResultsPage from './components/ResultsPage';
import { UserInput, InterviewResult } from './types';

export default function InterviewGenerator() {
  const [result, setResult] = useState<InterviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUserInput, setLastUserInput] = useState<UserInput | null>(null);

  const generateQuestions = async (userInput: UserInput) => {
    try {
      setLoading(true);
      setError(null);
      setLastUserInput(userInput);

      const response = await fetch('/api/interview-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });

      if (!response.ok) {
        throw new Error('Failed to generate interview questions');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const generateMoreQuestions = async () => {
    if (!lastUserInput) return null;
    
    try {
      const response = await fetch('/api/interview-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lastUserInput),
      });

      if (!response.ok) {
        throw new Error('Failed to generate more questions');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error generating more questions:', err);
      throw err;
    }
  };

  const handleBack = () => {
    setResult(null);
    setError(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      {result ? (
        <ResultsPage
          result={result}
          onBack={handleBack}
          onGenerateMore={generateMoreQuestions}
        />
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">AI Interview Generator</h1>
          <InterviewForm onSubmit={generateQuestions} loading={loading} />
        </div>
      )}
    </div>
  );
}
