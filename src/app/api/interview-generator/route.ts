import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InterviewQuestion, InterviewResult, UserInput } from '@/app/products/interview-generator/types';
import { v4 as uuidv4 } from 'uuid';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

function cleanJsonString(str: string): string {
  return str
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/"/g, '\\"');
}

function extractJsonArray(text: string): string {
  const matches = text.match(/\[[\s\S]*\]/);
  if (matches) {
    return matches[0];
  }
  throw new Error('No JSON array found in response');
}

export async function POST(request: Request) {
  try {
    const userInput: UserInput = await request.json();

    const prompt = `You are an experienced interviewer at ${userInput.company}. Generate a comprehensive set of interview questions for a ${userInput.jobRole} position.

Candidate Profile:
- Experience: ${userInput.experience} years
- Skills: ${userInput.skills.join(', ')}
${userInput.resumeText ? `- Resume Context: ${userInput.resumeText}` : ''}

Generate 15 detailed interview questions covering:
1. Technical Skills (5 questions)
   - Focus on ${userInput.skills.slice(0, 3).join(', ')}
   - Include practical scenarios
   
2. Behavioral/Soft Skills (5 questions)
   - Team collaboration
   - Problem-solving
   - Communication
   - Conflict resolution
   - Leadership/Initiative
   
3. Company/Role Specific (5 questions)
   - Company culture fit
   - Role-specific challenges
   - Industry knowledge
   - Career goals alignment
   - Project management

For each question:
1. Make it specific to ${userInput.company}'s industry and culture
2. Provide a detailed, human-like sample answer (300-400 words)
3. Include specific examples and STAR method responses where applicable
4. Add follow-up points the interviewer might ask

Return the response in this exact JSON format:
[
  {
    "question": "detailed question text",
    "answer": "comprehensive answer with examples",
    "category": "Technical|Behavioral|Company Specific",
    "difficulty": "easy|medium|hard"
  }
]

Make the answers sound natural and conversational, as if a real person is responding in an interview.`;

    // Generate content using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const geminiResponse = await model.generateContent(prompt);
    const response = await geminiResponse.response;
    let text = response.text();

    // Parse the response and format it
    let questions: InterviewQuestion[] = [];
    try {
      text = extractJsonArray(text);
      text = cleanJsonString(text);
      if (!text.startsWith('[')) {
        text = `[${text}]`;
      }
      const parsedQuestions = JSON.parse(text);
      
      questions = parsedQuestions.map((q: any) => ({
        id: uuidv4(),
        question: q.question || 'Question not provided',
        answer: q.answer || 'Answer not provided',
        category: q.category || 'General',
        difficulty: (q.difficulty?.toLowerCase() === 'easy' || 
                    q.difficulty?.toLowerCase() === 'medium' || 
                    q.difficulty?.toLowerCase() === 'hard')
                    ? q.difficulty.toLowerCase()
                    : 'medium'
      }));
    } catch (error) {
      console.error('Error parsing AI response:', error);
      // Generate comprehensive fallback questions
      questions = [
        {
          id: uuidv4(),
          question: `Can you describe a challenging project you've worked on using ${userInput.skills[0]}?`,
          answer: `Here's how I would structure my response using the STAR method:

Situation: In my previous role, I led a critical project to implement ${userInput.skills[0]} in our core system.

Task: We needed to improve system performance by 50% while maintaining code quality and ensuring minimal downtime.

Action: I took several strategic steps:
1. First, I conducted a thorough analysis of the existing system
2. Created a detailed implementation plan with clear milestones
3. Led a team of 4 developers, delegating tasks based on expertise
4. Implemented automated testing to ensure quality
5. Conducted regular code reviews and optimization sessions

Result: The project was completed 2 weeks ahead of schedule, achieving a 65% performance improvement. This exceeded our initial goal and received recognition from senior management.

I learned the importance of thorough planning, clear communication, and regular testing throughout the development cycle.`,
          category: 'Technical',
          difficulty: 'hard'
        },
        {
          id: uuidv4(),
          question: `How do you handle disagreements with team members when working on complex projects?`,
          answer: `I believe in addressing conflicts professionally and constructively. Let me share a specific example:

In a recent project, a team member and I had different approaches to implementing a critical feature. Instead of letting it create tension, I:

1. Scheduled a private meeting to discuss our perspectives
2. Actively listened to their concerns and shared my viewpoint
3. Found common ground by focusing on our shared goal of project success
4. Proposed a hybrid solution that incorporated the best elements of both approaches
5. Documented our decision and the reasoning behind it

This approach not only resolved the immediate conflict but also strengthened our working relationship. We ended up creating a better solution than either of us had initially proposed.

The key lessons I learned were:
- Always approach disagreements with respect and openness
- Focus on the problem, not the person
- Look for opportunities to create win-win solutions
- Document decisions and learnings for future reference`,
          category: 'Behavioral',
          difficulty: 'medium'
        },
        {
          id: uuidv4(),
          question: `Why are you interested in joining ${userInput.company}, and how do you see yourself contributing to our team?`,
          answer: `I'm particularly excited about joining ${userInput.company} for several reasons:

First, I've been following your company's innovative work in [industry/field], and I'm impressed by your recent [mention specific project or achievement]. Your commitment to [company value/mission] aligns perfectly with my professional values.

In terms of contribution, I believe my ${userInput.experience} years of experience in ${userInput.jobRole} positions me well to:

1. Bring fresh perspectives to your projects, especially in [specific area]
2. Share best practices from my experience with ${userInput.skills.join(', ')}
3. Contribute to team growth through mentoring and knowledge sharing
4. Help drive innovation in [specific company initiative]

I've also noticed that ${userInput.company} emphasizes [company culture aspect], which resonates with my working style. In my previous roles, I've consistently [specific achievement], and I'm excited to bring that same energy and commitment to your team.

Long-term, I see myself growing with the company and taking on increasing responsibilities as I develop deeper expertise in your domain.`,
          category: 'Company Specific',
          difficulty: 'medium'
        }
      ];
    }

    const interviewResult: InterviewResult = {
      questions,
      timestamp: new Date().toISOString(),
      userInput,
    };

    return NextResponse.json(interviewResult);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate interview questions' },
      { status: 500 }
    );
  }
}
