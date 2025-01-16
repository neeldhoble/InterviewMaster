export interface ResumeData {
  name: string;
  email: string | null;
  phone: string | null;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: 'technical' | 'behavioral' | 'problem-solving' | 'cultural';
  context: string;
}

export interface InterviewFeedback {
  rating: number;
  strengths: string[];
  improvements: string[];
  clarity: number;
  relevance: number;
  technicalAccuracy: number;
  feedback: string;
}
