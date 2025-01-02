"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { LearningLayout } from '../../components/LearningLayout';
import { getTopicContent, TopicContent } from '../../utils/loadTopics';
import { CodeBlock } from '../../components/CodeBlock';

export default function SubtopicPage({ 
  params 
}: { 
  params: { topic: string; subtopic: string } 
}) {
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

  const subtopic = topicData.subtopics.find(s => s.id === params.subtopic);
  if (!subtopic) {
    return notFound();
  }

  return (
    <LearningLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            {subtopic.title}
          </h1>
          <p className="text-xl text-white/60">
            {subtopic.description}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert max-w-none"
        >
          {subtopic.content.introduction && (
            <div className="mb-8">
              <p className="text-lg text-white/80">
                {subtopic.content.introduction}
              </p>
            </div>
          )}

          {subtopic.content.sections?.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                {section.title}
              </h2>
              
              {section.content && (
                <p className="text-white/80 mb-6">
                  {section.content}
                </p>
              )}

              {section.list && (
                <ul className="list-disc list-inside space-y-2 text-white/80 mb-6">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {section.code && (
                <div className="mb-6">
                  <CodeBlock
                    code={section.code.example}
                    language={section.code.language}
                    showLineNumbers
                  />
                  {section.code.output && (
                    <div className="mt-4 p-4 bg-black/40 rounded-lg">
                      <pre className="text-white/80 text-sm">
                        {section.code.output}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </LearningLayout>
  );
}
