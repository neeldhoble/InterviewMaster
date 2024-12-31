export type QuestionType = 'introduction' | 'behavioral' | 'technical' | 'leadership' | 'problem-solving' | 'cultural-fit' | 'closing';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const interviewQuestions: Question[] = [
  // Introduction Questions
  {
    id: 'i1',
    text: 'Tell me about yourself and your background.',
    type: 'introduction',
    category: 'Opening',
    difficulty: 'easy'
  },
  {
    id: 'i2',
    text: 'Walk me through your resume and highlight your key achievements.',
    type: 'introduction',
    category: 'Opening',
    difficulty: 'easy'
  },
  {
    id: 'i3',
    text: 'What made you interested in this position and our company?',
    type: 'introduction',
    category: 'Opening',
    difficulty: 'easy'
  },

  // Behavioral Questions
  {
    id: 'b1',
    text: 'Tell me about a challenging project you worked on and how you handled it.',
    type: 'behavioral',
    category: 'Project Management',
    difficulty: 'medium'
  },
  {
    id: 'b2',
    text: 'Describe a situation where you had to deal with a difficult team member or stakeholder.',
    type: 'behavioral',
    category: 'Teamwork',
    difficulty: 'medium'
  },
  {
    id: 'b3',
    text: 'Give me an example of a time when you had to meet a tight deadline.',
    type: 'behavioral',
    category: 'Time Management',
    difficulty: 'medium'
  },
  {
    id: 'b4',
    text: 'Tell me about a time when you had to learn a new technology or skill quickly.',
    type: 'behavioral',
    category: 'Adaptability',
    difficulty: 'medium'
  },
  {
    id: 'b5',
    text: 'Describe a situation where you had to make a difficult decision with limited information.',
    type: 'behavioral',
    category: 'Decision Making',
    difficulty: 'hard'
  },

  // Technical Questions
  {
    id: 't1',
    text: 'What is your experience with modern web development frameworks? Which ones have you used and why?',
    type: 'technical',
    category: 'Web Development',
    difficulty: 'medium'
  },
  {
    id: 't2',
    text: 'How do you approach testing and quality assurance in your development process?',
    type: 'technical',
    category: 'Testing',
    difficulty: 'medium'
  },
  {
    id: 't3',
    text: 'Explain your experience with cloud services and deployment strategies.',
    type: 'technical',
    category: 'DevOps',
    difficulty: 'hard'
  },
  {
    id: 't4',
    text: 'How do you handle performance optimization in your applications?',
    type: 'technical',
    category: 'Performance',
    difficulty: 'hard'
  },
  {
    id: 't5',
    text: 'Describe your approach to writing clean, maintainable code.',
    type: 'technical',
    category: 'Code Quality',
    difficulty: 'medium'
  },

  // Leadership Questions
  {
    id: 'l1',
    text: 'How do you approach mentoring junior developers?',
    type: 'leadership',
    category: 'Mentorship',
    difficulty: 'medium'
  },
  {
    id: 'l2',
    text: 'Tell me about a time when you had to lead a project or initiative.',
    type: 'leadership',
    category: 'Project Leadership',
    difficulty: 'hard'
  },
  {
    id: 'l3',
    text: 'How do you handle conflicts within your team?',
    type: 'leadership',
    category: 'Conflict Resolution',
    difficulty: 'hard'
  },

  // Problem-Solving Questions
  {
    id: 'p1',
    text: 'How would you design a scalable system for handling millions of concurrent users?',
    type: 'problem-solving',
    category: 'System Design',
    difficulty: 'hard'
  },
  {
    id: 'p2',
    text: 'Describe how you would debug a production issue with limited information.',
    type: 'problem-solving',
    category: 'Debugging',
    difficulty: 'hard'
  },
  {
    id: 'p3',
    text: 'How would you improve the performance of a slow-running application?',
    type: 'problem-solving',
    category: 'Optimization',
    difficulty: 'medium'
  },

  // Cultural Fit Questions
  {
    id: 'c1',
    text: 'What type of work environment do you thrive in?',
    type: 'cultural-fit',
    category: 'Work Environment',
    difficulty: 'easy'
  },
  {
    id: 'c2',
    text: 'How do you stay updated with the latest technology trends?',
    type: 'cultural-fit',
    category: 'Professional Growth',
    difficulty: 'easy'
  },
  {
    id: 'c3',
    text: 'Where do you see yourself in 5 years?',
    type: 'cultural-fit',
    category: 'Career Goals',
    difficulty: 'medium'
  },

  // Closing Questions
  {
    id: 'cl1',
    text: 'What questions do you have for me about the role or company?',
    type: 'closing',
    category: 'Final Questions',
    difficulty: 'easy'
  },
  {
    id: 'cl2',
    text: 'Is there anything else you would like to share about your background or experience?',
    type: 'closing',
    category: 'Final Thoughts',
    difficulty: 'easy'
  }
];

// Helper functions for question management
export const getQuestionsByType = (type: QuestionType) => {
  return interviewQuestions.filter(q => q.type === type);
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return interviewQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByCategory = (category: string) => {
  return interviewQuestions.filter(q => q.category === category);
};

export const getAllCategories = () => {
  return [...new Set(interviewQuestions.map(q => q.category))];
};
