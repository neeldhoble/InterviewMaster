import { create } from 'zustand';
import { ResumeData, InterviewQuestion, InterviewFeedback } from '../types';

interface InterviewStore {
  // Resume Data
  resumeData: ResumeData | null;
  setResumeData: (data: ResumeData) => void;
  
  // Target Role
  targetRole: string;
  setTargetRole: (role: string) => void;
  
  // Questions
  questions: InterviewQuestion[];
  setQuestions: (questions: InterviewQuestion[]) => void;
  currentQuestionIndex: number;
  nextQuestion: () => void;
  previousQuestion: () => void;
  
  // Feedback
  feedback: InterviewFeedback[];
  addFeedback: (feedback: InterviewFeedback) => void;
  
  // Interview Progress
  isInterviewComplete: boolean;
  setInterviewComplete: (complete: boolean) => void;
  
  // Reset
  resetStore: () => void;
}

const initialState = {
  resumeData: null,
  targetRole: '',
  questions: [],
  currentQuestionIndex: 0,
  feedback: [],
  isInterviewComplete: false,
};

export const useInterviewStore = create<InterviewStore>((set) => ({
  // Initial State
  ...initialState,
  
  // Resume Data Actions
  setResumeData: (data) => set({ resumeData: data }),
  
  // Target Role Actions
  setTargetRole: (role) => set({ targetRole: role }),
  
  // Question Actions
  setQuestions: (questions) => set({ questions }),
  currentQuestionIndex: 0,
  nextQuestion: () => set((state) => ({
    currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length),
    isInterviewComplete: state.currentQuestionIndex + 1 >= state.questions.length,
  })),
  previousQuestion: () => set((state) => ({
    currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
  })),
  
  // Feedback Actions
  addFeedback: (newFeedback) => set((state) => ({
    feedback: [...state.feedback, newFeedback],
  })),
  
  // Interview Progress Actions
  setInterviewComplete: (complete) => set({ isInterviewComplete: complete }),
  
  // Reset Action
  resetStore: () => set(initialState),
}));
