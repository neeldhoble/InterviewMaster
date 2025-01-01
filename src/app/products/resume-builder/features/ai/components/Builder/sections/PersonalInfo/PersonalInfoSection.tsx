"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function PersonalInfoSection({ data, onChange }: PersonalInfoSectionProps) {
  const handleChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Full Name</Label>
          <Input
            id="name"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Doe"
            className="bg-[#1A2430] border-[#2A3441] text-white placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white">Professional Title</Label>
          <Input
            id="title"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Software Engineer"
            className="bg-[#1A2430] border-[#2A3441] text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            className="bg-[#1A2430] border-[#2A3441] text-white placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white">Phone</Label>
          <Input
            id="phone"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="bg-[#1A2430] border-[#2A3441] text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-white">Location</Label>
        <Input
          id="location"
          value={data.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="City, State, Country"
          className="bg-[#1A2430] border-[#2A3441] text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className="text-white">Professional Summary</Label>
        <textarea
          id="summary"
          value={data.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Brief overview of your professional background and career goals..."
          className="w-full h-32 px-3 py-2 bg-[#1A2430] border-[#2A3441] rounded-md text-white placeholder:text-gray-400 resize-none"
        />
      </div>
    </div>
  );
}
