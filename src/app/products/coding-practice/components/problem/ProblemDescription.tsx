'use client';

import React from 'react';
import { Tag, Clock, BarChart2, CircleDot } from 'lucide-react';

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface ProblemDescriptionProps {
  problem: {
    title: string;
    difficulty: string;
    description: string;
    examples: Example[];
    constraints: string[];
    timeComplexity?: string;
    spaceComplexity?: string;
    tags: string[];
  };
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  if (!problem) {
    return <div className="p-6 text-white/60">Loading problem description...</div>;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-400 bg-green-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'hard':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-white/60 bg-white/10';
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                problem.difficulty
              )}`}
            >
              {problem.difficulty}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {problem.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-white/5 text-white/60 flex items-center gap-1.5"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Complexity */}
        {(problem.timeComplexity || problem.spaceComplexity) && (
          <div className="flex flex-wrap gap-4">
            {problem.timeComplexity && (
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Clock className="w-4 h-4" />
                <span>Time Complexity: </span>
                <code className="px-2 py-1 rounded bg-white/5 text-[#fcba28]">
                  {problem.timeComplexity}
                </code>
              </div>
            )}
            {problem.spaceComplexity && (
              <div className="flex items-center gap-2 text-sm text-white/60">
                <BarChart2 className="w-4 h-4" />
                <span>Space Complexity: </span>
                <code className="px-2 py-1 rounded bg-white/5 text-[#fcba28]">
                  {problem.spaceComplexity}
                </code>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Description</h2>
          <div className="text-white/80 space-y-4">
            {problem.description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Examples</h2>
          <div className="space-y-4">
            {problem.examples.map((example, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
              >
                <div className="px-4 py-2 bg-white/5 border-b border-white/10">
                  <span className="text-sm font-medium text-white">
                    Example {index + 1}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Input:</div>
                    <code className="block p-2 rounded bg-white/5 text-[#fcba28] font-mono text-sm">
                      {example.input}
                    </code>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Output:</div>
                    <code className="block p-2 rounded bg-white/5 text-[#fcba28] font-mono text-sm">
                      {example.output}
                    </code>
                  </div>
                  {example.explanation && (
                    <div>
                      <div className="text-sm text-white/60 mb-1">Explanation:</div>
                      <div className="text-sm text-white/80">{example.explanation}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Constraints */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Constraints</h2>
          <ul className="space-y-2">
            {problem.constraints.map((constraint, index) => (
              <li key={index} className="flex items-start gap-2 text-white/80">
                <CircleDot className="w-4 h-4 mt-1 flex-shrink-0 text-[#fcba28]" />
                <code className="text-sm font-mono">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
