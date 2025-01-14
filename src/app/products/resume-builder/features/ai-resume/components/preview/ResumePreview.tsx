"use client";

import { useState, useEffect, useCallback } from "react";
import { useResume } from "../../context/ResumeContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Printer, FileText, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Add print-specific styles
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    #resume-preview, #resume-preview * {
      visibility: visible;
      color: #000000 !important;
    }
    #resume-preview {
      position: absolute;
      left: 0;
      top: 0;
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 20mm;
      font-size: 12pt;
    }
    .no-print {
      display: none !important;
    }
    .highlight-text {
      background-color: #ffeb3b !important;
      font-weight: 600 !important;
      padding: 0 4px !important;
      border-radius: 2px !important;
    }
    .section-title {
      border-color: #000000 !important;
      font-weight: 700 !important;
    }
  }
`;

export const ResumePreview = () => {
  const { resumeData } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const [atsScore, setAtsScore] = useState(null);

  // Calculate ATS score
  useEffect(() => {
    const calculateATSScore = async () => {
      if (!resumeData) return;
      
      try {
        const response = await fetch('/api/resume/analyze-ats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resumeData }),
        });

        if (!response.ok) throw new Error('Failed to analyze resume');
        
        const data = await response.json();
        setAtsScore(data.score);
      } catch (error) {
        console.error('Error calculating ATS score:', error);
        setAtsScore(null);
      }
    };

    calculateATSScore();
  }, [resumeData]);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-preview");
      if (!element) return;

      // Add temporary styles for PDF generation
      const style = document.createElement('style');
      style.textContent = `
        @media print {
          #resume-preview {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .highlight-text {
            background-color: #ffeb3b !important;
            font-weight: 600 !important;
            padding: 0 4px !important;
            border-radius: 2px !important;
          }
          .section-title {
            border-color: #000000 !important;
            font-weight: 700 !important;
          }
        }
      `;
      document.head.appendChild(style);

      // Set up html2canvas options
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: 794, // A4 width in pixels
        height: 1123, // A4 height in pixels
        onclone: (clonedDoc) => {
          // Ensure styles are applied in the cloned document
          const clonedElement = clonedDoc.getElementById('resume-preview');
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.width = '794px';
            clonedElement.style.height = '1123px';
            clonedElement.style.padding = '20mm';
          }
        }
      });

      // Create PDF with exact A4 dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions to maintain aspect ratio
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm

      // Add image to PDF with full A4 dimensions
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Remove temporary style
      document.head.removeChild(style);

      // Save the PDF
      pdf.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_resume.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDOC = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-preview");
      if (!element) return;

      // Convert resume content to HTML string
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${resumeData.personalInfo.fullName}'s Resume</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob([htmlContent], { type: "application/msword" });
      saveAs(blob, `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_resume.doc`);
    } catch (error) {
      console.error("Error generating DOC:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDOCX = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-preview");
      if (!element) return;

      // Similar to DOC but with DOCX mime type
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${resumeData.personalInfo.fullName}'s Resume</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      saveAs(blob, `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_resume.docx`);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        const element = document.getElementById("resume-preview");
        if (!element) return;

        // Convert to PDF first
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        const pdfBlob = pdf.output('blob');

        // Create file from blob
        const file = new File([pdfBlob], `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_resume.pdf`, {
          type: 'application/pdf'
        });

        await navigator.share({
          title: `${resumeData.personalInfo.fullName}'s Resume`,
          text: "Check out my professional resume!",
          files: [file]
        });
      } else {
        // Fallback for browsers that don't support native sharing
        const shareUrl = window.location.href;
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <>
      <style>{printStyles}</style>
      <div className="space-y-6 no-print">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Resume Preview</h2>
            {atsScore !== null && (
              <div className="mt-2 flex items-center">
                <span className="text-sm font-medium mr-2">ATS Score:</span>
                <div className="bg-gray-200 rounded-full h-2.5 w-40">
                  <div 
                    className={`h-2.5 rounded-full ${
                      atsScore >= 80 ? 'bg-green-600' :
                      atsScore >= 60 ? 'bg-yellow-400' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${atsScore}%` }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium">{atsScore}%</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={isGenerating}>
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  {isGenerating ? "Generating..." : "Download"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleDownloadPDF}>
                  <FileText className="w-4 h-4 mr-2" />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadDOC}>
                  <FileText className="w-4 h-4 mr-2" />
                  Download DOC
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadDOCX}>
                  <FileText className="w-4 h-4 mr-2" />
                  Download DOCX
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex justify-center">
          <div id="resume-preview" className="bg-white w-[210mm] min-h-[297mm] p-[20mm] shadow-lg text-black">
            <div className="mx-auto">
              {/* Resume Content */}
              <div className="space-y-6 mx-auto max-w-[180mm]">
                {/* Header Section */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-2">{resumeData.personalInfo.fullName}</h1>
                  <div className="space-y-1">
                    <p className="highlight-text">{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
                    {resumeData.personalInfo.location && (
                      <p>{resumeData.personalInfo.location}</p>
                    )}
                    {resumeData.personalInfo.linkedin && (
                      <p>
                        <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="highlight-text">
                          LinkedIn: {resumeData.personalInfo.linkedin}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                {/* Summary Section */}
                {resumeData.personalInfo.summary && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold border-b pb-1 section-title">Professional Summary</h3>
                    <p className="highlight-text">{resumeData.personalInfo.summary}</p>
                  </div>
                )}

                {/* Experience Section */}
                {resumeData.experiences?.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold border-b pb-1 section-title">Work Experience</h3>
                    {resumeData.experiences.map((exp, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold highlight-text">{exp.position}</h4>
                            <p className="highlight-text">{exp.company}</p>
                          </div>
                          <span className="font-semibold">
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </span>
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                          {exp.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                        {exp.technologies && (
                          <p>
                            <span className="font-bold">Technologies:</span>{" "}
                            <span className="highlight-text">{exp.technologies.join(", ")}</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Education Section */}
                {resumeData.education?.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold border-b pb-1 section-title">Education</h3>
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-bold highlight-text">{edu.degree} in {edu.field}</h4>
                            <p className="highlight-text">{edu.institution}</p>
                          </div>
                          <span className="font-semibold">
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                        {edu.gpa && <p><span className="font-bold">GPA:</span> <span className="highlight-text">{edu.gpa}</span></p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills Section */}
                {resumeData.skills?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold border-b pb-1 section-title">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 rounded-full text-sm font-semibold highlight-text">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects Section */}
                {resumeData.projects?.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold border-b pb-1 section-title">Projects</h3>
                    {resumeData.projects.map((project, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold highlight-text">{project.name}</h4>
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="highlight-text"
                            >
                              View Project
                            </a>
                          )}
                        </div>
                        <p>{project.description}</p>
                        {project.technologies && (
                          <p>
                            <span className="font-bold">Technologies:</span>{" "}
                            <span className="highlight-text">{project.technologies.join(", ")}</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications Section */}
                {resumeData.certifications?.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold border-b pb-1 section-title">Certifications</h3>
                    {resumeData.certifications.map((cert, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold highlight-text">{cert.name}</h4>
                            <p className="highlight-text">{cert.issuer}</p>
                          </div>
                          <span className="font-semibold">{cert.date}</span>
                        </div>
                        {cert.link && (
                          <a 
                            href={cert.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="highlight-text"
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Languages Section */}
                {resumeData.languages?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold border-b pb-1 section-title">Languages</h3>
                    <div className="flex flex-wrap gap-4">
                      {resumeData.languages.map((lang, index) => (
                        <div key={index}>
                          <span className="font-bold">{lang.name}:</span>{" "}
                          <span className="highlight-text">{lang.proficiency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Volunteer Work Section */}
                {resumeData.volunteer?.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold border-b pb-1 section-title">Volunteer Experience</h3>
                    {resumeData.volunteer.map((vol, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold highlight-text">{vol.role}</h4>
                            <p className="highlight-text">{vol.organization}</p>
                          </div>
                          <span className="font-semibold">
                            {vol.startDate} - {vol.endDate}
                          </span>
                        </div>
                        <p>{vol.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Declaration Section */}
                {resumeData.declaration && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold border-b pb-1 section-title">Declaration</h3>
                    <p>{resumeData.declaration}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
