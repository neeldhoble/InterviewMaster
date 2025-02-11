'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  Download,
  Copy,
  Check,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { InterviewQuestion, InterviewResult } from '../types';

interface ResultsPageProps {
  result: InterviewResult;
  onBack: () => void;
  onGenerateMore: () => void;
}

export default function ResultsPage({ result, onBack, onGenerateMore }: ResultsPageProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(result.questions[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadResults = () => {
    const content = result.questions.map(q => 
      `Question: ${q.question}\n\nAnswer: ${q.answer}\n\nCategory: ${q.category}\nDifficulty: ${q.difficulty}\n\n---\n\n`
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

  const selectedQuestionData = result.questions.find(q => q.id === selectedQuestion);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-[2000px] mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div className="flex gap-4">
            <button
              onClick={downloadResults}
              className="flex items-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download All
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
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Questions Panel (Left Side) */}
        <div className="w-[400px] flex-shrink-0">
          <div className="fixed w-[400px] top-[73px] bottom-0 overflow-y-auto border-r border-white/10 bg-background">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Interview Questions ({result.questions.length})</h2>
              <div className="space-y-2 pb-20"> 
                {result.questions.map((question, index) => (
                  <motion.button
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedQuestion(question.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedQuestion === question.id
                        ? 'bg-[#fcba28] text-black'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="mr-2 font-mono">{(index + 1).toString().padStart(2, '0')}.</span>
                      <div className="flex-1">
                        <p className="line-clamp-2">{question.question}</p>
                        <div className="flex gap-2 mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedQuestion === question.id
                              ? 'bg-black/20'
                              : 'bg-white/10'
                          }`}>
                            {question.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedQuestion === question.id
                              ? 'bg-black/20'
                              : 'bg-white/10'
                          }`}>
                            {question.difficulty}
                          </span>
                        </div>
                      </div>
                      {selectedQuestion === question.id && (
                        <ChevronRight className="w-5 h-5 ml-auto flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Answer Panel (Right Side) */}
        <div className="flex-1 p-8 min-h-[calc(100vh-73px)]">
          <div className="max-w-3xl mx-auto">
            {selectedQuestionData ? (
              <motion.div
                key={selectedQuestionData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pb-20" 
              >
                <div className="bg-white/5 rounded-xl p-6 mb-6">
                  <h2 className="text-2xl font-semibold mb-4">{selectedQuestionData.question}</h2>
                  <div className="flex gap-2 mb-6">
                    <span className="bg-white/10 text-sm px-3 py-1 rounded-full">
                      {selectedQuestionData.category}
                    </span>
                    <span className="bg-white/10 text-sm px-3 py-1 rounded-full">
                      {selectedQuestionData.difficulty}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-white/80 leading-relaxed whitespace-pre-line">
                        {selectedQuestionData.answer}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(selectedQuestionData.answer, selectedQuestionData.id)}
                      className="absolute top-0 right-0 p-2 text-white/60 hover:text-white transition-colors"
                    >
                      {copiedId === selectedQuestionData.id ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-white/60">
                Select a question to view its answer
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
