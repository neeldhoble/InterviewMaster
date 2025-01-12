import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ui/progress";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  timeEstimate: number;
}

interface QuestionCardProps {
  question: Question;
  timeLeft: number;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  difficulty: string;
}

export default function QuestionCard({
  question,
  timeLeft,
  selectedOption,
  onSelectOption,
  difficulty,
}: QuestionCardProps) {
  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-[#fcba28]/20 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-300">
            Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <span className="text-sm font-medium text-gray-300">
            Time Left: {timeLeft}s
          </span>
        </div>
        <ProgressBar
          progress={(timeLeft / question.timeEstimate) * 100}
          label="Time Remaining"
          className="bg-[#fcba28]/20"
          indicatorClassName="bg-[#fcba28]"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-lg text-white"
        >
          {question.question}
        </motion.p>
      </div>
      
      <div className="border-t border-[#fcba28]/20 bg-black/20 p-6">
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={
                  selectedOption === option
                    ? option === question.correctAnswer
                      ? "default"
                      : "destructive"
                    : "outline"
                }
                className={`w-full justify-start text-left h-auto py-3 px-4 ${
                  selectedOption === option
                    ? option === question.correctAnswer
                      ? "bg-green-500 hover:bg-green-600 text-black"
                      : "bg-red-500 hover:bg-red-600 text-white"
                    : "border-[#fcba28]/50 text-[#fcba28] hover:bg-[#fcba28]/10"
                }`}
                onClick={() => !selectedOption && onSelectOption(option)}
                disabled={!!selectedOption}
              >
                <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
