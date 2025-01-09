import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_OPENAI_API_KEY || '');

interface FeedbackMetrics {
  confidence: number;
  clarity: number;
  technicalAccuracy: number;
  completeness: number;
  relevance: number;
  structure: number;
}

interface DetailedFeedback {
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  resources: string[];
  score: number;
  metrics: FeedbackMetrics;
}

export async function analyzeWithGemini(
  response: string,
  role: string,
  type: string,
  level: string
): Promise<DetailedFeedback> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `As an expert technical interviewer for ${role} positions, analyze this ${type} interview response for a ${level} position:

Response: "${response}"

Provide a comprehensive interview feedback analysis in the following JSON format:
{
  "strengths": [3-5 specific technical and communication strengths demonstrated],
  "improvements": [3-5 specific areas where the response could be enhanced],
  "suggestions": [4-6 actionable recommendations for improving future responses],
  "resources": [3-4 specific learning resources, documentation, or practice materials],
  "score": [overall interview performance score out of 100],
  "metrics": {
    "confidence": [score for communication confidence and delivery],
    "clarity": [score for explanation clarity and structure],
    "technicalAccuracy": [score for technical correctness and depth],
    "completeness": [score for covering all aspects of the question],
    "relevance": [score for staying focused and relevant],
    "structure": [score for logical flow and organization]
  }
}

Evaluate based on:
1. Technical accuracy and depth of knowledge
2. Problem-solving approach and methodology
3. Communication clarity and professionalism
4. Completeness of the response
5. Relevance to the question
6. Structure and organization

Be specific and constructive in your feedback.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Parse the JSON response
      const feedback = JSON.parse(text);
      
      // Validate the feedback object has all required fields
      if (!feedback.strengths || !feedback.improvements || !feedback.suggestions || 
          !feedback.resources || !feedback.score || !feedback.metrics) {
        throw new Error('Invalid feedback format');
      }

      return {
        strengths: feedback.strengths,
        improvements: feedback.improvements,
        suggestions: feedback.suggestions,
        resources: feedback.resources,
        score: feedback.score,
        metrics: {
          confidence: feedback.metrics.confidence,
          clarity: feedback.metrics.clarity,
          technicalAccuracy: feedback.metrics.technicalAccuracy,
          completeness: feedback.metrics.completeness,
          relevance: feedback.metrics.relevance,
          structure: feedback.metrics.structure
        }
      };
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      throw new Error('Failed to parse AI response. Please try again.');
    }
  } catch (error) {
    console.error('Error analyzing with Gemini:', error);
    throw new Error('Failed to analyze response. Please try again.');
  }
}
