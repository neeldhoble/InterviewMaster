// @ts-nocheck
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChipBanner } from '@/components/ChipBanner';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import {
    Brain,
    Code,
    LineChart,
    MessageSquare,
    Monitor,
    Sparkles,
    Target,
    Trophy,
    Video,
    Users,
    Zap,
    BookOpen,
} from 'lucide-react';

const steps = [
    {
        title: "Create Your Learning Path",
        description: "Tell us about your target role, experience level, and preferred companies. We'll create a personalized interview preparation roadmap just for you.",
        icon: <Target className="w-6 h-6" />,
        color: "from-[#fcba28] to-[#FF652F]",
        bgGradient: "from-[#fcba28]/10 to-[#FF652F]/10",
        hoverGradient: "from-[#fcba28]/15 to-[#FF652F]/15",
    },
    {
        title: "Practice with AI Interviews",
        description: "Experience dynamic interviews with our advanced AI that adapts to your responses. Get instant feedback on your answers and communication style.",
        icon: <Brain className="w-6 h-6" />,
        color: "from-[#FF652F] to-[#fcba28]",
        bgGradient: "from-[#FF652F]/10 to-[#fcba28]/10",
        hoverGradient: "from-[#FF652F]/15 to-[#fcba28]/15",
    },
    {
        title: "Master Technical Skills",
        description: "Tackle real coding challenges, system design problems, and technical questions specific to your target companies with live AI guidance.",
        icon: <Code className="w-6 h-6" />,
        color: "from-[#fcba28] to-[#FF652F]",
        bgGradient: "from-[#fcba28]/10 to-[#FF652F]/10",
        hoverGradient: "from-[#fcba28]/15 to-[#FF652F]/15",
    },
    {
        title: "Track Your Progress",
        description: "Monitor your improvement with detailed analytics, success metrics, and personalized recommendations for areas that need focus.",
        icon: <LineChart className="w-6 h-6" />,
        color: "from-[#FF652F] to-[#fcba28]",
        bgGradient: "from-[#FF652F]/10 to-[#fcba28]/10",
        hoverGradient: "from-[#FF652F]/15 to-[#fcba28]/15",
    },
];

const features = [
    {
        title: "Smart Interview Simulator",
        description: "Our AI conducts realistic interviews, adapting questions based on your responses and experience level.",
        icon: <Brain className="w-6 h-6" />,
        gradient: "from-[#fcba28]/20 to-[#FF652F]/20",
        iconColor: "text-[#fcba28]",
    },
    {
        title: "Live Coding Environment",
        description: "Write, test, and debug code in our integrated IDE with real-time AI feedback and optimization suggestions.",
        icon: <Code className="w-6 h-6" />,
        gradient: "from-[#FF652F]/20 to-[#fcba28]/20",
        iconColor: "text-[#FF652F]",
    },
    {
        title: "Video Analysis",
        description: "Get feedback on your body language, tone, and presentation skills through our AI-powered video analysis.",
        icon: <Video className="w-6 h-6" />,
        gradient: "from-[#fcba28]/20 to-[#FF652F]/20",
        iconColor: "text-[#fcba28]",
    },
    {
        title: "Company-Specific Prep",
        description: "Access interview questions and patterns tailored to your target companies and roles.",
        icon: <Target className="w-6 h-6" />,
        gradient: "from-[#FF652F]/20 to-[#fcba28]/20",
        iconColor: "text-[#FF652F]",
    },
    {
        title: "Performance Analytics",
        description: "Track your progress with detailed metrics, success rates, and improvement trends over time.",
        icon: <LineChart className="w-6 h-6" />,
        gradient: "from-[#fcba28]/20 to-[#FF652F]/20",
        iconColor: "text-[#fcba28]",
    },
    {
        title: "Expert Resources",
        description: "Access our library of interview guides, tips, and best practices curated by industry experts.",
        icon: <BookOpen className="w-6 h-6" />,
        gradient: "from-[#FF652F]/20 to-[#fcba28]/20",
        iconColor: "text-[#FF652F]",
    },
    {
        title: "Mock Interview Sessions",
        description: "Practice with peers or schedule sessions with professional interviewers for real-world experience.",
        icon: <Users className="w-6 h-6" />,
        gradient: "from-[#fcba28]/20 to-[#FF652F]/20",
        iconColor: "text-[#fcba28]",
    },
    {
        title: "Instant Feedback",
        description: "Receive immediate, actionable feedback on your responses, code solutions, and overall performance.",
        icon: <Zap className="w-6 h-6" />,
        gradient: "from-[#FF652F]/20 to-[#fcba28]/20",
        iconColor: "text-[#FF652F]",
    },
];

const BackgroundGradient = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    
    return (
        <motion.div ref={ref} style={{ opacity }} className="absolute inset-0 overflow-hidden">
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#FF652F15_0%,transparent_50%)]" />
        </motion.div>
    );
};

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`group relative flex flex-col items-start gap-4 p-8 rounded-2xl bg-gradient-to-br ${step.bgGradient} hover:bg-gradient-to-br ${step.hoverGradient} border border-white/5 transition-all duration-300`}
        >
            <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${step.color} text-background shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">{step.title}</h3>
                <p className="text-white/70 leading-relaxed text-lg">
                    {step.description}
                </p>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    );
};

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 hover:bg-gradient-to-br hover:from-white/[0.04] hover:to-transparent transition-all duration-300"
        >
            <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent group-hover:from-[#fcba28] group-hover:to-[#FF652F] transition-colors duration-300">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
            </div>
        </motion.div>
    );
};

export const HowToUse = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    return (
        <section ref={containerRef} className="relative py-24 sm:py-32 bg-gradient-to-b from-background to-background/95 overflow-hidden">
            <BackgroundGradient />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <MaxWidthWrapper>
                <motion.div style={{ opacity, scale }} className="relative space-y-20">
                    <div className="flex flex-col items-center justify-center text-center">
                        <ChipBanner text="HOW IT WORKS" />
                        <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#fcba28] via-white to-[#FF652F] bg-clip-text text-transparent">
                            Your Path to Interview Success
                        </h2>
                        <p className="mt-6 text-xl text-white/70 max-w-3xl leading-relaxed">
                            Master the art of interviewing with our AI-powered platform. From technical challenges to behavioral assessments, we've got you covered every step of the way.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {steps.map((step, index) => (
                            <StepCard key={step.title} step={step} index={index} />
                        ))}
                    </div>

                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#fcba28] to-[#FF652F] bg-clip-text text-transparent mb-6">
                                Advanced Features for Complete Interview Preparation
                            </h3>
                            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                                Everything you need to ace your interviews, from AI-powered practice to detailed performance analytics
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <FeatureCard key={feature.title} feature={feature} index={index} />
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-8 text-center bg-gradient-to-br from-[#fcba28]/5 to-[#FF652F]/5 rounded-3xl p-12 border border-white/5"
                    >
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#fcba28]/20 to-[#FF652F]/20">
                            <Sparkles className="w-10 h-10 text-[#fcba28]" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#fcba28] to-[#FF652F] bg-clip-text text-transparent">
                                Ready to Ace Your Interviews?
                            </h3>
                            <p className="text-xl text-white/70 max-w-2xl">
                                Join thousands of successful candidates who have landed their dream jobs using InterviewMaster.ai
                            </p>
                        </div>
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-[#fcba28] to-[#FF652F] text-background hover:opacity-90 text-lg px-8 py-6 rounded-xl font-bold transform hover:scale-105 transition-transform duration-300"
                        >
                            Start Free Trial Now
                        </Button>
                    </motion.div>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
};
