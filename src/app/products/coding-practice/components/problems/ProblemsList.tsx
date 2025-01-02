'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, Star, Clock, ArrowRight, Tag, ChevronDown, ChevronUp, Filter, Building2, Trophy, Zap, BookOpen, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { problems, categories, companies, getDifficultyColor } from '../../data/problems';

export function ProblemsList() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = React.useState<string>('');
  const [companyFilter, setCompanyFilter] = React.useState<string>('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');
  const [sortBy, setSortBy] = React.useState<'popularity' | 'difficulty' | 'acceptance'>('popularity');

  const filteredProblems = React.useMemo(() => {
    return problems.filter(problem => {
      const matchesCategory = !selectedCategory || problem.category === selectedCategory;
      const matchesDifficulty = !difficultyFilter || problem.difficulty === difficultyFilter;
      const matchesCompany = !companyFilter || problem.companies?.includes(companyFilter);
      const matchesSearch = !searchQuery || 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (activeTab === 'all') return matchesCategory && matchesDifficulty && matchesCompany && matchesSearch;
      if (activeTab === 'solved') return problem.solved && matchesCategory && matchesDifficulty && matchesCompany && matchesSearch;
      if (activeTab === 'todo') return problem.bookmarked && matchesCategory && matchesDifficulty && matchesCompany && matchesSearch;
      if (activeTab === 'contests') return problem.contestProblem && matchesCategory && matchesDifficulty && matchesCompany && matchesSearch;
      return false;
    }).sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      if (sortBy === 'difficulty') return getDifficultyValue(a.difficulty) - getDifficultyValue(b.difficulty);
      return b.acceptanceRate - a.acceptanceRate;
    });
  }, [selectedCategory, difficultyFilter, companyFilter, searchQuery, activeTab, sortBy]);

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

  const getDifficultyValue = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 1;
      case 'Medium': return 2;
      case 'Hard': return 3;
      default: return 0;
    }
  };

  const difficultyOptions = [
    { value: '', label: 'All Difficulties' },
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ];

  const companyOptions = [
    { value: '', label: 'All Companies' },
    ...companies.map(company => ({ value: company, label: company })),
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'acceptance', label: 'Acceptance Rate' },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#ff8f71]">
                  Coding Problems
                </span>
              </h2>
              <p className="text-white/60">Master algorithms and ace your technical interviews</p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setActiveTab('contests')}
              >
                <Trophy className="w-4 h-4" />
                Weekly Contest
              </Button>
              <Button
                className="gap-2 bg-gradient-to-r from-[#fcba28] to-[#ff8f71] text-black"
                onClick={() => setActiveTab('recommended')}
              >
                <Zap className="w-4 h-4" />
                Get Recommendations
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all" className="gap-2">
                <BookOpen className="w-4 h-4" />
                All Problems
              </TabsTrigger>
              <TabsTrigger value="solved" className="gap-2">
                <Target className="w-4 h-4" />
                Solved
              </TabsTrigger>
              <TabsTrigger value="todo" className="gap-2">
                <Star className="w-4 h-4" />
                To Do
              </TabsTrigger>
              <TabsTrigger value="contests" className="gap-2">
                <Trophy className="w-4 h-4" />
                Contests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex-1 min-w-[300px]">
                  <Input
                    type="text"
                    placeholder="Search problems by name, tag, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  options={difficultyOptions}
                  placeholder="Difficulty"
                  className="w-[180px]"
                />
                <Select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  options={companyOptions}
                  placeholder="Company"
                  className="w-[180px]"
                />
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'popularity' | 'difficulty' | 'acceptance')}
                  options={sortOptions}
                  placeholder="Sort by"
                  className="w-[180px]"
                />
              </div>

              {Array.from(problemsByCategory.entries()).map(([category, categoryProblems]) => (
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
                      <Badge variant="secondary">
                        {categoryProblems.length} problems
                      </Badge>
                    </div>
                    {expandedCategory === category ? (
                      <ChevronUp className="w-5 h-5 text-white/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/60" />
                    )}
                  </button>

                  {expandedCategory === category && (
                    <div className="divide-y divide-white/10">
                      {categoryProblems.map((problem) => (
                        <Link
                          key={problem.id}
                          href={`/products/coding-practice/${problem.id}`}
                          className="block p-6 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h4 className="font-semibold text-white hover:text-[#fcba28] transition-colors">
                                  {problem.title}
                                </h4>
                                {problem.premium && (
                                  <Badge variant="premium">
                                    Premium
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-white/60">
                                <Badge
                                  variant="outline"
                                  className={getDifficultyColor(problem.difficulty)}
                                >
                                  {problem.difficulty}
                                </Badge>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {problem.acceptanceRate}% acceptance
                                </span>
                                {problem.companies && (
                                  <span className="flex items-center gap-1">
                                    <Building2 className="w-4 h-4" />
                                    {problem.companies.join(', ')}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {problem.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-white/40" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="solved">
              <div className="text-center py-12 text-white/60">
                <Target className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No solved problems yet</h3>
                <p>Start solving problems to track your progress</p>
              </div>
            </TabsContent>

            <TabsContent value="todo">
              <div className="text-center py-12 text-white/60">
                <Star className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your to-do list is empty</h3>
                <p>Bookmark problems to add them to your to-do list</p>
              </div>
            </TabsContent>

            <TabsContent value="contests">
              <div className="text-center py-12 text-white/60">
                <Trophy className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No active contests</h3>
                <p>Check back later for new contests</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
