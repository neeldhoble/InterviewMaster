import { motion } from "framer-motion";

interface FeedbackPanelProps {
  explanation: string;
  feedback: {
    correctness: boolean;
    timePerformance: string;
    conceptualUnderstanding: string;
    recommendedTopics?: string[];
    suggestedResources?: string[];
    nextSteps?: string[];
    detailedExplanation: string;
  };
  skillsTested?: string[];
  performanceMetrics?: {
    accuracy: number;
    streaks: { current: number; best: number };
    topicWisePerformance: Record<string, { correct: number; total: number }>;
  };
}

export default function FeedbackPanel({
  explanation,
  feedback,
  skillsTested,
  performanceMetrics
}: FeedbackPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="space-y-6"
    >
      {/* Main Explanation Panel */}
      <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-[#fcba28]/20 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#fcba28]">
              Solution Explanation
            </h3>
            {feedback.correctness && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Correct Answer! 🎉
              </span>
            )}
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-200 leading-relaxed">{explanation}</p>
          </div>

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

      {/* Personalized Feedback Panel */}
      <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-[#fcba28]/20 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-6">
            Personalized Feedback
          </h3>
          
          <div className="space-y-6">
            {/* Performance Metrics */}
            {performanceMetrics && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/40 rounded-lg p-4 border border-[#fcba28]/20">
                  <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                  <div className="text-2xl font-semibold text-[#fcba28]">
                    {Math.round(performanceMetrics.accuracy * 100)}%
                  </div>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-[#fcba28]/20">
                  <div className="text-sm text-gray-400 mb-1">Current Streak</div>
                  <div className="text-2xl font-semibold text-[#fcba28]">
                    {performanceMetrics.streaks.current} 🔥
                  </div>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-[#fcba28]/20">
                  <div className="text-sm text-gray-400 mb-1">Best Streak</div>
                  <div className="text-2xl font-semibold text-[#fcba28]">
                    {performanceMetrics.streaks.best}
                  </div>
                </div>
              </div>
            )}

            {/* Detailed Feedback */}
            <div className="space-y-4">
              <div>
                <h4 className="text-[#fcba28] font-medium mb-2">Time Performance</h4>
                <p className="text-gray-300">{feedback.timePerformance}</p>
              </div>
              
              <div>
                <h4 className="text-[#fcba28] font-medium mb-2">Conceptual Understanding</h4>
                <p className="text-gray-300">{feedback.conceptualUnderstanding}</p>
              </div>

              {feedback.recommendedTopics && (
                <div>
                  <h4 className="text-[#fcba28] font-medium mb-2">Recommended Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {feedback.recommendedTopics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {feedback.suggestedResources && (
                <div>
                  <h4 className="text-[#fcba28] font-medium mb-2">Learning Resources</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {feedback.suggestedResources.map((resource, index) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback.nextSteps && (
                <div>
                  <h4 className="text-[#fcba28] font-medium mb-2">Next Steps</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {feedback.nextSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
