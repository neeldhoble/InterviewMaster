'use client';

import React from 'react';
import { ProblemDescription } from '../problem/ProblemDescription';
import { CodeEditor } from './CodeEditor';
import { OutputPanel } from '../output/OutputPanel';
import { GripVertical, GripHorizontal } from 'lucide-react';

interface EditorLayoutProps {
  problemData: {
    title: string;
    difficulty: string;
    description: string;
    examples: {
      input: string;
      output: string;
      explanation?: string;
    }[];
    constraints: string[];
    timeComplexity?: string;
    spaceComplexity?: string;
    tags: string[];
  };
  code: string;
  language: string;
  output: string;
  onCodeChange: (code: string) => void;
  onRun: () => void;
  onTest: () => void;
  onSubmit: () => void;
}

export function EditorLayout({
  problemData,
  code,
  language,
  output,
  onCodeChange,
  onRun,
  onTest,
  onSubmit,
}: EditorLayoutProps) {
  const [leftPanelWidth, setLeftPanelWidth] = React.useState(30);
  const [bottomPanelHeight, setBottomPanelHeight] = React.useState(30);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = React.useState(false);
  const [isDraggingVertical, setIsDraggingVertical] = React.useState(false);

  const handleHorizontalMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingHorizontal(true);
  };

  const handleVerticalMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingVertical(true);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingHorizontal) {
        const percentage = (e.clientX / window.innerWidth) * 100;
        setLeftPanelWidth(Math.min(Math.max(20, percentage), 60));
      }
      if (isDraggingVertical) {
        const percentage = ((e.clientY - 64) / (window.innerHeight - 64)) * 100;
        setBottomPanelHeight(Math.min(Math.max(10, 100 - percentage), 50));
      }
    };

    const handleMouseUp = () => {
      setIsDraggingHorizontal(false);
      setIsDraggingVertical(false);
    };

    if (isDraggingHorizontal || isDraggingVertical) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isDraggingHorizontal ? 'col-resize' : 'row-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [isDraggingHorizontal, isDraggingVertical]);

  return (
    <div className="flex h-[calc(100vh-6rem)]">
      {/* Problem Description Panel */}
      <div
        className="border-r border-white/10 overflow-auto"
        style={{ width: `${leftPanelWidth}%` }}
      >
        <ProblemDescription problem={problemData} />
      </div>

      {/* Vertical Resizer */}
      <div
        className="w-1 bg-white/5 hover:bg-[#fcba28]/50 cursor-col-resize relative group"
        onMouseDown={handleHorizontalMouseDown}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <GripVertical className="w-4 h-4 text-white/0 group-hover:text-white/60" />
        </div>
      </div>

      {/* Editor and Output */}
      <div className="flex-1 flex flex-col">
        {/* Code Editor */}
        <div
          className="flex-1 min-h-0"
          style={{ height: `${100 - bottomPanelHeight}%` }}
        >
          <CodeEditor
            code={code}
            language={language}
            onChange={onCodeChange}
            onRun={onRun}
            onTest={onTest}
            onSubmit={onSubmit}
          />
        </div>

        {/* Horizontal Resizer */}
        <div
          className="h-1 bg-white/5 hover:bg-[#fcba28]/50 cursor-row-resize relative group"
          onMouseDown={handleVerticalMouseDown}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <GripHorizontal className="w-4 h-4 text-white/0 group-hover:text-white/60" />
          </div>
        </div>

        {/* Output Panel */}
        <div
          className="border-t border-white/10"
          style={{ height: `${bottomPanelHeight}%` }}
        >
          <OutputPanel output={output} />
        </div>
      </div>
    </div>
  );
}
