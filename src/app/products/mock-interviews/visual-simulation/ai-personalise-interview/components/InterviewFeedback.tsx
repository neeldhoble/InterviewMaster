'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInterviewStore } from '../store/interviewStore';

interface InterviewFeedbackProps {
  onRestart: () => void;
}

export function InterviewFeedback({ onRestart }: InterviewFeedbackProps) {
  const { feedback, questions, resumeData } = useInterviewStore();

  const overallScore = Math.round(
    feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length
  );

  const strengthCategories = {
    technical: 0,
    communication: 0,
    problemSolving: 0
  };

  const improvementAreas = {
    technical: [] as string[],
    communication: [] as string[],
    behavioral: [] as string[]
  };

  // Analyze feedback
  feedback.forEach(f => {
    // Update strength categories
    f.strengths.forEach(s => {
      if (s.toLowerCase().includes('technical') || s.toLowerCase().includes('skill')) {
        strengthCategories.technical += 1;
      }
      if (s.toLowerCase().includes('communicate') || s.toLowerCase().includes('explain')) {
        strengthCategories.communication += 1;
      }
      if (s.toLowerCase().includes('problem') || s.toLowerCase().includes('solution')) {
        strengthCategories.problemSolving += 1;
      }
    });

    // Collect improvement areas
    f.improvements.forEach(i => {
      if (i.toLowerCase().includes('technical') || i.toLowerCase().includes('skill')) {
        if (!improvementAreas.technical.includes(i)) {
          improvementAreas.technical.push(i);
        }
      }
      if (i.toLowerCase().includes('communicate') || i.toLowerCase().includes('explain')) {
        if (!improvementAreas.communication.includes(i)) {
          improvementAreas.communication.push(i);
        }
      }
      if (i.toLowerCase().includes('behavior') || i.toLowerCase().includes('approach')) {
        if (!improvementAreas.behavioral.includes(i)) {
          improvementAreas.behavioral.push(i);
        }
      }
    });
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#fcba28] mb-4">Interview Summary</h1>
        <p className="text-gray-400">
          Here's a comprehensive analysis of your interview performance
        </p>
      </div>

      {/* Overall Score */}
      <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20">
        <h2 className="text-xl font-semibold text-white mb-4">Overall Performance</h2>
        <div className="flex items-center justify-between mb-6">
          <div className="text-4xl font-bold text-[#fcba28]">{overallScore}%</div>
          <div className="text-gray-400">
            {overallScore >= 90 ? 'Outstanding Performance' :
             overallScore >= 80 ? 'Excellent Performance' :
             overallScore >= 70 ? 'Good Performance' :
             overallScore >= 60 ? 'Satisfactory Performance' :
             'Needs Improvement'}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-400">Technical Skills</div>
            <div className="text-lg font-semibold text-white">
              {Math.round((strengthCategories.technical / questions.length) * 100)}%
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Communication</div>
            <div className="text-lg font-semibold text-white">
              {Math.round((strengthCategories.communication / questions.length) * 100)}%
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Problem Solving</div>
            <div className="text-lg font-semibold text-white">
              {Math.round((strengthCategories.problemSolving / questions.length) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Question Analysis */}
      <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20">
        <h2 className="text-xl font-semibold text-white mb-4">Question-by-Question Analysis</h2>
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={q.id} className="border-b border-gray-800 pb-4 last:border-0">
              <div className="flex justify-between mb-2">
                <div className="text-white font-medium">Question {index + 1}</div>
                <div className="text-[#fcba28]">
                  {feedback[index]?.rating || 0}%
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2">{q.question}</p>
              <div className="space-y-2">
                {feedback[index]?.strengths.map((strength, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-400 text-sm">{strength}</span>
                  </div>
                ))}
                {feedback[index]?.improvements.map((improvement, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-yellow-400">!</span>
                    <span className="text-gray-400 text-sm">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Areas for Improvement */}
      <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20">
        <h2 className="text-xl font-semibold text-white mb-4">Areas for Improvement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(improvementAreas).map(([category, items]) => (
            items.length > 0 && (
              <div key={category}>
                <h3 className="text-[#fcba28] capitalize mb-2">{category}</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20">
        <h2 className="text-xl font-semibold text-white mb-4">Recommended Next Steps</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#fcba28]/20 flex items-center justify-center text-[#fcba28]">1</div>
            <div>
              <h3 className="text-white font-medium">Practice Technical Questions</h3>
              <p className="text-gray-400 text-sm">Focus on strengthening your technical skills through coding practice and system design exercises.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#fcba28]/20 flex items-center justify-center text-[#fcba28]">2</div>
            <div>
              <h3 className="text-white font-medium">Improve Communication</h3>
              <p className="text-gray-400 text-sm">Work on structuring your responses using the STAR method and practice explaining complex concepts clearly.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#fcba28]/20 flex items-center justify-center text-[#fcba28]">3</div>
            <div>
              <h3 className="text-white font-medium">Schedule More Practice</h3>
              <p className="text-gray-400 text-sm">Book additional mock interviews to continue improving and tracking your progress.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-lg font-medium"
        >
          Start New Interview
        </motion.button>
      </div>
    </div>
  );
}
