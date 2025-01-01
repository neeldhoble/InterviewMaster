"use client";

import React from 'react';
import { Plus, Trash2, Languages } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LanguageItem {
  language: string;
  proficiency: string;
  certification?: string;
}

interface LanguagesSectionProps {
  data: LanguageItem[];
  onChange: (data: LanguageItem[]) => void;
}

const proficiencyLevels = [
  { value: 'native', label: 'Native/Bilingual' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'basic', label: 'Basic' }
];

const commonLanguages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
  'Korean', 'Arabic', 'Russian', 'Portuguese', 'Italian', 'Hindi'
];

export function LanguagesSection({ data = [], onChange }: LanguagesSectionProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        language: '',
        proficiency: '',
        certification: ''
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof LanguageItem, value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    onChange(newData);
  };

  const handleQuickAdd = (lang: string) => {
    if (!data.some(item => item.language === lang)) {
      onChange([
        ...data,
        {
          language: lang,
          proficiency: '',
          certification: ''
        }
      ]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Add Common Languages */}
      <Card className="p-6 bg-[#1A2430]/60 border-[#2A3441]">
        <Label className="text-white mb-3 block">Common Languages</Label>
        <div className="flex flex-wrap gap-2">
          {commonLanguages.map((lang) => (
            <Button
              key={lang}
              variant="outline"
              className={`
                ${data.some(item => item.language === lang)
                  ? 'bg-blue-500/20 text-blue-300 cursor-not-allowed'
                  : 'bg-[#141C23] text-gray-300 hover:bg-blue-500/20 hover:text-blue-300'}
                border-[#2A3441]
              `}
              onClick={() => handleQuickAdd(lang)}
              disabled={data.some(item => item.language === lang)}
            >
              <Plus className="w-4 h-4 mr-2" />
              {lang}
            </Button>
          ))}
        </div>
      </Card>

      {/* Language List */}
      {data.map((lang, index) => (
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
              <Label htmlFor={`language-${index}`} className="text-white">Language</Label>
              <Input
                id={`language-${index}`}
                value={lang.language}
                onChange={(e) => handleChange(index, 'language', e.target.value)}
                placeholder="Enter language"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`proficiency-${index}`} className="text-white">Proficiency Level</Label>
              <Select
                value={lang.proficiency}
                onValueChange={(value) => handleChange(index, 'proficiency', value)}
              >
                <SelectTrigger className="bg-[#141C23] border-[#2A3441] text-white">
                  <SelectValue placeholder="Select proficiency level" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A2430] border-[#2A3441]">
                  {proficiencyLevels.map(({ value, label }) => (
                    <SelectItem 
                      key={value} 
                      value={value}
                      className="text-white hover:bg-[#2A3441]"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor={`certification-${index}`} className="text-white">
              Certification (Optional)
            </Label>
            <Input
              id={`certification-${index}`}
              value={lang.certification}
              onChange={(e) => handleChange(index, 'certification', e.target.value)}
              placeholder="e.g., DELF B2, JLPT N2, TOEFL"
              className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
            />
          </div>
        </Card>
      ))}

      <Button
        onClick={handleAdd}
        className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white border border-[#2A3441]"
      >
        <Languages className="w-4 h-4 mr-2" />
        Add Language
      </Button>
    </div>
  );
}
