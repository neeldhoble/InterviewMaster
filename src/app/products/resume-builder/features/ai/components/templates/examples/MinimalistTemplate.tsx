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
  Calendar,
  Link2,
  Building,
} from "lucide-react";
import { TemplateProps } from "../types";

const formatDate = (date: string, current: boolean = false) => {
  if (!date) return '';
  if (current) return 'Present';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export function MinimalistTemplate({ data, scale = 1 }: TemplateProps) {
  const {
    personalInfo,
    experiences,
    education,
    skills,
    projects,
    certifications,
    languages,
    volunteerWork,
    achievements,
  } = data;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[21cm] bg-white text-gray-800 p-8 shadow-lg mx-auto"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        minHeight: "29.7cm",
      }}
    >
      {/* Header */}
      <header className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-3xl font-light mb-2">{personalInfo.name}</h1>
        <p className="text-lg text-gray-600 mb-4">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
              >
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            <span>Experience</span>
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="group">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{exp.title}</h3>
                    <div className="text-gray-600 text-sm flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      <span>{exp.company}</span>
                      {exp.location && (
                        <>
                          <span>•</span>
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm whitespace-nowrap">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate, exp.current)}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Book className="w-5 h-5" />
            <span>Education</span>
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.school}</h3>
                    <p className="text-gray-600 text-sm">
                      {edu.degree}{edu.field && ` in ${edu.field}`}
                    </p>
                  </div>
                  <div className="text-gray-600 text-sm whitespace-nowrap">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate, edu.current)}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            <span>Skills</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full"
              >
                {skill.name}
                {skill.level > 0 && (
                  <span className="ml-1 text-gray-500">
                    {Array(skill.level)
                      .fill("•")
                      .join("")}
                  </span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            <span>Projects</span>
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="group">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-gray-600 text-sm">{project.role}</p>
                  </div>
                  <div className="text-gray-600 text-sm whitespace-nowrap">
                    {formatDate(project.startDate)} - {formatDate(project.endDate, project.current)}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 text-sm">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      <Link2 className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span>Certifications</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="group">
                <h3 className="font-medium">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.issuer}</p>
                <p className="text-gray-500 text-sm">
                  {formatDate(cert.date)}
                  {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
                </p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1 mt-1"
                  >
                    <Link2 className="w-3 h-3" />
                    <span>View Credential</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Languages className="w-5 h-5" />
            <span>Languages</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-2">
                <span className="font-medium">{lang.name}</span>
                {lang.proficiency && (
                  <span className="text-gray-600 text-sm">({lang.proficiency})</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Volunteer Work */}
      {volunteerWork.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            <span>Volunteer Experience</span>
          </h2>
          <div className="space-y-4">
            {volunteerWork.map((vol) => (
              <div key={vol.id} className="group">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{vol.organization}</h3>
                    <div className="text-gray-600 text-sm flex items-center gap-2">
                      <span>{vol.role}</span>
                      {vol.location && (
                        <>
                          <span>•</span>
                          <MapPin className="w-4 h-4" />
                          <span>{vol.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm whitespace-nowrap">
                    {formatDate(vol.startDate)} - {formatDate(vol.endDate, vol.current)}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">{vol.description}</p>
                {vol.impact && (
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Impact:</strong> {vol.impact}
                  </p>
                )}
                {vol.causes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {vol.causes.map((cause, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded"
                      >
                        {cause}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span>Achievements</span>
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="group">
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{formatDate(achievement.date)}</p>
                <p className="text-gray-700 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Declaration */}
      {data.declaration && (
        <section className="mt-8 pt-4 border-t border-gray-200">
          <h2 className="text-xl font-light mb-4">Declaration</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.declaration}</p>
        </section>
      )}
    </motion.div>
  );
}
