import { UserProgress, Submission, Badge } from '../types';

class ProgressService {
  private readonly API_ENDPOINT = '/api/progress';

  async getUserProgress(): Promise<UserProgress> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/user`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user progress');
      }

      return await response.json();
    } catch (error) {
      console.error('Progress fetch error:', error);
      throw error;
    }
  }

  async updateSubmission(submission: Omit<Submission, 'timestamp'>): Promise<Submission> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error('Failed to update submission');
      }

      return await response.json();
    } catch (error) {
      console.error('Submission update error:', error);
      throw error;
    }
  }

  async getStreak(): Promise<{ current: number; longest: number }> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/streak`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch streak');
      }

      return await response.json();
    } catch (error) {
      console.error('Streak fetch error:', error);
      throw error;
    }
  }

  async getBadges(): Promise<Badge[]> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/badges`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch badges');
      }

      return await response.json();
    } catch (error) {
      console.error('Badges fetch error:', error);
      throw error;
    }
  }

  async getLeaderboard(timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time'): Promise<{
    rank: number;
    score: number;
    leaderboard: Array<{
      rank: number;
      username: string;
      score: number;
      avatar: string;
    }>;
  }> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/leaderboard?timeframe=${timeframe}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }

      return await response.json();
    } catch (error) {
      console.error('Leaderboard fetch error:', error);
      throw error;
    }
  }

  async updateLastActive(): Promise<void> {
    try {
      await fetch(`${this.API_ENDPOINT}/active`, { method: 'POST' });
    } catch (error) {
      console.error('Last active update error:', error);
    }
  }

  async getRecommendations(): Promise<Array<{
    problemId: string;
    title: string;
    difficulty: string;
    reason: string;
  }>> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/recommendations`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      return await response.json();
    } catch (error) {
      console.error('Recommendations fetch error:', error);
      throw error;
    }
  }
}

export const progressService = new ProgressService();
