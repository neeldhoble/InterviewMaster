"use client";

import { motion } from "framer-motion";

interface TemplateProps {
  scale?: number;
  isPreview?: boolean;
}

export const ExecutiveTemplate = ({ scale = 1, isPreview = false }: TemplateProps) => {
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
        
        {/* Executive Header Design */}
        <rect width={baseWidth} height="180" fill="#1a1a1a" />
        <path
          d={`M0 180 L${baseWidth} 180 L${baseWidth} 210 L0 210 Z`}
          fill="#fcba28"
        />

        {/* Header Content */}
        <foreignObject x="60" y="40" width="680" height="120">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-3">Sarah Executive</h1>
            <p className="text-2xl font-light tracking-wide">Chief Technology Officer</p>
          </div>
        </foreignObject>

        {/* Contact Info */}
        <foreignObject x="60" y="220" width="680" height="60">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              sarah@executive.com
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              New York, NY
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              linkedin.com/in/sarah
            </div>
          </div>
        </foreignObject>

        {/* Two Column Layout */}
        <foreignObject x="60" y="300" width="680" height="790">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="col-span-1 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-[#fcba28] mb-4 uppercase tracking-wider">
                  Core Competencies
                </h2>
                <ul className="space-y-3">
                  {[
                    "Strategic Leadership",
                    "Digital Transformation",
                    "Innovation Management",
                    "Team Building",
                    "Change Management",
                  ].map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-sm bg-[#fcba28]" />
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#fcba28] mb-4 uppercase tracking-wider">
                  Education
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-800">MBA</h3>
                    <p className="text-gray-600">Harvard Business School</p>
                    <p className="text-sm text-gray-500">2010 - 2012</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">B.S. Computer Science</h3>
                    <p className="text-gray-600">MIT</p>
                    <p className="text-sm text-gray-500">2006 - 2010</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-2 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-[#fcba28] mb-4 uppercase tracking-wider">
                  Executive Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Visionary technology executive with 15+ years of experience driving digital transformation
                  and innovation in Fortune 500 companies. Proven track record of leading global teams
                  and delivering complex technology initiatives that drive business growth.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#fcba28] mb-4 uppercase tracking-wider">
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">Chief Technology Officer</h3>
                        <p className="text-gray-600">Global Tech Solutions</p>
                      </div>
                      <span className="text-sm text-[#fcba28]">2018 - Present</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Led digital transformation initiatives resulting in 40% cost reduction</li>
                      <li>Managed $100M technology budget and team of 200+ professionals</li>
                      <li>Implemented AI/ML solutions driving 25% increase in operational efficiency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </foreignObject>
      </svg>
    </motion.div>
  );
};
