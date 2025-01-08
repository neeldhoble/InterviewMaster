export interface Topic {
  id: string;
  name: string;
  icon: string;
}

export interface Difficulty {
  id: string;
  name: string;
  color: string;
}

export interface Question {
  id: string;
  question: string;
  type: string;
  difficulty: string;
  expectedAnswer?: string[];
  followUp?: string[];
}

export interface Feedback {
  score: number;
  strengths: string[];
  improvements: string[];
  technicalAccuracy: number;
  communicationClarity: number;
  structuredThinking: number;
  recommendations: string[];
}
