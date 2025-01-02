export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string[];
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  starterCode: Record<SupportedLanguage, string>;
  testCases: TestCase[];
  solutions: Record<SupportedLanguage, string>;
  companies?: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  likes: number;
  dislikes: number;
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  output: string;
  isHidden?: boolean;
}

export type SupportedLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'cpp'
  | 'csharp';

export interface CodeExecutionResult {
  status: 'success' | 'error' | 'running';
  output?: string;
  error?: string;
  executionTime?: number;
  memoryUsed?: number;
  testCasesPassed?: number;
  totalTestCases?: number;
}

export interface UserProgress {
  solvedProblems: string[];
  attemptedProblems: string[];
  submissions: Submission[];
  streak: number;
  lastActive: string;
  experience: number;
  level: number;
  badges: Badge[];
}

export interface Submission {
  problemId: string;
  code: string;
  language: SupportedLanguage;
  status: 'accepted' | 'wrong' | 'timeout' | 'error';
  timestamp: string;
  executionTime: number;
  memoryUsed: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}
