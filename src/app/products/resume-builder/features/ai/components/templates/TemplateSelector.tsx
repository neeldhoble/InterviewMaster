"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAndDownloadResume } from "../../utils/docxTemplates";
import { useResume } from "../../context/ResumeContext";
import { ProfessionalTemplate } from "./examples/ProfessionalTemplate";
import { CreativeTemplate } from "./examples/CreativeTemplate";
import { MinimalTemplate } from "./examples/MinimalTemplate";
import { ModernTemplate } from "./examples/ModernTemplate";
import { ExecutiveTemplate } from "./examples/ExecutiveTemplate";
import { GeminiTemplate } from "./examples/GeminiTemplate";
import { ErrorBoundary } from "./examples/ErrorBoundary";

interface TemplateSelectorProps {
  selectedTemplate: number;
  onSelect: (id: number) => void;
}

interface Template {
  id: number;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  docxTemplate: string;
  tags: string[];
}

const templates: Template[] = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean and contemporary layout with a focus on readability",
    component: ModernTemplate,
    docxTemplate: "modern",
    tags: ["Modern", "Clean", "Professional"],
  },
  {
    id: 2,
    name: "Executive Classic",
    description: "Traditional format perfect for senior roles",
    component: ExecutiveTemplate,
    docxTemplate: "professional",
    tags: ["Executive", "Traditional", "Formal"],
  },
  {
    id: 3,
    name: "Creative Impact",
    description: "Stand out with a unique and bold design",
    component: CreativeTemplate,
    docxTemplate: "creative",
    tags: ["Creative", "Bold", "Unique"],
  },
  {
    id: 4,
    name: "Minimal Clean",
    description: "Simple and elegant design that lets your content shine",
    component: MinimalTemplate,
    docxTemplate: "minimal",
    tags: ["Minimal", "Clean", "Simple"],
  },
  {
    id: 5,
    name: "Professional Classic",
    description: "Time-tested format trusted by professionals",
    component: ProfessionalTemplate,
    docxTemplate: "classic",
    tags: ["Professional", "Traditional", "Classic"],
  },
  {
    id: 6,
    name: "Gemini AI",
    description: "Modern AI-powered template with smart formatting",
    component: GeminiTemplate,
    docxTemplate: "gemini",
    tags: ["Modern", "AI", "Smart"],
  },
];

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);
  const { resumeData, updateTemplateId } = useResume();

  const handleDownload = async (template: Template) => {
    await generateAndDownloadResume(template.docxTemplate, resumeData);
  };

  const handleTemplateSelect = (id: number) => {
    updateTemplateId(id);
    onSelect(id);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const isHovered = hoveredTemplate === template.id;
          const isSelected = selectedTemplate === template.id;
          const TemplateComponent = template.component;

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              onClick={() => handleTemplateSelect(template.id)}
              className={`relative group rounded-xl overflow-hidden border ${
                isSelected ? "border-[#fcba28]" : "border-white/10"
              } bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer`}
            >
              {/* Preview */}
              <div className="relative aspect-[210/297] w-full bg-white">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ErrorBoundary>
                    <TemplateComponent data={resumeData} scale={0.2} />
                  </ErrorBoundary>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-[#fcba28] flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-black" />
                    </motion.div>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4"
                  >
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateSelect(template.id);
                      }}
                      className="bg-[#fcba28] hover:bg-[#fcba28]/90 text-black"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Select
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(template);
                      }}
                      variant="outline"
                      className="border-white/20 hover:bg-white/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
