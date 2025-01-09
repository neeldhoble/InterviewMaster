"use client";

import { motion } from "framer-motion";
import { ResumeData } from "../../../../../context/ResumeContext";
import { formatDate } from "../utils/dateUtils";

interface GeminiTemplateProps {
  data: ResumeData;
  scale?: number;
}

export function GeminiTemplate({ data, scale = 1 }: GeminiTemplateProps) {
  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: "top left",
  };

  return (
    <div 
      style={containerStyle}
      className="w-[210mm] min-h-[297mm] bg-white text-black p-8 shadow-lg"
    >
      {/* Header Section with Gradient */}
      <div className="relative overflow-hidden rounded-lg mb-6 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
          <p className="text-lg mb-2">{data.personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span>{data.personalInfo.email}</span>
            <span>{data.personalInfo.phone}</span>
            <span>{data.personalInfo.location}</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12" />
      </div>

      {/* Professional Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-2 border-b-2 border-blue-600 pb-1">
          Professional Summary
        </h2>
        <p className="text-gray-700">{data.personalInfo.summary}</p>
      </div>

      {/* Experience Section */}
      {data.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-4 border-l-2 border-purple-200"
              >
                <div className="absolute left-0 top-0 w-2 h-2 bg-purple-600 rounded-full transform -translate-x-[5px]" />
                <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                <div className="text-purple-600 font-medium">{exp.company}</div>
                <div className="text-sm text-gray-600 mb-2">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
                <p className="text-gray-700">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="pl-4 border-l-2 border-purple-200">
                <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                <div className="text-purple-600">{edu.school}</div>
                <div className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                </div>
                {edu.description && (
                  <p className="text-gray-700 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-1">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-purple-100"
              >
                <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                <div className="text-purple-600 text-sm mb-2">
                  {project.technologies.join(", ")}
                </div>
                <p className="text-gray-700">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-1">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-xl font-bold">
                    {cert.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                  <div className="text-sm text-gray-600">{cert.issuer}</div>
                  <div className="text-sm text-purple-600">{formatDate(cert.date)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
