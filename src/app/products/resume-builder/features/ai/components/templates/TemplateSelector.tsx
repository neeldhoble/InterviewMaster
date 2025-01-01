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
    name: "Minimalist Edge",
    description: "Simple and elegant with perfect whitespace balance",
    component: MinimalTemplate,
    docxTemplate: "modern",
    tags: ["Minimal", "Clean", "Simple"],
  },
  {
    id: 5,
    name: "Professional Plus",
    description: "Modern design with a technical edge",
    component: ProfessionalTemplate,
    docxTemplate: "professional",
    tags: ["Technical", "Modern", "Detailed"],
  },
];

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const { resumeData } = useResume();
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
  };

  const handleDownload = async (template: Template) => {
    await generateAndDownloadResume(template.docxTemplate, resumeData);
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
              transition={{ duration: 0.3 }}
              className={`relative group rounded-xl overflow-hidden border ${
                isSelected ? "border-[#fcba28]" : "border-white/10"
              } bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer`}
              onClick={() => onSelect(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Template Preview */}
              <div className="aspect-[8.5/11] relative">
                <div className="absolute inset-0 transform scale-[0.2] origin-top-left">
                  <TemplateComponent data={resumeData} isPreview />
                </div>

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
                    isHovered || isSelected ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm font-medium">
                      {isSelected ? "Selected Template" : "Preview Template"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {isSelected && <Check className="w-5 h-5 text-[#fcba28]" />}
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-black/50 border-white/20 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreview(template);
                    }}
                  >
                    <FileText className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-black/50 border-white/20 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(template);
                    }}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-background rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="prose prose-invert max-w-none">
                  <previewTemplate.component data={resumeData} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
