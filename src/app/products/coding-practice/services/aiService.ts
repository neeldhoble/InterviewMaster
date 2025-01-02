interface AISuggestion {
  type: 'optimization' | 'improvement' | 'bug' | 'style';
  message: string;
  code?: string;
  explanation?: string;
}

interface CodeReview {
  suggestions: AISuggestion[];
  complexity: {
    time: string;
    space: string;
    explanation: string;
  };
  improvements: {
    readability: string[];
    performance: string[];
    bestPractices: string[];
  };
}

class AIService {
  private readonly API_ENDPOINT = '/api/ai';

  async getCodeReview(
    code: string,
    language: string,
    problemId: string
  ): Promise<CodeReview> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          problemId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI review');
      }

      return await response.json();
    } catch (error) {
      console.error('AI review error:', error);
      throw error;
    }
  }

  async getHints(problemId: string, currentProgress: number): Promise<string[]> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/hints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemId,
          currentProgress,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get hints');
      }

      return await response.json();
    } catch (error) {
      console.error('Hints error:', error);
      throw error;
    }
  }

  async getOptimizationSuggestions(
    code: string,
    language: string,
    complexity: { time: string; space: string }
  ): Promise<AISuggestion[]> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          complexity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get optimization suggestions');
      }

      return await response.json();
    } catch (error) {
      console.error('Optimization error:', error);
      throw error;
    }
  }

  async getExplanation(
    code: string,
    language: string
  ): Promise<{
    explanation: string;
    complexity: { time: string; space: string };
    keyPoints: string[];
  }> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/explain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get explanation');
      }

      return await response.json();
    } catch (error) {
      console.error('Explanation error:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();
export type { AISuggestion, CodeReview };
