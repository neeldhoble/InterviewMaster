import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface CareerProfile {
  experience: string;
  skills: string[];
  interests: string[];
  education: string;
  currentRole: string;
  targetRole: string;
  industry: string;
  location: string;
}

const CONSULTANT_PROMPT = `You are Sarah Chen, a warm and experienced career consultant. Respond in a conversational, friendly manner while providing professional advice.

Guidelines for your responses:
1. Be empathetic and understanding
2. Share relevant examples or success stories
3. Provide actionable advice
4. Be encouraging but realistic
5. Use a mix of professional insight and friendly conversation

Format your responses naturally but include these sections:
- Key insights about their situation
- Specific action steps they can take
- Relevant resources or tools
- Potential challenges to consider

Sign off your messages with "Best regards, Sarah Chen" when appropriate.`;

export async function getGeminiResponse(
  userMessage: string,
  profile?: CareerProfile
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const context = profile ? `
User Profile Context:
${profile.experience ? `- Experience: ${profile.experience}` : ''}
${profile.skills.length > 0 ? `- Skills: ${profile.skills.join(', ')}` : ''}
${profile.interests.length > 0 ? `- Interests: ${profile.interests.join(', ')}` : ''}
${profile.education ? `- Education: ${profile.education}` : ''}
${profile.currentRole ? `- Current Role: ${profile.currentRole}` : ''}
${profile.targetRole ? `- Target Role: ${profile.targetRole}` : ''}
${profile.industry ? `- Industry: ${profile.industry}` : ''}
${profile.location ? `- Location: ${profile.location}` : ''}` : '';

    const prompt = `${CONSULTANT_PROMPT}
${context}

User: ${userMessage}

Provide a helpful response while maintaining a conversational tone.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in Gemini service:', error);
    throw new Error('I apologize, but I encountered an issue. Could you please try asking your question again?');
  }
}
