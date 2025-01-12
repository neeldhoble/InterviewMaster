import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ui/progress";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  timeEstimate: number;
  skillsTested?: string[];
  category?: string;
  subTopic?: string;
}

interface QuestionCardProps {
  question: Question;
  timeLeft: number;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  difficulty: string;
  performanceMetrics?: {
    streaks: { current: number; best: number };
  };
}

export default function QuestionCard({
  question,
  timeLeft,
  selectedOption,
  onSelectOption,
  difficulty,
  performanceMetrics
}: QuestionCardProps) {
  const timeProgress = (timeLeft / question.timeEstimate) * 100;
  const isTimeRunningLow = timeProgress < 30;

  return (
    <motion.div 
      className="bg-black/40 backdrop-blur-lg rounded-xl border border-[#fcba28]/20 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
              difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
            {performanceMetrics && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Streak:</span>
                <span className="text-sm font-medium text-[#fcba28]">
                  {performanceMetrics.streaks.current} 🔥
                </span>
                <span className="text-xs text-gray-500">
                  (Best: {performanceMetrics.streaks.best})
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${
              isTimeRunningLow ? 'text-red-400 animate-pulse' : 'text-gray-300'
            }`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        <ProgressBar
          progress={timeProgress}
          label="Time Remaining"
          className={`bg-[#fcba28]/20 transition-colors ${
            isTimeRunningLow ? 'bg-red-500/20' : ''
          }`}
          indicatorClassName={`transition-colors ${
            isTimeRunningLow ? 'bg-red-500' : 'bg-[#fcba28]'
          }`}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          <p className="text-lg text-white leading-relaxed">{question.question}</p>
          
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => onSelectOption(option)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedOption === option
                    ? 'border-[#fcba28] bg-[#fcba28]/10 text-[#fcba28]'
                    : 'border-gray-700 hover:border-[#fcba28]/50 hover:bg-[#fcba28]/5'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full border border-current text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {question.skillsTested && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-sm text-gray-400 mb-2">Skills Tested:</h4>
              <div className="flex flex-wrap gap-2">
                {question.skillsTested.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-[#fcba28]/10 text-[#fcba28] rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
