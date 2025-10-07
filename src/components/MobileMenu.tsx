'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa6';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

// Social Links
const socialLinks = [
  { href: 'https://x.com/interviewmaster', icon: FaTwitter, label: 'Twitter' },
  { href: 'https://linkedin.com/company/interviewmaster', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://facebook.com/interviewmaster', icon: FaFacebook, label: 'Facebook' },
  { href: 'https://instagram.com/interviewmaster', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://github.com/interviewmaster', icon: FaGithub, label: 'GitHub' },
];

// Navigation Menus
const navigationMenus = [
  {
    title: 'Products',
    links: [
      { href: '/products/resume-builder', label: 'Resume Builder' },
      { href: '/products/mock-interviews', label: 'Mock Interviews' },
      { href: '/products/ai-feedback', label: 'AI Feedback' },
      { href: '/products/skills-analyzer', label: 'Skills Analyzer' },
      { href: '/products/interview-questions', label: 'Interview-Questions' },
      { href: '/products/Practice-Tests', label: 'Practice-Tests' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/services/consultation', label: 'Career Consultation' },
      { href: '/services/cv-revision', label: 'CV Revision' },
      { href: '/services/mock-tests', label: 'Mock Tests' },
      { href: '/services/interview-coaching', label: 'Interview Coaching' },
      { href: '/services/personal-branding', label: 'Personal Branding' },
      { href: '/services/salary-negotiation', label: 'Salary Negotiation' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/resources/blog', label: 'Blog' },
      { href: '/resources/faq', label: 'FAQ' },
      { href: '/resources/ebooks', label: 'Ebooks & Guides' },
      { href: '/resources/tutorials', label: 'Tutorials' },
      { href: '/resources/webinars', label: 'Webinars' },
      { href: '/resources/newsletters', label: 'Newsletters' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: '/community/forums', label: 'Forums' },
      { href: '/community/events', label: 'Events' },
      { href: '/community/mentorship', label: 'Mentorship' },
      { href: '/community/success-stories', label: 'Success Stories' },
      { href: '/community/meetups', label: 'Meetups' },
      { href: '/community/hackathons', label: 'Hackathons' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/company/about', label: 'About Us' },
      { href: '/company/careers', label: 'Careers' },
      { href: '/company/partners', label: 'Partners' },
      { href: '/company/contact', label: 'Contact Us' },
      { href: '/company/press', label: 'Press' },
      { href: '/company/investors', label: 'Investors' },
    ],
  },
];

// Animation variants
const menuVariants = {
  closed: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.07 }
  }
};

const itemVariants = {
  closed: { x: -20, opacity: 0 },
  open: { x: 0, opacity: 1 }
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 }
};

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const portalRoot = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    portalRoot.current = document.getElementById('portal-root');
    return () => setMounted(false);
  }, []);

  const handleNavigation = useCallback((href: string) => {
    setIsOpen(false);
    router.push(href);
  }, [router]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const MenuContent = () => (
    <>
      <motion.div
        variants={overlayVariants}
        initial="closed"
        animate="open"
        exit="closed"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />
      <motion.div
        ref={menuRef}
        variants={menuVariants}
        initial="closed"
        animate="open"
        exit="closed"
        className={cn(
          'fixed top-0 left-0 h-[100dvh] w-[85%] max-w-[400px] bg-background/95',
          'backdrop-blur-md p-6 z-50 shadow-xl border-r border-border/10',
          'flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#fcba28]'
        )}
      >
        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(false)}
            className="p-2 text-muted-foreground hover:text-[#fcba28]"
          >
            <FaTimes size={24} />
          </motion.button>
        </div>

        <nav className="mt-12 flex flex-col gap-8">
          {navigationMenus.map((menu, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              <h2 className="text-xl font-bold text-[#fcba28]">{menu.title}</h2>
              <div className="flex flex-col gap-3 pl-2">
                {menu.links.map((link, linkIdx) => (
                  <motion.button
                    key={linkIdx}
                    variants={itemVariants}
                    whileHover={{ x: 8 }}
                    onClick={() => handleNavigation(link.href)}
                    className="text-base text-muted-foreground hover:text-[#fcba28] text-left py-1.5 transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </nav>

        <motion.div
          variants={itemVariants}
          className="mt-auto pt-8 border-t border-border/10"
        >
          <div className="flex justify-between items-center">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-muted-foreground hover:text-[#fcba28]"
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="relative z-50 p-2 text-muted-foreground hover:text-[#fcba28]"
        aria-label="Open menu"
      >
        <FaBars size={24} />
      </motion.button>

      {mounted && isOpen && portalRoot.current && createPortal(
        <AnimatePresence mode="wait">
          {isOpen && <MenuContent />}
        </AnimatePresence>,
        portalRoot.current
      )}
    </>
  );
};
