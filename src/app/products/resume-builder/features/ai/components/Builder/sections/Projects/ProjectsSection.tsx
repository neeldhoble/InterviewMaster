"use client";

import React from 'react';
import { Plus, Trash2, FolderGit2, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface ProjectItem {
  title: string;
  technologies: string;
  startDate: string;
  endDate: string;
  description: string;
  link?: string;
}

interface ProjectsSectionProps {
  data: ProjectItem[];
  onChange: (data: ProjectItem[]) => void;
}

export function ProjectsSection({ data = [], onChange }: ProjectsSectionProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        title: '',
        technologies: '',
        startDate: '',
        endDate: '',
        description: '',
        link: ''
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof ProjectItem, value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    onChange(newData);
  };

  const handleAIEnhance = async (index: number) => {
    try {
      // Mock AI enhancement
      const enhancedDescription = `${data[index].description}

Key Achievements:
• Architected and implemented scalable solution handling 100K+ daily users
• Reduced loading time by 60% through performance optimizations
• Implemented automated testing, achieving 90% code coverage
• Led team of 3 developers to successful project completion
• Integrated CI/CD pipeline reducing deployment time by 70%`;

      handleChange(index, 'description', enhancedDescription);
    } catch (error) {
      console.error('Error enhancing project description:', error);
    }
  };

  return (
    <div className="space-y-6">
      {data.map((project, index) => (
        <Card key={index} className="p-6 bg-[#1A2430]/60 border-[#2A3441] relative group">
          <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleRemove(index)}
              className="rounded-full w-8 h-8 bg-red-500/80 hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`title-${index}`} className="text-white">Project Title</Label>
              <Input
                id={`title-${index}`}
                value={project.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                placeholder="Project name"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`technologies-${index}`} className="text-white">Technologies Used</Label>
              <Input
                id={`technologies-${index}`}
                value={project.technologies}
                onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                placeholder="e.g., React, Node.js, TypeScript"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor={`link-${index}`} className="text-white">Project Link</Label>
              <Input
                id={`link-${index}`}
                value={project.link}
                onChange={(e) => handleChange(index, 'link', e.target.value)}
                placeholder="GitHub or live demo URL"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`} className="text-white">Start Date</Label>
              <Input
                id={`startDate-${index}`}
                value={project.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="MM/YYYY"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`} className="text-white">End Date</Label>
              <Input
                id={`endDate-${index}`}
                value={project.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="MM/YYYY or Present"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor={`description-${index}`} className="text-white">Description & Achievements</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAIEnhance(index)}
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Enhance with AI
              </Button>
            </div>
            <Textarea
              id={`description-${index}`}
              value={project.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="Describe the project, your role, and key achievements..."
              className="h-48 bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
            />
          </div>
        </Card>
      ))}

      <Button
        onClick={handleAdd}
        className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white border border-[#2A3441]"
      >
        <FolderGit2 className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
