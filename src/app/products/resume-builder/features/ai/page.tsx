"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles,
  FileText,
  Download,
  Edit3,
  Layout,
  Share2,
  GraduationCap,
  Award,
  FileSignature,
  Globe,
  Trophy,
  Briefcase,
  Heart
} from "lucide-react";
import { TemplateSelector } from "./components/templates/TemplateSelector";
import { PersonalInfoForm } from "./components/personal-info/PersonalInfoForm";
import { ExperienceForm } from "./components/experience/ExperienceForm";
import { EducationForm } from "./components/education/EducationForm";
import { SkillsForm } from "./components/skills/SkillsForm";
import { ProjectsForm } from "./components/projects/ProjectsForm";
import { AchievementsForm } from "./components/achievements/AchievementsForm";
import { CertificationsForm } from "./components/certifications/CertificationsForm";
import { LanguagesForm } from "./components/languages/LanguagesForm";
import { VolunteerForm } from "./components/volunteer/VolunteerForm";
import { Declaration } from "./components/declaration/Declaration";
import { ResumePreview } from "./components/preview/ResumePreview";
import { ResumeProvider, useResume } from "./context/ResumeContext";
import { exportToPdf, shareResume } from "./utils/pdfExport";
import { Button } from "@/components/ui/button";

const ResumeBuilder = () => {
  const {
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
  } = useResume();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: "Choose Template", icon: Layout },
    { id: 2, title: "Personal Info", icon: Edit3 },
    { id: 3, title: "Experience", icon: Briefcase },
    { id: 4, title: "Education", icon: GraduationCap },
    { id: 5, title: "Skills", icon: Award },
    { id: 6, title: "Projects", icon: FileText },
    { id: 7, title: "Achievements", icon: Trophy },
    { id: 8, title: "Certifications", icon: Award },
    { id: 9, title: "Languages", icon: Globe },
    { id: 10, title: "Volunteer", icon: Heart },
    { id: 11, title: "Declaration", icon: FileSignature },
    { id: 12, title: "Preview & Export", icon: Download },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleExport = async () => {
    const success = await exportToPdf("resume-preview", "my-resume.pdf");
    if (success) {
      console.log("PDF exported successfully");
    }
  };

  const handleShare = async () => {
    const success = await shareResume("resume-preview");
    if (success) {
      console.log("Resume shared successfully");
    }
  };

  const handleTemplateSelect = (templateId: number) => {
    updateTemplateId(templateId);
    handleNext();
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20 backdrop-blur-sm mb-4">
            <Sparkles className="w-5 h-5 text-[#fcba28]" />
            <span className="text-sm font-medium">AI-Powered Resume Builder</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Create Your Professional Resume</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use our advanced AI-powered resume builder to create a professional resume that stands out.
            Pre-designed templates and smart suggestions make it effortless.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex flex-col items-center mb-12 max-w-5xl mx-auto">
          {/* First Row */}
          <div className="flex items-center space-x-4 mb-6">
            {steps.slice(0, 6).map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: step.id * 0.1 }}
                  className={`flex items-center ${
                    step.id < currentStep
                      ? "text-[#fcba28]"
                      : step.id === currentStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex flex-col items-center gap-2 group transition-colors`}
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full ${
                        step.id <= currentStep
                          ? "bg-[#fcba28]/20 border-[#fcba28]/40"
                          : "bg-white/5 border-white/10"
                      } border backdrop-blur-sm group-hover:border-[#fcba28]/40 transition-colors`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">
                      {step.title}
                    </span>
                  </button>
                  {step.id !== 6 && (
                    <div
                      className={`w-8 h-px mx-2 ${
                        step.id < currentStep ? "bg-[#fcba28]/40" : "bg-white/10"
                      }`}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Connecting Line */}
          <div className="h-8 w-px bg-white/10 relative">
            <div 
              className={`absolute left-0 top-0 h-full w-full bg-[#fcba28]/40 transition-transform duration-300 origin-top ${
                currentStep > 6 ? 'scale-y-100' : 'scale-y-0'
              }`}
            />
          </div>

          {/* Second Row */}
          <div className="flex items-center space-x-4">
            {steps.slice(6).map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: step.id * 0.1 }}
                  className={`flex items-center ${
                    step.id < currentStep
                      ? "text-[#fcba28]"
                      : step.id === currentStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex flex-col items-center gap-2 group transition-colors`}
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full ${
                        step.id <= currentStep
                          ? "bg-[#fcba28]/20 border-[#fcba28]/40"
                          : "bg-white/5 border-white/10"
                      } border backdrop-blur-sm group-hover:border-[#fcba28]/40 transition-colors`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">
                      {step.title}
                    </span>
                  </button>
                  {step.id !== steps.length && (
                    <div
                      className={`w-8 h-px mx-2 ${
                        step.id < currentStep ? "bg-[#fcba28]/40" : "bg-white/10"
                      }`}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-8 min-h-[600px] w-full max-w-[1200px] mx-auto"
        >
          <div className="w-full h-full">
            {currentStep === 1 && (
              <TemplateSelector
                selectedTemplate={resumeData.templateId}
                onSelect={handleTemplateSelect}
              />
            )}
            {currentStep === 2 && (
              <PersonalInfoForm
                initialData={resumeData.personalInfo}
                onSave={(data) => {
                  updatePersonalInfo(data);
                  handleNext();
                }}
              />
            )}
            {currentStep === 3 && (
              <ExperienceForm
                initialData={resumeData.experiences}
                onSave={(data) => {
                  updateExperiences(data);
                  handleNext();
                }}
              />
            )}
            {currentStep === 4 && (
              <EducationForm
                initialData={resumeData.education}
                onSave={(data) => {
                  updateEducation(data);
                  handleNext();
                }}
              />
            )}
            {currentStep === 5 && (
              <SkillsForm
                initialData={resumeData.skills}
                onSave={(data) => {
                  updateSkills(data);
                  handleNext();
                }}
              />
            )}
            {currentStep === 6 && (
              <ProjectsForm
                initialData={resumeData.projects}
                onSave={(data) => {
                  updateProjects(data);
                  handleNext();
                }}
              />
            )}
            {currentStep === 7 && (
              <AchievementsForm
                initialData={resumeData.achievements}
                onSave={(data) => {
                  updateAchievements(data);
                  handleNext();
                }}
              />
            )}
            {currentStep === 8 && (
              <CertificationsForm
                initialData={resumeData.certifications}
                onSave={(data) => {
                  updateCertifications(data);
                  handleNext();
                }}
              />
            )}
            {currentStep === 9 && (
              <LanguagesForm
                initialData={resumeData.languages}
                onSave={(data) => {
                  updateLanguages(data);
                  handleNext();
                }}
              />
            )}
            {currentStep === 10 && (
              <VolunteerForm
                initialData={resumeData.volunteer}
                onSave={(data) => {
                  updateVolunteer(data);
                  handleNext();
                }}
              />
            )}
            {currentStep === 11 && (
              <Declaration onNext={handleNext} />
            )}
            {currentStep === 12 && (
              <div className="space-y-8">
                <ResumePreview />
                <div className="flex justify-end gap-4">
                  <Button onClick={handleShare} variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button onClick={handleExport} className="bg-[#fcba28] text-black hover:bg-[#fcba28]/90">
                    <Download className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        {currentStep > 1 && currentStep < steps.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between mt-6"
          >
            <Button
              onClick={handleBack}
              variant="outline"
              className="border-white/10"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-[#fcba28] text-black hover:bg-[#fcba28]/90"
            >
              Next
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ResumeBuilderWrapper = () => (
  <ResumeProvider>
    <ResumeBuilder />
  </ResumeProvider>
);

export default ResumeBuilderWrapper;