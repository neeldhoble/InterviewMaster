"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Wand2, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAndDownloadResume } from "../../utils/docxTemplates";
import { useResume } from "../../context/ResumeContext";
import { ErrorBoundary } from "./examples/ErrorBoundary";
import { generateDynamicTemplate } from "./utils/templateGenerator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TemplateSelectorProps {
  selectedTemplate: number;
  onSelect: (id: number) => void;
}

interface CustomizationOptions {
  targetRole: string;
  industry: string;
  experienceLevel: string;
  preferences: string;
  templateStyle: string;
  pageCount: number;
  resumeTool: string;
}

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Creative",
  "Engineering",
  "Sales",
  "Other"
];

const experienceLevels = [
  "Entry Level",
  "Junior",
  "Mid-Level",
  "Senior",
  "Lead",
  "Executive"
];

const templateStyles = [
  "Modern",
  "Classic",
  "Creative",
  "Minimalist",
  "Professional",
  "Executive"
];

const resumeTools = [
  "Gemini AI",
  "ChatGPT",
  "Resume.io",
  "Novoresume",
  "Canva",
  "VisualCV",
  "Standard ATS"
];

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState<any>(null);
  const [customOptions, setCustomOptions] = useState<CustomizationOptions>({
    targetRole: "",
    industry: "",
    experienceLevel: "",
    preferences: "",
    templateStyle: "Modern",
    pageCount: 1,
    resumeTool: "Gemini AI"
  });
  const { resumeData, updateTemplateId } = useResume();

  const handleGenerateTemplate = async () => {
    setIsGenerating(true);
    try {
      const template = await generateDynamicTemplate(resumeData, customOptions);
      setGeneratedTemplate(template);
      updateTemplateId(Date.now());
    } catch (error) {
      console.error("Failed to generate template:", error);
    }
    setIsGenerating(false);
  };

  const handleDownload = async () => {
    if (generatedTemplate) {
      await generateAndDownloadResume("dynamic", resumeData);
    }
  };

  return (
    <div className="space-y-8">
      {/* Customization Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-lg">
        <div className="space-y-4">
          <div>
            <Label htmlFor="targetRole">Target Role</Label>
            <Input
              id="targetRole"
              placeholder="e.g., Senior Software Engineer"
              value={customOptions.targetRole}
              onChange={(e) => setCustomOptions({ ...customOptions, targetRole: e.target.value })}
              className="bg-white/10"
            />
          </div>

          <div>
            <Label htmlFor="industry">Industry</Label>
            <Select
              value={customOptions.industry}
              onValueChange={(value) => setCustomOptions({ ...customOptions, industry: value })}
            >
              <SelectTrigger className="bg-white/10">
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry.toLowerCase()}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <Select
              value={customOptions.experienceLevel}
              onValueChange={(value) => setCustomOptions({ ...customOptions, experienceLevel: value })}
            >
              <SelectTrigger className="bg-white/10">
                <SelectValue placeholder="Select Experience Level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level.toLowerCase()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="resumeTool">Resume Tool</Label>
            <Select
              value={customOptions.resumeTool}
              onValueChange={(value) => setCustomOptions({ ...customOptions, resumeTool: value })}
            >
              <SelectTrigger className="bg-white/10">
                <SelectValue placeholder="Select Resume Tool" />
              </SelectTrigger>
              <SelectContent>
                {resumeTools.map((tool) => (
                  <SelectItem key={tool} value={tool.toLowerCase()}>
                    {tool}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="templateStyle">Template Style</Label>
            <Select
              value={customOptions.templateStyle}
              onValueChange={(value) => setCustomOptions({ ...customOptions, templateStyle: value })}
            >
              <SelectTrigger className="bg-white/10">
                <SelectValue placeholder="Select Template Style" />
              </SelectTrigger>
              <SelectContent>
                {templateStyles.map((style) => (
                  <SelectItem key={style} value={style.toLowerCase()}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Number of Pages</Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min={1}
                max={3}
                value={customOptions.pageCount}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= 3) {
                    setCustomOptions({ ...customOptions, pageCount: value });
                  }
                }}
                className="bg-white/10 w-20"
              />
              <span className="text-sm text-gray-400">(1-3 pages)</span>
            </div>
          </div>

          <div>
            <Label htmlFor="preferences">Additional Preferences</Label>
            <Textarea
              id="preferences"
              placeholder="Any specific style preferences or requirements..."
              value={customOptions.preferences}
              onChange={(e) => setCustomOptions({ ...customOptions, preferences: e.target.value })}
              className="bg-white/10 min-h-[100px]"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleGenerateTemplate}
          className="bg-[#fcba28] hover:bg-[#fcba28]/90 text-black flex items-center gap-2 px-6 py-3 text-lg"
          disabled={isGenerating}
        >
          <Wand2 className="w-5 h-5" />
          {isGenerating ? "Generating..." : "Generate Template"}
        </Button>
        {generatedTemplate && (
          <Button
            onClick={handleDownload}
            className="bg-white/10 hover:bg-white/20 flex items-center gap-2 px-6 py-3 text-lg"
          >
            <Download className="w-5 h-5" />
            Download
          </Button>
        )}
      </div>

      {/* Template Preview */}
      {generatedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8 max-w-[1000px] mx-auto">
            <ErrorBoundary>
              {generatedTemplate}
            </ErrorBoundary>
          </div>
        </motion.div>
      )}
    </div>
  );
}
