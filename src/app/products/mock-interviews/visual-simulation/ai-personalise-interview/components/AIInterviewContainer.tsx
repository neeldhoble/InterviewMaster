'use client';

import React, { useState } from 'react';
import { ResumeUpload } from './ResumeUpload';
import { InterviewSetup } from './InterviewSetup';
import { InterviewSession } from './InterviewSession';
import { InterviewFeedback } from './InterviewFeedback';
import { useInterviewStore } from '../store/interviewStore';
import { motion, AnimatePresence } from 'framer-motion';

type InterviewStep = 'upload' | 'setup' | 'interview' | 'feedback';

export function AIInterviewContainer() {
  const [currentStep, setCurrentStep] = useState<InterviewStep>('upload');
  const { resumeData, clearInterview } = useInterviewStore();

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return <ResumeUpload onComplete={() => setCurrentStep('setup')} />;
      case 'setup':
        return <InterviewSetup onComplete={() => setCurrentStep('interview')} />;
      case 'interview':
        return <InterviewSession onComplete={() => setCurrentStep('feedback')} />;
      case 'feedback':
        return <InterviewFeedback onRestart={() => {
          clearInterview();
          setCurrentStep('upload');
        }} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-4xl mx-auto"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
