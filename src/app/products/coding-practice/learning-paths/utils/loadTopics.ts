import topicsIndex from '../data/topics-index.json';

export interface TopicIndex {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  jsonPath: string;
}

export interface TopicContent {
  id: string;
  title: string;
  description: string;
  subtopics: {
    id: string;
    title: string;
    description: string;
    content: {
      introduction: string;
      sections: {
        title: string;
        content: string;
        code?: {
          example: string;
          output?: string;
          language: string;
        };
        list?: string[];
      }[];
      practice?: {
        exercises: {
          title: string;
          description: string;
          task: string;
          solution: string;
        }[];
      };
    };
  }[];
  resources?: {
    documentation: string;
    tutorials: {
      title: string;
      url: string;
    }[];
  };
}

export const getTopicsIndex = (): TopicIndex[] => {
  return topicsIndex.topics;
};

export const getTopicContent = async (topicId: string): Promise<TopicContent | null> => {
  try {
    const topic = topicsIndex.topics.find(t => t.id === topicId);
    if (!topic) return null;

    const response = await fetch(`/api/topics/${topicId}`);
    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading topic content:', error);
    return null;
  }
};
