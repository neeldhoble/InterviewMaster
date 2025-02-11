'use client';

import { useState } from 'react';
import { UserInput, InterviewResult } from './types';
import LandingPage from './components/LandingPage';
import InterviewForm from './components/InterviewForm';
import ResultsPage from './components/ResultsPage';

export default function InterviewGenerator() {
  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState<InterviewResult | null>(null);

  const handleGetStarted = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (data: UserInput) => {
    try {
      const response = await fetch('/api/interview-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate interview questions');
      }

      const result = await response.json();
      setResult(result);
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
      // Handle error appropriately
    }
  };

  const handleBack = () => {
    setResult(null);
    setShowForm(true);
  };

  const handleGenerateMore = () => {
    setShowForm(true);
  };

  if (result) {
    return (
      <ResultsPage
        result={result}
        onBack={handleBack}
        onGenerateMore={handleGenerateMore}
      />
    );
  }

  return (
    <>
      <LandingPage onGetStarted={handleGetStarted} />
      {showForm && (
        <InterviewForm
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}
