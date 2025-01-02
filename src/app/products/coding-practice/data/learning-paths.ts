export interface Topic {
  id: string;
  title: string;
  description: string;
  content: string;
  examples?: string[];
  exercises?: {
    question: string;
    answer: string;
  }[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  sections: Section[];
}

export const learningPaths: LearningPath[] = [
  {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Master fundamental data structures used in programming',
    icon: 'Database',
    sections: [
      {
        id: 'arrays',
        title: 'Arrays',
        description: 'Learn about arrays and their operations',
        topics: [
          {
            id: 'arrays-introduction',
            title: 'Introduction to Arrays',
            description: 'Understanding the basics of arrays',
            content: `An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together...`,
            examples: [
              'int arr[] = {1, 2, 3, 4, 5};',
              'String names[] = {"John", "Jane", "Bob"};'
            ],
            exercises: [
              {
                question: 'Write a program to reverse an array',
                answer: 'function reverseArray(arr) { return arr.reverse(); }'
              }
            ]
          }
        ]
      },
      {
        id: 'linked-lists',
        title: 'Linked Lists',
        description: 'Learn about linked lists and their implementations',
        topics: [
          {
            id: 'linked-lists-introduction',
            title: 'Introduction to Linked Lists',
            description: 'Understanding the basics of linked lists',
            content: `A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence...`
          }
        ]
      }
    ]
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    description: 'Learn essential algorithms and problem-solving techniques',
    icon: 'Code2',
    sections: [
      {
        id: 'sorting',
        title: 'Sorting Algorithms',
        description: 'Learn various sorting algorithms and their implementations',
        topics: [
          {
            id: 'bubble-sort',
            title: 'Bubble Sort',
            description: 'Understanding bubble sort algorithm',
            content: `Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order...`
          }
        ]
      }
    ]
  }
];
