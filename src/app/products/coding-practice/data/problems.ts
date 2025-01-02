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
  acceptanceRate: number;
  popularity: number;
  tags: string[];
  companies?: string[];
  premium?: boolean;
  solved?: boolean;
  bookmarked?: boolean;
  contestProblem?: boolean;
}

export const companies = [
  'Google',
  'Amazon',
  'Microsoft',
  'Meta',
  'Apple',
  'Netflix',
  'Uber',
  'Twitter',
  'LinkedIn',
  'Airbnb'
];

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
    acceptanceRate: 88,
    popularity: 98,
    tags: ['Array', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple'],
    solved: true
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    timeLimit: '25 minutes',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    likes: 32145,
    submissions: 65432,
    successRate: 82,
    acceptanceRate: 85,
    popularity: 92,
    tags: ['String', 'Hash Table', 'Sorting'],
    companies: ['Microsoft', 'Amazon'],
    bookmarked: true
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    timeLimit: '20 minutes',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array.',
    likes: 28976,
    submissions: 58741,
    successRate: 89,
    acceptanceRate: 91,
    popularity: 95,
    tags: ['Array', 'Hash Table', 'Sorting'],
    companies: ['Apple', 'Meta', 'Amazon']
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
    acceptanceRate: 83,
    popularity: 90,
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
    acceptanceRate: 75,
    popularity: 85,
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
    acceptanceRate: 86,
    popularity: 92,
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
    acceptanceRate: 78,
    popularity: 85,
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
    acceptanceRate: 89,
    popularity: 95,
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
    acceptanceRate: 73,
    popularity: 80,
    tags: ['Array', 'Binary Search']
  },
  {
    id: 'median-of-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Binary Search',
    timeLimit: '45 minutes',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    likes: 25678,
    submissions: 45678,
    successRate: 65,
    acceptanceRate: 68,
    popularity: 88,
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    premium: true
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
    acceptanceRate: 88,
    popularity: 95,
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
    acceptanceRate: 85,
    popularity: 90,
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
    acceptanceRate: 83,
    popularity: 90,
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
    acceptanceRate: 78,
    popularity: 85,
    tags: ['Array', 'Dynamic Programming']
  },
  {
    id: 'weekly-contest-1',
    title: 'Maximum Sum Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    timeLimit: '60 minutes',
    description: 'Find the contiguous subarray with the largest sum.',
    likes: 15678,
    submissions: 25678,
    successRate: 75,
    acceptanceRate: 78,
    popularity: 85,
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    contestProblem: true
  }
];

export function getProblemsForCategory(category: string): Problem[] {
  return problems.filter(p => p.category === category);
}

export function getProblemById(id: string): Problem | undefined {
  return problems.find(p => p.id === id);
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-green-500/10 text-green-500';
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'hard':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
}
