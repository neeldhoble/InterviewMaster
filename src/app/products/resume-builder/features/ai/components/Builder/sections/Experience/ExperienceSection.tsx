"use client";

import React from 'react';
import { Plus, Trash2, Briefcase, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

interface ExperienceSectionProps {
  data: ExperienceItem[];
  onChange: (data: ExperienceItem[]) => void;
}

export function ExperienceSection({ data = [], onChange }: ExperienceSectionProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        highlights: []
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof ExperienceItem, value: any) => {
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
• Led cross-functional team of 8 engineers, increasing productivity by 35%
• Implemented CI/CD pipeline, reducing deployment time by 60%
• Developed scalable microservices architecture handling 1M+ daily requests
• Mentored 5 junior developers, all promoted within 12 months
• Reduced system downtime by 75% through improved monitoring`;

      handleChange(index, 'description', enhancedDescription);
    } catch (error) {
      console.error('Error enhancing experience description:', error);
    }
  };

  return (
    <div className="space-y-6">
      {data.map((experience, index) => (
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
              <Label htmlFor={`title-${index}`} className="text-white">Job Title</Label>
              <Input
                id={`title-${index}`}
                value={experience.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                placeholder="e.g., Senior Software Engineer"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`company-${index}`} className="text-white">Company</Label>
              <Input
                id={`company-${index}`}
                value={experience.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                placeholder="Company name"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor={`location-${index}`} className="text-white">Location</Label>
              <Input
                id={`location-${index}`}
                value={experience.location}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                placeholder="City, Country"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`} className="text-white">Start Date</Label>
              <Input
                id={`startDate-${index}`}
                value={experience.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="MM/YYYY"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`} className="text-white">End Date</Label>
              <Input
                id={`endDate-${index}`}
                value={experience.endDate}
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
              value={experience.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="Describe your role, responsibilities, and key achievements..."
              className="h-48 bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
            />
          </div>
        </Card>
      ))}

      <Button
        onClick={handleAdd}
        className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white border border-[#2A3441]"
      >
        <Briefcase className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
