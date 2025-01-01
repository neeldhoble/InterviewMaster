"use client";

import React from 'react';
import { Plus, Trash2, Heart, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface VolunteerItem {
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  impact: string;
  cause: string;
}

interface VolunteerSectionProps {
  data: VolunteerItem[];
  onChange: (data: VolunteerItem[]) => void;
}

const causes = [
  'Education', 'Healthcare', 'Environment', 'Animal Welfare',
  'Poverty Alleviation', 'Community Development', 'Youth Empowerment',
  'Elderly Care', 'Disaster Relief', 'Arts & Culture'
];

export function VolunteerSection({ data = [], onChange }: VolunteerSectionProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        organization: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        impact: '',
        cause: ''
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof VolunteerItem, value: string) => {
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

Key Contributions:
• Led team of 15 volunteers in community outreach
• Increased program participation by 40%
• Developed sustainable initiatives
• Created lasting community partnerships
• Mentored new volunteers and improved retention`;

      handleChange(index, 'description', enhancedDescription);
    } catch (error) {
      console.error('Error enhancing description:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Add Causes */}
      <Card className="p-6 bg-[#1A2430]/60 border-[#2A3441]">
        <Label className="text-white mb-3 block">Common Causes</Label>
        <div className="flex flex-wrap gap-2">
          {causes.map((cause) => (
            <Button
              key={cause}
              variant="outline"
              className="bg-[#141C23] text-gray-300 hover:bg-blue-500/20 hover:text-blue-300 border-[#2A3441]"
              onClick={() => {
                const lastIndex = data.length - 1;
                if (lastIndex >= 0) {
                  handleChange(lastIndex, 'cause', cause);
                }
              }}
            >
              <Heart className="w-4 h-4 mr-2" />
              {cause}
            </Button>
          ))}
        </div>
      </Card>

      {data.map((volunteer, index) => (
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
              <Label htmlFor={`organization-${index}`} className="text-white">Organization</Label>
              <Input
                id={`organization-${index}`}
                value={volunteer.organization}
                onChange={(e) => handleChange(index, 'organization', e.target.value)}
                placeholder="Organization name"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`role-${index}`} className="text-white">Role</Label>
              <Input
                id={`role-${index}`}
                value={volunteer.role}
                onChange={(e) => handleChange(index, 'role', e.target.value)}
                placeholder="Your role or position"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor={`location-${index}`} className="text-white">Location</Label>
              <Input
                id={`location-${index}`}
                value={volunteer.location}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                placeholder="City, Country"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`} className="text-white">Start Date</Label>
              <Input
                id={`startDate-${index}`}
                value={volunteer.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="MM/YYYY"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`} className="text-white">End Date</Label>
              <Input
                id={`endDate-${index}`}
                value={volunteer.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="MM/YYYY or Present"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
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
              value={volunteer.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              className="h-32 bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
            />
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor={`impact-${index}`} className="text-white">Impact</Label>
            <Textarea
              id={`impact-${index}`}
              value={volunteer.impact}
              onChange={(e) => handleChange(index, 'impact', e.target.value)}
              placeholder="Describe the impact of your volunteer work..."
              className="h-24 bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
            />
          </div>
        </Card>
      ))}

      <Button
        onClick={handleAdd}
        className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white border border-[#2A3441]"
      >
        <Heart className="w-4 h-4 mr-2" />
        Add Volunteer Experience
      </Button>
    </div>
  );
}
