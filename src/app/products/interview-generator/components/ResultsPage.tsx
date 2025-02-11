'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  Download,
  Copy,
  Check,
  ArrowLeft
} from 'lucide-react';
import { InterviewQuestion, InterviewResult } from '../types';

interface ResultsPageProps {
  result: InterviewResult;
  onBack: () => void;
  onGenerateMore: () => void;
}

export default function ResultsPage({ result, onBack, onGenerateMore }: ResultsPageProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev => 
      prev.includes(id) 
        ? prev.filter(qId => qId !== id)
        : [...prev, id]
    );
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadResults = () => {
    const content = result.questions.map(q => 
      `Question: ${q.question}\nAnswer: ${q.answer || 'Not provided'}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview-questions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Form
          </button>
          <div className="flex gap-4">
            <button
              onClick={downloadResults}
              className="flex items-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            <button
              onClick={onGenerateMore}
              className="flex items-center px-4 py-2 rounded-lg bg-[#fcba28] text-black hover:bg-[#fcd978] transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate More
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {result.questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all"
            >
              <div 
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleQuestion(question.id)}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white">
                    {index + 1}. {question.question}
                  </h3>
                  {question.category && (
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm bg-white/10 text-white/60">
                      {question.category}
                    </span>
                  )}
                </div>
                <button className="ml-4 text-white/60 hover:text-white transition-colors">
                  {expandedQuestions.includes(question.id) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {expandedQuestions.includes(question.id) && question.answer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-white/80 leading-relaxed">{question.answer}</p>
                    <button
                      onClick={() => copyToClipboard(question.answer, question.id)}
                      className="ml-4 text-white/60 hover:text-white transition-colors"
                    >
                      {copiedId === question.id ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
