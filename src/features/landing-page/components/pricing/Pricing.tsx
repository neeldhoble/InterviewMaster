'use client';

// @ts-nocheck
import { cn } from "@/lib/utils";
import { Check, Zap, Star, Sparkles, Crown } from "lucide-react";
import { BuyButton } from "@/components/BuyButton";
import { ChipBanner } from "@/components/ChipBanner";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { motion } from "framer-motion";

const packages = [
    {
        name: "Basic Prep",
        tagline: "For Interview Beginners",
        originalPrice: 49,
        price: 19,
        features: [
            "100+ AI Mock Interview Questions",
            "Basic Interview Simulator",
            "Interview Preparation Guides",
            "Resume Template Library",
            "Email Support (24/7)",
            "Performance Analytics Dashboard",
            "Interview Recording (10 sessions)",
            "Community Forum Access",
        ],
        icon: Star,
    },
    {
        name: "Pro Interview",
        tagline: "Most Popular Choice",
        originalPrice: 149,
        price: 49,
        popular: true,
        features: [
            { text: "Everything in Basic, plus:", icon: "Zap" },
            { text: "Unlimited AI Mock Interviews", icon: "Zap" },
            { text: "Real-time Interview Feedback", icon: "Sparkles" },
            { text: "Advanced Analytics & Reports", icon: "Sparkles" },
            "Company-specific Interview Prep",
            "Resume ATS Optimization",
            "2 Expert Mock Sessions",
            "Priority Email Support",
            "Interview Strategy Planning",
            "Custom Interview Scenarios",
        ],
        icon: Sparkles,
    },
    {
        name: "Elite Success",
        tagline: "For Serious Job Seekers",
        originalPrice: 299,
        price: 99,
        features: [
            { text: "Everything in Pro, plus:", icon: "Crown" },
            { text: "1-on-1 Career Coach", icon: "Crown" },
            { text: "Weekly Strategy Sessions", icon: "Crown" },
            "5 Expert Mock Interviews",
            "Leadership Interview Training",
            "Salary Negotiation Mastery",
            "Executive Presence Coaching",
            "Personal Brand Development",
            "Lifetime Access & Updates",
            "VIP Priority Support",
        ],
        icon: Crown,
    },
];

