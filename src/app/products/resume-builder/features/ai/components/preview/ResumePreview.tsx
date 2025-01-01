"use client";

import { useResume } from "../../context/ResumeContext";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Download,
  Share2,
  FileText,
  Image,
  FileCode,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { ProfessionalTemplate } from "../templates/examples/ProfessionalTemplate";
import { CreativeTemplate } from "../templates/examples/CreativeTemplate";
import { MinimalTemplate } from "../templates/examples/MinimalTemplate";
import { ModernTemplate } from "../templates/examples/ModernTemplate";
import { ExecutiveTemplate } from "../templates/examples/ExecutiveTemplate";
import { Button } from "@/components/ui/button";
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

export const ResumePreview = () => {
  const { resumeData } = useResume();
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

  const previewRef = useRef<HTMLDivElement>(null);

  const templates = {
    1: ProfessionalTemplate,
    2: CreativeTemplate,
    3: MinimalTemplate,
    4: ModernTemplate,
    5: ExecutiveTemplate,
  };

  const Template = templates[resumeData.templateId as keyof typeof templates] || ProfessionalTemplate;

  const handleExport = async () => {
    if (!previewRef.current) return;

    setExportStatus({ loading: true, error: null });
    try {
      let success = false;

      switch (exportFormat) {
        case "pdf":
          success = await exportToPdf(previewRef.current, "resume.pdf");
          break;
        case "png":
          success = await exportToImage(previewRef.current, "resume.png");
          break;
        case "svg":
          success = await exportToSvg(previewRef.current, "resume.svg");
          break;
        case "docx":
          success = await exportToDocx(previewRef.current, "resume.docx");
          break;
      }

      if (success) {
        setExportStatus({ loading: false, error: null });
      } else {
        throw new Error("Export failed");
      }
    } catch (error) {
      setExportStatus({
        loading: false,
        error: "Failed to export resume. Please try again.",
      });
    }
  };

  const handleShare = async () => {
    if (!previewRef.current) return;
    
    setExportStatus({ loading: true, error: null });
    try {
      const success = await shareResume(previewRef.current);
      if (success) {
        setExportStatus({ loading: false, error: null });
      } else {
        throw new Error("Share failed");
      }
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
      const result = await analyzeResume(resumeData);
      setAnalysis(result);
    } catch (error) {
      console.error("Failed to analyze resume:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.3));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              className="border-white/10"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              className="border-white/10"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-white/10"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
          </Button>
          <Button onClick={handleShare} variant="outline" className="border-white/10">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleExport} className="bg-[#fcba28] text-black hover:bg-[#fcba28]/90">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto">
        <div
          ref={previewRef}
          id="resume-preview"
          className="mx-auto transition-transform duration-200"
          style={{
            width: "fit-content",
          }}
        >
          <Template data={resumeData} scale={scale} isPreview={true} />
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" />
            Resume Analysis Score: {analysis.score}/100
          </h3>
          <div className="space-y-2">
            {analysis.suggestions.map((suggestion, index) => (
              <p key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 text-[#fcba28]" />
                {suggestion}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Export Status */}
      {exportStatus.error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {exportStatus.error}
        </div>
      )}
    </div>
  );
};
