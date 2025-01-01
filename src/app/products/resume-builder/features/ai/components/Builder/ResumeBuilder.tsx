"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ResumePreview } from './ResumePreview';
import { PersonalInfoSection } from './sections/PersonalInfo/PersonalInfoSection';
import { ExperienceSection } from './sections/Experience/ExperienceSection';
import { EducationSection } from './sections/Education/EducationSection';
import { SkillsSection } from './sections/Skills/SkillsSection';
import { ProjectsSection } from './sections/Projects/ProjectsSection';
import { CertificationsSection } from './sections/Certifications/CertificationsSection';
import { LanguagesSection } from './sections/Languages/LanguagesSection';
import { AwardsSection } from './sections/Awards/AwardsSection';
import { VolunteerSection } from './sections/Volunteer/VolunteerSection';
import { PublicationsSection } from './sections/Publications/PublicationsSection';
import { AIAssistant } from './AIAssistant';

const initialResumeData = {
  personal: {},
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  volunteer: [],
  publications: []
};

const sections = [
  { id: 'personal', label: 'Personal Info', Component: PersonalInfoSection },
  { id: 'experience', label: 'Experience', Component: ExperienceSection },
  { id: 'education', label: 'Education', Component: EducationSection },
  { id: 'skills', label: 'Skills', Component: SkillsSection },
  { id: 'projects', label: 'Projects', Component: ProjectsSection },
  { id: 'certifications', label: 'Certifications', Component: CertificationsSection },
  { id: 'languages', label: 'Languages', Component: LanguagesSection },
  { id: 'awards', label: 'Awards', Component: AwardsSection },
  { id: 'volunteer', label: 'Volunteer', Component: VolunteerSection },
  { id: 'publications', label: 'Publications', Component: PublicationsSection }
];

export function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeData, setResumeData] = useState(initialResumeData);

  const handleSectionChange = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <div className="relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F14]/50 to-[#141C23]/50 pointer-events-none" />

      <Card className="relative bg-[#1A2430]/90 border-[#2A3441] shadow-2xl backdrop-blur-sm">
        <div className="grid lg:grid-cols-3 gap-8 p-6">
          <div className="lg:col-span-2">
            <Tabs 
              defaultValue="personal" 
              value={activeSection} 
              onValueChange={setActiveSection}
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-5 bg-[#141C23]/80 p-1 rounded-lg">
                {sections.map(({ id, label }) => (
                  <TabsTrigger 
                    key={id} 
                    value={id}
                    className={cn(
                      "data-[state=active]:bg-[#2A3441]",
                      "data-[state=active]:text-white",
                      "text-gray-400",
                      "hover:text-white",
                      "transition-all",
                      "rounded-md"
                    )}
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {sections.map(({ id, Component }) => (
                <TabsContent key={id} value={id} className="mt-6">
                  <div className="bg-[#141C23]/80 rounded-lg p-6 backdrop-blur-sm border border-[#2A3441]/50">
                    <Component
                      data={resumeData[id]}
                      onChange={(data: any) => handleSectionChange(id, data)}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <ResumePreview resumeData={resumeData} />
              <div className="flex gap-4">
                <Button 
                  className="w-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white"
                >
                  Download PDF
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-[#2A3441] text-gray-300 hover:bg-[#2A3441] hover:text-white"
                >
                  Share
                </Button>
              </div>
              <AIAssistant resumeData={resumeData} onUpdate={setResumeData} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
