import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaChartLine, FaLightbulb, FaRocket, FaGraduationCap } from 'react-icons/fa';
import type { TestFormData } from '../services/gemini';

interface AITestFormProps {
  onSubmit: (formData: TestFormData) => void;
  loading: boolean;
  previousPerformance?: {
    correctAnswers: number;
    totalQuestions: number;
    topics: Record<string, number>;
  };
}

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead Level'];
const questionTypes = ['multiple-choice', 'coding', 'theoretical'];
const progressionTypes = ['fixed', 'gradual', 'random'];

const FormSection = ({ title, icon: Icon, children }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm space-y-4"
  >
    <div className="flex items-center gap-3 text-[#fcba28] mb-4">
      <Icon className="w-5 h-5" />
      <h3 className="font-medium">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const SelectButton = ({ selected, onClick, children }: any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm transition-all ${
      selected
        ? 'bg-[#fcba28] text-black font-medium'
        : 'bg-black/20 text-gray-300 hover:bg-[#fcba28]/10 border border-[#fcba28]/20'
    }`}
  >
    {children}
  </motion.button>
);

export default function AITestForm({ onSubmit, loading, previousPerformance }: AITestFormProps) {
  const [formData, setFormData] = useState<TestFormData>({
    topics: [],
    difficulty: 'Intermediate',
    questionCount: 5,
    questionTypes: ['multiple-choice'],
    experienceLevel: 'Mid Level',
    specificFocus: [],
    difficultyProgression: 'fixed',
    includeExplanations: true,
    includePracticeQuestions: true,
    adaptiveMode: false,
    previousPerformance: previousPerformance ? {
      correctAnswers: previousPerformance.correctAnswers,
      totalQuestions: previousPerformance.totalQuestions,
      topics: previousPerformance.topics
    } : undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleTopic = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const toggleQuestionType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      questionTypes: prev.questionTypes.includes(type)
        ? prev.questionTypes.filter(t => t !== type)
        : [...prev.questionTypes, type]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {previousPerformance && (
        <FormSection title="Previous Performance" icon={FaChartLine}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
              <div className="text-sm text-gray-400 mb-2">Success Rate</div>
              <div className={`text-2xl font-medium ${
                (previousPerformance.correctAnswers / previousPerformance.totalQuestions) >= 0.7
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}>
                {((previousPerformance.correctAnswers / previousPerformance.totalQuestions) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
              <div className="text-sm text-gray-400 mb-2">Questions Completed</div>
              <div className="text-2xl font-medium text-[#fcba28]">
                {previousPerformance.totalQuestions}
              </div>
            </div>
          </div>
        </FormSection>
      )}

      <FormSection title="Topics" icon={FaCode}>
        <div className="flex flex-wrap gap-2">
          {['Data Structures', 'Algorithms', 'System Design', 'Web Development', 'Database', 'DevOps', 'Security'].map(topic => (
            <SelectButton
              key={topic}
              selected={formData.topics.includes(topic)}
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </SelectButton>
          ))}
        </div>
      </FormSection>

      <FormSection title="Question Types" icon={FaBrain}>
        <div className="flex flex-wrap gap-2">
          {questionTypes.map(type => (
            <SelectButton
              key={type}
              selected={formData.questionTypes.includes(type)}
              onClick={() => toggleQuestionType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </SelectButton>
          ))}
        </div>
      </FormSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSection title="Difficulty" icon={FaRocket}>
          <div className="flex flex-wrap gap-2">
            {difficultyLevels.map(level => (
              <SelectButton
                key={level}
                selected={formData.difficulty === level}
                onClick={() => setFormData(prev => ({ ...prev, difficulty: level }))}
              >
                {level}
              </SelectButton>
            ))}
          </div>
        </FormSection>

        <FormSection title="Experience Level" icon={FaGraduationCap}>
          <div className="flex flex-wrap gap-2">
            {experienceLevels.map(level => (
              <SelectButton
                key={level}
                selected={formData.experienceLevel === level}
                onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level }))}
              >
                {level}
              </SelectButton>
            ))}
          </div>
        </FormSection>
      </div>

      <FormSection title="Test Configuration" icon={FaLightbulb}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Number of Questions</label>
            <input
              type="number"
              min="1"
              max="20"
              value={formData.questionCount}
              onChange={e => setFormData(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
              className="w-full px-4 py-2 rounded-lg bg-black/20 border border-[#fcba28]/20 text-white focus:border-[#fcba28]/40 focus:ring-1 focus:ring-[#fcba28]/40"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Difficulty Progression</label>
            <div className="flex flex-wrap gap-2">
              {progressionTypes.map(type => (
                <SelectButton
                  key={type}
                  selected={formData.difficultyProgression === type}
                  onClick={() => setFormData(prev => ({ ...prev, difficultyProgression: type }))}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectButton>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.includeExplanations}
              onChange={e => setFormData(prev => ({ ...prev, includeExplanations: e.target.checked }))}
              className="w-4 h-4 rounded border-[#fcba28]/20 text-[#fcba28] focus:ring-[#fcba28]/40"
            />
            <span className="text-sm text-gray-300">Include Explanations</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.includePracticeQuestions}
              onChange={e => setFormData(prev => ({ ...prev, includePracticeQuestions: e.target.checked }))}
              className="w-4 h-4 rounded border-[#fcba28]/20 text-[#fcba28] focus:ring-[#fcba28]/40"
            />
            <span className="text-sm text-gray-300">Include Practice Questions</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.adaptiveMode}
              onChange={e => setFormData(prev => ({ ...prev, adaptiveMode: e.target.checked }))}
              className="w-4 h-4 rounded border-[#fcba28]/20 text-[#fcba28] focus:ring-[#fcba28]/40"
            />
            <span className="text-sm text-gray-300">Adaptive Mode</span>
          </label>
        </div>
      </FormSection>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading || formData.topics.length === 0 || formData.questionTypes.length === 0}
        className={`w-full py-4 rounded-xl text-black font-medium transition-all ${
          loading || formData.topics.length === 0 || formData.questionTypes.length === 0
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-[#fcba28] hover:bg-[#fcd978]'
        }`}
      >
        {loading ? 'Generating Test...' : 'Generate Test'}
      </motion.button>
    </form>
  );
}
