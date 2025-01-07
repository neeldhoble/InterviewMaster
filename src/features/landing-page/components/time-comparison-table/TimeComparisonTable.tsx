// @ts-nocheck
"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { 
  ArrowRight, Clock, Zap, CheckCircle2, XCircle, Brain, Target, Trophy,
  BookOpen, Users, MessageSquare, LineChart, Briefcase, Code, Video, Settings
} from "lucide-react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";

const features = [
  {
    name: "AI-Powered Mock Interviews",
    competitor: { time: "Manual setup", status: false },
    kit: { time: "Instant", status: true },
    description: "Dynamic AI interviews with real-time feedback and adaptive questioning",
    icon: <Brain className="w-5 h-5 text-[#fcba28]" />
  },
  {
    name: "Technical Interview Practice",
    competitor: { time: "2-3 hours", status: false },
    kit: { time: "15 minutes", status: true },
    description: "Live coding environment with instant code analysis and feedback",
    icon: <Code className="w-5 h-5 text-[#fcba28]" />
  },
  {
    name: "Performance Analytics",
    competitor: { time: "Manual tracking", status: false },
    kit: { time: "Real-time", status: true },
    description: "Comprehensive analytics dashboard with improvement tracking",
    icon: <LineChart className="w-5 h-5 text-[#fcba28]" />
  },
  {
    name: "Company-Specific Prep",
    competitor: { time: "Hours of research", status: false },
    kit: { time: "Instant access", status: true },
    description: "Tailored questions and scenarios for your target companies",
    icon: <Briefcase className="w-5 h-5 text-[#fcba28]" />
  },
  {
    name: "Interview Recording & Review",
    competitor: { time: "Manual recording", status: false },
    kit: { time: "Auto-recorded", status: true },
    description: "Automatic recording and AI-powered analysis of your responses",
    icon: <Video className="w-5 h-5 text-[#fcba28]" />
  },
  {
    name: "Peer Learning Community",
    competitor: { time: "Limited access", status: false },
    kit: { time: "24/7 access", status: true },
    description: "Connect with peers and share interview experiences",
    icon: <Users className="w-5 h-5 text-[#fcba28]" />
  },
  {
    name: "Study Materials",
    competitor: { time: "Self-curated", status: false },
    kit: { time: "AI-curated", status: true },
    description: "Personalized study materials based on your target role",
    icon: <BookOpen className="w-5 h-5 text-[#fcba28]" />
  },
  {
    name: "Feedback System",
    competitor: { time: "Delayed feedback", status: false },
    kit: { time: "Instant feedback", status: true },
    description: "Real-time feedback on your answers and performance",
    icon: <MessageSquare className="w-5 h-5 text-[#fcba28]" />
  }
];

const stats = [
  {
    value: "95%",
    label: "Success Rate",
    description: "of our users land their dream jobs"
  },
  {
    value: "80%",
    label: "Time Saved",
    description: "compared to traditional prep methods"
  },
  {
    value: "24/7",
    label: "Availability",
    description: "practice anytime, anywhere"
  },
  {
    value: "10K+",
    label: "Active Users",
    description: "trust InterviewMaster.ai"
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
};

const BackgroundGradient = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2815_0%,transparent_65%)] blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2820_0%,transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#FF652F20_0%,transparent_50%)]" />
  </div>
);

export const TimeComparisonTable = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background/95 to-background">
      <BackgroundGradient />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <MaxWidthWrapper className="relative z-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <motion.div 
              variants={itemVariants}
              className="inline-block rounded-full bg-gradient-to-r from-[#fcba28]/20 to-[#FF652F]/20 px-6 py-2 mb-4"
            >
              <span className="text-white/90 font-semibold">
                Why Choose InterviewMaster.ai?
              </span>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#fcba28] via-white to-[#FF652F] bg-clip-text text-transparent"
            >
              Traditional vs InterviewMaster.ai
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              Experience the future of interview preparation with our AI-powered platform that saves time and maximizes your success rate
            </motion.p>
          </div>

          {/* Comparison Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Traditional Methods Card */}
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 space-y-6 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-4">Traditional Methods</h3>
                <ul className="space-y-6">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                        <XCircle className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <div className="font-medium text-white/90 group-hover:text-white transition-colors">{feature.name}</div>
                        <div className="text-sm text-white/60 flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4" />
                          {feature.competitor.time}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* InterviewMaster.ai Card */}
            <div className="relative rounded-2xl border border-[#fcba28]/20 bg-gradient-to-br from-[#fcba28]/10 to-[#FF652F]/5 p-8 space-y-6 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent rounded-2xl" />
              <div className="relative">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#fcba28] to-[#FF652F] bg-clip-text text-transparent mb-4">
                  InterviewMaster.ai
                </h3>
                <ul className="space-y-6">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-[#fcba28]/20 to-[#FF652F]/20 group-hover:from-[#fcba28]/30 group-hover:to-[#FF652F]/30 transition-all">
                        {feature.icon}
                      </div>
                      <div>
                        <div className="font-medium text-white/90 group-hover:text-white transition-colors">{feature.name}</div>
                        <div className="text-sm text-[#fcba28] flex items-center gap-2 mt-1">
                          <Zap className="w-4 h-4" />
                          {feature.kit.time}
                        </div>
                        <div className="text-sm text-white/60 mt-1 group-hover:text-white/70 transition-colors">
                          {feature.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl border border-[#fcba28]/20 bg-gradient-to-br from-[#fcba28]/5 to-transparent text-center group hover:from-[#fcba28]/10 transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[#fcba28] to-[#FF652F] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-medium text-white/90 mb-1">{stat.label}</div>
                <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  {stat.description}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6 mt-16"
          >
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#fcba28] to-[#FF652F] bg-clip-text text-transparent">
              Ready to Transform Your Interview Preparation?
            </h3>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Join thousands of successful candidates who have mastered their interview skills with InterviewMaster.ai
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#fcba28] to-[#FF652F] text-white hover:opacity-90 text-lg px-8 py-6 rounded-xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#fcba28]/20"
            >
              Start Free Trial Now
            </Button>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
};
