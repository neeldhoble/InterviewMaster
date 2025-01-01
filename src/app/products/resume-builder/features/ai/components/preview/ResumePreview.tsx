"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Download,
  Share2,
  FileText,
  Image,
  FileCode,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { ProfessionalTemplate } from "../templates/examples/ProfessionalTemplate";
import { CreativeTemplate } from "../templates/examples/CreativeTemplate";
import { MinimalTemplate } from "../templates/examples/MinimalTemplate";
import { ModernTemplate } from "../templates/examples/ModernTemplate";
import { ExecutiveTemplate } from "../templates/examples/ExecutiveTemplate";
import {
  exportToPdf,
  exportToImage,
  exportToSvg,
  exportToDocx,
  shareResume,
  ExportFormat,
  exportFormats,
} from "../../utils/exportUtils";
import { analyzeResume } from "../../services/aiService";

interface ResumeData {
  templateId: number;
  personalInfo: any;
  experiences: any[];
  education: any[];
  skills: any[];
}

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  const [scale, setScale] = useState(0.8);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("pdf");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    score: number;
    suggestions: string[];
  } | null>(null);
  const [exportStatus, setExportStatus] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });

  const templates = {
    1: ProfessionalTemplate,
    2: CreativeTemplate,
    3: MinimalTemplate,
    4: ModernTemplate,
    5: ExecutiveTemplate,
  };

  const Template = templates[data.templateId as keyof typeof templates];

  const handleExport = async () => {
    setExportStatus({ loading: true, error: null });
    try {
      let success = false;

      switch (exportFormat) {
        case "pdf":
          success = await exportToPdf("resume-preview", {
            fileName: "my-resume",
            quality: 2,
            scale: 2,
          });
          break;
        case "png":
        case "jpeg":
          success = await exportToImage("resume-preview", exportFormat, {
            fileName: "my-resume",
            quality: 0.95,
            scale: 2,
          });
          break;
        case "svg":
          success = await exportToSvg("resume-preview", {
            fileName: "my-resume",
          });
          break;
        case "docx":
          success = await exportToDocx("resume-preview", {
            fileName: "my-resume",
          });
          break;
      }

      if (!success) throw new Error("Export failed");
      setExportStatus({ loading: false, error: null });
    } catch (error) {
      setExportStatus({
        loading: false,
        error: "Failed to export resume. Please try again.",
      });
    }
  };

  const handleShare = async () => {
    setExportStatus({ loading: true, error: null });
    try {
      const success = await shareResume("resume-preview");
      if (!success) throw new Error("Share failed");
      setExportStatus({ loading: false, error: null });
    } catch (error) {
      setExportStatus({
        loading: false,
        error: "Failed to share resume. Please try again.",
      });
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeResume(data);
      setAnalysis(result);
    } catch (error) {
      console.error("Failed to analyze resume:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Preview */}
      <div className="flex-1 flex flex-col items-center">
        <div className="mb-4 flex items-center gap-2">
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-32"
          />
          <span className="text-sm text-white/60">Preview Scale</span>
        </div>

        <div
          id="resume-preview"
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
        >
          <Template scale={scale} />
        </div>
      </div>

      {/* Controls */}
      <div className="w-full lg:w-80 space-y-6">
        {/* Export Options */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-medium mb-4">Export Options</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(exportFormats).map(([key, value]) => (
                <button
                  key={value}
                  onClick={() => setExportFormat(value)}
                  className={`p-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    exportFormat === value
                      ? "bg-[#fcba28] text-black"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {value === "pdf" && <FileText className="w-4 h-4" />}
                  {(value === "png" || value === "jpeg") && (
                    <Image className="w-4 h-4" />
                  )}
                  {value === "svg" && <FileCode className="w-4 h-4" />}
                  <span className="text-sm font-medium">
                    {key.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleExport}
                disabled={exportStatus.loading}
                className="flex-1 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={handleShare}
                disabled={exportStatus.loading}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {exportStatus.error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {exportStatus.error}
              </div>
            )}
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-medium mb-4">AI Analysis</h3>
          {!analysis ? (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-2 bg-[#fcba28]/10 border border-[#fcba28]/20 text-[#fcba28] rounded-lg font-medium hover:bg-[#fcba28]/20 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#fcba28] transition-all duration-1000"
                    style={{ width: `${analysis.score}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{analysis.score}%</span>
              </div>

              <div className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-white/80"
                  >
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#fcba28]" />
                    {suggestion}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setAnalysis(null)}
                className="text-sm text-white/60 hover:text-white/80 transition-colors"
              >
                Reset Analysis
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
