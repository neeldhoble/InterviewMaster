"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, X } from "lucide-react";
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
  tags: string[];
}

const templates: Template[] = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and traditional layout perfect for corporate roles",
    component: ProfessionalTemplate,
    tags: ["Corporate", "Traditional", "Clean"],
  },
  {
    id: 2,
    name: "Creative",
    description: "Bold and unique design for creative professionals",
    component: CreativeTemplate,
    tags: ["Creative", "Bold", "Modern"],
  },
  {
    id: 3,
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    component: MinimalTemplate,
    tags: ["Minimal", "Simple", "Elegant"],
  },
  {
    id: 4,
    name: "Modern",
    description: "Contemporary design with a professional edge",
    component: ModernTemplate,
    tags: ["Modern", "Professional", "Sleek"],
  },
  {
    id: 5,
    name: "Executive",
    description: "Sophisticated layout for senior positions",
    component: ExecutiveTemplate,
    tags: ["Executive", "Leadership", "Premium"],
  },
];

export const TemplateSelector = ({
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) => {
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const uniqueTags = Array.from(
    new Set(templates.flatMap((template) => template.tags))
  );

  const filteredTemplates = templates.filter((template) =>
    filter === "all" ? true : template.tags.includes(filter)
  );

  return (
    <div className="space-y-8">
      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            filter === "all"
              ? "bg-[#fcba28] text-black"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          All
        </button>
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === tag
                ? "bg-[#fcba28] text-black"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: template.id * 0.1 }}
          >
            <div
              className={`w-full text-left transition-all ${
                selectedTemplate === template.id
                  ? "scale-[1.02]"
                  : "hover:scale-[1.02]"
              }`}
            >
              <div
                className={`relative aspect-[1/1.4] rounded-lg overflow-hidden cursor-pointer ${
                  selectedTemplate === template.id
                    ? "ring-2 ring-[#fcba28]"
                    : "ring-1 ring-white/10"
                }`}
                onClick={() => setPreviewTemplate(template)}
              >
                {/* Template Preview */}
                <div className="absolute inset-0 transform scale-[0.2] origin-top-left">
                  <template.component isPreview />
                </div>

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity ${
                    hoveredTemplate === template.id || selectedTemplate === template.id
                      ? "bg-black/60 backdrop-blur-sm opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm font-medium">
                      View Template
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{template.name}</h3>
                  <button
                    onClick={() => onSelect(template.id)}
                    className={`px-4 py-1 rounded-full text-sm transition-colors ${
                      selectedTemplate === template.id
                        ? "bg-[#fcba28] text-black"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {selectedTemplate === template.id ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Selected
                      </span>
                    ) : (
                      "Select"
                    )}
                  </button>
                </div>
                <p className="text-sm text-white/60">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl bg-[#1a1a1a] rounded-xl shadow-xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-medium">{previewTemplate.name}</h3>
                  <p className="text-sm text-white/60">{previewTemplate.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onSelect(previewTemplate.id)}
                    className={`px-6 py-2 rounded-lg text-sm transition-colors ${
                      selectedTemplate === previewTemplate.id
                        ? "bg-[#fcba28] text-black"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {selectedTemplate === previewTemplate.id ? "Selected" : "Use This Template"}
                  </button>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Template Preview */}
              <div className="p-8 max-h-[80vh] overflow-y-auto">
                <div className="w-full">
                  <previewTemplate.component />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
