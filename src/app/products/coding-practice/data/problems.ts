export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  timeLimit: string;
  description: string;
  likes: number;
  submissions: number;
  successRate: number;
  tags: string[];
}

export const categories = [
  'Arrays & Hashing',
  'Two Pointers',
  'Stack',
  'Binary Search',
  'Sliding Window',
  'Linked List',
  'Trees',
  'Tries',
  'Heap / Priority Queue',
  'Backtracking',
  'Graphs',
  'Dynamic Programming',
  'Greedy',
  'Intervals',
  'Math & Geometry',
  'Bit Manipulation'
];

export const problems: Problem[] = [
  // Arrays & Hashing
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    timeLimit: '30 minutes',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    likes: 45678,
    submissions: 89012,
    successRate: 85,
    tags: ['Array', 'Hash Table']
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    timeLimit: '25 minutes',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    likes: 23456,
    submissions: 45678,
    successRate: 82,
    tags: ['String', 'Hash Table', 'Sorting']
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    timeLimit: '20 minutes',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array.',
    likes: 34567,
    submissions: 67890,
    successRate: 88,
    tags: ['Array', 'Hash Table']
  },

  // Two Pointers
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    category: 'Two Pointers',
    timeLimit: '25 minutes',
    description: 'Given a string s, return true if it is a palindrome, considering only alphanumeric characters.',
    likes: 21345,
    submissions: 43210,
    successRate: 80,
    tags: ['Two Pointers', 'String']
  },
  {
    id: 'three-sum',
    title: 'Three Sum',
    difficulty: 'Medium',
    category: 'Two Pointers',
    timeLimit: '35 minutes',
    description: 'Given an array nums of n integers, find all unique triplets that sum to zero.',
    likes: 32456,
    submissions: 65432,
    successRate: 72,
    tags: ['Array', 'Two Pointers', 'Sorting']
  },

  // Stack
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    timeLimit: '25 minutes',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    likes: 28765,
    submissions: 54321,
    successRate: 83,
    tags: ['String', 'Stack']
  },
  {
    id: 'min-stack',
    title: 'Min Stack',
    difficulty: 'Medium',
    category: 'Stack',
    timeLimit: '30 minutes',
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    likes: 19876,
    submissions: 39752,
    successRate: 75,
    tags: ['Stack', 'Design']
  },

  // Binary Search
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Binary Search',
    timeLimit: '20 minutes',
    description: 'Given a sorted array of integers, search for a target value.',
    likes: 25678,
    submissions: 51234,
    successRate: 86,
    tags: ['Array', 'Binary Search']
  },
  {
    id: 'search-rotated-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    timeLimit: '30 minutes',
    description: 'Search for a target value in a rotated sorted array.',
    likes: 31245,
    submissions: 62490,
    successRate: 70,
    tags: ['Array', 'Binary Search']
  },

  // Trees
  {
    id: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    category: 'Trees',
    timeLimit: '20 minutes',
    description: 'Invert a binary tree by swapping the left and right children of all nodes.',
    likes: 27654,
    submissions: 55308,
    successRate: 85,
    tags: ['Tree', 'DFS', 'BFS']
  },
  {
    id: 'maximum-depth',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    category: 'Trees',
    timeLimit: '25 minutes',
    description: 'Find the maximum depth (height) of a binary tree.',
    likes: 24567,
    submissions: 49134,
    successRate: 82,
    tags: ['Tree', 'DFS', 'BFS']
  },

  // Dynamic Programming
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    timeLimit: '25 minutes',
    description: 'Count the number of ways to climb n stairs, taking 1 or 2 steps at a time.',
    likes: 29876,
    submissions: 59752,
    successRate: 80,
    tags: ['Math', 'Dynamic Programming']
  },
  {
    id: 'house-robber',
    title: 'House Robber',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    timeLimit: '30 minutes',
    description: 'Determine the maximum amount of money you can rob from houses without alerting the police.',
    likes: 33456,
    submissions: 66912,
    successRate: 75,
    tags: ['Array', 'Dynamic Programming']
  }
];

// Add more problems for each category...
// This is a starter set, you can expand it with more problems

export const getProblemsForCategory = (category: string): Problem[] => {
  return problems.filter(problem => problem.category === category);
};

export const getProblemById = (id: string): Problem | undefined => {
  return problems.find(problem => problem.id === id);
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-400 bg-green-500/20';
    case 'Medium':
      return 'text-yellow-400 bg-yellow-500/20';
    case 'Hard':
      return 'text-red-400 bg-red-500/20';
    default:
      return 'text-white bg-white/20';
  }
};
