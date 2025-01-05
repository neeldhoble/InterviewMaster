'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SalaryFormProps {
  onSubmit: (data: any) => void;
}

export function SalaryForm({ onSubmit }: SalaryFormProps) {
  const [formData, setFormData] = useState({
    role: '',
    location: '',
    experience: '',
    education: 'Bachelor',
    industry: '',
    skills: [] as string[],
    currentSkill: ''
  });

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Manufacturing',
    'Retail',
    'Education',
    'Consulting'
  ];

  const locations = [
    'San Francisco',
    'New York',
    'Seattle',
    'Boston',
    'Austin',
    'Chicago',
    'Los Angeles',
    'Remote'
  ];

  const educationLevels = [
    'High School',
    'Associate',
    'Bachelor',
    'Master',
    'PhD',
    'MBA'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      experience: Number(formData.experience)
    });
  };

  const addSkill = () => {
    if (formData.currentSkill && !formData.skills.includes(formData.currentSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.currentSkill],
        currentSkill: ''
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role" className="text-white">Job Role</Label>
          <Input
            id="role"
            placeholder="e.g. Software Engineer"
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-white">Industry</Label>
          <select
            id="industry"
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            required
            className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white"
          >
            <option value="">Select Industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white">Location</Label>
          <select
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            required
            className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white"
          >
            <option value="">Select Location</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <Label htmlFor="experience" className="text-white">Years of Experience</Label>
          <Input
            id="experience"
            type="number"
            min="0"
            max="50"
            placeholder="Years"
            value={formData.experience}
            onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
        </div>

        {/* Education */}
        <div className="space-y-2">
          <Label htmlFor="education" className="text-white">Education Level</Label>
          <select
            id="education"
            value={formData.education}
            onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
            required
            className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white"
          >
            {educationLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Skills */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="skills" className="text-white">Skills</Label>
          <div className="flex gap-2">
            <Input
              id="skills"
              placeholder="Add a skill"
              value={formData.currentSkill}
              onChange={(e) => setFormData(prev => ({ ...prev, currentSkill: e.target.value }))}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button
              type="button"
              onClick={addSkill}
              variant="outline"
              className="border-white/10 text-white hover:bg-white/10"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.skills.map(skill => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-[#fcba28]/10 text-[#fcba28] hover:bg-[#fcba28]/20"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:text-white/90"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          className="bg-[#fcba28] hover:bg-[#fcba28]/90 text-black font-semibold px-8 py-2"
        >
          Calculate Salary
        </Button>
      </div>
    </form>
  );
}
