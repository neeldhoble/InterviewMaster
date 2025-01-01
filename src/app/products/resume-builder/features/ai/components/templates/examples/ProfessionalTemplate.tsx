"use client";

import { motion } from "framer-motion";

interface TemplateProps {
  scale?: number;
  isPreview?: boolean;
}

export const ProfessionalTemplate = ({ scale = 1, isPreview = false }: TemplateProps) => {
  const baseWidth = 800;
  const baseHeight = 1130;
  
  return (
    <motion.div
      initial={isPreview ? { opacity: 0, scale: 0.9 } : {}}
      animate={isPreview ? { opacity: 1, scale: 1 } : {}}
      className="relative"
      style={{
        width: baseWidth * scale,
        height: baseHeight * scale,
      }}
    >
      <svg
        width={baseWidth * scale}
        height={baseHeight * scale}
        viewBox={`0 0 ${baseWidth} ${baseHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width={baseWidth} height={baseHeight} fill="white" />
        
        {/* Header Section */}
        <rect width={baseWidth} height="200" fill="#fcba28" />
        <foreignObject x="40" y="40" width="720" height="120">
          <div className="text-black">
            <h1 className="text-4xl font-bold mb-2">John Developer</h1>
            <p className="text-xl opacity-80">Senior Software Engineer</p>
          </div>
        </foreignObject>

        {/* Contact Info Bar */}
        <rect y="200" width={baseWidth} height="50" fill="#2A2A2A" />
        <foreignObject x="40" y="210" width="720" height="30">
          <div className="flex justify-between text-white text-sm">
            <span>john@developer.com</span>
            <span>+1 (555) 123-4567</span>
            <span>San Francisco, CA</span>
            <span>github.com/johndeveloper</span>
          </div>
        </foreignObject>

        {/* Main Content */}
        <foreignObject x="40" y="290" width="720" height="800">
          <div className="space-y-8">
            {/* Summary */}
            <div>
              <h2 className="text-xl font-bold text-[#fcba28] mb-3">Professional Summary</h2>
              <p className="text-gray-700">
                Senior Software Engineer with 8+ years of experience in full-stack development,
                specializing in scalable web applications and cloud architecture.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xl font-bold text-[#fcba28] mb-3">Experience</h2>
              <div className="space-y-4">
                {/* Experience Item 1 */}
                <div>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold">Senior Software Engineer</h3>
                    <span className="text-gray-600">2020 - Present</span>
                  </div>
                  <div className="text-gray-700 mb-2">Tech Corp, San Francisco</div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Led development of microservices architecture</li>
                    <li>Improved system performance by 40%</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-bold text-[#fcba28] mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "TypeScript", "React", "Node.js", "AWS"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </foreignObject>

        {/* Decorative Elements */}
        <rect x="40" y="270" width="50" height="4" fill="#fcba28" />
        <rect x="100" y="270" width="50" height="4" fill="#fcba28" opacity="0.6" />
        <rect x="160" y="270" width="50" height="4" fill="#fcba28" opacity="0.3" />
      </svg>
    </motion.div>
  );
};
