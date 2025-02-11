'use client';

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Trophy, Target, Brain, Users, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const interviewTypes = [
    'Technical',
    'Non-Technical',
    'Behavioral',
    'Leadership',
    'Project Management',
    'General'
];

const AutoTypingText = () => {
    const [currentText, setCurrentText] = useState(interviewTypes[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        const animateText = async () => {
            // Fade out current text
            await controls.start({
                opacity: 0,
                y: -20,
                transition: { duration: 0.3 }
            });

            // Update text
            setCurrentText(interviewTypes[currentIndex]);

            // Fade in new text
            await controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.3 }
            });

            // Wait before next change
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % interviewTypes.length);
            }, 1500);
        };

        animateText();
    }, [currentIndex, controls]);

    return (
        <span className="relative inline-block min-w-[300px]">
            <motion.span
                animate={controls}
                className="text-[#fcba28] absolute left-0"
            >
                {currentText}
            </motion.span>
            <span className="invisible">Project Management</span>
        </span>
    );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
    >
        <motion.div
            animate={{
                y: [-2, 2, -2],
                rotate: [-5, 5, -5],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="p-2 rounded-lg bg-[#fcba28]/20"
        >
            <Icon className="w-6 h-6 text-[#fcba28]" />
        </motion.div>
        <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-white/60">{description}</p>
        </div>
    </motion.div>
);

const StatItem = ({ value, label, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        className="flex flex-col items-center"
    >
        <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl font-bold text-[#fcba28] mb-1"
        >
            {value}
        </motion.div>
        <div className="text-sm text-white/60 text-center">{label}</div>
    </motion.div>
);

const BrandBadge = () => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20 backdrop-blur-sm"
    >
        <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5"
        >
            <Sparkles className="w-full h-full text-[#fcba28]" />
        </motion.div>
        <span className="text-sm font-medium">AI-Powered Interview Master</span>
    </motion.div>
);

export const LeftHero = () => {
    return (
        <div className="relative flex flex-col gap-8 py-8">
            {/* Brand Badge */}
            <BrandBadge />

            {/* Main Headline */}
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold leading-tight mb-4 min-h-[120px]"
                >
                    <div className="relative">
                        Master Your{' '}
                        <AutoTypingText />
                        {' '}Interview Journey with AI
                    </div>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-white/60 mb-6"
                >
                    Practice with our AI interviewer, get real-time feedback, and land your dream tech role.
                </motion.p>
            </div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
            >
                <Link
                    href="/products/mock-interviews/visual-simulation"
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fcba28] text-black font-semibold transition-all hover:bg-[#fcba28]/90"
                >
                    Start Interview Simulation
                    <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ArrowRight className="w-5 h-5" />
                    </motion.div>
                </Link>
                <Link
                    href="/products/Practice-Tests"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition-colors"
                >
                    Practice Tests
                </Link>
            </motion.div>

            {/* Key Features */}
            <div className="grid gap-4">
                <Link href="/products/mock-interviews/visual-simulation">
                    <FeatureCard
                        icon={Brain}
                        title="AI Interview Simulation"
                        description="Practice with our intelligent AI interviewer in a realistic interview environment"
                        delay={0.3}
                    />
                </Link>
                <Link href="/products/interview-generator">
                    <FeatureCard
                        icon={Target}
                        title="Smart Question Generator"
                        description="Generate personalized interview questions and get instant AI-powered feedback"
                        delay={0.4}
                    />
                </Link>
            </div>

            {/* Stats Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-8 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
                <StatItem
                    value="95%"
                    label="Success Rate"
                    delay={0.7}
                />
                <StatItem
                    value="10k+"
                    label="Questions"
                    delay={0.8}
                />
                <StatItem
                    value="24/7"
                    label="Availability"
                    delay={0.9}
                />
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col gap-3"
            >
                {[
                    "Trusted by 100,000+ users worldwide",
                    "AI-powered personalized feedback",
                    "Regular updates with new features",
                ].map((text, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-[#fcba28]" />
                        {text}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
