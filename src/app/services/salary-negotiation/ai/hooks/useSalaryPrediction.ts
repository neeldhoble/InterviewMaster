import { useState, useCallback } from 'react';
import { SalaryModel, type SalaryFactors } from '../lib/ml/salaryModel';

export function useSalaryPrediction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const getPrediction = useCallback(async (input: SalaryFactors) => {
    setLoading(true);
    setError(null);

    try {
      const model = new SalaryModel();
      const prediction = model.predict(input);
      
      setResult(prediction);
      return prediction;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate salary prediction');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    result,
    getPrediction
  };
}
