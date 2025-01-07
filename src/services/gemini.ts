"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface InterviewQuestion {
  question: string;
  context: string;
  exampleAnswer: string;
  keyPoints: string[];
  tips: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

class GeminiService {
  private model = genAI.getGenerativeModel({ model: "gemini-pro" });

  async getNextQuestion(role: string, previousQuestions: string[]): Promise<InterviewQuestion> {
    const prompt = `Generate a detailed interview question for a ${role} position.
    Previous questions asked: ${previousQuestions.join(', ')}
    
    Return in JSON format:
    {
      "question": "the interview question",
      "context": "why this question is asked",
      "exampleAnswer": "a model answer demonstrating best practices",
      "keyPoints": ["key points to include in answer"],
      "tips": ["specific tips for answering"],
      "difficulty": "medium"
    }`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Error generating question:', error);
      return this.getDefaultQuestion();
    }
  }

  async demonstrateAnswer(question: string, role: string): Promise<string> {
    const prompt = `As an expert interviewer, demonstrate how to answer this interview question for a ${role} position:
    "${question}"
    
    Provide a natural, conversational response that:
    1. Uses the STAR method where applicable
    2. Includes specific examples
    3. Demonstrates key skills
    4. Shows enthusiasm and confidence
    
    Keep the response concise but impactful.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return "Let me demonstrate a strong response to this question...";
    }
  }

  private getDefaultQuestion(): InterviewQuestion {
    return {
      question: "Can you describe a challenging project you've worked on?",
      context: "This question assesses problem-solving and project management skills",
      exampleAnswer: "In my previous role, I led a team of five developers to rebuild our company's legacy payment system. The main challenge was ensuring zero downtime during the migration. I implemented a phased rollout strategy and conducted extensive testing, resulting in a successful migration with 99.9% uptime.",
      keyPoints: [
        "Specific project example",
        "Clear challenge identification",
        "Actions taken",
        "Measurable results"
      ],
      tips: [
        "Use the STAR method",
        "Focus on your direct contributions",
        "Include metrics where possible",
        "Keep it concise but detailed"
      ],
      difficulty: "medium"
    };
  }

  // ... (keep other existing methods)
}

export const geminiService = new GeminiService();
