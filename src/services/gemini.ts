"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface InterviewFeedback {
  feedback: string;
  suggestions: string[];
  confidence: number;
  strengths: string[];
  improvements: string[];
  bodyLanguageTips: string[];
  voiceModulationTips: string[];
  technicalAccuracy: number;
  communicationScore: number;
}

interface MockInterviewQuestion {
  question: string;
  context: string;
  expectedPoints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

class GeminiService {
  private model = genAI.getGenerativeModel({ model: "gemini-pro" });

  async analyzeSpeech(transcript: string): Promise<InterviewFeedback> {
    const prompt = `Analyze this interview response transcript for voice patterns, clarity, and content:
    "${transcript}"
    
    Provide detailed feedback in JSON format with:
    {
      "feedback": "overall feedback",
      "suggestions": ["specific suggestions"],
      "confidence": 85,
      "strengths": ["identified strengths"],
      "improvements": ["areas to improve"],
      "voiceModulationTips": ["voice improvement tips"],
      "technicalAccuracy": 90,
      "communicationScore": 88
    }`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Error analyzing speech:', error);
      return this.getDefaultFeedback();
    }
  }

  async analyzeBodyLanguage(videoData: any): Promise<string[]> {
    const prompt = `Analyze the following body language metrics and provide specific improvement tips:
    - Posture
    - Hand gestures
    - Eye contact
    - Facial expressions
    Return only an array of specific, actionable tips.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      return [
        "Maintain upright posture",
        "Use natural hand gestures",
        "Make consistent eye contact",
        "Show engaged facial expressions"
      ];
    }
  }

  async generateMockInterview(role: string, experience: string, topic: string): Promise<MockInterviewQuestion[]> {
    const prompt = `Create 5 mock interview questions for a ${role} position with ${experience} experience, focusing on ${topic}.
    Return in JSON format:
    [{
      "question": "question text",
      "context": "why this is asked",
      "expectedPoints": ["key points to cover"],
      "difficulty": "medium"
    }]`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      return this.getDefaultQuestions();
    }
  }

  async getPersonalizedTips(role: string, experience: string, strengths: string[], weaknesses: string[]): Promise<any> {
    const prompt = `Create a personalized improvement plan for a ${role} with ${experience} experience.
    Strengths: ${strengths.join(', ')}
    Areas to improve: ${weaknesses.join(', ')}
    
    Return in JSON format:
    {
      "shortTermGoals": ["goal1", "goal2"],
      "longTermGoals": ["goal1", "goal2"],
      "dailyPracticeTips": ["tip1", "tip2"],
      "resourceRecommendations": ["resource1", "resource2"]
    }`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      return this.getDefaultImprovementPlan();
    }
  }

  async analyzeResponse(question: string, answer: string): Promise<any> {
    const prompt = `Analyze this interview response:
    Question: "${question}"
    Answer: "${answer}"
    
    Provide analysis in JSON format:
    {
      "relevance": 90,
      "structure": 85,
      "clarity": 88,
      "technicalAccuracy": 92,
      "improvements": ["improvement1", "improvement2"],
      "positiveAspects": ["aspect1", "aspect2"]
    }`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      return this.getDefaultResponseAnalysis();
    }
  }

  async generateFeedbackSummary(sessionData: any): Promise<string> {
    const prompt = `Create a comprehensive feedback summary for this interview session:
    ${JSON.stringify(sessionData)}
    
    Include:
    1. Overall performance
    2. Key strengths
    3. Areas for improvement
    4. Specific action items
    5. Next steps`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return "Session summary not available. Please try again.";
    }
  }

  private getDefaultFeedback(): InterviewFeedback {
    return {
      feedback: "Good effort in the interview response.",
      suggestions: ["Practice more concise answers", "Use the STAR method"],
      confidence: 75,
      strengths: ["Clear communication", "Structured response"],
      improvements: ["Add more specific examples", "Work on pacing"],
      bodyLanguageTips: ["Maintain eye contact", "Use confident posture"],
      voiceModulationTips: ["Vary tone for emphasis", "Speak at a steady pace"],
      technicalAccuracy: 80,
      communicationScore: 75
    };
  }

  private getDefaultQuestions(): MockInterviewQuestion[] {
    return [
      {
        question: "Tell me about a challenging project you worked on.",
        context: "Assessing problem-solving and project management skills",
        expectedPoints: ["Project description", "Challenges faced", "Solutions implemented", "Outcome"],
        difficulty: "medium"
      }
    ];
  }

  private getDefaultImprovementPlan() {
    return {
      shortTermGoals: ["Improve response structure", "Practice common questions"],
      longTermGoals: ["Master technical concepts", "Develop leadership skills"],
      dailyPracticeTips: ["Record practice sessions", "Review industry news"],
      resourceRecommendations: ["Online courses", "Industry blogs"]
    };
  }

  private getDefaultResponseAnalysis() {
    return {
      relevance: 80,
      structure: 75,
      clarity: 70,
      technicalAccuracy: 80,
      improvements: ["Add more specific examples", "Improve answer structure"],
      positiveAspects: ["Good technical knowledge", "Clear communication"]
    };
  }
}

export const geminiService = new GeminiService();
