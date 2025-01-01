"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  highlights: string[];
}

interface Achievement {
  title: string;
  date: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface Volunteer {
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ResumeData {
  templateId: number;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  achievements: Achievement[];
  certifications: Certification[];
  languages: Language[];
  volunteer: Volunteer[];
  declaration?: string;
}

interface ResumeContextType {
  resumeData: ResumeData;
  updateTemplateId: (id: number) => void;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateSkills: (skills: string[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateAchievements: (achievements: Achievement[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateLanguages: (languages: Language[]) => void;
  updateVolunteer: (volunteer: Volunteer[]) => void;
  updateDeclaration: (declaration: string) => void;
  resetResume: () => void;
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
  declaration: "",
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("resumeData");
      return savedData ? JSON.parse(savedData) : defaultResumeData;
    }
    return defaultResumeData;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
    }
  }, [resumeData]);

  const updateTemplateId = (id: number) => {
    setResumeData((prev) => ({ ...prev, templateId: id }));
  };

  const updatePersonalInfo = (info: PersonalInfo) => {
    setResumeData((prev) => ({ ...prev, personalInfo: info }));
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

  const updateAchievements = (achievements: Achievement[]) => {
    setResumeData((prev) => ({ ...prev, achievements }));
  };

  const updateCertifications = (certifications: Certification[]) => {
    setResumeData((prev) => ({ ...prev, certifications }));
  };

  const updateLanguages = (languages: Language[]) => {
    setResumeData((prev) => ({ ...prev, languages }));
  };

  const updateVolunteer = (volunteer: Volunteer[]) => {
    setResumeData((prev) => ({ ...prev, volunteer }));
  };

  const updateDeclaration = (declaration: string) => {
    setResumeData((prev) => ({ ...prev, declaration }));
  };

  const resetResume = () => {
    setResumeData(defaultResumeData);
    localStorage.removeItem("resumeData");
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateTemplateId,
        updatePersonalInfo,
        updateExperiences,
        updateEducation,
        updateSkills,
        updateProjects,
        updateAchievements,
        updateCertifications,
        updateLanguages,
        updateVolunteer,
        updateDeclaration,
        resetResume,
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
