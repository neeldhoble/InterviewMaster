'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, CheckCircle, Timer, Database, GitBranch, Terminal, Zap, Users } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Multiple Languages',
      description: 'Practice in Python, JavaScript, Java, and more. Choose your preferred programming language.'
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: 'Interactive Console',
      description: 'Run and debug your code in real-time with our built-in interactive console.'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Test Cases',
      description: 'Verify your solution with comprehensive test cases and edge case scenarios.'
    },
    {
      icon: <Timer className="w-6 h-6" />,
      title: 'Time Tracking',
      description: 'Monitor your solving speed and efficiency with built-in time tracking.'
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Problem Database',
      description: 'Access a vast collection of coding challenges from easy to hard difficulty.'
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: 'Version Control',
      description: 'Save and track your solution history with integrated version control.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Performance Analysis',
      description: 'Get detailed analysis of your code performance and complexity.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Solutions',
      description: 'Learn from others by viewing and comparing different approaches.'
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Everything You Need to Excel
          </h2>
          <p className="text-white/60">
            Our platform provides all the tools and features you need to prepare for technical interviews and improve your coding skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-[#fcba28]/20 flex items-center justify-center mb-4">
                {React.cloneElement(feature.icon, { className: 'w-6 h-6 text-[#fcba28]' })}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
