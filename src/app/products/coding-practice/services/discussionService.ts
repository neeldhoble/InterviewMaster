interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  code?: string;
  likes: number;
  timestamp: string;
  replies: Comment[];
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  code?: string;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  tags: string[];
  likes: number;
  views: number;
  comments: Comment[];
  timestamp: string;
}

class DiscussionService {
  private readonly API_ENDPOINT = '/api/discussions';

  async getDiscussions(problemId: string): Promise<Discussion[]> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}?problemId=${problemId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch discussions');
      }

      return await response.json();
    } catch (error) {
      console.error('Discussions fetch error:', error);
      throw error;
    }
  }

  async createDiscussion(discussion: Omit<Discussion, 'id' | 'timestamp'>): Promise<Discussion> {
    try {
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discussion),
      });

      if (!response.ok) {
        throw new Error('Failed to create discussion');
      }

      return await response.json();
    } catch (error) {
      console.error('Discussion creation error:', error);
      throw error;
    }
  }

  async addComment(
    discussionId: string,
    comment: Omit<Comment, 'id' | 'timestamp'>
  ): Promise<Comment> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/${discussionId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      return await response.json();
    } catch (error) {
      console.error('Comment creation error:', error);
      throw error;
    }
  }

  async likeDiscussion(discussionId: string): Promise<{ likes: number }> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/${discussionId}/like`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to like discussion');
      }

      return await response.json();
    } catch (error) {
      console.error('Discussion like error:', error);
      throw error;
    }
  }

  async likeComment(
    discussionId: string,
    commentId: string
  ): Promise<{ likes: number }> {
    try {
      const response = await fetch(
        `${this.API_ENDPOINT}/${discussionId}/comments/${commentId}/like`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to like comment');
      }

      return await response.json();
    } catch (error) {
      console.error('Comment like error:', error);
      throw error;
    }
  }

  async searchDiscussions(query: string): Promise<Discussion[]> {
    try {
      const response = await fetch(
        `${this.API_ENDPOINT}/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('Failed to search discussions');
      }

      return await response.json();
    } catch (error) {
      console.error('Discussion search error:', error);
      throw error;
    }
  }
}

export const discussionService = new DiscussionService();
export type { Discussion, Comment };
