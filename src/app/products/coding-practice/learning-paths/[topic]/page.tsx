"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { LearningLayout } from '../components/LearningLayout';
import { getTopicContent, TopicContent } from '../utils/loadTopics';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TopicPage({ params }: { params: { topic: string } }) {
  const [topicData, setTopicData] = useState<TopicContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopic = async () => {
      try {
        const data = await getTopicContent(params.topic);
        if (data) {
          setTopicData(data);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Error loading topic:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadTopic();
  }, [params.topic]);

  if (loading) {
    return (
      <LearningLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white/60">Loading...</div>
        </div>
      </LearningLayout>
    );
  }

  if (!topicData) {
    return notFound();
  }

  return (
    <LearningLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            {topicData.title}
          </h1>
          <p className="text-xl text-white/60 max-w-3xl">
            {topicData.description}
          </p>
        </motion.div>

        {/* Subtopics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicData.subtopics.map((subtopic, index) => (
            <motion.div
              key={subtopic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/20 p-6 hover:bg-black/30 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#fcba28]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <Link href={`/products/coding-practice/learning-paths/${params.topic}/${subtopic.id}`} className="block">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-[#fcba28]" />
                  <span className="text-sm font-medium text-[#fcba28]">
                    Tutorial
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#fcba28] transition-colors">
                  {subtopic.title}
                </h3>
                
                <p className="text-white/60 mb-4 line-clamp-2">
                  {subtopic.description}
                </p>

                <div className="flex items-center justify-end">
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#fcba28] transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </LearningLayout>
  );
}
