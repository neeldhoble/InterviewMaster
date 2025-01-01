"use client";

import React, { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SkillsSectionProps {
  data: string[];
  onChange: (data: string[]) => void;
}

const skillCategories = {
  'Technical': [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript',
    'AWS', 'Docker', 'Kubernetes', 'SQL', 'NoSQL',
    'Machine Learning', 'Data Analysis', 'CI/CD', 'Git'
  ],
  'Soft Skills': [
    'Leadership', 'Communication', 'Problem Solving',
    'Team Management', 'Project Management', 'Agile',
    'Time Management', 'Collaboration', 'Adaptability'
  ],
  'Design': [
    'UI/UX', 'Figma', 'Adobe XD', 'Photoshop',
    'Illustrator', 'Responsive Design', 'Web Design'
  ]
};

export function SkillsSection({ data = [], onChange }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof skillCategories | null>(null);

  const handleAddSkill = () => {
    if (newSkill && !data.includes(newSkill)) {
      onChange([...data, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    onChange(data.filter((s) => s !== skill));
  };

  const handleSuggestedSkill = (skill: string) => {
    if (!data.includes(skill)) {
      onChange([...data, skill]);
    }
  };

  const handleAISuggestions = async () => {
    // TODO: Implement AI suggestions based on existing skills
    const suggestedSkills = [
      'System Design',
      'REST APIs',
      'Microservices',
      'Cloud Computing'
    ];

    const newSkills = [...data];
    suggestedSkills.forEach(skill => {
      if (!newSkills.includes(skill)) {
        newSkills.push(skill);
      }
    });
    onChange(newSkills);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-[#1A2430]/60 border-[#2A3441]">
        {/* Current Skills */}
        <div className="mb-6">
          <Label className="text-white mb-3 block">Your Skills</Label>
          <div className="flex flex-wrap gap-2">
            {data.map((skill) => (
              <Badge
                key={skill}
                className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 cursor-pointer group"
                onClick={() => handleRemoveSkill(skill)}
              >
                {skill}
                <X className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Badge>
            ))}
          </div>
        </div>

        {/* Add New Skill */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill..."
              className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <Button
              onClick={handleAddSkill}
              className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Button
            onClick={handleAISuggestions}
            className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Get AI Suggestions
          </Button>
        </div>
      </Card>

      {/* Skill Categories */}
      <div className="space-y-6">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <Card key={category} className="p-6 bg-[#1A2430]/60 border-[#2A3441]">
            <Label className="text-white mb-3 block">{category}</Label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant={data.includes(skill) ? "default" : "secondary"}
                  className={data.includes(skill) 
                    ? "bg-blue-500/20 text-blue-300 cursor-not-allowed"
                    : "bg-[#141C23] text-gray-400 hover:bg-blue-500/20 hover:text-blue-300 cursor-pointer"
                  }
                  onClick={() => !data.includes(skill) && handleSuggestedSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
