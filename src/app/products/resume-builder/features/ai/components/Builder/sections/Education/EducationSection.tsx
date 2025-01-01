"use client";

import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EducationItem {
  degree: string;
  field: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string;
}

interface EducationSectionProps {
  data: EducationItem[];
  onChange: (data: EducationItem[]) => void;
}

const degreeTypes = [
  "Bachelor's Degree",
  "Master's Degree",
  "Ph.D.",
  "Associate's Degree",
  "High School Diploma",
  "Certificate",
  "Diploma",
  "Other"
];

export function EducationSection({ data = [], onChange }: EducationSectionProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        degree: '',
        field: '',
        school: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: '',
        achievements: ''
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof EducationItem, value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      {data.map((education, index) => (
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
              <Label htmlFor={`degree-${index}`} className="text-white">Degree</Label>
              <Select
                value={education.degree}
                onValueChange={(value) => handleChange(index, 'degree', value)}
              >
                <SelectTrigger className="bg-[#141C23] border-[#2A3441] text-white">
                  <SelectValue placeholder="Select degree type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A2430] border-[#2A3441]">
                  {degreeTypes.map((type) => (
                    <SelectItem 
                      key={type} 
                      value={type}
                      className="text-white hover:bg-[#2A3441]"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`field-${index}`} className="text-white">Field of Study</Label>
              <Input
                id={`field-${index}`}
                value={education.field}
                onChange={(e) => handleChange(index, 'field', e.target.value)}
                placeholder="e.g., Computer Science"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor={`school-${index}`} className="text-white">School</Label>
              <Input
                id={`school-${index}`}
                value={education.school}
                onChange={(e) => handleChange(index, 'school', e.target.value)}
                placeholder="School name"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`location-${index}`} className="text-white">Location</Label>
              <Input
                id={`location-${index}`}
                value={education.location}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                placeholder="City, Country"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`} className="text-white">Start Date</Label>
              <Input
                id={`startDate-${index}`}
                value={education.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="MM/YYYY"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`} className="text-white">End Date</Label>
              <Input
                id={`endDate-${index}`}
                value={education.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="MM/YYYY or Expected MM/YYYY"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`gpa-${index}`} className="text-white">GPA (Optional)</Label>
              <Input
                id={`gpa-${index}`}
                value={education.gpa}
                onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                placeholder="e.g., 3.8/4.0"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor={`achievements-${index}`} className="text-white">
              Achievements & Activities (Optional)
            </Label>
            <Textarea
              id={`achievements-${index}`}
              value={education.achievements}
              onChange={(e) => handleChange(index, 'achievements', e.target.value)}
              placeholder="List relevant coursework, honors, awards, activities..."
              className="h-32 bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
            />
          </div>
        </Card>
      ))}

      <Button
        onClick={handleAdd}
        className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white border border-[#2A3441]"
      >
        <GraduationCap className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
