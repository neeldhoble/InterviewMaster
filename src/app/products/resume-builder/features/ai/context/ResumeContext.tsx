"use client";

import { createContext, useContext, useState } from "react";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  linkedIn?: string;
  website?: string;
  summary?: string;
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
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
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
  organization: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: string;
}

interface Volunteer {
  id: string;
  organization: string;
  role: string;
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
  updateTemplateId: (templateId: number) => void;
  updatePersonalInfo: (personalInfo: PersonalInfo) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateSkills: (skills: Skill[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateAchievements: (achievements: Achievement[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateLanguages: (languages: Language[]) => void;
  updateVolunteer: (volunteer: Volunteer[]) => void;
}

const initialResumeData: ResumeData = {
  templateId: 1, // Default template
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
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

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const updateTemplateId = (templateId: number) => {
    setResumeData((prev) => ({ ...prev, templateId }));
  };

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setResumeData((prev) => ({ ...prev, personalInfo }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    setResumeData((prev) => ({ ...prev, experiences }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData((prev) => ({ ...prev, education }));
  };

  const updateSkills = (skills: Skill[]) => {
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
