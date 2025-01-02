'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { EditorLayout } from '../components/editor/EditorLayout';
import { executionService } from '../services/executionService';
import { aiService } from '../services/aiService';
import { progressService } from '../services/progressService';
import { discussionService } from '../services/discussionService';
import type { CodeExecutionResult } from '../types';
import type { AISuggestion } from '../services/aiService';
import type { Discussion } from '../services/discussionService';

// Example problem data (in real app, fetch from API)
const problem = {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'Easy',
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
    }
  ],
  constraints: [
    '2 <= nums.length <= 104',
    '-109 <= nums[i] <= 109',
    '-109 <= target <= 109',
    'Only one valid answer exists.'
  ],
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  tags: ['Array', 'Hash Table']
};

const defaultCode = `def twoSum(nums, target):
    # Write your code here
    pass

# Example usage:
nums = [2, 7, 11, 15]
target = 9
result = twoSum(nums, target)
print(result)  # Should print [0, 1]`;

export default function ProblemPage() {
  const params = useParams();
  const [code, setCode] = React.useState(defaultCode);
  const [language, setLanguage] = React.useState('python');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [executionTime, setExecutionTime] = React.useState(0);
  const [memoryUsage, setMemoryUsage] = React.useState(0);
  const [testResults, setTestResults] = React.useState([]);
  const [aiSuggestions, setAiSuggestions] = React.useState<AISuggestion[]>([]);
  const [discussions, setDiscussions] = React.useState<Discussion[]>([]);
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [userProgress, setUserProgress] = React.useState<UserProgress | null>(null);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [progressData, discussionsData] = await Promise.all([
          progressService.getUserProgress(),
          discussionService.getDiscussions(params.id as string),
        ]);
        setUserProgress(progressData);
        setDiscussions(discussionsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, [params.id]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRun = async () => {
    try {
      setIsExecuting(true);
      setOutput('Running code...');
      setError(null);

      const result = await executionService.executeCode(code, language as SupportedLanguage);
      
      setOutput(result.output || '');
      setExecutionTime(result.executionTime || 0);
      setMemoryUsage(result.memoryUsed || 0);
      
      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleTest = async () => {
    try {
      setIsExecuting(true);
      const result = await executionService.runTestCases(
        code,
        language as SupportedLanguage,
        problem.testCases
      );
      
      setTestResults(
        result.testCasesPassed !== undefined
          ? [
              {
                passed: result.testCasesPassed === problem.testCases.length,
                message: `${result.testCasesPassed}/${problem.testCases.length} test cases passed`,
              },
            ]
          : []
      );

      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsExecuting(true);
      const [executionResult, aiReview] = await Promise.all([
        executionService.submit(code, language as SupportedLanguage, params.id as string),
        aiService.getCodeReview(code, language, params.id as string),
      ]);

      if (executionResult.status === 'success') {
        await progressService.updateSubmission({
          problemId: params.id as string,
          code,
          language: language as SupportedLanguage,
          status: 'accepted',
          executionTime: executionResult.executionTime || 0,
          memoryUsed: executionResult.memoryUsed || 0,
        });

        setAiSuggestions(aiReview.suggestions);
      } else {
        setError(executionResult.error || 'Submission failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="pt-16">
      <EditorLayout
        problemData={problem}
        code={code}
        language={language}
        output={output}
        error={error}
        executionTime={executionTime}
        memoryUsage={memoryUsage}
        testResults={testResults}
        aiSuggestions={aiSuggestions}
        discussions={discussions}
        userProgress={userProgress}
        isExecuting={isExecuting}
        onCodeChange={handleCodeChange}
        onRun={handleRun}
        onTest={handleTest}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
