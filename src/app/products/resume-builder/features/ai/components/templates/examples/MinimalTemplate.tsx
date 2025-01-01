"use client";

import { motion } from "framer-motion";

interface TemplateProps {
  scale?: number;
  isPreview?: boolean;
}

export const MinimalTemplate = ({ scale = 1, isPreview = false }: TemplateProps) => {
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
        
        {/* Header */}
        <foreignObject x="40" y="40" width="720" height="120">
          <div>
            <h1 className="text-4xl font-light mb-2">John Developer</h1>
            <p className="text-lg text-gray-600">Senior Software Engineer</p>
          </div>
        </foreignObject>

        {/* Contact Info */}
        <foreignObject x="40" y="160" width="720" height="40">
          <div className="flex gap-6 text-sm text-gray-600">
            <span>john@developer.com</span>
            <span>•</span>
            <span>+1 (555) 123-4567</span>
            <span>•</span>
            <span>San Francisco, CA</span>
            <span>•</span>
            <span>github.com/johndeveloper</span>
          </div>
        </foreignObject>

        {/* Main Content */}
        <foreignObject x="40" y="240" width="720" height="850">
          <div className="space-y-8">
            {/* Summary */}
            <div>
              <h2 className="text-lg uppercase tracking-wider text-[#fcba28] mb-3">About</h2>
              <p className="text-gray-700">
                Senior Software Engineer with 8+ years of experience in full-stack development,
                specializing in scalable web applications and cloud architecture.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-lg uppercase tracking-wider text-[#fcba28] mb-3">Experience</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">Senior Software Engineer</h3>
                    <span className="text-gray-600">2020 - Present</span>
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
              <h2 className="text-lg uppercase tracking-wider text-[#fcba28] mb-3">Skills</h2>
              <div className="flex flex-wrap gap-x-12 gap-y-2">
                {["JavaScript", "TypeScript", "React", "Node.js", "AWS"].map((skill) => (
                  <span key={skill} className="text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </foreignObject>

        {/* Minimal Decorative Line */}
        <line
          x1="40"
          y1="220"
          x2="760"
          y2="220"
          stroke="#fcba28"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
};
