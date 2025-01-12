import { motion } from "framer-motion";
import { FaBrain, FaCalculator, FaChartBar, FaLanguage, FaPuzzlePiece } from "react-icons/fa";

const topics = [
  {
    id: "numerical",
    name: "Numerical Ability",
    icon: FaCalculator,
    description: "Practice mathematical and numerical reasoning questions",
  },
  {
    id: "logical",
    name: "Logical Reasoning",
    icon: FaPuzzlePiece,
    description: "Enhance your logical thinking and problem-solving skills",
  },
  {
    id: "verbal",
    name: "Verbal Ability",
    icon: FaLanguage,
    description: "Improve your verbal reasoning and comprehension",
  },
  {
    id: "data",
    name: "Data Interpretation",
    icon: FaChartBar,
    description: "Analyze and interpret data, graphs, and charts",
  },
  {
    id: "quantitative",
    name: "Quantitative Aptitude",
    icon: FaBrain,
    description: "Master quantitative and analytical skills",
  }
];

interface TopicSelectorProps {
  onSelectTopic: (topicId: string) => void;
}

export default function TopicSelector({ onSelectTopic }: TopicSelectorProps) {
  return (
    <div className="grid gap-4">
      {topics.map((topic, index) => {
        const Icon = topic.icon;
        return (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.button
              onClick={() => onSelectTopic(topic.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              className="w-full bg-black/40 backdrop-blur-lg hover:bg-black/50 border border-[#fcba28]/20 rounded-xl p-6 text-left transition-all group"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-lg bg-[#fcba28]/10 flex items-center justify-center group-hover:bg-[#fcba28]/20"
                >
                  <Icon className="text-[#fcba28] text-2xl" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#fcba28] transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {topic.description}
                  </p>
                </div>
              </div>
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
}
