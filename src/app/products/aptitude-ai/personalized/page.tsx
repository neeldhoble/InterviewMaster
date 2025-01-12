"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useState } from "react";
import { FaBrain, FaRobot, FaChartLine, FaGears } from "react-icons/fa6";
import { generatePersonalizedTest, PersonalizedTest } from "@/services/gemini-ai";

const PreferenceButton = ({ 
  label, 
  selected, 
  onClick 
}: { 
  label: string; 
  selected: boolean; 
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
      selected
        ? "bg-[#fcba28] text-black"
        : "bg-black/20 text-white border border-[#fcba28]/20 hover:border-[#fcba28]/40"
    }`}
  >
    {label}
  </motion.button>
);

const LevelSelector = ({
  currentLevel,
  onSelect,
}: {
  currentLevel: string;
  onSelect: (level: string) => void;
}) => (
  <div className="flex gap-4">
    {["Beginner", "Intermediate", "Advanced"].map((level) => (
      <motion.button
        key={level}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(level)}
        className={`px-8 py-4 rounded-xl font-semibold transition-all ${
          currentLevel === level
            ? "bg-[#fcba28] text-black"
            : "bg-black/20 text-white border border-[#fcba28]/20 hover:border-[#fcba28]/40"
        }`}
      >
        {level}
      </motion.button>
    ))}
  </div>
);

const AIAnimation = () => (
  <motion.div
    className="relative w-full h-[400px]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-[#fcba28]/10 via-white/5 to-[#fcba28]/10 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl text-[#fcba28]"
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <FaRobot />
    </motion.div>
    {/* Orbiting elements */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <motion.div
        key={angle}
        className="absolute top-1/2 left-1/2 w-8 h-8 text-white"
        animate={{
          x: Math.cos((angle + i * 30) * (Math.PI / 180)) * 150,
          y: Math.sin((angle + i * 30) * (Math.PI / 180)) * 150,
          rotate: 360,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "linear",
        }}
      >
        {i % 2 === 0 ? <FaBrain /> : <FaChartLine />}
      </motion.div>
    ))}
  </motion.div>
);

export default function PersonalizedTestPage() {
  const [level, setLevel] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [test, setTest] = useState<PersonalizedTest | null>(null);

  const topics = [
    "Numerical Ability",
    "Verbal Reasoning",
    "Logical Reasoning",
    "Data Interpretation",
    "Non-verbal Reasoning",
    "Basic Mathematics",
  ];

  const togglePreference = (topic: string) => {
    setPreferences((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const generateTest = async () => {
    if (!level || preferences.length === 0) {
      alert("Please select your level and at least one topic preference");
      return;
    }

    setIsGenerating(true);
    try {
      const testData = await generatePersonalizedTest(level, preferences);
      setTest(testData);
    } catch (error) {
      console.error("Error generating test:", error);
      alert("Failed to generate test. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10">
        <MaxWidthWrapper>
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-white mb-6"
              >
                Your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#ffd700]">
                  Personalized
                </span>{" "}
                Aptitude Journey
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-200 text-lg mb-8"
              >
                Experience a unique learning path crafted by our AI system based on your skill level and preferences.
              </motion.p>
            </div>
            <AIAnimation />
          </div>

          {/* Test Configuration Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto py-12"
          >
            <div className="space-y-12">
              {/* Level Selection */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Select Your Level</h2>
                <LevelSelector currentLevel={level} onSelect={setLevel} />
              </div>

              {/* Topic Preferences */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Choose Your Focus Areas</h2>
                <div className="flex flex-wrap gap-4">
                  {topics.map((topic) => (
                    <PreferenceButton
                      key={topic}
                      label={topic}
                      selected={preferences.includes(topic)}
                      onClick={() => togglePreference(topic)}
                    />
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateTest}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-[#fcba28] text-black rounded-full font-semibold inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <FaGears className="animate-spin" />
                      Generating Your Test...
                    </>
                  ) : (
                    <>
                      <FaRobot />
                      Generate Personalized Test
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-20"
          >
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Why Choose Personalized Testing?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                <FaBrain className="text-[#fcba28] text-3xl mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Adaptive Learning</h3>
                <p className="text-gray-200">Questions that adapt to your skill level and learning pace</p>
              </div>
              <div className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                <FaRobot className="text-[#fcba28] text-3xl mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">AI-Powered Insights</h3>
                <p className="text-gray-200">Detailed feedback and improvement suggestions from our AI</p>
              </div>
              <div className="p-6 rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20">
                <FaChartLine className="text-[#fcba28] text-3xl mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Progress Tracking</h3>
                <p className="text-gray-200">Monitor your improvement with detailed analytics</p>
              </div>
            </div>
          </motion.div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
