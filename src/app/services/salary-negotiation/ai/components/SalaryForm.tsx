'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SalaryFormProps {
  onSubmit: (data: any) => void;
}

const locations = [
  // Indian Metro Cities
  { value: 'bangalore', label: 'Bangalore', group: 'Indian Metro Cities' },
  { value: 'mumbai', label: 'Mumbai', group: 'Indian Metro Cities' },
  { value: 'delhi-ncr', label: 'Delhi NCR', group: 'Indian Metro Cities' },
  { value: 'hyderabad', label: 'Hyderabad', group: 'Indian Metro Cities' },
  { value: 'pune', label: 'Pune', group: 'Indian Metro Cities' },
  { value: 'chennai', label: 'Chennai', group: 'Indian Metro Cities' },
  
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
  
  // US Cities
  { value: 'san-francisco', label: 'San Francisco', group: 'US Cities' },
  { value: 'new-york', label: 'New York', group: 'US Cities' },
  { value: 'seattle', label: 'Seattle', group: 'US Cities' },
  { value: 'boston', label: 'Boston', group: 'US Cities' },
  { value: 'austin', label: 'Austin', group: 'US Cities' },
  { value: 'chicago', label: 'Chicago', group: 'US Cities' },
  { value: 'los-angeles', label: 'Los Angeles', group: 'US Cities' },
  { value: 'denver', label: 'Denver', group: 'US Cities' },
  { value: 'portland', label: 'Portland', group: 'US Cities' },
  { value: 'san-diego', label: 'San Diego', group: 'US Cities' },
  { value: 'washington-dc', label: 'Washington DC', group: 'US Cities' },
  
  // European Cities
  { value: 'london', label: 'London', group: 'European Cities' },
  { value: 'berlin', label: 'Berlin', group: 'European Cities' },
  { value: 'amsterdam', label: 'Amsterdam', group: 'European Cities' },
  { value: 'paris', label: 'Paris', group: 'European Cities' },
  { value: 'dublin', label: 'Dublin', group: 'European Cities' },
  { value: 'munich', label: 'Munich', group: 'European Cities' },
  { value: 'stockholm', label: 'Stockholm', group: 'European Cities' },
  { value: 'zurich', label: 'Zurich', group: 'European Cities' },
  
  // APAC Cities
  { value: 'singapore', label: 'Singapore', group: 'APAC Cities' },
  { value: 'tokyo', label: 'Tokyo', group: 'APAC Cities' },
  { value: 'hong-kong', label: 'Hong Kong', group: 'APAC Cities' },
  { value: 'sydney', label: 'Sydney', group: 'APAC Cities' },
  { value: 'melbourne', label: 'Melbourne', group: 'APAC Cities' },
  { value: 'seoul', label: 'Seoul', group: 'APAC Cities' },
  
  // Remote
  { value: 'remote', label: 'Remote', group: 'Remote' },
];

const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Education',
  'Consulting'
];

const educationLevels = [
  'High School',
  'Associate',
  'Bachelor',
  'Master',
  'PhD',
  'MBA'
];

export function SalaryForm({ onSubmit }: SalaryFormProps) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [formData, setFormData] = useState({
    role: '',
    location: '',
    experience: '',
    education: 'Bachelor',
    industry: '',
    skills: [] as string[],
    currentSkill: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      location: locations.find(loc => loc.value === location)?.label || location,
      experience: Number(formData.experience)
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
          <Label>Location</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between text-left font-normal"
              >
                {location
                  ? locations.find(loc => loc.value === location)?.label
                  : "Select location..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search location..." className="h-9" />
                <CommandEmpty>No location found.</CommandEmpty>
                {['Indian Metro Cities', 'Indian Tier 2 Cities', 'US Cities', 'European Cities', 'APAC Cities', 'Remote'].map((group) => (
                  <CommandGroup key={group} heading={group}>
                    {locations
                      .filter(loc => loc.group === group)
                      .map(loc => (
                        <CommandItem
                          key={loc.value}
                          value={loc.value}
                          onSelect={(currentValue) => {
                            setLocation(currentValue === location ? '' : currentValue);
                            setOpen(false);
                          }}
                        >
                          {loc.label}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              location === loc.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                ))}
              </Command>
            </PopoverContent>
          </Popover>
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
