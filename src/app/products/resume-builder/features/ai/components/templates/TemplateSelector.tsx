"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAndDownloadResume, generatePreviewHtml } from "../../utils/docxTemplates";
import { useResume } from "../../context/ResumeContext";

interface TemplateSelectorProps {
  selectedTemplate: number;
  onSelect: (id: number) => void;
}

interface Template {
  id: number;
  name: string;
  description: string;
  docxTemplate: string;
  tags: string[];
  previewImage?: string;
}

const templates: Template[] = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean and contemporary layout with a focus on readability",
    docxTemplate: "modern",
    tags: ["Modern", "Clean", "Professional"],
    previewImage: "/templates/modern.png",
  },
  {
    id: 2,
    name: "Executive Classic",
    description: "Traditional format perfect for senior roles",
    docxTemplate: "professional",
    tags: ["Executive", "Traditional", "Formal"],
    previewImage: "/templates/executive.png",
  },
  {
    id: 3,
    name: "Creative Impact",
    description: "Stand out with a unique and bold design",
    docxTemplate: "creative",
    tags: ["Creative", "Bold", "Unique"],
    previewImage: "/templates/creative.png",
  },
  {
    id: 4,
    name: "Minimalist Edge",
    description: "Simple and elegant with perfect whitespace balance",
    docxTemplate: "modern",
    tags: ["Minimal", "Clean", "Simple"],
    previewImage: "/templates/minimal.png",
  },
  {
    id: 5,
    name: "Tech Innovator",
    description: "Modern design with a technical edge",
    docxTemplate: "professional",
    tags: ["Technical", "Modern", "Detailed"],
    previewImage: "/templates/tech.png",
  },
];

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const { resumeData } = useResume();

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
  };

  const handleDownload = async (template: Template) => {
    await generateAndDownloadResume(template.docxTemplate, resumeData);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative group rounded-xl overflow-hidden border ${
              selectedTemplate === template.id
                ? "border-[#fcba28]"
                : "border-white/10"
            } bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer`}
            onClick={() => onSelect(template.id)}
          >
            {/* Template Preview */}
            <div className="aspect-[8.5/11] relative">
              {template.previewImage ? (
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full p-4"
                  dangerouslySetInnerHTML={{
                    __html: generatePreviewHtml(template.docxTemplate, resumeData),
                  }}
                />
              )}
            </div>

            {/* Template Info */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {selectedTemplate === template.id && (
                  <Check className="w-5 h-5 text-[#fcba28]" />
                )}
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
        ))}
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
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: generatePreviewHtml(previewTemplate.docxTemplate, resumeData),
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
