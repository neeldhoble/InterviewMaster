yes do all "use client";

import { useResume } from "../../context/ResumeContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

export const ResumePreview = () => {
  const { resumeData } = useResume();

  const handleDownload = async () => {
    // Implement PDF download logic
    console.log("Downloading resume...");
  };

  const handleShare = async () => {
    // Implement share logic
    console.log("Sharing resume...");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resume Preview</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="p-8 bg-white text-black" id="resume-preview">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{resumeData.personalInfo.fullName}</h1>
          <div className="text-sm space-y-1">
            <p>{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
            <p>{resumeData.personalInfo.location}</p>
            {resumeData.personalInfo.linkedin && (
              <p>LinkedIn: {resumeData.personalInfo.linkedin}</p>
            )}
            {resumeData.personalInfo.portfolio && (
              <p>Portfolio: {resumeData.personalInfo.portfolio}</p>
            )}
          </div>
        </div>

        {/* Summary Section */}
        {resumeData.personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b mb-2">Professional Summary</h2>
            <p>{resumeData.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience Section */}
        {resumeData.experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b mb-2">Work Experience</h2>
            {resumeData.experiences.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">{exp.position}</h3>
                  <p className="text-sm">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                <p className="text-sm mb-2">{exp.company}</p>
                <ul className="list-disc list-inside">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                {exp.technologies && (
                  <p className="text-sm mt-1">
                    <span className="font-semibold">Technologies:</span>{" "}
                    {exp.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {resumeData.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b mb-2">Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
                </div>
                <p className="text-sm">{edu.institution}</p>
                {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Skills Section */}
        {resumeData.skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b mb-2">Skills</h2>
            <p>{resumeData.skills.join(", ")}</p>
          </section>
        )}

        {/* Projects Section */}
        {resumeData.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b mb-2">Projects</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">{project.name}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600">
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-sm mb-1">{project.description}</p>
                <p className="text-sm">
                  <span className="font-semibold">Technologies:</span>{" "}
                  {project.technologies.join(", ")}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Certifications Section */}
        {resumeData.certifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b mb-2">Certifications</h2>
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className="text-sm">{cert.date}</p>
                </div>
                <p className="text-sm">{cert.issuer}</p>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600">
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Languages Section */}
        {resumeData.languages.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b mb-2">Languages</h2>
            {resumeData.languages.map((lang, index) => (
              <div key={index} className="inline-block mr-4">
                <span className="font-semibold">{lang.name}:</span>{" "}
                <span>{lang.proficiency}</span>
              </div>
            ))}
          </section>
        )}

        {/* Volunteer Work Section */}
        {resumeData.volunteer.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b mb-2">Volunteer Experience</h2>
            {resumeData.volunteer.map((vol, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">{vol.role}</h3>
                  <p className="text-sm">{vol.startDate} - {vol.endDate}</p>
                </div>
                <p className="text-sm mb-1">{vol.organization}</p>
                <p className="text-sm">{vol.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Declaration Section */}
        {resumeData.declaration && (
          <section>
            <h2 className="text-xl font-bold border-b mb-2">Declaration</h2>
            <p className="text-sm">{resumeData.declaration}</p>
          </section>
        )}
      </Card>
    </div>
  );
};
