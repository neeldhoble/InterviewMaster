"use client";

import { useResume } from "../../context/ResumeContext";
import { generatePreviewHtml } from "../../utils/docxTemplates";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Download,
  Share2,
  FileText,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  exportToPdf,
  exportToImage,
  exportToDocx,
  shareResume,
  ExportFormat,
  exportFormats,
} from "../../utils/exportUtils";
import { analyzeResume } from "../../services/aiService";

export function ResumePreview() {
  const { resumeData } = useResume();
  const [scale, setScale] = useState(1);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  // Update preview HTML when resume data changes
  useEffect(() => {
    setPreviewHtml(generatePreviewHtml("modern", resumeData));
  }, [resumeData]);

  const handleExport = async (format: ExportFormat) => {
    if (!previewRef.current) return;
    setShowExportOptions(false);

    try {
      switch (format) {
        case "pdf":
          await exportToPdf(previewRef.current);
          break;
        case "image":
          await exportToImage(previewRef.current);
          break;
        case "docx":
          await exportToDocx(resumeData);
          break;
        default:
          console.error("Unsupported format");
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleShare = async () => {
    if (!previewRef.current) return;
    await shareResume(previewRef.current);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeResume(resumeData);
      setAnalysisResult(result);
      setShowAnalysis(true);
    } catch (error) {
      console.error("Analysis failed:", error);
    }
    setIsAnalyzing(false);
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  // Close export options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showExportOptions && !event.target?.closest(".export-options")) {
        setShowExportOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showExportOptions]);

  return (
    <div className="relative h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={zoomOut}
            disabled={scale <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <Button
            variant="outline"
            size="icon"
            onClick={zoomIn}
            disabled={scale >= 2}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="export-options"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <AnimatePresence>
              {showExportOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10 min-w-[150px] export-options"
                >
                  {exportFormats.map((format) => (
                    <Button
                      key={format}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleExport(format)}
                    >
                      Export as {format.toUpperCase()}
                    </Button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            <FileText className="h-4 w-4 mr-2" />
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-gray-100 p-8">
        <div
          ref={previewRef}
          id="resume-preview"
          className="mx-auto bg-white shadow-lg transition-transform duration-200"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            width: "21cm",
            minHeight: "29.7cm",
          }}
        >
          <div
            key={resumeData.personalInfo.fullName} // Force re-render on name change
            className="h-full"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      </div>

      {/* Analysis Results */}
      <AnimatePresence>
        {showAnalysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/95 backdrop-blur-sm p-6 overflow-auto"
          >
            <Button
              variant="ghost"
              className="absolute top-4 right-4"
              onClick={() => setShowAnalysis(false)}
            >
              Close
            </Button>
            <div className="prose prose-sm max-w-none">
              <h2>Resume Analysis</h2>
              <div dangerouslySetInnerHTML={{ __html: analysisResult }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
