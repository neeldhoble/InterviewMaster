"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Background = () => {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const gradientX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Animated gradient overlay */}
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
        style={{
          x: gradientX,
          y: gradientY,
        }}
      />

      {/* Mouse-following gradient */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2808_0%,transparent_50%)] blur-2xl pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x}%, ${mousePosition.y}%)`,
          transition: 'transform 0.2s ease-out',
        }}
      />

      {/* Additional gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />

      {/* Animated grid pattern */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] [background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMCBgYGBgYoSu7hAAAARklEQVQ4y2NgGAWjYBSMgkEJGEEEyHBgcICy2YB0AyPIGAEwJcMNGAWGgkCSQcGBQRPMZgYaykDICA4wVxkKgMkRjETDNwAAM3wZkEyXHNEAAAAASUVORK5CYII=)]" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
              x: [Math.random() * 100 + "vw", Math.random() * 100 + "vw"],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
};
