"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Topic, Difficulty, Question, Feedback } from './types';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export class MockTestService {
  async generateQuestion(topic: Topic, difficulty: Difficulty): Promise<Question> {
    console.log('Starting question generation for:', { topic: topic.name, difficulty: difficulty.name });

    const prompt = `Generate a technical interview question for ${topic.name} at ${difficulty.name} level.
    
    Include:
    1. A detailed question that tests both theoretical and practical knowledge
    2. 3-5 key points that should be covered in the answer
    3. 2-3 follow-up questions to probe deeper understanding
    
    Format the response exactly like this example:
    {
      "id": "1",
      "question": "Explain the concept of Virtual DOM in React and how it improves performance. Include specific examples of when Virtual DOM provides the most benefit.",
      "type": "frontend",
      "difficulty": "mid",
      "expectedAnswer": [
        "Definition of Virtual DOM and its relationship with Real DOM",
        "How React's diffing algorithm works",
        "Performance benefits with specific examples",
        "Common use cases where Virtual DOM shines"
      ],
      "followUp": [
        "What are the potential drawbacks of Virtual DOM?",
        "How would you optimize a React component that renders a large list of items?"
      ]
    }`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Raw AI response:', text);
      
      let questionData;
      try {
        questionData = JSON.parse(text.trim());
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        // Try to extract JSON from the response if it contains additional text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          questionData = JSON.parse(jsonMatch[0]);
        } else {
          throw parseError;
        }
      }

      // Validate the question data
      if (!questionData.question || !questionData.expectedAnswer || !questionData.followUp) {
        throw new Error('Invalid question format');
      }

      return {
        id: questionData.id || '1',
        question: questionData.question,
        type: topic.id,
        difficulty: difficulty.id,
        expectedAnswer: questionData.expectedAnswer,
        followUp: questionData.followUp
      };
    } catch (error) {
      console.error('Failed to generate question:', error);
      // Return a fallback question
      return {
        id: '1',
        question: `Please explain key concepts and best practices in ${topic.name} that you would use in a production environment.`,
        type: topic.id,
        difficulty: difficulty.id,
        expectedAnswer: [
          "Core concepts and principles",
          "Real-world implementation examples",
          "Best practices and patterns",
          "Performance considerations"
        ],
        followUp: [
          "How would you handle scalability challenges?",
          "What are the common pitfalls to avoid?"
        ]
      };
    }
  }

  async generateFeedback(question: Question, answer: string): Promise<Feedback> {
    console.log('Starting feedback generation for answer length:', answer.length);

    const prompt = `Evaluate this technical interview answer:

Question: ${question.question}

Key points that should be covered:
${question.expectedAnswer?.join('\n')}

Candidate's answer:
${answer}

Provide a constructive evaluation in this format:
{
  "score": 85,
  "strengths": [
    "Strong understanding of core concepts",
    "Clear communication style"
  ],
  "improvements": [
    "Could provide more specific examples",
    "Consider discussing performance implications"
  ],
  "technicalAccuracy": 90,
  "communicationClarity": 85,
  "structuredThinking": 80,
  "recommendations": [
    "Practice explaining concepts with concrete examples",
    "Focus on system design trade-offs"
  ]
}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Raw feedback response:', text);
      
      let feedbackData;
      try {
        feedbackData = JSON.parse(text.trim());
      } catch (parseError) {
        console.error('Failed to parse feedback:', parseError);
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          feedbackData = JSON.parse(jsonMatch[0]);
        } else {
          throw parseError;
        }
      }

      // Ensure all required fields are present
      const feedback: Feedback = {
        score: feedbackData.score || 70,
        strengths: feedbackData.strengths || ["Attempted to answer the question"],
        improvements: feedbackData.improvements || ["Need more specific details"],
        technicalAccuracy: feedbackData.technicalAccuracy || 70,
        communicationClarity: feedbackData.communicationClarity || 70,
        structuredThinking: feedbackData.structuredThinking || 70,
        recommendations: feedbackData.recommendations || ["Review core concepts"]
      };

      return feedback;
    } catch (error) {
      console.error('Failed to generate feedback:', error);
      // Return default feedback
      return {
        score: 70,
        strengths: ["Attempted to answer the question"],
        improvements: ["Need more specific details"],
        technicalAccuracy: 70,
        communicationClarity: 70,
        structuredThinking: 70,
        recommendations: ["Review core concepts and try again"]
      };
    }
  }
}

export const mockTestService = new MockTestService();
