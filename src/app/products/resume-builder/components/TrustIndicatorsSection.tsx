"use client";

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const trustIndicators = [
    "AI-powered resume analysis and optimization",
    "Professional templates for every industry",
    "Expert guidance and real-time feedback",
    "24/7 customer support",
    "100% satisfaction guarantee"
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

export function TrustIndicatorsSection() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-3 py-20"
        >
            {trustIndicators.map((text, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors"
                >
                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <CheckCircle2 className="w-4 h-4 text-[#fcba28]" />
                    </motion.div>
                    {text}
                </motion.div>
            ))}
        </motion.div>
    );
}
