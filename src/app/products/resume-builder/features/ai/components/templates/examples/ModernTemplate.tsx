"use client";

import { TemplateProps } from "../types";
import { Phone, Mail, Globe, MapPin, Calendar, Building, Github, Link2, Award, Book, Heart } from "lucide-react";

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  summary: string;
  declaration?: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: string;
}

interface Project {
  id: string;
  name: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialUrl?: string;
}

interface VolunteerWork {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
  impact: string;
  causes: string[];
  skills: string[];
}

interface ResumeData {
  templateId: number;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  achievements: Achievement[];
  certifications: Certification[];
  languages: Language[];
  projects: Project[];
  volunteerWork: VolunteerWork[];
  declaration?: string;
}

const formatDate = (date: string, current: boolean = false) => {
  if (!date) return '';
  if (current) return 'Present';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export function ModernTemplate({ data, scale = 1 }: TemplateProps) {
  const {
    personalInfo,
    experiences,
    education,
    skills,
    achievements,
    certifications,
    languages,
    projects,
    volunteerWork,
  } = data;

  return (
    <div
      className="w-[21cm] bg-white shadow-lg mx-auto"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        minHeight: "29.7cm",
      }}
    >
      <div className="p-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{personalInfo.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{personalInfo.title}</p>
          <div className="flex justify-center items-center gap-4 text-gray-600 flex-wrap">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-2">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-2">Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-4 h-4 bg-gray-200 rounded-full border-2 border-gray-400"></div>
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
                    <div className="text-gray-600 flex items-center gap-1 whitespace-nowrap">
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
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-2">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-4 h-4 bg-gray-200 rounded-full border-2 border-gray-400"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{edu.school}</h3>
                      <p className="text-gray-600">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                    </div>
                    <div className="text-gray-600 flex items-center gap-1 whitespace-nowrap">
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
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-2">Projects</h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-4 h-4 bg-gray-200 rounded-full border-2 border-gray-400"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{project.name}</h3>
                      <p className="text-gray-600">{project.role}</p>
                    </div>
                    <div className="text-gray-600 flex items-center gap-1 whitespace-nowrap">
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
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
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
                        className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
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
                        className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
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

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
                >
                  <span>{skill.name}</span>
                  {skill.level > 0 && (
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-500 rounded-full"
                        style={{ width: `${skill.level * 20}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-2">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                  <div>
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
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-2">Languages</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center gap-2">
                  <Book className="w-4 h-4 text-gray-500" />
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
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-2">Volunteer Experience</h2>
            <div className="space-y-6">
              {volunteerWork.map((vol) => (
                <div key={vol.id} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-4 h-4 bg-gray-200 rounded-full border-2 border-gray-400"></div>
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
                    <div className="text-gray-600 flex items-center gap-1 whitespace-nowrap">
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
                    <div className="flex flex-wrap gap-2 mb-2">
                      {vol.causes.map((cause, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
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
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-2">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm">{formatDate(achievement.date)}</p>
                    <p className="text-gray-700">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Declaration */}
        {data.declaration && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-2">Declaration</h2>
            <p className="text-gray-700 leading-relaxed">{data.declaration}</p>
          </section>
        )}
      </div>
    </div>
  );
}
