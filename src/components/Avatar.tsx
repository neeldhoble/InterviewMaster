"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AvatarProps {
  avatarState: 'idle' | 'speaking' | 'thinking' | 'greeting';
  className?: string;
}

export default function Avatar({ avatarState = 'idle', className = '' }: AvatarProps) {
  const [blinkInterval, setBlinkInterval] = useState<NodeJS.Timeout | null>(null);

  // Animation variants
  const bodyVariants = {
    idle: {
      y: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      }
    },
    speaking: {
      y: [0, -2, 0],
      transition: {
        repeat: Infinity,
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const headVariants = {
    idle: {
      rotate: [0, -1, 0, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      }
    },
    speaking: {
      rotate: [0, -0.5, 0, 0.5, 0],
      transition: {
        repeat: Infinity,
        duration: 0.3,
        ease: "linear"
      }
    }
  };

  const mouthVariants = {
    idle: {
      d: "M 25,40 Q 40,43 55,40",
      transition: {
        duration: 0.5
      }
    },
    speaking: {
      d: [
        "M 25,40 Q 40,43 55,40",
        "M 25,40 Q 40,48 55,40",
        "M 25,40 Q 40,43 55,40"
      ],
      transition: {
        repeat: Infinity,
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const eyeVariants = {
    open: { scaleY: 1 },
    closed: { scaleY: 0.1 }
  };

  useEffect(() => {
    // Random blinking
    const startBlinking = () => {
      const interval = setInterval(() => {
        const shouldBlink = Math.random() > 0.7;
        if (shouldBlink) {
          setEyesOpen(false);
          setTimeout(() => setEyesOpen(true), 150);
        }
      }, 2000);

      setBlinkInterval(interval);
    };

    startBlinking();
    return () => {
      if (blinkInterval) clearInterval(blinkInterval);
    };
  }, []);

  const [eyesOpen, setEyesOpen] = useState(true);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        initial="idle"
        animate={avatarState}
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#fcba28', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#fcd978', stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>

        {/* Avatar body group */}
        <motion.g
          variants={bodyVariants}
          style={{ originX: 0.5, originY: 0.5 }}
        >
          {/* Suit */}
          <path
            d="M 60,120 L 100,180 L 140,120 L 120,100 L 80,100 Z"
            fill="#2c3e50"
            stroke="#34495e"
            strokeWidth="2"
          />
          
          {/* Shirt */}
          <path
            d="M 80,100 L 100,120 L 120,100 L 110,90 L 90,90 Z"
            fill="#ecf0f1"
            stroke="#bdc3c7"
            strokeWidth="1"
          />

          {/* Tie */}
          <path
            d="M 97,100 L 103,100 L 100,120 Z"
            fill="#e74c3c"
            stroke="#c0392b"
            strokeWidth="1"
          />

          {/* Head group */}
          <motion.g
            variants={headVariants}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            {/* Head shape */}
            <circle
              cx="100"
              cy="70"
              r="30"
              fill="#ffd977"
              stroke="#34495e"
              strokeWidth="2"
            />

            {/* Eyes group */}
            <motion.g
              animate={eyesOpen ? "open" : "closed"}
              variants={eyeVariants}
              style={{ originY: "70%" }}
            >
              {/* Left eye */}
              <circle cx="85" cy="65" r="3" fill="#34495e" />
              {/* Right eye */}
              <circle cx="115" cy="65" r="3" fill="#34495e" />
            </motion.g>

            {/* Eyebrows */}
            <path
              d="M 80,58 L 90,60"
              stroke="#34495e"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 110,60 L 120,58"
              stroke="#34495e"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Mouth */}
            <motion.path
              variants={mouthVariants}
              fill="none"
              stroke="#34495e"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
        </motion.g>

        {/* Professional accessories */}
        <path
          d="M 70,65 Q 65,60 70,55"
          stroke="#34495e"
          strokeWidth="2"
          fill="none"
        />
      </motion.svg>
    </div>
  );
}
