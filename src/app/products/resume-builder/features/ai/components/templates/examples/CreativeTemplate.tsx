"use client";

import { motion } from "framer-motion";

interface TemplateProps {
  scale?: number;
  isPreview?: boolean;
}

export const CreativeTemplate = ({ scale = 1, isPreview = false }: TemplateProps) => {
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
        
        {/* Left Sidebar */}
        <path
          d="M0 0h280v1130H0z"
          fill="#fcba28"
        />
        <path
          d="M280 0c-50 150-50 300 0 450c50 150 50 300 0 450"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />

        {/* Profile Section */}
        <foreignObject x="40" y="40" width="200" height="200">
          <div className="w-40 h-40 rounded-full bg-white overflow-hidden">
            {/* Profile image placeholder */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              Photo
            </div>
          </div>
        </foreignObject>

        {/* Contact Info */}
        <foreignObject x="40" y="260" width="200" height="200">
          <div className="text-white space-y-4">
            <div>
              <h3 className="font-bold mb-1">Contact</h3>
              <div className="text-sm space-y-1 opacity-90">
                <p>john@developer.com</p>
                <p>+1 (555) 123-4567</p>
                <p>San Francisco, CA</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-1">Skills</h3>
              <div className="text-sm space-y-1 opacity-90">
                <p>JavaScript</p>
                <p>React</p>
                <p>Node.js</p>
                <p>AWS</p>
              </div>
            </div>
          </div>
        </foreignObject>

        {/* Main Content */}
        <foreignObject x="320" y="40" width="440" height="1050">
          <div className="space-y-8">
            {/* Name and Title */}
            <div>
              <h1 className="text-4xl font-bold mb-2">John Developer</h1>
              <p className="text-xl text-gray-600">Senior Software Engineer</p>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-xl font-bold text-[#fcba28] mb-3">About Me</h2>
              <p className="text-gray-700">
                Senior Software Engineer with 8+ years of experience in full-stack development,
                specializing in scalable web applications and cloud architecture.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xl font-bold text-[#fcba28] mb-3">Experience</h2>
              <div className="space-y-4">
                <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#fcba28] before:rounded-full">
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
          </div>
        </foreignObject>

        {/* Decorative Elements */}
        <circle cx="140" cy="900" r="40" fill="white" opacity="0.1" />
        <circle cx="180" cy="940" r="60" fill="white" opacity="0.1" />
      </svg>
    </motion.div>
  );
};
