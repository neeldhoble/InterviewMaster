"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LearningLayout } from './components/LearningLayout';
import { Search, BookOpen, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { getTopicsIndex, TopicIndex } from './utils/loadTopics';

export default function LearningPathsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topics, setTopics] = useState<TopicIndex[]>([]);

  useEffect(() => {
    const loadTopics = () => {
      const topicsData = getTopicsIndex();
      setTopics(topicsData);
    };

    loadTopics();
  }, []);

  const filteredTopics = topics.filter(topic => {
    const matchQuery = !searchQuery || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchTopic = !selectedTopic || topic.id === selectedTopic;
    
    return matchQuery && matchTopic;
  });

  return (
    <LearningLayout>
      <div className="p-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Learning Paths
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Master programming concepts with our comprehensive tutorials. 
            Choose from various topics and start learning today.
          </p>
        </motion.div>

        {/* Search and Popular Topics */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutorials..."
                className="w-full px-4 py-3 pl-12 bg-black/20 border border-white/10 rounded-lg 
                         text-white placeholder-white/40 focus:outline-none focus:ring-2 
                         focus:ring-[#fcba28]/50 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            </div>
          </div>

          {/* Popular Topics */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${selectedTopic === topic.id 
                    ? `text-${topic.color}-400 bg-${topic.color}-400/10 border-${topic.color}-400/20 border`
                    : 'text-white/60 hover:text-white bg-white/5 hover:bg-white/10'
                  }`}
              >
                {topic.title}
              </button>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/20 p-6 hover:bg-black/30 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#fcba28]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <Link href={`/products/coding-practice/learning-paths/${topic.id}`} className="block">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className={`w-5 h-5 text-${topic.color}-400`} />
                  <span className={`text-sm font-medium text-${topic.color}-400`}>
                    Tutorial
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#fcba28] transition-colors">
                  {topic.title}
                </h3>
                
                <p className="text-white/60 mb-4 line-clamp-2">
                  {topic.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <Star className="w-4 h-4" />
                    <span>Popular Tutorial</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#fcba28] transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredTopics.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/60 mt-12"
          >
            No tutorials found matching your search. Try different keywords.
          </motion.div>
        )}
      </div>
    </LearningLayout>
  );
}