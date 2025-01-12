import { motion } from "framer-motion";

interface FeedbackPanelProps {
  explanation: string;
  feedback: any;
  skillsTested?: string[];
}

export default function FeedbackPanel({
  explanation,
  feedback,
  skillsTested
}: FeedbackPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="space-y-6"
    >
      <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-[#fcba28]/20 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">
            Solution Explanation
          </h3>
          <p className="text-gray-200">{explanation}</p>
          {skillsTested && (
            <div className="mt-6">
              <h4 className="font-medium text-[#fcba28] mb-3">Skills Tested:</h4>
              <div className="flex flex-wrap gap-2">
                {skillsTested.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#fcba28]/10 text-[#fcba28] rounded-full text-sm border border-[#fcba28]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {feedback && (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-[#fcba28]/20 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-[#fcba28] mb-6">
              Personalized Feedback
            </h3>
            <div className="space-y-6">
              <div className="bg-black/40 rounded-lg p-4 border border-[#fcba28]/20">
                <h4 className="font-medium text-[#fcba28] mb-2">
                  Concept Understanding
                </h4>
                <p className="text-gray-200">{feedback.conceptualFeedback}</p>
              </div>
              
              <div className="bg-black/40 rounded-lg p-4 border border-[#fcba28]/20">
                <h4 className="font-medium text-[#fcba28] mb-2">
                  Time Management
                </h4>
                <p className="text-gray-200">{feedback.timingFeedback}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-[#fcba28] mb-3">
                  Improvement Tips:
                </h4>
                <ul className="space-y-2">
                  {feedback.improvementTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#fcba28] mr-2">•</span>
                      <span className="text-gray-200">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
