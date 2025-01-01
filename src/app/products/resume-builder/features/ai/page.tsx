"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, FileText, Download, Edit3, Layout, Share2, GraduationCap, Award } from "lucide-react";
import { TemplateSelector } from "./components/templates/TemplateSelector";
import { PersonalInfoForm } from "./components/personal-info/PersonalInfoForm";
import { ExperienceForm } from "./components/experience/ExperienceForm";
import { EducationForm } from "./components/education/EducationForm";
import { SkillsForm } from "./components/skills/SkillsForm";
import { ResumePreview } from "./components/preview/ResumePreview";
import { ResumeProvider, useResume } from "./context/ResumeContext";
import { exportToPdf, shareResume } from "./utils/pdfExport";

const ResumeBuilder = () => {
  const {
    resumeData,
    updatePersonalInfo,
    updateExperiences,
    updateEducation,
    updateSkills,
    updateTemplateId,
  } = useResume();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: "Choose Template", icon: Layout },
    { id: 2, title: "Personal Info", icon: Edit3 },
    { id: 3, title: "Experience", icon: FileText },
    { id: 4, title: "Education", icon: GraduationCap },
    { id: 5, title: "Skills", icon: Award },
    { id: 6, title: "Preview & Export", icon: Download },
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
      // Show success notification
      console.log("PDF exported successfully");
    }
  };

  const handleShare = async () => {
    const success = await shareResume("resume-preview");
    if (success) {
      // Show success notification
      console.log("Resume shared successfully");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <TemplateSelector
            selectedTemplate={resumeData.templateId}
            onSelect={(id) => {
              updateTemplateId(id);
              handleNext();
            }}
          />
        );
      case 2:
        return (
          <PersonalInfoForm
            initialData={resumeData.personalInfo}
            onSave={(data) => {
              updatePersonalInfo(data);
              handleNext();
            }}
          />
        );
      case 3:
        return (
          <ExperienceForm
            initialData={resumeData.experiences}
            onSave={(data) => {
              updateExperiences(data);
              handleNext();
            }}
          />
        );
      case 4:
        return (
          <EducationForm
            initialData={resumeData.education}
            onSave={(data) => {
              updateEducation(data);
              handleNext();
            }}
          />
        );
      case 5:
        return (
          <SkillsForm
            initialData={resumeData.skills}
            onSave={(data) => {
              updateSkills(data);
              handleNext();
            }}
          />
        );
      case 6:
        return (
          <ResumePreview
            data={resumeData}
            onDownload={handleExport}
            onShare={handleShare}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
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
          <p className="text-white/60 max-w-2xl mx-auto">
            Use our advanced AI-powered resume builder to create a professional resume that stands out.
            Pre-designed templates and smart suggestions make it effortless.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((step) => {
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
                      ? "text-white"
                      : "text-white/40"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      step.id <= currentStep
                        ? "bg-[#fcba28]/20 border-[#fcba28]/40"
                        : "bg-white/5 border-white/10"
                    } border backdrop-blur-sm`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="ml-2 text-sm font-medium hidden sm:block">
                    {step.title}
                  </span>
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
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-h-[800px] overflow-y-auto">
              {renderStepContent()}
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        {currentStep > 1 && currentStep < steps.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between mt-6"
          >
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-white/10 rounded-lg font-medium hover:bg-white/5 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ResumeBuilderWrapper = () => {
  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  );
};

export default ResumeBuilderWrapper;