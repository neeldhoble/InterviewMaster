"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaUserCircle, FaCog } from 'react-icons/fa';
import { getGeminiResponse } from './gemini-service';
import { BeatLoader } from 'react-spinners';
import { TypingLoader } from './components/TypingLoader';

interface CareerProfile {
  experience: string;
  skills: string[];
  interests: string[];
  education: string;
  currentRole: string;
  targetRole: string;
  industry: string;
  location: string;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  structuredContent?: {
    keyPoints: string[];
    actionItems: string[];
    resources: string[];
    timeline: {
      shortTerm: string[];
      mediumTerm: string[];
      longTerm: string[];
    };
    challenges: string[];
  };
}

export default function AIConsultationPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState<CareerProfile>({
    experience: '',
    skills: [],
    interests: [],
    education: '',
    currentRole: '',
    targetRole: '',
    industry: '',
    location: ''
  });

  const handleProfileUpdate = (field: keyof CareerProfile, value: string) => {
    if (field === 'skills' || field === 'interests') {
      setProfile(prev => ({
        ...prev,
        [field]: value.split(',').map(item => item.trim())
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(input, profile);
      const aiMessage: Message = {
        role: 'ai',
        content: response.keyPoints[0] || "Here's my analysis:",
        structuredContent: response
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'ai',
        content: "I apologize, but I'm having trouble processing your request. Please try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-purple-900/30 mb-6"
          >
            <FaRobot className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            AI Career Consultation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Get personalized career guidance powered by advanced AI
          </motion.p>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <FaCog className="text-[#fcba28]" />
            {showProfile ? 'Hide Profile' : 'Update Profile'}
          </button>
        </div>

        {/* Profile Form */}
        {showProfile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Career Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Experience Level</label>
                <input
                  type="text"
                  value={profile.experience}
                  onChange={(e) => handleProfileUpdate('experience', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., 5 years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={profile.skills.join(', ')}
                  onChange={(e) => handleProfileUpdate('skills', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., JavaScript, Python, React"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Interests (comma-separated)</label>
                <input
                  type="text"
                  value={profile.interests.join(', ')}
                  onChange={(e) => handleProfileUpdate('interests', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., AI, Web Development, Data Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Education</label>
                <input
                  type="text"
                  value={profile.education}
                  onChange={(e) => handleProfileUpdate('education', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., Bachelor's in Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Current Role</label>
                <input
                  type="text"
                  value={profile.currentRole}
                  onChange={(e) => handleProfileUpdate('currentRole', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., Software Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Role</label>
                <input
                  type="text"
                  value={profile.targetRole}
                  onChange={(e) => handleProfileUpdate('targetRole', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Industry</label>
                <input
                  type="text"
                  value={profile.industry}
                  onChange={(e) => handleProfileUpdate('industry', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., Technology"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => handleProfileUpdate('location', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Chat Interface */}
        <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg p-6">
          {/* Messages */}
          <div className="min-h-[400px] max-h-[600px] overflow-y-auto mb-6 space-y-4 pr-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <p>Start your consultation by asking any career-related question</p>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => setInput("What career path should I pursue based on my interests?")}
                    className="block w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  >
                    What career path should I pursue based on my interests?
                  </button>
                  <button
                    onClick={() => setInput("How can I prepare for a tech interview?")}
                    className="block w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  >
                    How can I prepare for a tech interview?
                  </button>
                  <button
                    onClick={() => setInput("What skills should I develop for future job market?")}
                    className="block w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  >
                    What skills should I develop for future job market?
                  </button>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-xl ${
                      message.role === 'user'
                        ? 'bg-[#fcba28] text-black'
                        : 'bg-white/10 backdrop-blur-sm text-white'
                    }`}
                  >
                    {message.role === 'ai' && message.structuredContent ? (
                      <div className="space-y-6">
                        {message.structuredContent.keyPoints.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-[#fcba28] mb-2">Key Points:</h3>
                            <ul className="space-y-2">
                              {message.structuredContent.keyPoints.map((point, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-[#fcba28]">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {message.structuredContent.actionItems.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-[#fcba28] mb-2">Action Items:</h3>
                            <ul className="space-y-2">
                              {message.structuredContent.actionItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-[#fcba28]">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {message.structuredContent.resources.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-[#fcba28] mb-2">Resources:</h3>
                            <ul className="space-y-2">
                              {message.structuredContent.resources.map((resource, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-[#fcba28]">•</span>
                                  <span>{resource}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {(message.structuredContent.timeline.shortTerm.length > 0 ||
                          message.structuredContent.timeline.mediumTerm.length > 0 ||
                          message.structuredContent.timeline.longTerm.length > 0) && (
                          <div>
                            <h3 className="font-semibold text-[#fcba28] mb-2">Timeline:</h3>
                            {message.structuredContent.timeline.shortTerm.length > 0 && (
                              <div className="mb-3">
                                <h4 className="text-sm font-medium text-gray-300 mb-1">Short-term (0-3 months):</h4>
                                <ul className="space-y-1">
                                  {message.structuredContent.timeline.shortTerm.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="text-[#fcba28]">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {message.structuredContent.timeline.mediumTerm.length > 0 && (
                              <div className="mb-3">
                                <h4 className="text-sm font-medium text-gray-300 mb-1">Medium-term (3-6 months):</h4>
                                <ul className="space-y-1">
                                  {message.structuredContent.timeline.mediumTerm.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="text-[#fcba28]">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {message.structuredContent.timeline.longTerm.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-300 mb-1">Long-term (6+ months):</h4>
                                <ul className="space-y-1">
                                  {message.structuredContent.timeline.longTerm.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="text-[#fcba28]">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {message.structuredContent.challenges.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-[#fcba28] mb-2">Potential Challenges:</h3>
                            <ul className="space-y-2">
                              {message.structuredContent.challenges.map((challenge, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-[#fcba28]">•</span>
                                  <span>{challenge}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                </motion.div>
              ))
            )}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <TypingLoader />
              </motion.div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your career-related question..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`px-6 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 flex items-center gap-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <BeatLoader size={8} color="#000000" />
              ) : (
                <>
                  Send
                  <FaPaperPlane />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: '24/7 Availability',
              description: 'Get instant guidance anytime, anywhere',
              icon: '⏰'
            },
            {
              title: 'Personalized Advice',
              description: 'Tailored recommendations based on your profile',
              icon: '🎯'
            },
            {
              title: 'Data-Driven Insights',
              description: 'Backed by industry trends and market data',
              icon: '📊'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
