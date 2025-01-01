"use client";

import React, { createContext, useContext, useState } from "react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

interface ResumeData {
  templateId: number;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateSkills: (skills: Skill[]) => void;
  updateTemplateId: (id: number) => void;
  generateAISuggestions: (field: string, prompt: string) => Promise<string>;
}

const defaultResumeData: ResumeData = {
  templateId: 1,
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updatePersonalInfo = (info: PersonalInfo) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: info,
    }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    setResumeData((prev) => ({
      ...prev,
      experiences,
    }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData((prev) => ({
      ...prev,
      education,
    }));
  };

  const updateSkills = (skills: Skill[]) => {
    setResumeData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const updateTemplateId = (id: number) => {
    setResumeData((prev) => ({
      ...prev,
      templateId: id,
    }));
  };

  const generateAISuggestions = async (field: string, prompt: string) => {
    // This will be connected to your AI service
    // For now, returning placeholder suggestions
    const suggestions = {
      summary: "Experienced professional with expertise in...",
      experience: "Led cross-functional teams to deliver...",
      education: "Conducted research in...",
      skills: "Advanced proficiency in...",
    };
    return suggestions[field as keyof typeof suggestions] || "";
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        updateExperiences,
        updateEducation,
        updateSkills,
        updateTemplateId,
        generateAISuggestions,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
