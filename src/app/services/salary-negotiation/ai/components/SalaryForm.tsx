'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ResumeUpload } from './ResumeUpload';
import { TargetCompanyInput } from './TargetCompanyInput';

const locations = [
  // Indian Metro Cities
  { value: 'bangalore', label: 'Bangalore', group: 'Indian Metro Cities', popular: true },
  { value: 'mumbai', label: 'Mumbai', group: 'Indian Metro Cities', popular: true },
  { value: 'delhi-ncr', label: 'Delhi NCR', group: 'Indian Metro Cities', popular: true },
  { value: 'hyderabad', label: 'Hyderabad', group: 'Indian Metro Cities', popular: true },
  { value: 'pune', label: 'Pune', group: 'Indian Metro Cities', popular: true },
  { value: 'chennai', label: 'Chennai', group: 'Indian Metro Cities', popular: true },
  
  // Indian Tier 2 Cities
  { value: 'ahmedabad', label: 'Ahmedabad', group: 'Indian Tier 2 Cities' },
  { value: 'kolkata', label: 'Kolkata', group: 'Indian Tier 2 Cities' },
  { value: 'indore', label: 'Indore', group: 'Indian Tier 2 Cities' },
  { value: 'chandigarh', label: 'Chandigarh', group: 'Indian Tier 2 Cities' },
  { value: 'jaipur', label: 'Jaipur', group: 'Indian Tier 2 Cities' },
  { value: 'kochi', label: 'Kochi', group: 'Indian Tier 2 Cities' },
  { value: 'thiruvananthapuram', label: 'Thiruvananthapuram', group: 'Indian Tier 2 Cities' },
  { value: 'bhubaneswar', label: 'Bhubaneswar', group: 'Indian Tier 2 Cities' },
  { value: 'nagpur', label: 'Nagpur', group: 'Indian Tier 2 Cities' },
  { value: 'coimbatore', label: 'Coimbatore', group: 'Indian Tier 2 Cities' },
  { value: 'lucknow', label: 'Lucknow', group: 'Indian Tier 2 Cities' },
  { value: 'gurgaon', label: 'Gurgaon', group: 'Indian Tier 2 Cities' },
  { value: 'noida', label: 'Noida', group: 'Indian Tier 2 Cities' },
  { value: 'mysore', label: 'Mysore', group: 'Indian Tier 2 Cities' },
  { value: 'vadodara', label: 'Vadodara', group: 'Indian Tier 2 Cities' },
  { value: 'surat', label: 'Surat', group: 'Indian Tier 2 Cities' },
  { value: 'vizag', label: 'Visakhapatnam', group: 'Indian Tier 2 Cities' },
  { value: 'nashik', label: 'Nashik', group: 'Indian Tier 2 Cities' },
  { value: 'trivandrum', label: 'Trivandrum', group: 'Indian Tier 2 Cities' },
  
  // US Cities
  { value: 'san-francisco', label: 'San Francisco', group: 'US Cities', popular: true },
  { value: 'new-york', label: 'New York', group: 'US Cities', popular: true },
  { value: 'seattle', label: 'Seattle', group: 'US Cities', popular: true },
  { value: 'boston', label: 'Boston', group: 'US Cities' },
  { value: 'austin', label: 'Austin', group: 'US Cities' },
  { value: 'chicago', label: 'Chicago', group: 'US Cities' },
  { value: 'los-angeles', label: 'Los Angeles', group: 'US Cities' },
  { value: 'denver', label: 'Denver', group: 'US Cities' },
  { value: 'portland', label: 'Portland', group: 'US Cities' },
  { value: 'san-diego', label: 'San Diego', group: 'US Cities' },
  { value: 'washington-dc', label: 'Washington DC', group: 'US Cities' },
  { value: 'miami', label: 'Miami', group: 'US Cities' },
  { value: 'atlanta', label: 'Atlanta', group: 'US Cities' },
  { value: 'dallas', label: 'Dallas', group: 'US Cities' },
  { value: 'houston', label: 'Houston', group: 'US Cities' },
  { value: 'phoenix', label: 'Phoenix', group: 'US Cities' },
  { value: 'philadelphia', label: 'Philadelphia', group: 'US Cities' },
  { value: 'minneapolis', label: 'Minneapolis', group: 'US Cities' },
  { value: 'detroit', label: 'Detroit', group: 'US Cities' },
  { value: 'salt-lake-city', label: 'Salt Lake City', group: 'US Cities' },
  
  // European Cities
  { value: 'london', label: 'London', group: 'European Cities', popular: true },
  { value: 'berlin', label: 'Berlin', group: 'European Cities', popular: true },
  { value: 'amsterdam', label: 'Amsterdam', group: 'European Cities' },
  { value: 'paris', label: 'Paris', group: 'European Cities' },
  { value: 'dublin', label: 'Dublin', group: 'European Cities' },
  { value: 'munich', label: 'Munich', group: 'European Cities' },
  { value: 'stockholm', label: 'Stockholm', group: 'European Cities' },
  { value: 'zurich', label: 'Zurich', group: 'European Cities' },
  { value: 'copenhagen', label: 'Copenhagen', group: 'European Cities' },
  { value: 'oslo', label: 'Oslo', group: 'European Cities' },
  { value: 'helsinki', label: 'Helsinki', group: 'European Cities' },
  { value: 'barcelona', label: 'Barcelona', group: 'European Cities' },
  { value: 'madrid', label: 'Madrid', group: 'European Cities' },
  { value: 'milan', label: 'Milan', group: 'European Cities' },
  { value: 'vienna', label: 'Vienna', group: 'European Cities' },
  { value: 'warsaw', label: 'Warsaw', group: 'European Cities' },
  
  // APAC Cities
  { value: 'singapore', label: 'Singapore', group: 'APAC Cities', popular: true },
  { value: 'tokyo', label: 'Tokyo', group: 'APAC Cities', popular: true },
  { value: 'hong-kong', label: 'Hong Kong', group: 'APAC Cities' },
  { value: 'sydney', label: 'Sydney', group: 'APAC Cities' },
  { value: 'melbourne', label: 'Melbourne', group: 'APAC Cities' },
  { value: 'seoul', label: 'Seoul', group: 'APAC Cities' },
  { value: 'shanghai', label: 'Shanghai', group: 'APAC Cities' },
  { value: 'beijing', label: 'Beijing', group: 'APAC Cities' },
  { value: 'taipei', label: 'Taipei', group: 'APAC Cities' },
  { value: 'bangkok', label: 'Bangkok', group: 'APAC Cities' },
  { value: 'jakarta', label: 'Jakarta', group: 'APAC Cities' },
  { value: 'kuala-lumpur', label: 'Kuala Lumpur', group: 'APAC Cities' },
  { value: 'manila', label: 'Manila', group: 'APAC Cities' },
  { value: 'brisbane', label: 'Brisbane', group: 'APAC Cities' },
  { value: 'perth', label: 'Perth', group: 'APAC Cities' },
  
  // Remote
  { value: 'remote', label: 'Remote', group: 'Remote', popular: true },
  { value: 'hybrid', label: 'Hybrid', group: 'Remote' },
];

