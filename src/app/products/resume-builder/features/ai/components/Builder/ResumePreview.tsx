"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ResumePreviewProps {
  resumeData: any;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const renderSection = (title: string, content: React.ReactNode) => {
    if (!content) return null;
    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <Separator className="mb-3" />
        {content}
      </div>
    );
  };

  return (
    <Card className="bg-white p-8 shadow-lg overflow-auto max-h-[calc(100vh-8rem)]">
      <div className="space-y-6">
        {/* Personal Info */}
        {resumeData.personal && Object.keys(resumeData.personal).some(key => resumeData.personal[key]) && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{resumeData.personal.name}</h1>
            {resumeData.personal.title && (
              <p className="text-xl text-gray-600 mt-1">{resumeData.personal.title}</p>
            )}
            <div className="text-sm text-gray-500 mt-2 space-y-1">
              {resumeData.personal.email && <p>{resumeData.personal.email}</p>}
              {resumeData.personal.phone && <p>{resumeData.personal.phone}</p>}
              {resumeData.personal.location && <p>{resumeData.personal.location}</p>}
            </div>
            {resumeData.personal.summary && (
              <p className="mt-4 text-gray-700">{resumeData.personal.summary}</p>
            )}
          </div>
        )}

        {/* Experience */}
        {resumeData.experience?.length > 0 && renderSection(
          "Professional Experience",
          <div className="space-y-4">
            {resumeData.experience.map((exp: any, index: number) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                </div>
                <p className="text-sm mt-2 text-gray-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData.education?.length > 0 && renderSection(
          "Education",
          <div className="space-y-4">
            {resumeData.education.map((edu: any, index: number) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                    {edu.field && (
                      <p className="text-sm text-gray-500">{edu.field}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 whitespace-nowrap">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                    )}
                  </div>
                </div>
                {edu.achievements && (
                  <p className="text-sm mt-2 text-gray-700 whitespace-pre-line">{edu.achievements}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills?.length > 0 && renderSection(
          "Skills",
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects?.length > 0 && renderSection(
          "Projects",
          <div className="space-y-4">
            {resumeData.projects.map((project: any, index: number) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    {project.startDate} - {project.endDate || 'Present'}
                  </p>
                </div>
                <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {project.technologies}
                    </Badge>
                  </div>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 mt-1 block"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications?.length > 0 && renderSection(
          "Certifications",
          <div className="space-y-3">
            {resumeData.certifications.map((cert: any, index: number) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <h3 className="font-medium">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                <p className="text-sm text-gray-500">
                  Issued: {cert.issueDate}
                  {cert.expiryDate && ` · Expires: ${cert.expiryDate}`}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {resumeData.languages?.length > 0 && renderSection(
          "Languages",
          <div className="flex flex-wrap gap-4">
            {resumeData.languages.map((lang: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-medium">{lang.language}</span>
                <Badge variant="secondary" className="text-xs">
                  {lang.proficiency}
                </Badge>
                {lang.certification && (
                  <span className="text-xs text-gray-500">({lang.certification})</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {resumeData.awards?.length > 0 && renderSection(
          "Awards & Honors",
          <div className="space-y-3">
            {resumeData.awards.map((award: any, index: number) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <h3 className="font-medium">{award.title}</h3>
                <p className="text-sm text-gray-600">{award.issuer}</p>
                <p className="text-sm text-gray-500">{award.date}</p>
                {award.description && (
                  <p className="text-sm mt-1 text-gray-700 whitespace-pre-line">{award.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Volunteer Experience */}
        {resumeData.volunteer?.length > 0 && renderSection(
          "Volunteer Experience",
          <div className="space-y-4">
            {resumeData.volunteer.map((vol: any, index: number) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{vol.role}</h3>
                    <p className="text-gray-600">{vol.organization}</p>
                    <p className="text-sm text-gray-500">{vol.location}</p>
                  </div>
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    {vol.startDate} - {vol.endDate || 'Present'}
                  </p>
                </div>
                {vol.description && (
                  <p className="text-sm mt-2 text-gray-700 whitespace-pre-line">{vol.description}</p>
                )}
                {vol.impact && (
                  <p className="text-sm mt-1 text-gray-700 whitespace-pre-line">{vol.impact}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Publications */}
        {resumeData.publications?.length > 0 && renderSection(
          "Publications",
          <div className="space-y-4">
            {resumeData.publications.map((pub: any, index: number) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <h3 className="font-medium">{pub.title}</h3>
                <p className="text-sm text-gray-600">{pub.authors}</p>
                <p className="text-sm text-gray-500">
                  {pub.publisher} · {pub.date}
                </p>
                {pub.abstract && (
                  <p className="text-sm mt-2 text-gray-700">{pub.abstract}</p>
                )}
                {pub.doi && (
                  <p className="text-sm text-gray-500 mt-1">DOI: {pub.doi}</p>
                )}
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 mt-1 block"
                  >
                    View Publication →
                  </a>
                )}
                {pub.citation && (
                  <p className="text-xs text-gray-500 mt-2 font-mono">{pub.citation}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
