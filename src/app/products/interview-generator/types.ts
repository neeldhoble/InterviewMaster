export interface UserInput {
  name: string;
  email: string;
  experience: string;
  skills: string[];
  jobRole: string;
  company: string;
  resumeText?: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer?: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface InterviewResult {
  questions: InterviewQuestion[];
  timestamp: string;
  userInput: UserInput;
}
