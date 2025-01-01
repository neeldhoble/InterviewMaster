"use client";

import React from 'react';
import { Plus, Trash2, Trophy, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface AwardItem {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

interface AwardsSectionProps {
  data: AwardItem[];
  onChange: (data: AwardItem[]) => void;
}

export function AwardsSection({ data = [], onChange }: AwardsSectionProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        title: '',
        issuer: '',
        date: '',
        description: ''
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof AwardItem, value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    onChange(newData);
  };

  const handleAIEnhance = async (index: number) => {
    const award = data[index];
    try {
      // Mock AI enhancement
      const enhancedDescription = `${award.description}

Impact:
• Selected from over 100 candidates
• Recognition for exceptional performance
• Demonstrated leadership and innovation
• Increased team productivity by 40%
• Created lasting impact on organization`;

      handleChange(index, 'description', enhancedDescription);
    } catch (error) {
      console.error('Error enhancing award description:', error);
    }
  };

  return (
    <div className="space-y-6">
      {data.map((award, index) => (
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
              <Label htmlFor={`title-${index}`} className="text-white">Award Title</Label>
              <Input
                id={`title-${index}`}
                value={award.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                placeholder="e.g., Employee of the Year"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`issuer-${index}`} className="text-white">Issuing Organization</Label>
              <Input
                id={`issuer-${index}`}
                value={award.issuer}
                onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                placeholder="e.g., Company Name"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor={`date-${index}`} className="text-white">Date Received</Label>
            <Input
              id={`date-${index}`}
              value={award.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
              placeholder="MM/YYYY"
              className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
            />
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor={`description-${index}`} className="text-white">Description</Label>
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
              value={award.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="Describe the significance of this award and why you received it..."
              className="h-32 bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
            />
          </div>
        </Card>
      ))}

      <Button
        onClick={handleAdd}
        className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white border border-[#2A3441]"
      >
        <Trophy className="w-4 h-4 mr-2" />
        Add Award
      </Button>
    </div>
  );
}
