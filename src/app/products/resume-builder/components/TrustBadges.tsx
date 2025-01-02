"use client";

import { motion } from 'framer-motion';
import { Shield, Award, Star, Clock } from 'lucide-react';

const badges = [
    {
        icon: Shield,
        text: "ATS Optimized",
        color: "#4CAF50"
    },
    {
        icon: Award,
        text: "Expert Reviewed",
        color: "#fcba28"
    },
    {
        icon: Star,
        text: "98% Success Rate",
        color: "#2196F3"
    },
    {
        icon: Clock,
        text: "24/7 Support",
        color: "#9C27B0"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

export function TrustBadges() {
    return (
        <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                    <motion.div
                        key={index}
                        className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            boxShadow: `0 0 20px ${badge.color}15`
                        }}
                    >
                        <Icon className="w-4 h-4" style={{ color: badge.color }} />
                        <span className="text-sm text-white/80">{badge.text}</span>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
