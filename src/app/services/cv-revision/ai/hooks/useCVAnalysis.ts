import { useState } from 'react';

export const useCVAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const analyzeCv = async (cvText: string) => {
    if (!cvText.trim()) {
      setError('CV content cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/cv-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cvText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze CV');
      }

      setResult(data.analysis);
    } catch (err: any) {
      console.error('CV Analysis Error:', err);
      setError(err.message || 'An error occurred while analyzing the CV');
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeCv,
    loading,
    error,
    result,
  };
};
