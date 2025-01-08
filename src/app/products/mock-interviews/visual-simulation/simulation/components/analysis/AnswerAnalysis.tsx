import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Lightbulb, CheckCircle, Activity, Clock, Mic } from 'lucide-react';
import { geminiService } from '../../services/geminiService';

interface AnswerAnalysisProps {
  isRecording: boolean;
  currentQuestion: string;
  transcript: {
    final: string;
    interim: string;
  };
}

export const AnswerAnalysis: React.FC<AnswerAnalysisProps> = ({
  isRecording,
  currentQuestion,
  transcript,
}) => {
  const [analysis, setAnalysis] = useState({
    originalAnalysis: '',
    improvedAnswer: '',
    modelAnswer: '',
    keyImprovements: [] as string[],
    confidence: 0,
  });

  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';
        setRecognition(recognitionInstance);
      }
    }
  }, []);

  useEffect(() => {
    let analysisTimeout: NodeJS.Timeout;
    
    const analyzeAnswer = async () => {
      if (transcript.final) {
        try {
          const prompt = `
            Question: ${currentQuestion}
            Answer: ${transcript.final}
            
            Please analyze this interview answer and provide:
            1. Analysis of the current answer
            2. An improved version of the same answer
            3. A model answer that showcases the best way to answer
            4. Key improvements needed
            5. Confidence score (0-100)
            
            Format as JSON:
            {
              "analysis": "detailed analysis",
              "improvedAnswer": "improved version",
              "modelAnswer": "ideal answer",
              "keyImprovements": ["improvement1", "improvement2", "improvement3"],
              "confidence": 85
            }
          `;

          const result = await geminiService.generateContent(prompt);
          const response = JSON.parse(result);
          
          setAnalysis({
            originalAnalysis: response.analysis,
            improvedAnswer: response.improvedAnswer,
            modelAnswer: response.modelAnswer,
            keyImprovements: response.keyImprovements,
            confidence: response.confidence,
          });
        } catch (error) {
          console.error('Error analyzing answer:', error);
        }
      }
    };

    if (isRecording && transcript.final) {
      // Wait 2 seconds after the last speech before analyzing
      clearTimeout(analysisTimeout);
      analysisTimeout = setTimeout(analyzeAnswer, 2000);
    }

    return () => clearTimeout(analysisTimeout);
  }, [isRecording, transcript.final, currentQuestion]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
            <Lightbulb className="w-7 h-7 text-violet-400" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-white">Answer Analysis</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                <span className="text-sm text-white/60">{isRecording ? 'Recording' : 'Ready'}</span>
              </div>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/40" />
                <span className="text-sm text-white/60">Real-time Analysis</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Confidence Score */}
        {analysis.confidence > 0 && (
          <div className="text-center">
            <div className="relative w-20 h-20">
              <motion.div 
                className="absolute inset-0 rounded-full bg-violet-500/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-1 rounded-full bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-2xl font-bold text-white">{analysis.confidence}</span>
                  <span className="text-sm font-medium text-violet-400">/100</span>
                </div>
              </div>
            </div>
            <span className="text-sm text-white/60">Confidence Score</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Answer Analysis */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-violet-400" />
            <h4 className="font-medium text-white">Your Answer</h4>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/80 text-sm leading-relaxed">
              {transcript.final || transcript.interim || "Start speaking to see your answer..."}
            </p>
          </div>
          {analysis.originalAnalysis && (
            <div className="p-4 bg-violet-500/10 rounded-lg border border-violet-500/20">
              <p className="text-white/70 text-sm leading-relaxed">{analysis.originalAnalysis}</p>
            </div>
          )}
        </div>

        {/* Improved Answer */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h4 className="font-medium text-white">Improved Version</h4>
          </div>
          <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <p className="text-white/80 text-sm leading-relaxed">
              {analysis.improvedAnswer || "Waiting for your answer to provide improvements..."}
            </p>
          </div>
        </div>
      </div>

      {/* Model Answer */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          <h4 className="font-medium text-white">Model Answer</h4>
        </div>
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-white/80 text-sm leading-relaxed">
            {analysis.modelAnswer || "Speak to see a model answer..."}
          </p>
        </div>
      </div>

      {/* Key Improvements */}
      {analysis.keyImprovements.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.keyImprovements.map((improvement, i) => (
            <motion.div
              key={i}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-violet-400">{i + 1}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{improvement}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
