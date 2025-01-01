"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Trash2, Star, Sparkles } from "lucide-react";
import { useResume } from "../../context/ResumeContext";

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

interface SkillsFormProps {
  onSave: (skills: Skill[]) => void;
  initialData?: Skill[];
}

const skillCategories = [
  "Technical",
  "Soft Skills",
  "Languages",
  "Tools",
  "Frameworks",
  "Other",
];

export const SkillsForm = ({ onSave, initialData }: SkillsFormProps) => {
  const [skills, setSkills] = useState<Skill[]>(initialData || []);
  const { generateAISuggestions } = useResume();

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: 3,
      category: skillCategories[0],
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const handleAISuggestions = async () => {
    const prompt = "Suggest relevant skills for my profile based on my experience";
    const suggestion = await generateAISuggestions("skills", prompt);
    // Parse and add suggested skills
    const suggestedSkills = suggestion.split(",").map((skill) => ({
      id: Date.now().toString() + Math.random(),
      name: skill.trim(),
      level: 3,
      category: "Technical",
    }));
    setSkills([...skills, ...suggestedSkills]);
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skillCategories.map((category) => {
          const categorySkills = skills.filter(
            (skill) => skill.category === category
          );
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-lg font-medium mb-3">{category}</h3>
              <div className="space-y-2">
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        updateSkill(skill.id, "name", e.target.value)
                      }
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg py-1 px-3 text-sm focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                      placeholder={`Add ${category} skill`}
                    />
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => updateSkill(skill.id, "level", level)}
                          className={`p-1 rounded-full transition-colors ${
                            level <= skill.level
                              ? "text-[#fcba28]"
                              : "text-white/20"
                          }`}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Skill Button */}
      <div className="flex gap-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          type="button"
          onClick={addSkill}
          className="flex-1 py-3 border-2 border-dashed border-white/10 rounded-xl text-white/60 hover:text-white/80 hover:border-white/20 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Skill
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          type="button"
          onClick={handleAISuggestions}
          className="px-4 py-3 bg-[#fcba28]/10 border border-[#fcba28]/20 rounded-xl text-[#fcba28] hover:bg-[#fcba28]/20 transition-colors flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          AI Suggestions
        </motion.button>
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <button
          type="button"
          onClick={() => onSave(skills)}
          className="px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors"
        >
          Save & Continue
        </button>
      </motion.div>
    </div>
  );
};