export function SalaryForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    role: '',
    industry: '',
    location: '',
    experience: '',
    education: '',
    skills: [] as string[],
    companySize: '',
    workMode: 'onsite', // onsite, remote, hybrid
    employmentType: 'full-time', // full-time, part-time, contract
    currentSalary: '',
    benefits: [] as string[],
    certifications: [] as string[],
    languages: [] as string[],
    managementLevel: '', // individual, team-lead, manager, director, executive
    projectCount: '',
    teamSize: '',
    targetCompany: null as any,
    resumeAnalysis: null as any
  });

  const [open, setOpen] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addItem = (field: 'skills' | 'certifications' | 'languages', value: string, setter: (val: string) => void) => {
    if (value && !formData[field].includes(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
      setter('');
    }
  };

  const removeItem = (field: 'skills' | 'certifications' | 'languages', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(i => i !== item),
    }));
  };

  const companySizes = [
    'Startup (1-50)',
    'Small (51-200)',
    'Medium (201-1000)',
    'Large (1001-5000)',
    'Enterprise (5000+)',
  ];

  const managementLevels = [
    'Individual Contributor',
    'Team Lead',
    'Manager',
    'Senior Manager',
    'Director',
    'Executive',
  ];

  const commonBenefits = [
    'Health Insurance',
    'Dental Insurance',
    'Vision Insurance',
    'Life Insurance',
    '401(k)/Retirement',
    'Stock Options',
    'Bonus',
    'Remote Work',
    'Flexible Hours',
    'Professional Development',
    'Gym Membership',
    'Mental Health Benefits',
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8 p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Resume Upload Section */}
      <div className="space-y-6">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold text-[#fcba28] mb-4"
        >
          Resume Analysis
        </motion.h3>
        <ResumeUpload
          onUpload={(resumeData) => {
            setFormData(prev => ({
              ...prev,
              resumeAnalysis: resumeData,
              // Pre-fill form fields based on resume data
              role: resumeData.currentRole || prev.role,
              experience: resumeData.yearsOfExperience || prev.experience,
              skills: [...new Set([...prev.skills, ...(resumeData.skills || [])])],
              education: resumeData.highestEducation || prev.education,
              certifications: [...new Set([...prev.certifications, ...(resumeData.certifications || [])])],
            }));
          }}
        />
      </div>

      {/* Target Company Section */}
      <div className="space-y-6">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold text-[#fcba28] mb-4"
        >
          Target Company
        </motion.h3>
        <TargetCompanyInput
          onCompanySelect={(company) => {
            setFormData(prev => ({
              ...prev,
              targetCompany: company,
              industry: company.industry || prev.industry,
              companySize: company.size || prev.companySize,
              location: company.location || prev.location,
            }));
          }}
        />
      </div>

      {/* Basic Information */}
      <div className="space-y-6">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold text-white mb-4"
        >
          Basic Information
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="role" className="text-white">Role</Label>
            <Input
              id="role"
              placeholder="e.g. Senior Software Engineer"
              className="bg-gray-800/50 border-gray-700 text-white"
              value={formData.role}
              onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="industry" className="text-white">Industry</Label>
            <Input
              id="industry"
              placeholder="e.g. Technology"
              className="bg-gray-800/50 border-gray-700 text-white"
              value={formData.industry}
              onChange={e => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor="companySize" className="text-white">Company Size</Label>
            <select
              id="companySize"
              className="w-full bg-gray-800/50 border-gray-700 text-white rounded-md"
              value={formData.companySize}
              onChange={e => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
            >
              <option value="">Select company size</option>
              {companySizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Label htmlFor="workMode" className="text-white">Work Mode</Label>
            <select
              id="workMode"
              className="w-full bg-gray-800/50 border-gray-700 text-white rounded-md"
              value={formData.workMode}
              onChange={e => setFormData(prev => ({ ...prev, workMode: e.target.value }))}
            >
              <option value="onsite">On-site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </motion.div>
        </div>
      </div>

      {/* Experience & Education */}
      <div className="space-y-6">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold text-white mb-4"
        >
          Experience & Education
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Label htmlFor="experience" className="text-white">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              placeholder="e.g. 5"
              className="bg-gray-800/50 border-gray-700 text-white"
              value={formData.experience}
              onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Label htmlFor="education" className="text-white">Education</Label>
            <Input
              id="education"
              placeholder="e.g. Master's in Computer Science"
              className="bg-gray-800/50 border-gray-700 text-white"
              value={formData.education}
              onChange={e => setFormData(prev => ({ ...prev, education: e.target.value }))}
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Label htmlFor="managementLevel" className="text-white">Management Level</Label>
            <select
              id="managementLevel"
              className="w-full bg-gray-800/50 border-gray-700 text-white rounded-md"
              value={formData.managementLevel}
              onChange={e => setFormData(prev => ({ ...prev, managementLevel: e.target.value }))}
            >
              <option value="">Select level</option>
              {managementLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Label htmlFor="currentSalary" className="text-white">Current Salary (Optional)</Label>
            <Input
              id="currentSalary"
              type="number"
              placeholder="e.g. 100000"
              className="bg-gray-800/50 border-gray-700 text-white"
              value={formData.currentSalary}
              onChange={e => setFormData(prev => ({ ...prev, currentSalary: e.target.value }))}
            />
          </motion.div>
        </div>
      </div>

      {/* Skills & Certifications */}
      <div className="space-y-6">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold text-white mb-4"
        >
          Skills & Certifications
        </motion.h3>
        
        {/* Skills */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Label className="text-white">Skills</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill"
              className="bg-gray-800/50 border-gray-700 text-white"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem('skills', skillInput, setSkillInput))}
            />
            <Button
              type="button"
              onClick={() => addItem('skills', skillInput, setSkillInput)}
              variant="secondary"
              className="bg-[#fcba28] hover:bg-[#fcba28]/80 text-black"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.skills.map(skill => (
              <motion.span
                key={skill}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#fcba28]/20 text-[#fcba28]"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeItem('skills', skill)}
                  className="ml-2 text-[#fcba28] hover:text-[#fcba28]/80"
                >
                  ×
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Label className="text-white">Certifications</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a certification"
              className="bg-gray-800/50 border-gray-700 text-white"
              value={certInput}
              onChange={e => setCertInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem('certifications', certInput, setCertInput))}
            />
            <Button
              type="button"
              onClick={() => addItem('certifications', certInput, setCertInput)}
              variant="secondary"
              className="bg-[#fcba28] hover:bg-[#fcba28]/80 text-black"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.certifications.map(cert => (
              <motion.span
                key={cert}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#fcba28]/20 text-[#fcba28]"
              >
                {cert}
                <button
                  type="button"
                  onClick={() => removeItem('certifications', cert)}
                  className="ml-2 text-[#fcba28] hover:text-[#fcba28]/80"
                >
                  ×
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Label className="text-white">Languages</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a language"
              className="bg-gray-800/50 border-gray-700 text-white"
              value={languageInput}
              onChange={e => setLanguageInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addItem('languages', languageInput, setLanguageInput))}
            />
            <Button
              type="button"
              onClick={() => addItem('languages', languageInput, setLanguageInput)}
              variant="secondary"
              className="bg-[#fcba28] hover:bg-[#fcba28]/80 text-black"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.languages.map(lang => (
              <motion.span
                key={lang}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#fcba28]/20 text-[#fcba28]"
              >
                {lang}
                <button
                  type="button"
                  onClick={() => removeItem('languages', lang)}
                  className="ml-2 text-[#fcba28] hover:text-[#fcba28]/80"
                >
                  ×
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Benefits */}
      <div className="space-y-6">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold text-white mb-4"
        >
          Benefits & Additional Information
        </motion.h3>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {commonBenefits.map(benefit => (
            <label
              key={benefit}
              className="flex items-center space-x-2 text-white/80 hover:text-white cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.benefits.includes(benefit)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({
                      ...prev,
                      benefits: [...prev.benefits, benefit],
                    }));
                  } else {
                    setFormData(prev => ({
                      ...prev,
                      benefits: prev.benefits.filter(b => b !== benefit),
                    }));
                  }
                }}
                className="rounded border-gray-700 bg-gray-800/50 text-[#fcba28] focus:ring-[#fcba28]"
              />
              <span>{benefit}</span>
            </label>
          ))}
        </motion.div>
      </div>

      {/* Location */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
      >
        <Label className="text-white">Location</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
            >
              {formData.location || "Select location..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700">
            <Command className="bg-transparent">
              <CommandInput placeholder="Search location..." className="text-white" />
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-y-auto">
                {locations.map((location) => (
                  <CommandItem
                    key={location.value}
                    onSelect={() => {
                      setFormData(prev => ({ ...prev, location: location.label }));
                      setOpen(false);
                    }}
                    className="text-white hover:bg-gray-700"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        formData.location === location.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {location.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        className="pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <Button
          type="submit"
          className="w-full bg-[#fcba28] hover:bg-[#fcba28]/80 text-black font-semibold h-12 text-lg"
        >
          Calculate Salary Range
        </Button>
      </motion.div>
    </motion.form>
  );
}
