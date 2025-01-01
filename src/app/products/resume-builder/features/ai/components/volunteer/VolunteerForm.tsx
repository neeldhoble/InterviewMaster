"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Tag,
} from "lucide-react";
import { useResume } from "../../context/ResumeContext";

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

interface VolunteerFormProps {
  onSave: (data: VolunteerWork[]) => void;
  initialData?: VolunteerWork[];
}

const popularCauses = [
  "Education",
  "Healthcare",
  "Environment",
  "Animal Welfare",
  "Poverty Alleviation",
  "Mental Health",
  "Disaster Relief",
  "Youth Development",
  "Elder Care",
  "Food Security",
  "Technology Access",
  "Arts & Culture",
];

const popularSkills = [
  "Leadership",
  "Project Management",
  "Event Planning",
  "Fundraising",
  "Public Speaking",
  "Teaching",
  "Mentoring",
  "Community Outreach",
  "Social Media",
  "Grant Writing",
];

export const VolunteerForm = ({ onSave, initialData }: VolunteerFormProps) => {
  const [volunteerWork, setVolunteerWork] = useState<VolunteerWork[]>(
    initialData || []
  );
  const [newCause, setNewCause] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const { generateAISuggestions } = useResume();

  const addVolunteerWork = () => {
    const newWork: VolunteerWork = {
      id: Date.now().toString(),
      organization: "",
      role: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      description: "",
      impact: "",
      causes: [],
      skills: [],
    };
    setVolunteerWork([...volunteerWork, newWork]);
  };

  const removeVolunteerWork = (id: string) => {
    setVolunteerWork(volunteerWork.filter((work) => work.id !== id));
  };

  const updateVolunteerWork = (
    id: string,
    field: keyof VolunteerWork,
    value: any
  ) => {
    setVolunteerWork(
      volunteerWork.map((work) =>
        work.id === id ? { ...work, [field]: value } : work
      )
    );
  };

  const handleAISuggestion = async (id: string) => {
    const work = volunteerWork.find((w) => w.id === id);
    if (!work) return;

    const prompt = `Generate a compelling description for volunteer work as ${work.role} at ${work.organization}. Focus on impact and skills developed.`;
    const suggestion = await generateAISuggestions("volunteer", prompt);
    updateVolunteerWork(id, "description", suggestion);
  };

  const addCause = (id: string, cause: string) => {
    const work = volunteerWork.find((w) => w.id === id);
    if (!work || work.causes.includes(cause)) return;

    updateVolunteerWork(id, "causes", [...work.causes, cause]);
    setNewCause("");
  };

  const removeCause = (id: string, cause: string) => {
    const work = volunteerWork.find((w) => w.id === id);
    if (!work) return;

    updateVolunteerWork(
      id,
      "causes",
      work.causes.filter((c) => c !== cause)
    );
  };

  const addSkill = (id: string, skill: string) => {
    const work = volunteerWork.find((w) => w.id === id);
    if (!work || work.skills.includes(skill)) return;

    updateVolunteerWork(id, "skills", [...work.skills, skill]);
    setNewSkill("");
  };

  const removeSkill = (id: string, skill: string) => {
    const work = volunteerWork.find((w) => w.id === id);
    if (!work) return;

    updateVolunteerWork(
      id,
      "skills",
      work.skills.filter((s) => s !== skill)
    );
  };

  return (
    <div className="space-y-6">
      {volunteerWork.map((work, index) => (
        <motion.div
          key={work.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
        >
          {/* Drag Handle */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 cursor-move text-white/40">
            <GripVertical className="w-5 h-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-8">
            {/* Organization */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Organization
              </label>
              <input
                type="text"
                value={work.organization}
                onChange={(e) =>
                  updateVolunteerWork(work.id, "organization", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. Red Cross"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <input
                type="text"
                value={work.role}
                onChange={(e) =>
                  updateVolunteerWork(work.id, "role", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. Youth Mentor"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  value={work.startDate}
                  onChange={(e) =>
                    updateVolunteerWork(work.id, "startDate", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={work.endDate}
                  onChange={(e) =>
                    updateVolunteerWork(work.id, "endDate", e.target.value)
                  }
                  disabled={work.current}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            {/* Current Checkbox */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={work.current}
                  onChange={(e) =>
                    updateVolunteerWork(work.id, "current", e.target.checked)
                  }
                  className="rounded border-white/10 bg-white/5 text-[#fcba28] focus:ring-[#fcba28]"
                />
                <span className="text-sm">I currently volunteer here</span>
              </label>
            </div>

            {/* Location */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={work.location}
                  onChange={(e) =>
                    updateVolunteerWork(work.id, "location", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  value={work.description}
                  onChange={(e) =>
                    updateVolunteerWork(work.id, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                  placeholder="Describe your volunteer work and responsibilities..."
                />
                <button
                  type="button"
                  onClick={() => handleAISuggestion(work.id)}
                  className="absolute right-3 top-3 p-2 rounded-lg bg-[#fcba28]/10 hover:bg-[#fcba28]/20 text-[#fcba28] transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Impact */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Impact & Results
              </label>
              <input
                type="text"
                value={work.impact}
                onChange={(e) =>
                  updateVolunteerWork(work.id, "impact", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. Mentored 20+ youth, Raised $10,000 for the cause"
              />
            </div>

            {/* Causes */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">Causes</label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {work.causes.map((cause) => (
                    <span
                      key={cause}
                      className="px-3 py-1 bg-[#fcba28]/10 text-[#fcba28] rounded-full text-sm flex items-center gap-2"
                    >
                      <Heart className="w-3 h-3" />
                      {cause}
                      <button
                        onClick={() => removeCause(work.id, cause)}
                        className="hover:text-[#fcba28]/80 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCause}
                    onChange={(e) => setNewCause(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newCause) {
                        e.preventDefault();
                        addCause(work.id, newCause);
                      }
                    }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                    placeholder="Add cause..."
                  />
                  <button
                    type="button"
                    onClick={() => newCause && addCause(work.id, newCause)}
                    className="px-4 py-2 bg-[#fcba28]/10 border border-[#fcba28]/20 rounded-lg text-[#fcba28] hover:bg-[#fcba28]/20 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularCauses.map((cause) => (
                    <button
                      key={cause}
                      onClick={() => addCause(work.id, cause)}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                    >
                      {cause}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Skills Developed
              </label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {work.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#fcba28]/10 text-[#fcba28] rounded-full text-sm flex items-center gap-2"
                    >
                      <Tag className="w-3 h-3" />
                      {skill}
                      <button
                        onClick={() => removeSkill(work.id, skill)}
                        className="hover:text-[#fcba28]/80 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newSkill) {
                        e.preventDefault();
                        addSkill(work.id, newSkill);
                      }
                    }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                    placeholder="Add skill..."
                  />
                  <button
                    type="button"
                    onClick={() => newSkill && addSkill(work.id, newSkill)}
                    className="px-4 py-2 bg-[#fcba28]/10 border border-[#fcba28]/20 rounded-lg text-[#fcba28] hover:bg-[#fcba28]/20 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(work.id, skill)}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Remove Volunteer Work Button */}
          <button
            type="button"
            onClick={() => removeVolunteerWork(work.id)}
            className="absolute top-3 right-3 p-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </motion.div>
      ))}

      {/* Add Volunteer Work Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: volunteerWork.length * 0.1 }}
        type="button"
        onClick={addVolunteerWork}
        className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-white/60 hover:text-white/80 hover:border-white/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Volunteer Work
      </motion.button>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: volunteerWork.length * 0.1 + 0.1 }}
        className="flex justify-end"
      >
        <button
          type="button"
          onClick={() => onSave(volunteerWork)}
          className="px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors"
        >
          Save & Continue
        </button>
      </motion.div>
    </div>
  );
};
