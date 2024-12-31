'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, Star, Clock, ArrowRight, Tag, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { problems, categories, getDifficultyColor } from '../../data/problems';

export function ProblemsList() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredProblems = React.useMemo(() => {
    return problems.filter(problem => {
      const matchesCategory = !selectedCategory || problem.category === selectedCategory;
      const matchesDifficulty = !difficultyFilter || problem.difficulty === difficultyFilter;
      const matchesSearch = !searchQuery || 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, difficultyFilter, searchQuery]);

  const problemsByCategory = React.useMemo(() => {
    const grouped = new Map<string, typeof problems>();
    categories.forEach(category => {
      const categoryProblems = filteredProblems.filter(p => p.category === category);
      if (categoryProblems.length > 0) {
        grouped.set(category, categoryProblems);
      }
    });
    return grouped;
  }, [filteredProblems]);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Practice Problems</h2>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
              />
            </div>
            <select
              value={difficultyFilter || ''}
              onChange={(e) => setDifficultyFilter(e.target.value || null)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Problems List */}
          <div className="space-y-6">
            {Array.from(problemsByCategory.entries()).map(([category, problems]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                  className="w-full px-6 py-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold">{category}</h3>
                    <span className="px-3 py-1 rounded-full text-sm bg-white/10">
                      {problems.length} problems
                    </span>
                  </div>
                  {expandedCategory === category ? (
                    <ChevronUp className="w-5 h-5 text-white/60" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/60" />
                  )}
                </button>

                {expandedCategory === category && (
                  <div className="divide-y divide-white/10">
                    {problems.map((problem) => (
                      <Link
                        key={problem.id}
                        href={`/products/coding-practice/${problem.id}`}
                        className="block p-6 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center gap-4 mb-2">
                                <h3 className="text-xl font-semibold text-white">
                                  {problem.title}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(problem.difficulty)}`}>
                                  {problem.difficulty}
                                </span>
                              </div>
                              <p className="text-white/60 max-w-2xl">{problem.description}</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {problem.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-3 py-1 rounded-full text-sm bg-[#fcba28]/10 text-[#fcba28]"
                                >
                                  <Tag className="w-3 h-3 inline-block mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-6 text-sm text-white/40">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                {problem.likes.toLocaleString()} likes
                              </div>
                              <div className="flex items-center gap-1">
                                <Code2 className="w-4 h-4" />
                                {problem.submissions.toLocaleString()} submissions
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {problem.timeLimit}
                              </div>
                              <div>
                                Success Rate: {problem.successRate}%
                              </div>
                            </div>
                          </div>

                          <button className="p-2 rounded-lg bg-[#fcba28]/20 text-[#fcba28] hover:bg-[#fcba28]/30 transition-colors">
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
