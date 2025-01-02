import { CodeExecutionResult, SupportedLanguage, TestCase } from '../types';

class ExecutionService {
  private readonly API_ENDPOINT = '/api/execute';

  async executeCode(
    code: string,
    language: SupportedLanguage,
    input?: string
  ): Promise<CodeExecutionResult> {
    try {
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          input,
        }),
      });

      if (!response.ok) {
        throw new Error('Execution failed');
      }

      return await response.json();
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async runTestCases(
    code: string,
    language: SupportedLanguage,
    testCases: TestCase[]
  ): Promise<CodeExecutionResult> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          testCases,
        }),
      });

      if (!response.ok) {
        throw new Error('Test execution failed');
      }

      return await response.json();
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async submit(
    code: string,
    language: SupportedLanguage,
    problemId: string
  ): Promise<CodeExecutionResult> {
    try {
      const response = await fetch(`${this.API_ENDPOINT}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          problemId,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      return await response.json();
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

export const executionService = new ExecutionService();
