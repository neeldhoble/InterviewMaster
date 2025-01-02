'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Problem } from '../../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Code2, MessageSquare, TestTube2, Trophy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ProblemInterfaceProps {
  problem: Problem;
  onLanguageChange: (language: string) => void;
  onSubmit: () => void;
}

export function ProblemInterface({ problem, onLanguageChange, onSubmit }: ProblemInterfaceProps) {
  const [activeTab, setActiveTab] = React.useState('description');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500/10 text-green-500';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'hard':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <Card className="h-full overflow-hidden border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{problem.title}</h2>
          <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
        </div>
        <Button onClick={onSubmit} size="sm">
          Submit Solution
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100%-3.5rem)]">
        <TabsList className="h-10 w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="description"
            className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Description
          </TabsTrigger>
          <TabsTrigger
            value="hints"
            className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <Code2 className="mr-2 h-4 w-4" />
            Hints
          </TabsTrigger>
          <TabsTrigger
            value="solutions"
            className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Solutions
          </TabsTrigger>
          <TabsTrigger
            value="discussions"
            className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Discussions
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100%-2.5rem)] p-4">
          <TabsContent value="description" className="mt-0 border-0 p-0">
            <div className="space-y-4">
              <ReactMarkdown className="prose dark:prose-invert max-w-none">
                {problem.description}
              </ReactMarkdown>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Examples:</h3>
                {problem.examples.map((example, index) => (
                  <Card key={index} className="p-4">
                    <p className="font-mono mb-2">
                      <strong>Input:</strong> {example.input}
                    </p>
                    <p className="font-mono mb-2">
                      <strong>Output:</strong> {example.output}
                    </p>
                    {example.explanation && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Explanation:</strong> {example.explanation}
                      </p>
                    )}
                  </Card>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Constraints:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {constraint}
                    </li>
                  ))}
                </ul>
              </div>

              {problem.companies && problem.companies.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Companies:</h3>
                  <div className="flex flex-wrap gap-2">
                    {problem.companies.map((company) => (
                      <Badge key={company} variant="secondary">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="hints" className="mt-0 border-0 p-0">
            {/* Add hints content */}
          </TabsContent>

          <TabsContent value="solutions" className="mt-0 border-0 p-0">
            {/* Add solutions content */}
          </TabsContent>

          <TabsContent value="discussions" className="mt-0 border-0 p-0">
            {/* Add discussions content */}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
}
