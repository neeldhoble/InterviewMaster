"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Calendar,
  Building,
  Github,
  Link2,
  Award,
  Book,
  Heart,
  Code,
  Languages,
} from "lucide-react";
import { ResumeData } from "../../../../../context/ResumeContext";
import { TemplateProps } from "../types";

const formatDate = (date: string, current: boolean = false) => {
  if (!date) return '';
  if (current) return 'Present';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export function GeminiTemplate({ data, scale = 1 }: TemplateProps) {
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
      className="w-[21cm] bg-white shadow-lg mx-auto"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        minHeight: "29.7cm",
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
        <p className="text-xl mb-4">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 text-sm">
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
                className="hover:text-blue-200"
              >
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content - Left 2 Columns */}
          <div className="col-span-2 space-y-8">
            {/* Experience */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Experience</h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-8 border-l-2 border-blue-100">
                      <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-blue-500" />
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{exp.title}</h3>
                          <div className="text-gray-600 flex items-center gap-2">
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
                        <div className="text-gray-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(exp.startDate)} - {formatDate(exp.endDate, exp.current)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Education</h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative pl-8 border-l-2 border-blue-100">
                      <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-blue-500" />
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{edu.school}</h3>
                          <p className="text-gray-600">
                            {edu.degree}{edu.field && ` in ${edu.field}`}
                          </p>
                        </div>
                        <div className="text-gray-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate, edu.current)}
                          </span>
                        </div>
                      </div>
                      {edu.description && <p className="text-gray-700">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Projects</h2>
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id} className="relative pl-8 border-l-2 border-blue-100">
                      <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-blue-500" />
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{project.name}</h3>
                          <p className="text-gray-600">{project.role}</p>
                        </div>
                        <div className="text-gray-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(project.startDate)} - {formatDate(project.endDate, project.current)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
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
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
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
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Skills</h2>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-blue-600 text-sm">
                          {Array(skill.level).fill('●').join(' ')}
                        </span>
                      </div>
                      <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${skill.level * 20}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Languages</h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center">
                      <span className="text-gray-700">{lang.name}</span>
                      <span className="text-blue-600 text-sm">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Certifications</h2>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="group">
                      <h3 className="font-bold">{cert.name}</h3>
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
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 mt-1"
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
          </div>
        </div>

        {/* Full Width Sections */}
        {/* Volunteer Work */}
        {volunteerWork.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Volunteer Experience</h2>
            <div className="space-y-6">
              {volunteerWork.map((vol) => (
                <div key={vol.id} className="relative pl-8 border-l-2 border-blue-100">
                  <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-blue-500" />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{vol.organization}</h3>
                      <div className="text-gray-600 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
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
                    <div className="text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(vol.startDate)} - {formatDate(vol.endDate, vol.current)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{vol.description}</p>
                  {vol.impact && (
                    <p className="text-gray-700 mb-2">
                      <strong>Impact:</strong> {vol.impact}
                    </p>
                  )}
                  {vol.causes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {vol.causes.map((cause, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded"
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
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="relative pl-8 border-l-2 border-blue-100">
                  <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-blue-500" />
                  <h3 className="font-bold text-lg">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{formatDate(achievement.date)}</p>
                  <p className="text-gray-700">{achievement.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Declaration */}
        {data.declaration && (
          <section className="mt-8 pt-8 border-t-2 border-blue-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Declaration</h2>
            <p className="text-gray-700 leading-relaxed">{data.declaration}</p>
          </section>
        )}
      </div>
    </motion.div>
  );
}
