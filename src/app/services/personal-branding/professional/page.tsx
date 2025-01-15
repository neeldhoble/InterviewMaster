"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserTie, FaCalendarAlt, FaClock, FaLinkedin, FaGithub, FaCode, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { InlineSpinner } from '@/app/components/InlineSpinner';

export default function ProfessionalPersonalBrandingPage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<'standard' | 'premium'>('standard');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    currentRole: '',
    targetRole: '',
    experience: '',
    industry: '',
    goals: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const packages = {
    standard: {
      name: 'Standard Package',
      price: '$5',
      duration: '2 weeks',
      features: [
        'LinkedIn Profile Optimization',
        'Professional Bio Writing',
        'Basic Personal Website Template',
        'Social Media Strategy Guide',
        'One Revision Round'
      ]
    },
    premium: {
      name: 'Premium Package',
      price: '$10',
      duration: '4 weeks',
      features: [
        'Everything in Standard Package',
        'Custom Personal Website Development',
        'Content Strategy Development',
        'Personal Brand Guidelines',
        'Professional Headshot Guidelines',
        'Three Revision Rounds',
        'Monthly Analytics Report'
      ]
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'currentRole', 'targetRole', 'experience', 'industry', 'goals', 'preferredDate', 'preferredTime'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(field => field.replace(/([A-Z])/g, ' $1').toLowerCase());
      toast.error(`Please fill in: ${missingFieldNames.join(', ')}`);
      setError(`Please fill in: ${missingFieldNames.join(', ')}`);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/send-personal-branding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          package: selectedPackage
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Personal branding request submitted successfully!');
        setTimeout(() => {
          router.push('/services/personal-branding/success');
        }, 2000);
      } else {
        throw new Error(data.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to submit form. Please try again.');
      setError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20">
      <Toaster position="top-center" />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-background p-6 rounded-lg shadow-xl border border-[#fcba28]/20 text-center">
              <InlineSpinner />
              <p className="mt-4 text-white">Submitting your request...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6">
            <FaUserTie className="w-8 h-8 text-[#fcba28]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Personal Branding</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Work with our branding experts to build a powerful professional presence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Packages Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Choose Your Package</h2>
            
            {/* Essential Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedPackage('standard')}
              className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedPackage === 'standard'
                  ? 'border-[#fcba28] bg-[#fcba28]/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Standard Package</h3>
                  <p className="text-gray-400">{packages.standard.duration}</p>
                </div>
                <span className="text-2xl font-bold text-[#fcba28]">{packages.standard.price}</span>
              </div>
              <ul className="space-y-3">
                {packages.standard.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <FaCheckCircle className="text-[#fcba28]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Premium Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setSelectedPackage('premium')}
              className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedPackage === 'premium'
                  ? 'border-[#fcba28] bg-[#fcba28]/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Premium Package</h3>
                  <p className="text-gray-400">{packages.premium.duration}</p>
                </div>
                <span className="text-2xl font-bold text-[#fcba28]">{packages.premium.price}</span>
              </div>
              <ul className="space-y-3">
                {packages.premium.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <FaCheckCircle className="text-[#fcba28]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Process Timeline */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Our Process</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#fcba28]/20">
                    <FaCalendarAlt className="text-[#fcba28]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Initial Consultation</h4>
                    <p className="text-gray-400">Discuss your goals and current brand presence</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#fcba28]/20">
                    <FaUserTie className="text-[#fcba28]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Strategy Development</h4>
                    <p className="text-gray-400">Create your personalized branding plan</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#fcba28]/20">
                    <FaClock className="text-[#fcba28]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Implementation</h4>
                    <p className="text-gray-400">Execute and refine your brand strategy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-8 rounded-xl border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6">Get Started</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                  placeholder="Your phone number"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaLinkedin className="inline mr-2" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="Profile URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaGithub className="inline mr-2" />
                    GitHub
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="Profile URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaCode className="inline mr-2" />
                    Portfolio
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="Portfolio URL"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Role</label>
                  <input
                    type="text"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="e.g., Software Engineer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Target Role</label>
                  <input
                    type="text"
                    name="targetRole"
                    value={formData.targetRole}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="e.g., Tech Lead"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                  placeholder="e.g., 5 years"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                  placeholder="e.g., Tech"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Branding Goals</label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28] h-32 resize-none"
                  placeholder="What do you want to achieve with your personal brand?"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Time</label>
                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Information</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28] h-32 resize-none"
                  placeholder="Any specific areas you'd like to focus on?"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300 flex items-center justify-center gap-2 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <InlineSpinner className="text-black" />
                ) : isSubmitted ? (
                  <>
                    <FaCheckCircle />
                    Request Submitted!
                  </>
                ) : (
                  <>
                    Start Your Branding Journey
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
