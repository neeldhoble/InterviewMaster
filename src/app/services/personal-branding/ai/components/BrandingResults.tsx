"use client";

import { motion } from 'framer-motion';
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaChartLine,
  FaLightbulb,
  FaPalette,
  FaBullseye,
  FaUsers,
  FaRegChartBar,
  FaRegClock,
  FaDownload,
  FaRedo
} from 'react-icons/fa';
import type { BrandingAnalysis } from '../hooks/usePersonalBranding';

interface BrandingResultsProps {
  result: BrandingAnalysis;
  onReset: () => void;
  onExport: () => void;
}

const platformIcons = {
  linkedin: <FaLinkedin className="w-5 h-5" />,
  twitter: <FaTwitter className="w-5 h-5" />,
  github: <FaGithub className="w-5 h-5" />,
};

export const BrandingResults = ({ result, onReset, onExport }: BrandingResultsProps) => {
  const fadeInUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h2
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          className="text-3xl font-bold"
        >
          Your Personal Brand Analysis
        </motion.h2>
        <motion.p
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
          className="text-gray-300"
        >
          Analysis completed on {new Date(result.metadata.timestamp).toLocaleDateString()}
        </motion.p>
      </div>

      {/* Brand Identity */}
      <motion.div
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2 }}
        className="bg-white/5 rounded-xl border border-white/10 p-6 space-y-6"
      >
        <div className="flex items-center gap-3 text-[#fcba28]">
          <FaBullseye className="w-6 h-6" />
          <h3 className="text-xl font-semibold">Brand Identity</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-[#fcba28] font-medium mb-2">Core Brand Message</h4>
            <p className="text-lg">{result.brandIdentity.coreBrandMessage}</p>
          </div>
          
          <div>
            <h4 className="text-[#fcba28] font-medium mb-2">Value Proposition</h4>
            <p className="text-gray-300">{result.brandIdentity.valueProposition}</p>
          </div>
          
          <div>
            <h4 className="text-[#fcba28] font-medium mb-2">Brand Personality</h4>
            <div className="flex flex-wrap gap-2">
              {result.brandIdentity.brandPersonality.map((trait, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#fcba28]/10 rounded-full text-[#fcba28] text-sm"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Media Analysis */}
      <motion.div
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {result.socialMediaAnalyses.map((platform, index) => (
          <div
            key={platform.platform}
            className="bg-white/5 rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-2 text-[#fcba28] mb-4">
              {platformIcons[platform.platform.toLowerCase() as keyof typeof platformIcons]}
              <h3 className="text-lg font-semibold capitalize">{platform.platform}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Profile Strength</span>
                  <span className="text-[#fcba28] font-semibold">{platform.analysis.profileStrength}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: platform.analysis.profileStrength }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-[#fcba28] rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {Object.entries(platform.analysis.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Content Strategy */}
      <motion.div
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 text-[#fcba28] mb-6">
            <FaLightbulb className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Content Strategy</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-[#fcba28] font-medium mb-2">Recommended Topics</h4>
              <ul className="space-y-2">
                {result.contentStrategy.topics.map((topic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#fcba28] mt-1">•</span>
                    <span className="text-gray-300">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#fcba28] font-medium mb-2">Content Types</h4>
              <div className="flex flex-wrap gap-2">
                {result.contentStrategy.contentTypes.map((type, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 rounded-full text-white text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 text-[#fcba28] mb-6">
            <FaPalette className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Visual Branding</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-[#fcba28] font-medium mb-2">Color Palette</h4>
              <div className="flex flex-wrap gap-3">
                {result.visualBranding.colorPalette.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-white/10"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-gray-300">{color}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-[#fcba28] font-medium mb-2">Image Guidelines</h4>
              <ul className="space-y-2">
                {result.visualBranding.imageGuidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#fcba28] mt-1">•</span>
                    <span className="text-gray-300">{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Growth Strategy */}
      <motion.div
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
        className="bg-white/5 rounded-xl border border-white/10 p-6"
      >
        <div className="flex items-center gap-3 text-[#fcba28] mb-6">
          <FaChartLine className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Growth Strategy</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-[#fcba28] font-medium mb-4 flex items-center gap-2">
              <FaRegClock className="w-4 h-4" />
              Short Term
            </h4>
            <ul className="space-y-2">
              {result.growthStrategy.shortTerm.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#fcba28] mt-1">•</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#fcba28] font-medium mb-4 flex items-center gap-2">
              <FaRegChartBar className="w-4 h-4" />
              Medium Term
            </h4>
            <ul className="space-y-2">
              {result.growthStrategy.mediumTerm.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#fcba28] mt-1">•</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#fcba28] font-medium mb-4 flex items-center gap-2">
              <FaUsers className="w-4 h-4" />
              Long Term
            </h4>
            <ul className="space-y-2">
              {result.growthStrategy.longTerm.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#fcba28] mt-1">•</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.6 }}
        className="flex justify-center gap-4"
      >
        <motion.button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaRedo className="w-4 h-4" />
          New Analysis
        </motion.button>
        
        <motion.button
          onClick={onExport}
          className="flex items-center gap-2 px-6 py-3 bg-[#fcba28] text-black rounded-xl font-semibold hover:bg-[#fcba28]/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaDownload className="w-4 h-4" />
          Export Report
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
