"use client";

import { motion } from "framer-motion";

interface TemplateProps {
  scale?: number;
  isPreview?: boolean;
}

export const ModernTemplate = ({ scale = 1, isPreview = false }: TemplateProps) => {
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
        
        {/* Modern Geometric Background */}
        <path
          d="M0 0 L800 0 L700 200 L0 200 Z"
          fill="#fcba28"
          opacity="0.9"
        />
        <path
          d="M800 0 L800 1130 L700 1130 L700 200 L800 0 Z"
          fill="#fcba28"
          opacity="0.1"
        />
        <circle cx="700" cy="100" r="50" fill="white" opacity="0.1" />

        {/* Header Content */}
        <foreignObject x="40" y="40" width="620" height="120">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">John Developer</h1>
            <p className="text-xl text-white/80">Senior Software Engineer</p>
          </div>
        </foreignObject>

        {/* Contact Info */}
        <foreignObject x="40" y="160" width="620" height="40">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              john@developer.com
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              +1 (555) 123-4567
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              San Francisco, CA
            </div>
          </div>
        </foreignObject>

        {/* Main Content */}
        <foreignObject x="40" y="240" width="620" height="850">
          <div className="space-y-8">
            {/* Summary */}
            <div>
              <h2 className="text-xl font-bold text-[#fcba28] mb-3 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#fcba28]" />
                Professional Summary
              </h2>
              <p className="text-gray-700">
                Senior Software Engineer with 8+ years of experience in full-stack development,
                specializing in scalable web applications and cloud architecture.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xl font-bold text-[#fcba28] mb-3 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#fcba28]" />
                Experience
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-gray-800">Senior Software Engineer</h3>
                    <span className="text-[#fcba28]">2020 - Present</span>
                  </div>
                  <div className="text-gray-600 mb-2">Tech Corp, San Francisco</div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Led development of microservices architecture</li>
                    <li>Improved system performance by 40%</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-bold text-[#fcba28] mb-3 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#fcba28]" />
                Skills
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {["JavaScript", "TypeScript", "React", "Node.js", "AWS"].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#fcba28]" />
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </foreignObject>
      </svg>
    </motion.div>
  );
};
