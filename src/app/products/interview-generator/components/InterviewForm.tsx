'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Building,
  Briefcase,
  Clock,
  Loader,
  ArrowRight,
  X
} from 'lucide-react';
import { UserInput } from '../types';

interface InterviewFormProps {
  onClose: () => void;
  onSubmit: (data: UserInput) => Promise<void>;
}

export default function InterviewForm({ onClose, onSubmit }: InterviewFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState<UserInput>({
    name: '',
    email: '',
    experience: '',
    skills: [],
    jobRole: '',
    company: '', // Added company field
    resumeText: '', // Will store OCR text
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement OCR processing
      // For now, just store the file name
      setUserInput(prev => ({
        ...prev,
        resumeText: `Resume uploaded: ${file.name}`,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(userInput);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Tell us about your interview preparation</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] focus:outline-none transition-all hover:border-white/20"
                  value={userInput.name}
                  onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] focus:outline-none transition-all hover:border-white/20"
                  value={userInput.email}
                  onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Job Role</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] focus:outline-none transition-all hover:border-white/20"
                  value={userInput.jobRole}
                  onChange={(e) => setUserInput({ ...userInput, jobRole: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Company Applying To</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] focus:outline-none transition-all hover:border-white/20"
                  value={userInput.company}
                  onChange={(e) => setUserInput({ ...userInput, company: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">Skills (comma-separated)</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] focus:outline-none transition-all hover:border-white/20"
                value={userInput.skills.join(', ')}
                onChange={(e) => setUserInput({ ...userInput, skills: e.target.value.split(',').map(s => s.trim()) })}
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">Years of Experience</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] focus:outline-none transition-all hover:border-white/20"
                value={userInput.experience}
                onChange={(e) => setUserInput({ ...userInput, experience: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">Resume (Optional)</label>
              <label className="flex items-center justify-center w-full px-4 py-6 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all hover:border-[#fcba28]/20">
                <Upload className="w-6 h-6 text-[#fcba28] mr-2 group-hover:scale-110 transition-transform" />
                <span className="text-white group-hover:text-white/90">
                  {userInput.resumeText ? 'Change Resume' : 'Upload Resume'}
                </span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileChange}
                />
              </label>
              {userInput.resumeText && (
                <p className="mt-2 text-sm text-white/60">{userInput.resumeText}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#fcba28] to-[#fcd978] hover:from-[#fcd978] hover:to-[#fcba28] text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Generating Questions...
                </>
              ) : (
                <span className="flex items-center">
                  Generate Interview Questions
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
