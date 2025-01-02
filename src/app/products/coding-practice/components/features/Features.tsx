'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, CheckCircle, Timer, Database, GitBranch, Terminal, Zap, Users, Brain, Target, Trophy, Sparkles, BookOpen, MessageSquare, LineChart, Rocket } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Learning',
      description: 'Get personalized guidance, code reviews, and optimization suggestions from our AI assistant.'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Learning Paths',
      description: 'Follow structured learning paths tailored to your skill level and interview goals.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Mock Interviews',
      description: 'Practice with our AI interviewer that simulates real technical interviews.'
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Multi-Language Support',
      description: 'Code in Python, JavaScript, Java, C++, and more with language-specific optimizations.'
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: 'Advanced Code Editor',
      description: 'Feature-rich editor with syntax highlighting, auto-completion, and debugging tools.'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Weekly Contests',
      description: 'Participate in coding competitions and climb the global leaderboard.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Smart Assessment',
      description: 'Get detailed feedback on code quality, complexity, and performance.'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Community Hub',
      description: 'Discuss solutions, share knowledge, and learn from peer developers.'
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: 'Progress Analytics',
      description: 'Track your improvement with detailed performance metrics and insights.'
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Company Questions',
      description: 'Practice with real interview questions from top tech companies.'
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Interview Prep',
      description: 'Comprehensive guides and tips for technical interview success.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real-time Collaboration',
      description: 'Work on problems together with peers or mentors in real-time.'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#ff8f71]">
              Powerful Features
            </span>
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Everything you need to master coding interviews and advance your programming skills
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-[#fcba28]/20 flex items-center justify-center mb-4 group-hover:bg-[#fcba28]/30 transition-colors">
                {React.cloneElement(feature.icon, { className: 'w-6 h-6 text-[#fcba28]' })}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
