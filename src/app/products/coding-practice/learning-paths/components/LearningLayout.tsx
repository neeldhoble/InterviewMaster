"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { getTopicsIndex, getTopicContent, TopicIndex, TopicContent } from '../utils/loadTopics';
import { Background } from './Background';

interface LearningLayoutProps {
  children: React.ReactNode;
}

const TopNavigation = ({ topics }: { topics: TopicIndex[] }) => {
  const pathname = usePathname();

  return (
    <div className="h-14 bg-black/40 border-b border-white/10 backdrop-blur-sm flex items-center px-4 overflow-x-auto">
      {topics.map((topic) => (
        <Link
          key={topic.id}
          href={`/products/coding-practice/learning-paths/${topic.id}`}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
            pathname.includes(topic.id)
              ? 'text-[#fcba28]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          {topic.title}
        </Link>
      ))}
    </div>
  );
};

const SideNavigation = ({ 
  topic, 
  isOpen,
  onClose 
}: { 
  topic: TopicContent | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();

  if (!topic) return null;

  return (
    <AnimatePresence>
      {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 w-64 h-full bg-black/40 border-r border-white/10 backdrop-blur-sm z-40 pt-16"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">{topic.title}</h2>
              <button
                onClick={onClose}
                className="lg:hidden text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {topic.subtopics.map((subtopic) => (
                <div key={subtopic.id}>
                  <Link
                    href={`/products/coding-practice/learning-paths/${topic.id}/${subtopic.id}`}
                    className={`block px-3 py-2 rounded-lg text-sm ${
                      pathname.includes(subtopic.id)
                        ? 'bg-[#fcba28]/20 text-[#fcba28]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {subtopic.title}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const LearningLayout = ({ children }: LearningLayoutProps) => {
  const [topics, setTopics] = useState<TopicIndex[]>([]);
  const [currentTopic, setCurrentTopic] = useState<TopicContent | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const loadTopics = () => {
      const topicsData = getTopicsIndex();
      setTopics(topicsData);
    };

    loadTopics();
  }, []);

  useEffect(() => {
    const loadCurrentTopic = async () => {
      const pathParts = pathname.split('/');
      const topicId = pathParts[4]; // Get topic ID from URL
      if (topicId) {
        try {
          const topicData = await getTopicContent(topicId);
          if (topicData) {
            setCurrentTopic(topicData);
          }
        } catch (error) {
          console.error('Error loading topic:', error);
          setCurrentTopic(null);
        }
      } else {
        setCurrentTopic(null);
      }
    };

    loadCurrentTopic();
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <Background />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="h-16 bg-black/40 border-b border-white/10 backdrop-blur-sm flex items-center px-4">
          {currentTopic && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-white/60 hover:text-white mr-4"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          <Link href="/products/coding-practice/learning-paths" className="text-xl font-bold text-white">
            Learning Paths
          </Link>
        </div>
        <TopNavigation topics={topics} />
      </header>

      {/* Sidebar */}
      <SideNavigation 
        topic={currentTopic} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main 
        className={`relative transition-all duration-300 ${
          currentTopic ? 'lg:pl-64' : ''
        } pt-32`}
      >
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};
