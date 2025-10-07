'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { FaLinkedin, FaXTwitter, FaGithub, FaDiscord } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";

const footerLinks = {
    products: [
        { name: "Mock Interviews", href: "/products/mock-interviews" },
        { name: "Practice Tests", href: "/products/practice-tests" },
        { name: "Interview Prep", href: "/products/interview-prep" }
    ],
    resources: [
        { name: "Interview Tips", href: "/resources/interview-tips" },
        { name: "Success Stories", href: "/resources/success-stories" },
        { name: "Help Center", href: "/resources/help" }
    ],
    company: [
        { name: "About Us", href: "/company/about" },
        { name: "Contact", href: "/company/contact" }
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms", href: "/terms" },
        { name: "Disclosure", href: "/disclosure" }
    ],
    social: [
        { name: "Twitter", href: "https://twitter.com/interviewmaster", icon: FaXTwitter },
        { name: "LinkedIn", href: "https://linkedin.com/company/interviewmaster", icon: FaLinkedin },
        { name: "GitHub", href: "https://github.com/interviewmaster", icon: FaGithub },
        { name: "Discord", href: "https://discord.gg/interviewmaster", icon: FaDiscord }
    ]
};

export function Footer() {
    const year = new Date().getFullYear();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted) return null;

    return (
        <footer className="mt-auto border-t border-foreground/10 bg-gradient-to-b from-neutral-900 to-black">
            <MaxWidthWrapper>
                <div className="py-16 md:py-24">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
                        {/* Logo and Description */}
                        <motion.div 
                            className="col-span-2 lg:col-span-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Logo size="lg" variant="white" className="mb-6" />
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Your AI-powered interview companion. Master your interview skills, build confidence, and accelerate your career growth with personalized feedback and expert guidance.
                            </p>
                            <div className="flex items-center gap-4">
                                {footerLinks.social.map((link) => (
                                    <motion.div
                                        key={link.name}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-purple-400 transition-all duration-200"
                                            aria-label={link.name}
                                        >
                                            <link.icon className="w-5 h-5" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Links Sections */}
                        <AnimatePresence>
                            {Object.entries(footerLinks).map(([category, links], index) => (
                                category !== 'social' && (
                                    <motion.div 
                                        key={category}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex flex-col space-y-4"
                                    >
                                        <h3 className="font-semibold text-foreground capitalize">
                                            {category}
                                        </h3>
                                        <ul className="space-y-3">
                                            {links.map((link: any) => (
                                                <motion.li 
                                                    key={link.name}
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <Link 
                                                        href={link.href}
                                                        className="text-sm text-muted-foreground hover:text-purple-400 transition-all duration-200"
                                                        {...(link.href.startsWith('http') ? {
                                                            target: "_blank",
                                                            rel: "noopener noreferrer"
                                                        } : {})}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Section */}
                    <motion.div 
                        className="mt-16 pt-8 border-t border-foreground/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <motion.p 
                                className="text-sm text-muted-foreground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                {year} InterviewMaster.ai. All rights reserved.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
}
