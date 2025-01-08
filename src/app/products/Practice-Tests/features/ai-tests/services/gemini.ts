import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export interface TestFormData {
  topics: string[];
  customTopic?: string;
  difficulty: string;
  experienceLevel: string;
  questionCount: number;
  duration: number;
  questionTypes: string[];
  specificFocus: string[];
  difficultyProgression: 'fixed' | 'gradual' | 'random';
  includeExplanations: boolean;
  includePracticeQuestions: boolean;
  adaptiveMode: boolean;
  previousPerformance?: {
    correctAnswers: number;
    totalQuestions: number;
    topics: Record<string, number>; // Topic success rates
  };
}

const generatePrompt = (formData: TestFormData) => {
  const adaptiveContext = formData.adaptiveMode && formData.previousPerformance
    ? `
Previous Performance Context:
- Success Rate: ${(formData.previousPerformance.correctAnswers / formData.previousPerformance.totalQuestions * 100).toFixed(1)}%
- Strong Topics: ${Object.entries(formData.previousPerformance.topics)
    .filter(([_, rate]) => rate >= 0.7)
    .map(([topic]) => topic)
    .join(', ')}
- Areas for Improvement: ${Object.entries(formData.previousPerformance.topics)
    .filter(([_, rate]) => rate < 0.7)
    .map(([topic]) => topic)
    .join(', ')}
`
    : '';

  return `Generate a technical interview test with the following specifications:
- Topics: ${formData.topics.join(', ')}
- Difficulty: ${formData.difficulty}
- Number of questions: ${formData.questionCount}
- Question types: ${formData.questionTypes.join(', ')}
- Experience level: ${formData.experienceLevel}
${formData.specificFocus.length > 0 ? `- Specific focus areas: ${formData.specificFocus.join(', ')}` : ''}
${adaptiveContext}

Test Configuration:
- Difficulty Progression: ${formData.difficultyProgression}
- Include Explanations: ${formData.includeExplanations}
- Include Practice Questions: ${formData.includePracticeQuestions}
${formData.adaptiveMode ? '- Adaptive Mode: Enabled' : ''}

For each question, provide:
1. For multiple-choice questions:
   - A clear question statement
   - 4 options labeled A, B, C, D
   - Clearly mark the correct answer
   - Provide a detailed explanation of why it's correct

2. For coding questions:
   - A clear problem statement
   - The programming language to use
   - Starter code template
   - At least 3 test cases with input and expected output
   - Solution approach and explanation
   - Time and space complexity requirements

3. For theoretical questions:
   - Detailed question
   - Expected key points in the answer
   - Evaluation criteria
   - Sample answer

Format the response as a JSON object with this structure:
{
  "questions": [
    {
      "id": "string",
      "type": "multiple-choice | coding | theoretical",
      "difficulty": "easy | medium | hard",
      "topic": "string",
      "question": "string",
      "options": ["A) option", "B) option", "C) option", "D) option"] (for multiple-choice),
      "correctAnswer": "string",
      "explanation": "string",
      "language": "string" (for coding questions),
      "starterCode": "string" (for coding questions),
      "testCases": [
        {
          "input": "string",
          "expectedOutput": "string"
        }
      ] (for coding questions),
      "solutionApproach": "string" (for coding questions),
      "timeComplexity": "string" (for coding questions),
      "spaceComplexity": "string" (for coding questions),
      "evaluationCriteria": ["string"] (for theoretical questions),
      "sampleAnswer": "string" (for theoretical questions),
      "practiceQuestion": {
        "question": "string",
        "answer": "string"
      } (optional)
    }
  ],
  "metadata": {
    "difficulty": "string",
    "topics": ["string"],
    "questionCount": number,
    "duration": number,
    "experienceLevel": "string",
    "adaptiveMode": boolean
  }
}

For coding questions, include proper test cases that cover edge cases and common scenarios. The starter code should provide a basic structure for the solution.
${formData.adaptiveMode ? 'Adjust question difficulty based on the previous performance context.' : ''}
${formData.difficultyProgression === 'gradual' ? 'Gradually increase question difficulty throughout the test.' : ''}
${formData.difficultyProgression === 'random' ? 'Randomly vary question difficulty throughout the test.' : ''}`;
};

export const generateTest = async (formData: TestFormData) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(generatePrompt(formData));
    const response = await result.response;
    const text = response.text();
    
    // Find the JSON part of the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }
    
    const testData = JSON.parse(jsonMatch[0]);
    
    // Validate and format the test data
    const formattedQuestions = testData.questions.map((q: any, index: number) => ({
      ...q,
      id: q.id || `q-${index + 1}`,
      difficulty: q.difficulty || formData.difficulty,
      topic: q.topic || formData.topics[0],
      options: q.type === 'multiple-choice' 
        ? (q.options || []).map((opt: string, i: number) => 
            opt.startsWith(String.fromCharCode(65 + i) + ')') 
              ? opt 
              : `${String.fromCharCode(65 + i)}) ${opt}`
          )
        : undefined,
      correctAnswer: q.correctAnswer || '',
      explanation: q.explanation || '',
      language: q.language || '',
      starterCode: q.starterCode || '',
      testCases: q.testCases || [],
      solutionApproach: q.solutionApproach || '',
      timeComplexity: q.timeComplexity || '',
      spaceComplexity: q.spaceComplexity || '',
      evaluationCriteria: q.evaluationCriteria || [],
      sampleAnswer: q.sampleAnswer || '',
      practiceQuestion: formData.includePracticeQuestions ? q.practiceQuestion : undefined
    }));

    return {
      questions: formattedQuestions,
      metadata: {
        ...testData.metadata,
        duration: formData.duration,
        questionCount: formData.questionCount,
        experienceLevel: formData.experienceLevel,
        difficultyProgression: formData.difficultyProgression,
        adaptiveMode: formData.adaptiveMode
      }
    };
  } catch (error) {
    console.error('Error generating test:', error);
    throw new Error('Failed to generate test. Please try again.');
  }
};
