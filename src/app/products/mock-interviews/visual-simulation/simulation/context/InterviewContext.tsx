import React, { createContext, useContext, useReducer } from 'react';

interface InterviewState {
  settings: {
    difficulty: string;
    duration: number;
    questionTypes: string[];
  };
  currentQuestion: number;
  totalQuestions: number;
  metrics: {
    overallScore?: number;
    feedback?: string;
  };
  status: 'idle' | 'running' | 'paused' | 'completed';
}

type InterviewAction = 
  | { type: 'START_SIMULATION' }
  | { type: 'PAUSE_SIMULATION' }
  | { type: 'END_SIMULATION' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'UPDATE_SETTINGS'; payload: InterviewState['settings'] }
  | { type: 'UPDATE_METRICS'; payload: InterviewState['metrics'] };

const initialState: InterviewState = {
  settings: {
    difficulty: 'medium',
    duration: 30, // minutes
    questionTypes: ['behavioral', 'technical'],
  },
  currentQuestion: 0,
  totalQuestions: 5,
  metrics: {},
  status: 'idle',
};

const InterviewContext = createContext<{
  state: InterviewState;
  dispatch: React.Dispatch<InterviewAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const interviewReducer = (state: InterviewState, action: InterviewAction): InterviewState => {
  switch (action.type) {
    case 'START_SIMULATION':
      return {
        ...state,
        status: 'running',
      };
    
    case 'PAUSE_SIMULATION':
      return {
        ...state,
        status: 'paused',
      };
    
    case 'END_SIMULATION':
      return {
        ...state,
        status: 'completed',
      };
    
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: action.payload,
      };
    
    case 'UPDATE_METRICS':
      return {
        ...state,
        metrics: {
          ...state.metrics,
          ...action.payload,
        },
      };
    
    default:
      return state;
  }
};

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(interviewReducer, initialState);

  return (
    <InterviewContext.Provider value={{ state, dispatch }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};
