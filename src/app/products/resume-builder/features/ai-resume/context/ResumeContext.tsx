"use client";

import React, { createContext, useContext, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Types
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  summary: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Achievement {
  title: string;
  description: string;
  date?: string;
}

export interface VolunteerWork {
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
  volunteer: VolunteerWork[];
  declaration?: string;
  templateId: number;
  atsScore?: number;
  improvements?: string[];
}

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateSkills: (skills: string[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateLanguages: (languages: Language[]) => void;
  updateAchievements: (achievements: Achievement[]) => void;
  updateVolunteerWork: (volunteerWork: VolunteerWork[]) => void;
  updateTemplateId: (id: number) => void;
  updateDeclaration: (declaration: string) => void;
  generateAISuggestions: (type: string, prompt: string) => Promise<string>;
  analyzeResume: () => Promise<{ score: number; improvements: string[] }>;
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: [],
  volunteer: [],
  templateId: 1,
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    setResumeData((prev) => ({ ...prev, experiences }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData((prev) => ({ ...prev, education }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData((prev) => ({ ...prev, projects }));
  };

  const updateCertifications = (certifications: Certification[]) => {
    setResumeData((prev) => ({ ...prev, certifications }));
  };

  const updateLanguages = (languages: Language[]) => {
    setResumeData((prev) => ({ ...prev, languages }));
  };

  const updateAchievements = (achievements: Achievement[]) => {
    setResumeData((prev) => ({ ...prev, achievements }));
  };

  const updateVolunteerWork = (volunteerWork: VolunteerWork[]) => {
    setResumeData((prev) => ({ ...prev, volunteerWork }));
  };

  const updateTemplateId = (id: number) => {
    setResumeData((prev) => ({ ...prev, templateId: id }));
  };

  const updateDeclaration = (declaration: string) => {
    setResumeData((prev) => ({ ...prev, declaration }));
  };

  const generateAISuggestions = async (type: string, prompt: string) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  };

  const analyzeResume = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Analyze this resume and provide an ATS score out of 100 and suggestions for improvement:
      ${JSON.stringify(resumeData, null, 2)}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = JSON.parse(response.text());
    
    setResumeData(prev => ({
      ...prev,
      atsScore: analysis.score,
      improvements: analysis.improvements
    }));

    return {
      score: analysis.score,
      improvements: analysis.improvements
    };
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        updateExperiences,
        updateEducation,
        updateSkills,
        updateProjects,
        updateCertifications,
        updateLanguages,
        updateAchievements,
        updateVolunteerWork,
        updateTemplateId,
        updateDeclaration,
        generateAISuggestions,
        analyzeResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
