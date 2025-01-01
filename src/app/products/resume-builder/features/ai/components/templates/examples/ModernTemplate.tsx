"use client";

import { TemplateProps } from "../types";
import { Phone, Mail, Globe, MapPin, Calendar, Building } from "lucide-react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
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

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  description?: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
  technologies: string[];
}

interface Volunteer {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
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
  volunteer: Volunteer[];
}

const defaultData: ResumeData = {
  templateId: 1,
  personalInfo: {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "www.johndoe.com",
    summary: "Senior Software Engineer with 5+ years of experience in full-stack development...",
    declaration: "I hereby declare that all the information stated above is true and correct to the best of my knowledge and belief. I understand that any willful misstatement described herein may lead to disqualification or dismissal.",
  },
  experiences: [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      startDate: "2020",
      endDate: "Present",
      current: true,
      description: "Led development of microservices architecture...",
    }
  ],
  education: [
    {
      id: "1",
      school: "University of Technology",
      degree: "Bachelor's",
      field: "Computer Science",
      startDate: "2015",
      endDate: "2019",
      current: false,
      description: "Major in Software Engineering",
    }
  ],
  skills: [
    {
      id: "1",
      name: "JavaScript",
      level: 5,
      category: "Programming",
    },
    {
      id: "2",
      name: "React",
      level: 5,
      category: "Frontend",
    }
  ],
  achievements: [
    {
      id: "1",
      title: "Best Developer Award",
      date: "2022",
      description: "Awarded for exceptional contributions to project success",
    }
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2021",
      expiry: "2024",
      description: "Professional level certification",
    }
  ],
  languages: [
    {
      id: "1",
      name: "English",
      proficiency: "Native",
    },
    {
      id: "2",
      name: "Spanish",
      proficiency: "Professional",
    }
  ],
  projects: [
    {
      id: "1",
      title: "E-commerce Platform",
      description: "Built a scalable e-commerce platform using microservices",
      startDate: "2021",
      endDate: "2022",
      current: false,
      technologies: ["React", "Node.js", "AWS"],
    }
  ],
  volunteer: [
    {
      id: "1",
      role: "Tech Mentor",
      organization: "Code.org",
      startDate: "2019",
      endDate: "Present",
      current: true,
      description: "Mentoring students in web development",
    }
  ],
};

