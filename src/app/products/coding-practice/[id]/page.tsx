'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { EditorLayout } from '../components/editor/EditorLayout';

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
  const [aiSuggestions, setAiSuggestions] = React.useState([]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRun = async () => {
    try {
      // In real app, call your code execution service
      setOutput('Running code...');
      setError(null);
      // Simulate execution
      setTimeout(() => {
        setOutput('[0, 1]');
        setExecutionTime(125);
        setMemoryUsage(5.2 * 1024 * 1024);
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTest = async () => {
    // In real app, run test cases
    setTestResults([
      { passed: true, message: 'Test case 1 passed' },
      { passed: true, message: 'Test case 2 passed' },
      { passed: false, message: 'Test case 3 failed: Expected [1,2] but got [2,1]' }
    ]);
  };

  const handleSubmit = async () => {
    // In real app, submit solution
    setAiSuggestions([
      {
        type: 'optimization',
        message: 'Consider using a hash map to improve time complexity from O(n²) to O(n).'
      },
      {
        type: 'improvement',
        message: 'Add input validation to handle edge cases like empty arrays.'
      }
    ]);
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
        onCodeChange={handleCodeChange}
        onRun={handleRun}
        onTest={handleTest}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
