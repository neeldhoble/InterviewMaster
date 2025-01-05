'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    skills: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      location: locations.find(loc => loc.value === location)?.label || location,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="role" className="text-white">Job Role</Label>
          <Input
            id="role"
            name="role"
            placeholder="e.g. Software Engineer, Product Manager"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Location</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 opacity-50" />
                  <span>
                    {location
                      ? locations.find(loc => loc.value === location)?.label
                      : "Select location..."}
                  </span>
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0 bg-[#2d2d2d] border-white/10">
              <Command className="bg-transparent">
                <CommandInput 
                  placeholder="Search location..." 
                  className="h-9 bg-transparent text-white border-b border-white/10"
                />
                <CommandEmpty className="py-6 text-center text-sm text-white/70">
                  No location found.
                </CommandEmpty>
                
                {/* Popular Locations */}
                <CommandGroup heading="Popular Locations" className="text-white/70">
                  {locations
                    .filter(loc => loc.popular)
                    .map(loc => (
                      <CommandItem
                        key={loc.value}
                        value={loc.value}
                        onSelect={(currentValue) => {
                          setLocation(currentValue === location ? '' : currentValue);
                          setOpen(false);
                        }}
                        className="text-white hover:bg-white/10"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <MapPin className="w-4 h-4 opacity-50" />
                          {loc.label}
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            location === loc.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>

                {/* All Locations by Region */}
                {['Indian Metro Cities', 'Indian Tier 2 Cities', 'US Cities', 'European Cities', 'APAC Cities', 'Remote'].map((group) => (
                  <CommandGroup key={group} heading={group} className="text-white/70">
                    {locations
                      .filter(loc => loc.group === group && !loc.popular)
                      .map(loc => (
                        <CommandItem
                          key={loc.value}
                          value={loc.value}
                          onSelect={(currentValue) => {
                            setLocation(currentValue === location ? '' : currentValue);
                            setOpen(false);
                          }}
                          className="text-white hover:bg-white/10"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <MapPin className="w-4 h-4 opacity-50" />
                            {loc.label}
                          </div>
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

        <div className="space-y-2">
          <Label htmlFor="experience" className="text-white">Years of Experience</Label>
          <Input
            id="experience"
            name="experience"
            type="number"
            min="0"
            max="50"
            placeholder="e.g. 5"
            value={formData.experience}
            onChange={handleInputChange}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills" className="text-white">Key Skills</Label>
          <Input
            id="skills"
            name="skills"
            placeholder="e.g. React, Python, Machine Learning"
            value={formData.skills}
            onChange={handleInputChange}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#fcba28] text-black hover:bg-[#fcba28]/90">
        Calculate Salary
      </Button>
    </form>
  );
}
