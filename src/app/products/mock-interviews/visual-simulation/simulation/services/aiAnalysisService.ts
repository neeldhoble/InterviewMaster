import { Configuration, OpenAIApi } from 'openai';

interface AnalysisResult {
  communicationScore: number;
  bodyLanguageScore: number;
  answerQualityScore: number;
  tips: string[];
}

interface VideoMetrics {
  faceExpression: string;
  eyeContact: boolean;
  posture: string;
}

class AIAnalysisService {
  private fillerWords = ['um', 'uh', 'like', 'you know', 'sort of', 'kind of'];
  private positiveWords = ['confident', 'experience', 'achieve', 'success', 'improve', 'lead', 'develop'];
  private starPatterns = ['situation', 'task', 'action', 'result'];
  private lastAnalysis: AnalysisResult = {
    communicationScore: 0,
    bodyLanguageScore: 0,
    answerQualityScore: 0,
    tips: []
  };

  async analyzeResponse(
    transcription: string,
    question: string,
    videoAnalysis: VideoMetrics
  ): Promise<AnalysisResult> {
    try {
      // Communication Score Analysis
      const communicationScore = this.analyzeCommunication(transcription);

      // Body Language Score Analysis
      const bodyLanguageScore = this.analyzeBodyLanguage(videoAnalysis);

      // Answer Quality Score Analysis
      const answerQualityScore = this.analyzeAnswerQuality(transcription, question);

      // Generate Tips
      const tips = this.generateTips(communicationScore, bodyLanguageScore, answerQualityScore, transcription);

      this.lastAnalysis = {
        communicationScore,
        bodyLanguageScore,
        answerQualityScore,
        tips
      };

      return this.lastAnalysis;
    } catch (error) {
      console.error('Analysis error:', error);
      return this.lastAnalysis;
    }
  }

  private analyzeCommunication(text: string): number {
    let score = 70; // Base score
    const words = text.toLowerCase().split(' ');
    const totalWords = words.length;
    
    if (totalWords === 0) return score;

    // Check speaking pace (words per minute)
    const wordsPerMinute = totalWords * 2; // Assuming average 30 seconds per response
    if (wordsPerMinute > 130 && wordsPerMinute < 160) score += 10;
    else if (wordsPerMinute > 100 && wordsPerMinute < 190) score += 5;
    else score -= 5;

    // Check filler words
    const fillerWordCount = this.fillerWords.reduce((count, word) => 
      count + (text.toLowerCase().match(new RegExp(word, 'g')) || []).length, 0);
    const fillerWordRatio = fillerWordCount / totalWords;
    
    if (fillerWordRatio < 0.05) score += 15;
    else if (fillerWordRatio < 0.1) score += 5;
    else score -= 10;

    // Check sentence structure
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const avgWordsPerSentence = totalWords / sentences.length;
    if (avgWordsPerSentence > 10 && avgWordsPerSentence < 20) score += 10;

    return Math.min(Math.max(score, 0), 100);
  }

  private analyzeBodyLanguage(metrics: VideoMetrics): number {
    let score = 70;

    // Eye contact analysis
    if (metrics.eyeContact) score += 15;
    else score -= 10;

    // Posture analysis
    if (metrics.posture === 'good') score += 15;
    else if (metrics.posture === 'fair') score += 5;
    else score -= 10;

    // Expression analysis
    if (metrics.faceExpression === 'positive') score += 10;
    else if (metrics.faceExpression === 'neutral') score += 5;
    else score -= 5;

    return Math.min(Math.max(score, 0), 100);
  }

  private analyzeAnswerQuality(text: string, question: string): number {
    let score = 70;
    const words = text.toLowerCase().split(' ');

    // Check for STAR method usage
    const starWordsUsed = this.starPatterns.filter(pattern => 
      text.toLowerCase().includes(pattern)
    ).length;
    score += starWordsUsed * 5;

    // Check for specific examples
    const specificityIndicators = ['for example', 'specifically', 'in particular', 'instance'];
    const hasSpecificExamples = specificityIndicators.some(indicator => 
      text.toLowerCase().includes(indicator)
    );
    if (hasSpecificExamples) score += 10;

    // Check for positive language
    const positiveWordsUsed = this.positiveWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    score += positiveWordsUsed * 2;

    // Check answer relevance to question
    const questionWords = question.toLowerCase().split(' ');
    const relevantWords = questionWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    const relevanceScore = (relevantWords / questionWords.length) * 20;
    score += relevanceScore;

    return Math.min(Math.max(score, 0), 100);
  }

  private generateTips(
    communicationScore: number,
    bodyLanguageScore: number,
    answerQualityScore: number,
    text: string
  ): string[] {
    const tips: string[] = [];

    // Communication tips
    if (this.fillerWords.some(word => text.toLowerCase().includes(word))) {
      tips.push('Try to reduce filler words like "um" and "uh"');
    }
    if (text.split(' ').length / 30 > 180) {
      tips.push('Slow down your speaking pace for better clarity');
    }

    // Body language tips
    if (bodyLanguageScore < 80) {
      tips.push('Maintain consistent eye contact with the camera');
    }

    // Answer quality tips
    if (!this.starPatterns.some(pattern => text.toLowerCase().includes(pattern))) {
      tips.push('Structure your answer using the STAR method (Situation, Task, Action, Result)');
    }
    if (!text.toLowerCase().includes('for example')) {
      tips.push('Include specific examples to support your points');
    }

    // Ensure we have at least 3 tips
    const defaultTips = [
      'Practice active listening before responding',
      'End your responses with a strong conclusion',
      'Show enthusiasm through your tone and expressions'
    ];

    while (tips.length < 3) {
      const defaultTip = defaultTips[tips.length];
      if (!tips.includes(defaultTip)) {
        tips.push(defaultTip);
      }
    }

    return tips.slice(0, 3); // Return top 3 tips
  }
}

export const aiAnalysisService = new AIAnalysisService();
