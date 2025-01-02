'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown, Database, Code2 } from 'lucide-react';
import { learningPaths } from '../../data/learning-paths';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const icons = {
  Database,
  Code2,
};

export default function LearningPathPage({ params }: { params: { id: string } }) {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null);

  const path = learningPaths.find((p) => p.id === params.id);
  if (!path) return null;

  const Icon = icons[path.icon as keyof typeof icons];
  const currentTopic = path.sections
    .flatMap((section) => section.topics)
    .find((topic) => topic.id === selectedTopic);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
        <Link href="/products/coding-practice/learning-paths" className="hover:text-white">
          Learning Paths
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">{path.title}</span>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="col-span-4">
          <div className="sticky top-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/10 text-[#fcba28]">
                  <Icon className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold">{path.title}</h1>
              </div>
              <p className="text-white/60">{path.description}</p>
            </div>

            <div className="space-y-4">
              {path.sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial={false}
                  animate={{ height: expandedSection === section.id ? 'auto' : 'auto' }}
                  className="rounded-xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5"
                  >
                    <div>
                      <h3 className="font-medium">{section.title}</h3>
                      <p className="text-sm text-white/40">{section.topics.length} topics</p>
                    </div>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-white/40 transition-transform',
                        expandedSection === section.id && 'transform rotate-180'
                      )}
                    />
                  </button>

                  {expandedSection === section.id && (
                    <div className="border-t border-white/10">
                      {section.topics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => setSelectedTopic(topic.id)}
                          className={cn(
                            'w-full px-4 py-3 text-left hover:bg-white/5',
                            selectedTopic === topic.id && 'bg-white/5 text-[#fcba28]'
                          )}
                        >
                          {topic.title}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="col-span-8">
          {currentTopic ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">{currentTopic.title}</h2>
                <p className="text-white/60">{currentTopic.description}</p>
              </div>

              <div className="prose prose-invert max-w-none">
                {currentTopic.content}
              </div>

              {currentTopic.examples && currentTopic.examples.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Examples</h3>
                  <div className="space-y-4">
                    {currentTopic.examples.map((example, index) => (
                      <pre key={index} className="p-4 rounded-lg bg-white/5 overflow-x-auto">
                        <code>{example}</code>
                      </pre>
                    ))}
                  </div>
                </div>
              )}

              {currentTopic.exercises && currentTopic.exercises.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Practice Exercises</h3>
                  <div className="space-y-6">
                    {currentTopic.exercises.map((exercise, index) => (
                      <div key={index} className="p-6 rounded-lg bg-white/5">
                        <h4 className="font-medium mb-4">{exercise.question}</h4>
                        <Button
                          variant="outline"
                          onClick={() => window.alert(exercise.answer)}
                        >
                          Show Solution
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-white/40">
              <h2 className="text-2xl font-semibold mb-2">Select a topic to start learning</h2>
              <p>Choose a topic from the sidebar to view its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
