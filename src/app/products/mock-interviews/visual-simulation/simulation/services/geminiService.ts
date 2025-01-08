import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  async analyzeInterview(transcript: string, question: string) {
    try {
      const prompt = `
        As an expert interview coach, analyze this interview response:
        
        Question: ${question}
        Response: ${transcript}
        
        Provide a detailed analysis including:
        1. Answer quality (structure, relevance, examples)
        2. Communication skills (clarity, pace, confidence)
        3. Key strengths
        4. Areas for improvement
        5. Specific tips for better responses
        
        Format the response as a JSON object with these fields:
        {
          answerQuality: { score: number, feedback: string },
          communication: { score: number, feedback: string },
          strengths: string[],
          improvements: string[],
          tips: string[]
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse Gemini response:', e);
        return this.getDefaultAnalysis();
      }
    } catch (error) {
      console.error('Gemini analysis error:', error);
      return this.getDefaultAnalysis();
    }
  }

  async generateFollowUpQuestion(transcript: string, currentQuestion: string) {
    try {
      const prompt = `
        Based on this interview response:
        
        Current Question: ${currentQuestion}
        Response: ${transcript}
        
        Generate a relevant follow-up question that:
        1. Probes deeper into the candidate's experience
        2. Challenges any assumptions made
        3. Explores specific examples mentioned
        
        Return only the follow-up question, no additional text.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini follow-up question error:', error);
      return null;
    }
  }

  async provideFeedbackSuggestions(transcript: string) {
    try {
      const prompt = `
        Analyze this interview response and provide real-time suggestions:
        
        Response: ${transcript}
        
        Provide 3 quick, actionable tips for improvement focusing on:
        1. Communication style
        2. Content structure
        3. Engagement
        
        Format as a JSON array of strings with exactly 3 short, specific tips.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse Gemini suggestions:', e);
        return ['Speak more clearly', 'Provide specific examples', 'Maintain good pace'];
      }
    } catch (error) {
      console.error('Gemini suggestions error:', error);
      return ['Speak more clearly', 'Provide specific examples', 'Maintain good pace'];
    }
  }

  async generateImprovedAnswer(transcript: string, question: string) {
    try {
      const prompt = `
        As an expert interview coach, analyze this interview response and provide an improved version:

        Question: ${question}
        Original Response: ${transcript}

        Please provide:
        1. A brief analysis of the original answer
        2. An improved version of the answer
        3. Key improvements made

        Format the response as a JSON object:
        {
          "analysis": "Brief analysis of original answer",
          "improvedAnswer": "The improved version",
          "keyImprovements": ["improvement 1", "improvement 2", "improvement 3"]
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse Gemini improved answer:', e);
        return {
          analysis: "Unable to analyze the response",
          improvedAnswer: "Unable to generate improved answer",
          keyImprovements: ["Focus on structure", "Add specific examples", "Be more concise"]
        };
      }
    } catch (error) {
      console.error('Gemini improved answer error:', error);
      return {
        analysis: "Error analyzing the response",
        improvedAnswer: "Error generating improved answer",
        keyImprovements: ["Focus on structure", "Add specific examples", "Be more concise"]
      };
    }
  }

  private getDefaultAnalysis() {
    return {
      answerQuality: { score: 70, feedback: 'Generally good response' },
      communication: { score: 75, feedback: 'Clear communication' },
      strengths: ['Good articulation', 'Structured response'],
      improvements: ['Add more specific examples', 'Pace could be better'],
      tips: ['Include concrete examples', 'Maintain steady pace', 'Structure answers with STAR method']
    };
  }
}

export const geminiService = new GeminiService();
