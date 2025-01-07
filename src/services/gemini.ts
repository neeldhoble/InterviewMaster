"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface CoachingFeedback {
  feedback: string;
  suggestions: string[];
  nextTip: string;
  confidence: number;
}

interface CoachingTopic {
  title: string;
  description: string;
  keyPoints: string[];
}

class GeminiService {
  private model = genAI.getGenerativeModel({ model: "gemini-pro" });

  async getCoachingTopics(role: string, experience: string): Promise<CoachingTopic[]> {
    const prompt = `Create a list of interview coaching topics for a ${role} position with ${experience} experience.
    Return ONLY a JSON array of topics in this format:
    [
      {
        "title": "topic title",
        "description": "brief description",
        "keyPoints": ["key point 1", "key point 2"]
      }
    ]`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Error getting coaching topics:', error);
      return [
        {
          title: "Body Language Mastery",
          description: "Learn effective non-verbal communication",
          keyPoints: ["Maintain eye contact", "Use confident posture", "Appropriate gestures"]
        },
        {
          title: "Voice and Speech",
          description: "Perfect your speaking style",
          keyPoints: ["Clear pronunciation", "Appropriate pace", "Voice modulation"]
        }
      ];
    }
  }

  async getCoachingAdvice(topic: string, context: string): Promise<string> {
    const prompt = `As an expert interview coach, provide detailed advice about ${topic} in the context of ${context}.
    Focus on practical, actionable tips. Keep it concise and engaging, using a friendly, encouraging tone.
    Limit to 3-4 sentences.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return "Remember to maintain good posture and eye contact. Speak clearly and confidently, varying your tone to emphasize key points. Practice these techniques regularly to make them natural.";
    }
  }

  async analyzePractice(
    topic: string,
    recording: string,
    duration: number
  ): Promise<CoachingFeedback> {
    const prompt = `Analyze this practice session for ${topic}:
    Recording transcript: ${recording}
    Duration: ${duration} seconds
    
    Return ONLY a JSON object in this format:
    {
      "feedback": "detailed feedback",
      "suggestions": ["suggestion1", "suggestion2"],
      "nextTip": "next practice tip",
      "confidence": 85
    }`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      return {
        feedback: "Good effort in practicing the techniques.",
        suggestions: ["Try to speak more slowly", "Practice in front of a mirror"],
        nextTip: "Focus on maintaining eye contact while speaking",
        confidence: 75
      };
    }
  }

  async getExampleDemonstration(topic: string): Promise<string> {
    const prompt = `Provide a short, natural demonstration script for teaching ${topic} in interview coaching.
    Make it sound natural and conversational, as if a coach is speaking directly to the student.
    Keep it under 30 seconds when spoken.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return "Let me demonstrate proper eye contact. Notice how I maintain steady but not intense eye contact, occasionally breaking it naturally. This shows confidence and engagement without being intimidating.";
    }
  }

  async generatePracticeScenario(topic: string): Promise<string> {
    const prompt = `Create a practice scenario for ${topic} that a candidate can use to improve their interview skills.
    Make it specific and actionable, with clear instructions.
    Keep it concise and engaging.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return "Practice introducing yourself while standing up. Focus on maintaining good posture and using natural hand gestures. Record yourself and watch for any nervous movements.";
    }
  }

  async providePracticeReport(
    practices: { topic: string; recording: string; feedback: CoachingFeedback }[]
  ): Promise<string> {
    const prompt = `Create a progress report based on these practice sessions:
    ${practices.map(p => `
      Topic: ${p.topic}
      Recording: ${p.recording}
      Feedback: ${JSON.stringify(p.feedback)}
    `).join('\n')}
    
    Provide encouraging feedback and specific improvement suggestions.
    Format in markdown.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return `# Practice Progress Report

## Overall Progress
You're making good strides in your interview preparation.

## Key Improvements
- More confident delivery
- Better posture maintenance
- Clearer speech patterns

## Focus Areas
1. Continue practicing voice modulation
2. Work on natural hand gestures
3. Maintain consistent eye contact

Keep up the great work! Each practice session brings you closer to interview success.`;
    }
  }
}

export const geminiService = new GeminiService();
