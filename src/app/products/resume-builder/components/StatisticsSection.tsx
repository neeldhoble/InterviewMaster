"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Trophy, Users } from 'lucide-react';
import { Card, StatCard } from './ui';

const stats = [
    { 
        icon: FileText, 
        value: '50,000+', 
        label: 'Resumes Created',
        description: 'Trusted by professionals worldwide'
    },
    { 
        icon: Trophy, 
        value: '98%', 
        label: 'Success Rate',
        description: 'Of users land interviews'
    },
    { 
        icon: Users, 
        value: '30,000+', 
        label: 'Happy Users',
        description: 'And growing every day'
    },
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

export function StatisticsSection() {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <motion.div
            style={{ scale }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20"
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="transform transition-all duration-300"
                >
                    <Card className="p-6 hover:bg-white/5 transition-colors">
                        <StatCard
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            description={stat.description}
                            delay={0.4 + index * 0.1}
                        />
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}