export const ModernTemplate = ({ data = defaultData, scale = 1 }: TemplateProps) => {
  const {
    personalInfo,
    experiences,
    education,
    skills,
    achievements,
    certifications,
    languages,
    projects,
    volunteer,
  } = data;

  return (
    <div 
      className="bg-white text-gray-800 min-h-[1056px] w-[816px] shadow-lg"
      style={{ 
        fontSize: `${14 * scale}px`,
      }}
    >
      {/* Header with Accent Color */}
      <div className="bg-[#2A4365] text-white px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">{personalInfo.fullName || "Your Name"}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-[#90CDF4]" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#90CDF4]" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[#90CDF4]" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#90CDF4]" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        {personalInfo.summary && (
          <p className="mt-6 text-gray-200 leading-relaxed max-w-3xl">
            {personalInfo.summary}
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Experience & Education */}
          <div className="col-span-2 space-y-8">
            {/* Experience Section */}
            {experiences?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-[#2A4365] border-b-2 border-[#90CDF4] pb-2">
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200">
                      <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#90CDF4]" />
                      <h3 className="font-bold text-lg text-gray-800">{exp.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <Building size={16} className="mr-2 text-[#2A4365]" />
                        <span className="font-medium">{exp.company}</span>
                        <span className="mx-2">•</span>
                        <span>{exp.location}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2 flex items-center">
                        <Calendar size={14} className="mr-2 text-[#2A4365]" />
                        <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-[#2A4365] border-b-2 border-[#90CDF4] pb-2">
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative pl-6 border-l-2 border-gray-200">
                      <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#90CDF4]" />
                      <h3 className="font-bold text-lg text-gray-800">
                        {edu.degree} in {edu.field}
                      </h3>
                      <div className="text-gray-700 font-medium">
                        {edu.school}
                      </div>
                      <div className="text-sm text-gray-600 mb-2 flex items-center">
                        <Calendar size={14} className="mr-2 text-[#2A4365]" />
                        <span>{edu.startDate} - {edu.current ? "Present" : edu.endDate}</span>
                      </div>
                      {edu.description && (
                        <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Skills & Other Sections */}
          <div className="space-y-8">
            {/* Skills Section */}
            {skills?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-[#2A4365] border-b-2 border-[#90CDF4] pb-2">
                  Skills
                </h2>
                <div className="space-y-6">
                  {Object.entries(
                    skills.reduce((acc, skill) => {
                      acc[skill.category] = acc[skill.category] || [];
                      acc[skill.category].push(skill);
                      return acc;
                    }, {} as Record<string, typeof skills>)
                  ).map(([category, categorySkills]) => (
                    <div key={category}>
                      <h3 className="font-bold text-gray-700 mb-3">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <span
                            key={skill.id}
                            className="px-3 py-1 bg-[#EBF8FF] text-[#2A4365] text-sm rounded-full font-medium"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages Section */}
            {languages?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-[#2A4365] border-b-2 border-[#90CDF4] pb-2">
                  Languages
                </h2>
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{lang.name}</span>
                      <span className="text-[#2A4365] bg-[#EBF8FF] px-3 py-1 rounded-full text-sm">
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications Section */}
            {certifications?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-[#2A4365] border-b-2 border-[#90CDF4] pb-2">
                  Certifications
                </h2>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="relative pl-6 border-l-2 border-gray-200">
                      <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#90CDF4]" />
                      <h3 className="font-bold text-gray-800">{cert.name}</h3>
                      <div className="text-sm text-gray-600">
                        {cert.issuer} • {cert.date}
                        {cert.expiry && ` - ${cert.expiry}`}
                      </div>
                      {cert.description && (
                        <p className="text-gray-700 mt-1 text-sm">{cert.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-8 grid grid-cols-2 gap-8">
          {/* Projects Section */}
          {projects?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#2A4365] border-b-2 border-[#90CDF4] pb-2">
                Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="relative pl-6 border-l-2 border-gray-200">
                    <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#90CDF4]" />
                    <h3 className="font-bold text-gray-800">{project.title}</h3>
                    <div className="text-sm text-gray-600 mb-2">
                      {project.startDate} - {project.current ? "Present" : project.endDate}
                    </div>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-[#EBF8FF] text-[#2A4365] text-xs rounded-full"
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

          {/* Achievements Section */}
          {achievements?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#2A4365] border-b-2 border-[#90CDF4] pb-2">
                Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="relative pl-6 border-l-2 border-gray-200">
                    <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#90CDF4]" />
                    <h3 className="font-bold text-gray-800">{achievement.title}</h3>
                    <div className="text-sm text-gray-600 mb-1">{achievement.date}</div>
                    <p className="text-gray-700">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Volunteer Section */}
        {volunteer?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2A4365] border-b-2 border-[#90CDF4] pb-2">
              Volunteer Experience
            </h2>
            <div className="space-y-6">
              {volunteer.map((vol) => (
                <div key={vol.id} className="relative pl-6 border-l-2 border-gray-200">
                  <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#90CDF4]" />
                  <h3 className="font-bold text-gray-800">{vol.role}</h3>
                  <div className="text-gray-700 font-medium">{vol.organization}</div>
                  <div className="text-sm text-gray-600 mb-2">
                    {vol.startDate} - {vol.current ? "Present" : vol.endDate}
                  </div>
                  <p className="text-gray-700">{vol.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Declaration Section */}
        {personalInfo.declaration && (
          <section className="mt-8 pt-8 border-t-2 border-[#90CDF4]">
            <h2 className="text-2xl font-bold mb-4 text-[#2A4365] flex items-center">
              <span className="mr-2">Declaration</span>
            </h2>
            <div className="bg-[#EBF8FF] p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed italic">{personalInfo.declaration}</p>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</div>
                <div className="text-sm text-gray-600">Signature: {personalInfo.fullName}</div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
