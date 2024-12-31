export type QuestionType = 'behavioral' | 'technical' | 'leadership' | 'problem-solving' | 'custom';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const interviewQuestions: Question[] = [
  // Behavioral Questions
  {
    id: 'b1',
    text: 'Tell me about a time when you had to work with a difficult team member. How did you handle it?',
    type: 'behavioral',
    category: 'Teamwork',
    difficulty: 'medium'
  },
  {
    id: 'b2',
    text: 'Describe a situation where you had to meet a tight deadline. What was your approach?',
    type: 'behavioral',
    category: 'Time Management',
    difficulty: 'medium'
  },
  {
    id: 'b3',
    text: 'Can you share an example of a time when you failed at something? What did you learn from it?',
    type: 'behavioral',
    category: 'Growth & Learning',
    difficulty: 'medium'
  },

  // Technical Questions
  {
    id: 't1',
    text: 'Explain the concept of RESTful APIs and their key principles.',
    type: 'technical',
    category: 'Web Development',
    difficulty: 'medium'
  },
  {
    id: 't2',
    text: 'What is the difference between SQL and NoSQL databases? When would you choose one over the other?',
    type: 'technical',
    category: 'Databases',
    difficulty: 'medium'
  },
  {
    id: 't3',
    text: 'Explain the concept of time complexity and give examples of O(n) and O(n²) algorithms.',
    type: 'technical',
    category: 'Algorithms',
    difficulty: 'hard'
  },

  // Leadership Questions
  {
    id: 'l1',
    text: 'Describe a time when you had to lead a team through a difficult project. What challenges did you face and how did you overcome them?',
    type: 'leadership',
    category: 'Project Management',
    difficulty: 'hard'
  },
  {
    id: 'l2',
    text: 'How do you motivate team members who are struggling with their tasks?',
    type: 'leadership',
    category: 'Team Motivation',
    difficulty: 'medium'
  },
  {
    id: 'l3',
    text: 'Tell me about a time when you had to make an unpopular decision. How did you handle the situation?',
    type: 'leadership',
    category: 'Decision Making',
    difficulty: 'hard'
  },

  // Problem Solving Questions
  {
    id: 'p1',
    text: 'How would you design a system to handle millions of concurrent users?',
    type: 'problem-solving',
    category: 'System Design',
    difficulty: 'hard'
  },
  {
    id: 'p2',
    text: 'Describe how you would troubleshoot a production issue with limited information.',
    type: 'problem-solving',
    category: 'Debugging',
    difficulty: 'medium'
  },
  {
    id: 'p3',
    text: 'How would you improve the performance of a slow-running application?',
    type: 'problem-solving',
    category: 'Performance',
    difficulty: 'medium'
  }
];

// Helper functions for question management
export const getQuestionsByType = (type: QuestionType) => 
  interviewQuestions.filter(q => q.type === type);

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') =>
  interviewQuestions.filter(q => q.difficulty === difficulty);

export const getQuestionsByCategory = (category: string) =>
  interviewQuestions.filter(q => q.category === category);

export const getAllCategories = () =>
  Array.from(new Set(interviewQuestions.map(q => q.category)));
