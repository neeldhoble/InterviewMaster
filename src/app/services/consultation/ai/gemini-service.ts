import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

interface CareerParameters {
  experience?: string;
  skills?: string[];
  interests?: string[];
  education?: string;
  currentRole?: string;
  targetRole?: string;
  industry?: string;
  location?: string;
}

interface StructuredResponse {
  keyPoints: string[];
  actionItems: string[];
  resources: string[];
  timeline: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  challenges: string[];
}

export const getGeminiResponse = async (prompt: string, parameters?: CareerParameters) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const context = `You are an expert AI career consultant. Provide advice in a clear, point-wise format.
    Consider these parameters about the person:
    ${parameters?.experience ? `Experience: ${parameters.experience}` : ''}
    ${parameters?.skills ? `Skills: ${parameters.skills.join(', ')}` : ''}
    ${parameters?.interests ? `Interests: ${parameters.interests.join(', ')}` : ''}
    ${parameters?.education ? `Education: ${parameters.education}` : ''}
    ${parameters?.currentRole ? `Current Role: ${parameters.currentRole}` : ''}
    ${parameters?.targetRole ? `Target Role: ${parameters.targetRole}` : ''}
    ${parameters?.industry ? `Industry: ${parameters.industry}` : ''}
    ${parameters?.location ? `Location: ${parameters.location}` : ''}

    Format your response exactly like this:

    KEY POINTS:
    - [First key point]
    - [Second key point]
    - [Third key point]

    ACTION ITEMS:
    - [First action item]
    - [Second action item]
    - [Third action item]

    RESOURCES:
    - [First resource]
    - [Second resource]
    - [Third resource]

    TIMELINE:
    Short-term (0-3 months):
    - [First short-term goal]
    - [Second short-term goal]

    Medium-term (3-6 months):
    - [First medium-term goal]
    - [Second medium-term goal]

    Long-term (6+ months):
    - [First long-term goal]
    - [Second long-term goal]

    CHALLENGES:
    - [First challenge]
    - [Second challenge]
    - [Third challenge]

    Keep each point concise and actionable. Use bullet points only.`;

    const result = await model.generateContent(`${context}\n\nUser Query: ${prompt}`);
    const response = await result.response;
    const text = response.text();

    try {
      // Parse the response into sections
      const sections = text.split('\n\n');
      const keyPoints = sections.find(s => s.includes('KEY POINTS:'))
        ?.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace('-', '').trim()) || [];

      const actionItems = sections.find(s => s.includes('ACTION ITEMS:'))
        ?.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace('-', '').trim()) || [];

      const resources = sections.find(s => s.includes('RESOURCES:'))
        ?.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace('-', '').trim()) || [];

      const timelineSection = sections.find(s => s.includes('TIMELINE:')) || '';
      const shortTerm = timelineSection
        .split('Short-term')[1]
        ?.split('Medium-term')[0]
        ?.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace('-', '').trim()) || [];

      const mediumTerm = timelineSection
        .split('Medium-term')[1]
        ?.split('Long-term')[0]
        ?.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace('-', '').trim()) || [];

      const longTerm = timelineSection
        .split('Long-term')[1]
        ?.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace('-', '').trim()) || [];

      const challenges = sections.find(s => s.includes('CHALLENGES:'))
        ?.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace('-', '').trim()) || [];

      return {
        keyPoints,
        actionItems,
        resources,
        timeline: {
          shortTerm,
          mediumTerm,
          longTerm,
        },
        challenges,
      };
    } catch (parseError) {
      // Fallback to simple bullet points if parsing fails
      return {
        keyPoints: [text],
        actionItems: [],
        resources: [],
        timeline: {
          shortTerm: [],
          mediumTerm: [],
          longTerm: [],
        },
        challenges: [],
      };
    }
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    throw new Error('Failed to get AI response. Please try again.');
  }
}
