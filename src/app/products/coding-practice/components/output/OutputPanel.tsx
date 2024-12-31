'use client';

import React from 'react';
import { Terminal, AlertCircle, CheckCircle, XCircle, Clock, BarChart2 } from 'lucide-react';

interface OutputPanelProps {
  output?: string;
  error?: string | null;
  executionTime?: number;
  memoryUsage?: number;
  testResults?: Array<{
    name: string;
    passed: boolean;
    message?: string;
  }>;
}

export function OutputPanel({
  output = '',
  error = null,
  executionTime,
  memoryUsage,
  testResults = [],
}: OutputPanelProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-white/10">
        <Terminal className="w-5 h-5 text-white/60" />
        <h2 className="text-sm font-medium text-white">Output</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {/* Metrics */}
        {(executionTime !== undefined || memoryUsage !== undefined) && (
          <div className="flex gap-4 mb-4 text-white/60">
            {executionTime !== undefined && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Time: {executionTime.toFixed(2)}ms</span>
              </div>
            )}
            {memoryUsage !== undefined && (
              <div className="flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4" />
                <span>Memory: {(memoryUsage / 1024 / 1024).toFixed(2)}MB</span>
              </div>
            )}
          </div>
        )}

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="space-y-2 mb-4">
            {testResults.map((test, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 p-2 rounded ${
                  test.passed ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}
              >
                {test.passed ? (
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5" />
                )}
                <div>
                  <div className={test.passed ? 'text-green-400' : 'text-red-400'}>
                    {test.name}
                  </div>
                  {test.message && (
                    <div className="text-white/60 text-sm mt-1">{test.message}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-500/10 rounded mb-4">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
            <div className="text-red-400 whitespace-pre-wrap">{error}</div>
          </div>
        )}

        {/* Output */}
        {output && (
          <pre className="whitespace-pre-wrap text-white/80 font-mono">{output}</pre>
        )}

        {/* Empty State */}
        {!output && !error && testResults.length === 0 && (
          <div className="h-full flex items-center justify-center text-white/40">
            Run your code to see the output here
          </div>
        )}
      </div>
    </div>
  );
}
