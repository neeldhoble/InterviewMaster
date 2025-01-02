"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({ code, language, showLineNumbers = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group rounded-lg overflow-hidden bg-black/20 border border-white/10"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5">
        <span className="text-sm text-white/60">{language}</span>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-white/60" />
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none w-8 text-right mr-4 text-white/20">
                  {i + 1}
                </span>
              )}
              <span className="flex-1">
                {line || '\u00A0'} {/* Use non-breaking space for empty lines */}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </motion.div>
  );
};
