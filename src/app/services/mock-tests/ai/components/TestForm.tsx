"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaSpinner } from 'react-icons/fa';
import { topics, difficulties } from '../constants';
import { Topic, Difficulty } from '../types';

interface TestFormProps {
  onStartTest: (topic: Topic, difficulty: Difficulty) => void;
  isLoading: boolean;
}

export default function TestForm({ onStartTest, isLoading }: TestFormProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const handleStartTest = () => {
    if (selectedTopic && selectedDifficulty) {
      onStartTest(selectedTopic, selectedDifficulty);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Select Topic</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className={`p-4 rounded-xl text-left transition-all duration-300 ${
                selectedTopic?.id === topic.id
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="text-2xl mb-2 block">{topic.icon}</span>
              <span className="font-medium">{topic.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Select Experience Level</h3>
        <div className="grid grid-cols-3 gap-4">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.id}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                selectedDifficulty?.id === difficulty.id
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className={`font-medium ${difficulty.color}`}>
                {difficulty.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleStartTest}
          disabled={isLoading || !selectedTopic || !selectedDifficulty}
          className={`px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Loading...
            </>
          ) : (
            <>
              <FaRobot /> Start Interview
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
