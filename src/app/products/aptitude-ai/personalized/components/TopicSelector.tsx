import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaSearch, FaStar, FaHistory, FaChartLine } from 'react-icons/fa';

interface TopicSelectorProps {
  onSelectTopic: (topic: string) => void;
  recentTopics?: string[];
  recommendedTopics?: string[];
  userProgress?: Record<string, { completed: number; accuracy: number }>;
}

const TOPIC_CATEGORIES = {
  'Numerical Ability': [
    'Basic Arithmetic',
    'Number Series',
    'Percentages',
    'Profit and Loss',
    'Time and Work',
    'Speed and Distance',
    'Averages',
    'Ratios and Proportions'
  ],
  'Logical Reasoning': [
    'Verbal Reasoning',
    'Non-verbal Reasoning',
    'Analogies',
    'Syllogisms',
    'Blood Relations',
    'Coding-Decoding',
    'Direction Sense',
    'Seating Arrangement'
  ],
  'Verbal Ability': [
    'Reading Comprehension',
    'Vocabulary',
    'Grammar',
    'Sentence Completion',
    'Error Spotting',
    'Verbal Analogies',
    'Paragraph Formation',
    'Sentence Rearrangement'
  ],
  'Data Interpretation': [
    'Tables',
    'Graphs',
    'Charts',
    'Pie Charts',
    'Bar Graphs',
    'Line Graphs',
    'Data Sufficiency',
    'Case Studies'
  ]
};

export default function TopicSelector({ 
  onSelectTopic, 
  recentTopics = [], 
  recommendedTopics = [],
  userProgress = {}
}: TopicSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredTopics, setFilteredTopics] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery) {
      const allTopics = Object.values(TOPIC_CATEGORIES).flat();
      setFilteredTopics(
        allTopics.filter(topic => 
          topic.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredTopics([]);
    }
  }, [searchQuery]);

  const renderTopicCard = (topic: string) => {
    const progress = userProgress[topic];
    return (
      <motion.button
        key={topic}
        onClick={() => onSelectTopic(topic)}
        className="group relative w-full p-4 rounded-lg border border-[#fcba28]/20 bg-black/40 
                   backdrop-blur-lg hover:border-[#fcba28] transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[#fcba28] font-medium">{topic}</span>
          {progress && (
            <div className="flex items-center space-x-2">
              <div className="text-sm">
                <span className="text-green-400">{progress.accuracy}%</span>
                <span className="text-gray-400 mx-1">•</span>
                <span className="text-gray-400">{progress.completed} completed</span>
              </div>
              <div className="w-20 h-1 bg-[#fcba28]/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#fcba28]" 
                  style={{ width: `${progress.accuracy}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.button>
    );
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 bg-black/40 border-[#fcba28]/20 text-white"
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {searchQuery && filteredTopics.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-[#fcba28]">Search Results</h3>
          <div className="grid gap-2">
            {filteredTopics.map(renderTopicCard)}
          </div>
        </div>
      )}

      {!searchQuery && (
        <>
          {recommendedTopics.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#fcba28]">
                <FaStar />
                <h3 className="text-lg font-medium">Recommended for You</h3>
              </div>
              <div className="grid gap-2">
                {recommendedTopics.map(renderTopicCard)}
              </div>
            </div>
          )}

          {recentTopics.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#fcba28]">
                <FaHistory />
                <h3 className="text-lg font-medium">Recently Practiced</h3>
              </div>
              <div className="grid gap-2">
                {recentTopics.map(renderTopicCard)}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-[#fcba28]">
              <FaChartLine />
              <h3 className="text-lg font-medium">All Topics</h3>
            </div>
            {Object.entries(TOPIC_CATEGORIES).map(([category, topics]) => (
              <div key={category} className="space-y-2">
                <button
                  onClick={() => setExpandedCategory(
                    expandedCategory === category ? null : category
                  )}
                  className="w-full flex items-center justify-between p-4 rounded-lg 
                           border border-[#fcba28]/20 bg-black/40 backdrop-blur-lg 
                           hover:border-[#fcba28] transition-all"
                >
                  <span className="text-[#fcba28] font-medium">{category}</span>
                  <span className="text-gray-400">{topics.length} topics</span>
                </button>
                {expandedCategory === category && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid gap-2 pl-4"
                  >
                    {topics.map(renderTopicCard)}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
