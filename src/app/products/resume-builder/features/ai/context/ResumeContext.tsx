"use client";

import React, { createContext, useContext, useState } from "react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  declaration?: string;
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
  level: number;
  category: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  description?: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: string;
}

interface Volunteer {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ResumeData {
  templateId: number;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  certifications: Certification[];
  languages: Language[];
  volunteer: Volunteer[];
}

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (data: PersonalInfo) => void;
  updateExperiences: (data: Experience[]) => void;
  updateEducation: (data: Education[]) => void;
  updateSkills: (data: Skill[]) => void;
  updateProjects: (data: Project[]) => void;
  updateAchievements: (data: Achievement[]) => void;
  updateCertifications: (data: Certification[]) => void;
  updateLanguages: (data: Language[]) => void;
  updateVolunteer: (data: Volunteer[]) => void;
  updateTemplateId: (id: number) => void;
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
  projects: [],
  achievements: [],
  certifications: [],
  languages: [],
  volunteer: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updatePersonalInfo = (data: PersonalInfo) => {
    setResumeData((prev) => ({ ...prev, personalInfo: data }));
  };

  const updateExperiences = (data: Experience[]) => {
    setResumeData((prev) => ({ ...prev, experiences: data }));
  };

  const updateEducation = (data: Education[]) => {
    setResumeData((prev) => ({ ...prev, education: data }));
  };

  const updateSkills = (data: Skill[]) => {
    setResumeData((prev) => ({ ...prev, skills: data }));
  };

  const updateProjects = (data: Project[]) => {
    setResumeData((prev) => ({ ...prev, projects: data }));
  };

  const updateAchievements = (data: Achievement[]) => {
    setResumeData((prev) => ({ ...prev, achievements: data }));
  };

  const updateCertifications = (data: Certification[]) => {
    setResumeData((prev) => ({ ...prev, certifications: data }));
  };

  const updateLanguages = (data: Language[]) => {
    setResumeData((prev) => ({ ...prev, languages: data }));
  };

  const updateVolunteer = (data: Volunteer[]) => {
    setResumeData((prev) => ({ ...prev, volunteer: data }));
  };

  const updateTemplateId = (id: number) => {
    setResumeData((prev) => ({ ...prev, templateId: id }));
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
        updateAchievements,
        updateCertifications,
        updateLanguages,
        updateVolunteer,
        updateTemplateId,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
