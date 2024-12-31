export interface Question {
  id: number;
  type: 'behavioral' | 'technical' | 'non-technical';
  question: string;
  category?: string;
}

export const interviewQuestions: Question[] = [
  // Behavioral Questions
  {
    id: 1,
    type: 'behavioral',
    question: 'Tell me about a time when you had to deal with a difficult team member.',
    category: 'teamwork'
  },
  {
    id: 2,
    type: 'behavioral',
    question: 'Describe a situation where you had to meet a tight deadline.',
    category: 'time-management'
  },
  // Add more behavioral questions...

  // Technical Questions
  {
    id: 34,
    type: 'technical',
    question: 'Explain the difference between REST and GraphQL.',
    category: 'web-development'
  },
  {
    id: 35,
    type: 'technical',
    question: 'What is the time complexity of quicksort?',
    category: 'algorithms'
  },
  // Add more technical questions...

  // Non-Technical Questions
  {
    id: 67,
    type: 'non-technical',
    question: 'Where do you see yourself in 5 years?',
    category: 'career-goals'
  },
  {
    id: 68,
    type: 'non-technical',
    question: 'What are your salary expectations?',
    category: 'expectations'
  },
  // Add more non-technical questions...
];
