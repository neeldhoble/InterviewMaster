"use client";

import { useState, useEffect } from "react";
import { useResume } from "../../context/ResumeContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, FileText, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Resume template styles
const styles = {
  section: "mb-6",
  sectionTitle: "text-lg font-bold border-b pb-1 mb-3",
  subsection: "mb-4",
  highlight: "font-semibold",
  list: "list-disc list-inside",
  listItem: "mb-1",
};

export const ResumePreview = () => {
  const { resumeData } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [error, setError] = useState<string | null>(null);

  // Calculate ATS score
  useEffect(() => {
    const calculateScore = async () => {
      try {
        setError(null);
        const response = await fetch('/api/resume/analyze-ats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resumeData }),
        });

        if (!response.ok) {
          if (response.status === 429) {
            setError('API quota exceeded. Please try again later.');
          } else {
            setError('Error calculating ATS score. Please try again later.');
          }
          setAtsScore(null);
        } else {
          const data = await response.json();
          setAtsScore(data.score);
          setError(null);
        }
      } catch (err) {
        setError('Error calculating ATS score. Please try again later.');
        setAtsScore(null);
      }
    };
    calculateScore();
  }, [resumeData]);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-preview");
      if (!element) return;

      // Calculate total height of content
      const contentHeight = element.scrollHeight;
      const a4Width = 794; // A4 width in pixels
      const a4Height = 1123; // A4 height in pixels
      const totalPages = Math.ceil(contentHeight / a4Height);

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Generate each page
      for (let page = 0; page < totalPages; page++) {
        // Create canvas for current page
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          width: a4Width,
          height: a4Height,
          windowWidth: a4Width,
          windowHeight: contentHeight,
          y: page * a4Height,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.getElementById('resume-preview');
            if (clonedElement) {
              clonedElement.style.transform = 'none';
              clonedElement.style.width = '794px';
              clonedElement.style.minHeight = `${contentHeight}px`;
              clonedElement.style.padding = '20mm';
            }
          }
        });

        // Add page to PDF
        if (page > 0) {
          pdf.addPage();
        }

        const imgData = canvas.toDataURL('image/png', 1.0);
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      }

      // Save the PDF
      pdf.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_resume.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDOC = () => {
    const content = document.getElementById("resume-preview")?.innerHTML;
    if (!content) return;

    const blob = new Blob([content], { type: "application/msword" });
    saveAs(blob, `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_resume.doc`);
  };

  const handleDownloadDOCX = () => {
    const content = document.getElementById("resume-preview")?.innerHTML;
    if (!content) return;

    const blob = new Blob([content], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    saveAs(blob, `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_resume.docx`);
  };

  const handleShare = async () => {
    try {
      const element = document.getElementById("resume-preview");
      if (!element) return;

      const canvas = await html2canvas(element);
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        try {
          await navigator.share({
            files: [new File([blob], "resume.png", { type: "image/png" })],
            title: "My Resume",
            text: "Check out my resume!",
          });
        } catch (error) {
          console.error("Error sharing:", error);
        }
      });
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Resume Preview</h2>
          {error && (
            <p className="text-red-500 text-sm mt-1">
              {error}
            </p>
          )}
          {atsScore !== null && !error && (
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

      <Card className="p-6 bg-white">
        <div id="resume-preview" className="max-w-4xl mx-auto text-black">
          {/* Resume Content */}
          <div className="space-y-6">
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

            {/* Experience Section */}
            {resumeData.experiences?.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Work Experience</h3>
                {resumeData.experiences.map((exp, index) => (
                  <div key={index} className={styles.subsection}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold highlight-text">{exp.position}</h4>
                        <p className="highlight-text">{exp.company}</p>
                      </div>
                      <span className="font-semibold">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <ul className={styles.list}>
                      {exp.description.map((desc, i) => (
                        <li key={i} className={styles.listItem}>{desc}</li>
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

            {/* Summary Section */}
            {resumeData.personalInfo.summary && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Professional Summary</h3>
                <p className="highlight-text">{resumeData.personalInfo.summary}</p>
              </div>
            )}

            {/* Education Section */}
            {resumeData.education?.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Education</h3>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className={styles.subsection}>
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
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Skills</h3>
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
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Projects</h3>
                {resumeData.projects.map((project, index) => (
                  <div key={index} className={styles.subsection}>
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
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Certifications</h3>
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className={styles.subsection}>
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
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Languages</h3>
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
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Volunteer Experience</h3>
                {resumeData.volunteer.map((vol, index) => (
                  <div key={index} className={styles.subsection}>
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
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Declaration</h3>
                <p>{resumeData.declaration}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
