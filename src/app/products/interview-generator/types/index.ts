export interface UserInput {
  name: string;
  email: string;
  experience: string;
  skills: string[];
  jobRole: string;
  resumeUrl?: string;
  additionalInfo?: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface GeneratedInterview {
  questions: InterviewQuestion[];
  userInput: UserInput;
  timestamp: string;
}