export const Pricing = () => {
    return (
        <section id="pricing" className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background py-24 sm:py-32">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Animated Background Circles */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#fcba28]/5 rounded-full opacity-20 animate-blob" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF652F]/5 rounded-full opacity-20 animate-blob animation-delay-2000" />

            <MaxWidthWrapper className="relative">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col justify-center items-center gap-6 max-w-3xl mx-auto mb-16"
                >
                    <ChipBanner text="PRICING PLANS" />
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center bg-gradient-to-r from-[#fcba28] via-amber-500 to-[#FF652F] bg-clip-text text-transparent leading-tight">
                        Choose Your Path to Interview Success
                    </h2>
                    <p className="text-lg md:text-xl text-center text-white/70 max-w-2xl leading-relaxed px-4">
                        Select the perfect plan to master your interview skills and land your dream job. All plans include lifetime access.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 mx-auto max-w-7xl px-4"
                >
                    {packages.map((pkg, index) => {
                        const Icon = pkg.icon;
                        return (
                            <motion.div
                                key={pkg.name}
                                whileHover={{ scale: 1.02, translateY: -5 }}
                                transition={{ duration: 0.2 }}
                                className={cn(
                                    "relative flex flex-col h-full rounded-2xl p-6 md:p-8 shadow-md border border-white/5",
                                    pkg.name === "Basic Prep" && "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/15 hover:to-cyan-500/15",
                                    pkg.popular && "bg-gradient-to-br from-[#fcba28]/10 to-[#FF652F]/10 hover:from-[#fcba28]/15 hover:to-[#FF652F]/15 ring-2 ring-[#fcba28]",
                                    pkg.name === "Elite Success" && "bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/15 hover:to-pink-500/15"
                                )}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-full flex justify-center">
                                        <div className="relative inline-block">
                                            <div className="relative z-10 rounded-full bg-gradient-to-r from-[#fcba28] to-[#FF652F] px-8 py-2 shadow-lg">
                                                <p className="text-sm font-bold uppercase tracking-wider text-background whitespace-nowrap">
                                                    Most Popular
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className={cn(
                                    "flex-1",
                                    pkg.popular ? "mt-8" : "mt-0"
                                )}>
                                    {/* Package Header */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={cn(
                                            "p-3 rounded-xl shrink-0",
                                            pkg.name === "Basic Prep" && "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
                                            pkg.popular && "bg-gradient-to-br from-[#fcba28]/20 to-[#FF652F]/20",
                                            pkg.name === "Elite Success" && "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                                        )}>
                                            <Icon className={cn(
                                                "h-7 w-7",
                                                pkg.name === "Basic Prep" && "text-cyan-400",
                                                pkg.popular && "text-[#fcba28]",
                                                pkg.name === "Elite Success" && "text-pink-400"
                                            )} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className={cn(
                                                "text-xl font-bold truncate",
                                                pkg.name === "Basic Prep" && "text-cyan-50",
                                                pkg.popular && "text-white",
                                                pkg.name === "Elite Success" && "text-pink-50"
                                            )}>{pkg.name}</h3>
                                            <p className="text-sm text-white/60 truncate">{pkg.tagline}</p>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="flex items-baseline gap-x-2 mb-8">
                                        <div className="flex items-baseline gap-x-2">
                                            <span className="text-base line-through opacity-50 text-white/50">${pkg.originalPrice}</span>
                                            <span className={cn(
                                                "text-4xl font-black",
                                                pkg.name === "Basic Prep" && "text-cyan-400",
                                                pkg.popular && "text-[#fcba28]",
                                                pkg.name === "Elite Success" && "text-pink-400"
                                            )}>${pkg.price}</span>
                                        </div>
                                        <span className="text-base font-medium text-white/70">/mo</span>
                                    </div>

                                    {/* Features List */}
                                    <ul role="list" className="mb-8 space-y-3">
                                        {pkg.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start gap-3 group">
                                                {typeof feature === 'string' ? (
                                                    <>
                                                        <div className={cn(
                                                            "p-1.5 rounded-lg transition-colors duration-200 mt-0.5",
                                                            pkg.name === "Basic Prep" && "bg-blue-500/10 group-hover:bg-blue-500/15",
                                                            pkg.popular && "bg-[#fcba28]/10 group-hover:bg-[#fcba28]/15",
                                                            pkg.name === "Elite Success" && "bg-purple-500/10 group-hover:bg-purple-500/15"
                                                        )}>
                                                            <Check className={cn(
                                                                "h-4 w-4",
                                                                pkg.name === "Basic Prep" && "text-cyan-400",
                                                                pkg.popular && "text-[#fcba28]",
                                                                pkg.name === "Elite Success" && "text-pink-400"
                                                            )} />
                                                        </div>
                                                        <span className="text-sm text-white/80 group-hover:text-white/90 transition-colors duration-200 leading-tight">{feature}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className={cn(
                                                            "p-1.5 rounded-lg transition-colors duration-200 mt-0.5",
                                                            pkg.name === "Basic Prep" && "bg-blue-500/10 group-hover:bg-blue-500/15",
                                                            pkg.popular && "bg-[#fcba28]/10 group-hover:bg-[#fcba28]/15",
                                                            pkg.name === "Elite Success" && "bg-purple-500/10 group-hover:bg-purple-500/15"
                                                        )}>
                                                            {feature.icon === "Zap" && (
                                                                <Zap className={cn(
                                                                    "h-4 w-4",
                                                                    pkg.name === "Basic Prep" && "text-cyan-400",
                                                                    pkg.popular && "text-[#fcba28]",
                                                                    pkg.name === "Elite Success" && "text-pink-400"
                                                                )} />
                                                            )}
                                                            {feature.icon === "Sparkles" && (
                                                                <Sparkles className={cn(
                                                                    "h-4 w-4",
                                                                    pkg.name === "Basic Prep" && "text-cyan-400",
                                                                    pkg.popular && "text-[#fcba28]",
                                                                    pkg.name === "Elite Success" && "text-pink-400"
                                                                )} />
                                                            )}
                                                            {feature.icon === "Crown" && (
                                                                <Crown className={cn(
                                                                    "h-4 w-4",
                                                                    pkg.name === "Basic Prep" && "text-cyan-400",
                                                                    pkg.popular && "text-[#fcba28]",
                                                                    pkg.name === "Elite Success" && "text-pink-400"
                                                                )} />
                                                            )}
                                                        </div>
                                                        <span className="text-sm text-white/90 font-medium group-hover:text-white transition-colors duration-200 leading-tight">{feature.text}</span>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA Section */}
                                <div className="space-y-4 mt-auto">
                                    <BuyButton 
                                        text={pkg.popular ? "GET STARTED NOW" : "SELECT PLAN"}
                                        kit={pkg.name as "Basic Prep" | "Pro Interview" | "Elite Success"}
                                        className={cn(
                                            "w-full justify-center text-sm font-bold py-4",
                                            pkg.name === "Basic Prep" && "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600",
                                            pkg.popular && "bg-gradient-to-r from-[#fcba28] to-[#FF652F] text-background hover:from-[#fcba28]/90 hover:to-[#FF652F]/90",
                                            pkg.name === "Elite Success" && "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                                        )}
                                    />
                                    <p className="text-xs text-center text-white/60">
                                        30-day money-back guarantee
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Trust Indicators */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-20 text-center space-y-8"
                >
                    {/* Success Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4">
                        <div className="p-4 rounded-xl bg-white/5">
                            <p className="text-2xl md:text-3xl font-bold text-[#fcba28]">10,000+</p>
                            <p className="text-sm text-white/60">Happy Users</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5">
                            <p className="text-2xl md:text-3xl font-bold text-[#fcba28]">95%</p>
                            <p className="text-sm text-white/60">Success Rate</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5">
                            <p className="text-2xl md:text-3xl font-bold text-[#fcba28]">500+</p>
                            <p className="text-sm text-white/60">Companies</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5">
                            <p className="text-2xl md:text-3xl font-bold text-[#fcba28]">4.9/5</p>
                            <p className="text-sm text-white/60">User Rating</p>
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="mt-12">
                        <p className="text-lg text-white/70">
                            Need a custom enterprise plan?{" "}
                            <a href="#contact" className="text-[#fcba28] hover:text-[#FF652F] transition-colors duration-200 font-medium hover:underline">
                                Contact our team
                            </a>
                        </p>
                    </div>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
};
