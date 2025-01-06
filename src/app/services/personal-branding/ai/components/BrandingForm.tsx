"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTimes } from 'react-icons/fa';
import type { BrandingFormData } from '../hooks/usePersonalBranding';

interface BrandingFormProps {
  onSubmit: (data: BrandingFormData) => void;
}

export const BrandingForm = ({ onSubmit }: BrandingFormProps) => {
  const [formData, setFormData] = useState<BrandingFormData>({
    name: '',
    title: '',
    industry: '',
    experience: '',
    linkedin: '',
    twitter: '',
    github: '',
    bio: '',
    goals: [''],
    targetAudience: '',
    uniqueValue: '',
    interests: ['']
  });

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Marketing',
    'Design',
    'Consulting',
    'E-commerce',
    'Real Estate',
    'Entertainment',
    'Other'
  ];

  const experienceLevels = [
    '0-2 years',
    '3-5 years',
    '6-10 years',
    '10+ years'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (
    index: number,
    value: string,
    field: 'goals' | 'interests'
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const addArrayItem = (field: 'goals' | 'interests') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'goals' | 'interests') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Professional Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
              placeholder="Senior Software Engineer"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Industry *</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
              required
            >
              <option value="">Select Industry</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Experience Level *</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
              required
            >
              <option value="">Select Experience</option>
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Twitter Profile</label>
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
              placeholder="https://twitter.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">GitHub Profile</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
              placeholder="https://github.com/username"
            />
          </div>
        </div>
      </div>

      {/* Professional Profile */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Professional Bio *</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28] min-h-[120px]"
            placeholder="Write a brief description of your professional background and expertise..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Target Audience *</label>
          <input
            type="text"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
            placeholder="Who do you want to reach with your personal brand?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Unique Value Proposition *</label>
          <input
            type="text"
            name="uniqueValue"
            value={formData.uniqueValue}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
            placeholder="What makes you unique in your field?"
            required
          />
        </div>

        {/* Career Goals */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Career Goals *</label>
            <button
              type="button"
              onClick={() => addArrayItem('goals')}
              className="text-[#fcba28] hover:text-[#fcba28]/80 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {formData.goals.map((goal, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => handleArrayInputChange(index, e.target.value, 'goals')}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                  placeholder="Enter a career goal"
                  required
                />
                {formData.goals.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'goals')}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Professional Interests */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Professional Interests *</label>
            <button
              type="button"
              onClick={() => addArrayItem('interests')}
              className="text-[#fcba28] hover:text-[#fcba28]/80 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {formData.interests.map((interest, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={interest}
                  onChange={(e) => handleArrayInputChange(index, e.target.value, 'interests')}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                  placeholder="Enter a professional interest"
                  required
                />
                {formData.interests.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'interests')}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button
          type="submit"
          className="px-8 py-3 bg-[#fcba28] text-black rounded-xl font-semibold hover:bg-[#fcba28]/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Analyze Personal Brand
        </motion.button>
      </div>
    </motion.form>
  );
};
