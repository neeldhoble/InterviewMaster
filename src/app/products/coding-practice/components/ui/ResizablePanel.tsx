'use client';

import React from 'react';
import { GripVertical, GripHorizontal } from 'lucide-react';

interface ResizablePanelProps {
  children: React.ReactNode;
  defaultSize: number;
  minSize: number;
  maxSize: number;
  direction: 'horizontal' | 'vertical';
  className?: string;
}

export function ResizablePanel({
  children,
  defaultSize,
  minSize,
  maxSize,
  direction,
  className = '',
}: ResizablePanelProps) {
  const [size, setSize] = React.useState(defaultSize);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
  };

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  }, []);

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      let newSize;

      if (direction === 'horizontal') {
        newSize = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      } else {
        newSize = ((e.clientY - containerRect.top) / containerRect.height) * 100;
      }

      // Clamp the size between min and max
      newSize = Math.max(minSize, Math.min(maxSize, newSize));
      setSize(newSize);
    },
    [isDragging, direction, minSize, maxSize]
  );

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        [direction === 'horizontal' ? 'width' : 'height']: `${size}%`,
      }}
    >
      {children}
      <div
        className={`absolute ${
          direction === 'horizontal'
            ? 'right-0 top-0 w-1 h-full cursor-col-resize'
            : 'bottom-0 left-0 h-1 w-full cursor-row-resize'
        } bg-white/5 hover:bg-[#fcba28]/50 group transition-colors`}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {direction === 'horizontal' ? (
            <GripVertical className="w-4 h-4 text-white/0 group-hover:text-white/60" />
          ) : (
            <GripHorizontal className="w-4 h-4 text-white/0 group-hover:text-white/60" />
          )}
        </div>
      </div>
    </div>
  );
}
