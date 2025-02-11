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

async function generateQuestionBatch(
  model: any,
  userInput: UserInput,
  category: string,
  count: number
): Promise<InterviewQuestion[]> {
  const prompt = `As an expert technical interviewer at ${userInput.company}, generate ${count} ${category} interview questions for a ${userInput.jobRole} position.

Candidate Profile:
- Experience Level: ${userInput.experience} years
- Key Skills: ${userInput.skills.join(', ')}
${userInput.resumeText ? `- Resume Context: ${userInput.resumeText}` : ''}

Generate exactly ${count} detailed questions focusing on ${category} aspects.
Make each question specific to ${userInput.company}'s industry and tech stack.
Provide detailed model answers (300-400 words) that:
- Use the STAR method where applicable
- Include specific examples and scenarios
- Demonstrate technical depth while maintaining clarity
- Sound natural and conversational

Return ONLY a JSON array with exactly this format:
[
  {
    "question": "detailed question text",
    "answer": "comprehensive answer with examples",
    "category": "${category}",
    "difficulty": "easy|medium|hard"
  }
]`;

  try {
    const geminiResponse = await model.generateContent(prompt);
    const response = await geminiResponse.response;
    const text = response.text();
    
    const cleanedText = extractJsonArray(text);
    const parsedQuestions = JSON.parse(cleanedText);
    
    return parsedQuestions.map((q: any) => ({
      id: uuidv4(),
      question: q.question || 'Question not provided',
      answer: q.answer || 'Answer not provided',
      category: q.category || category,
      difficulty: (q.difficulty?.toLowerCase() === 'easy' || 
                  q.difficulty?.toLowerCase() === 'medium' || 
                  q.difficulty?.toLowerCase() === 'hard')
                  ? q.difficulty.toLowerCase()
                  : 'medium'
    }));
  } catch (error) {
    console.error(`Error generating ${category} questions:`, error);
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const userInput: UserInput = await request.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate questions in parallel batches
    const [technicalQuestions, problemSolvingQuestions, behavioralQuestions] = await Promise.all([
      generateQuestionBatch(model, userInput, 'Technical', 5),
      generateQuestionBatch(model, userInput, 'Problem-Solving', 5),
      generateQuestionBatch(model, userInput, 'Behavioral', 5)
    ]);

    let questions = [
      ...technicalQuestions,
      ...problemSolvingQuestions,
      ...behavioralQuestions
    ];

    // If we don't have enough questions, add fallback questions
    if (questions.length < 5) {
      questions = [
        {
          id: uuidv4(),
          question: `Can you walk us through a challenging project where you used ${userInput.skills[0]}?`,
          answer: `Let me share a significant project from my experience using the STAR method:

Situation: At my previous company, we faced a critical challenge with our e-commerce platform that was experiencing performance issues during peak hours, affecting thousands of users.

Task: I was tasked with optimizing the platform's performance using ${userInput.skills[0]}, with the goal of reducing load times by 50% and handling 3x more concurrent users.

Action: I took a systematic approach:
1. First, I conducted a thorough performance audit using profiling tools
2. Identified bottlenecks in the database queries and caching strategy
3. Implemented a distributed caching solution
4. Optimized database indexes and query patterns
5. Set up load balancing and horizontal scaling
6. Established monitoring and alerting systems

Result: The improvements exceeded expectations:
- Reduced average load times by 65%
- Increased system capacity to handle 5x more concurrent users
- Achieved 99.99% uptime during peak shopping seasons
- Received recognition from senior management
- The solution became a template for other teams

Key Learnings:
- The importance of thorough analysis before implementation
- The value of incremental improvements and testing
- How to effectively communicate technical decisions to stakeholders
- The significance of monitoring and proactive optimization`,
          category: 'Technical',
          difficulty: 'hard'
        },
        {
          id: uuidv4(),
          question: `How do you approach learning new technologies, and how would you apply this at ${userInput.company}?`,
          answer: `I have a structured approach to learning new technologies that I've refined over my ${userInput.experience} years in the industry:

1. Strategic Assessment:
- First, I evaluate how the new technology fits into the existing ecosystem
- Research its strengths, limitations, and best use cases
- Review community support and documentation quality

2. Hands-on Learning:
- Start with official documentation and tutorials
- Build small proof-of-concept projects
- Gradually increase complexity
- Focus on best practices from the beginning

3. Real-world Application:
- Identify potential use cases within current projects
- Start with low-risk implementations
- Seek feedback from experienced users
- Share knowledge through internal workshops
- Create documentation for team reference

At ${userInput.company}, I would:
- Align learning with your technical roadmap
- Focus on technologies that complement your stack
- Share knowledge through internal workshops
- Create documentation for team reference

Example: Recently, I learned [relevant technology] by:
1. Building a sample application
2. Contributing to an open-source project
3. Writing technical blog posts
4. Mentoring junior developers

This approach ensures both depth of understanding and practical application.`,
          category: 'Behavioral',
          difficulty: 'medium'
        },
        {
          id: uuidv4(),
          question: `How do you handle complex system design challenges? Can you give an example?`,
          answer: `Let me share my approach to system design using a recent example:

Situation: We needed to design a scalable notification system that could handle millions of users with different preferences and delivery channels.

Task: Create a system that could:
- Process notifications in real-time
- Support multiple delivery channels (email, push, SMS)
- Handle user preferences and time zones
- Ensure delivery reliability
- Scale horizontally

Action:
1. Requirements Analysis:
   - Documented functional and non-functional requirements
   - Estimated traffic and data volume
   - Identified potential bottlenecks

2. Architecture Design:
   - Implemented event-driven architecture
   - Used message queues for async processing
   - Designed with microservices pattern
   - Created data partitioning strategy

3. Implementation Strategy:
   - Built proof of concept
   - Conducted load testing
   - Implemented circuit breakers
   - Added monitoring and alerting

Result:
- Successfully handled 10x increase in notification volume
- Reduced delivery latency by 70%
- Achieved 99.99% delivery reliability
- System easily scaled during peak loads

This experience taught me the importance of:
- Thorough planning and requirement analysis
- Building for scale from the start
- Implementing proper monitoring
- Having fallback mechanisms`,
          category: 'Problem-Solving',
          difficulty: 'hard'
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
