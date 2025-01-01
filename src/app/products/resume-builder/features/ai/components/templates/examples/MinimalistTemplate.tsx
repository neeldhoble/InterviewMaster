"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Github,
  Linkedin,
  Award,
  Book,
  Briefcase,
  Heart,
  Code,
  Languages,
} from "lucide-react";

interface MinimalistTemplateProps {
  data: any;
  scale?: number;
}

export const MinimalistTemplate = ({
  data,
  scale = 1,
}: MinimalistTemplateProps) => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    volunteer,
    achievements,
  } = data;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[21cm] bg-white text-gray-800 p-8 shadow-lg"
      style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
    >
      {/* Header */}
      <header className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-3xl font-light mb-2">{personalInfo?.name}</h1>
        <p className="text-lg text-gray-600 mb-4">{personalInfo?.title}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo?.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fcba28] transition-colors"
              >
                {personalInfo.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          {personalInfo?.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fcba28] transition-colors"
              >
                {personalInfo.github.split("/").pop()}
              </a>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fcba28] transition-colors"
              >
                {personalInfo.linkedin.split("/").pop()}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-light flex items-center gap-2 mb-4 text-gray-700">
            <Briefcase className="w-5 h-5" />
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  {exp.description.split("\n").map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-light flex items-center gap-2 mb-4 text-gray-700">
            <Book className="w-5 h-5" />
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-light flex items-center gap-2 mb-4 text-gray-700">
            <Code className="w-5 h-5" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: any, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Projects */}
          {projects?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-light flex items-center gap-2 mb-4 text-gray-700">
                <Code className="w-5 h-5" />
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-gray-700 mb-1">
                      {project.description}
                    </p>
                    {project.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-light flex items-center gap-2 mb-4 text-gray-700">
                <Languages className="w-5 h-5" />
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((lang: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="text-gray-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Certifications */}
          {certifications?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-light flex items-center gap-2 mb-4 text-gray-700">
                <Award className="w-5 h-5" />
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                    <p className="text-xs text-gray-500">
                      {cert.issueDate}
                      {cert.expiryDate && ` - ${cert.expiryDate}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Volunteer Work */}
          {volunteer?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-light flex items-center gap-2 mb-4 text-gray-700">
                <Heart className="w-5 h-5" />
                Volunteer Work
              </h2>
              <div className="space-y-3">
                {volunteer.map((vol: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-medium">{vol.role}</h3>
                    <p className="text-sm text-gray-600">{vol.organization}</p>
                    <p className="text-xs text-gray-500">
                      {vol.startDate} - {vol.current ? "Present" : vol.endDate}
                    </p>
                    {vol.description && (
                      <p className="text-sm text-gray-700 mt-1">
                        {vol.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Achievements */}
      {achievements?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-light flex items-center gap-2 mb-4 text-gray-700">
            <Award className="w-5 h-5" />
            Achievements
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement: any, index: number) => (
              <div key={index} className="text-sm">
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.organization}</p>
                <p className="text-gray-700 mt-1">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};
