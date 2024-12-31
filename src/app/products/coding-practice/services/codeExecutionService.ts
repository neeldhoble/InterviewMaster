import axios from 'axios';

interface ExecutionResult {
  output: string;
  error: string | null;
  executionTime: number;
  memoryUsage: number;
}

interface CodeAnalysis {
  complexity: string;
  suggestions: string[];
  performance: {
    timeComplexity: string;
    spaceComplexity: string;
    optimizationTips: string[];
  };
}

class CodeExecutionService {
  private readonly JUDGE0_API_URL = process.env.NEXT_PUBLIC_JUDGE0_API_URL;
  private readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  // Language IDs for Judge0 API
  private readonly languageIds = {
    python: 71,
    javascript: 63,
    java: 62,
    cpp: 54,
    csharp: 51,
  };

  async executeCode(code: string, language: string, testCases: string[]): Promise<ExecutionResult> {
    try {
      const response = await axios.post(`${this.JUDGE0_API_URL}/submissions`, {
        source_code: code,
        language_id: this.languageIds[language],
        stdin: testCases.join('\n'),
        cpu_time_limit: 2, // 2 seconds
        memory_limit: 128000, // 128MB
      });

      const { token } = response.data;
      return await this.getExecutionResult(token);
    } catch (error) {
      console.error('Code execution error:', error);
      return {
        output: '',
        error: 'Code execution failed',
        executionTime: 0,
        memoryUsage: 0,
      };
    }
  }

  private async getExecutionResult(token: string): Promise<ExecutionResult> {
    const maxAttempts = 10;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const response = await axios.get(`${this.JUDGE0_API_URL}/submissions/${token}`);
      const { status, stdout, stderr, time, memory } = response.data;

      if (status.id >= 3) { // Completed
        return {
          output: stdout || '',
          error: stderr || null,
          executionTime: parseFloat(time) || 0,
          memoryUsage: parseInt(memory) || 0,
        };
      }

      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    throw new Error('Execution timeout');
  }

  async analyzeCode(code: string, language: string): Promise<CodeAnalysis> {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a code analysis expert. Analyze the given code and provide insights about its complexity, potential improvements, and performance characteristics."
          },
          {
            role: "user",
            content: `Analyze this ${language} code:\n\n${code}`
          }
        ],
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });

      const analysis = response.data.choices[0].message.content;
      return this.parseAnalysis(analysis);
    } catch (error) {
      console.error('Code analysis error:', error);
      return {
        complexity: 'Unknown',
        suggestions: [],
        performance: {
          timeComplexity: 'Unknown',
          spaceComplexity: 'Unknown',
          optimizationTips: [],
        },
      };
    }
  }

  private parseAnalysis(analysisText: string): CodeAnalysis {
    // Implement parsing logic for the GPT response
    // This is a simplified version
    return {
      complexity: 'O(n)',
      suggestions: [
        'Consider using a hash map for better performance',
        'Add input validation',
      ],
      performance: {
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        optimizationTips: [
          'Use early return statements',
          'Consider caching results',
        ],
      },
    };
  }
}

export const codeExecutionService = new CodeExecutionService();
