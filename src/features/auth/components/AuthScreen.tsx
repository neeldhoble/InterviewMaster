"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthFlow } from "@/features/auth/lib/types";
import { SignInCard } from "./SignInCard";
import { SignUpCard } from "./SignUpCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthScreenProps {
  onClose?: () => void;
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const AuthScreen = ({ onClose }: AuthScreenProps) => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>("signIn");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const handleContinueWithoutLogin = () => {
    document.cookie = "bypass_auth=true; path=/; max-age=7200";
    if (onClose) onClose();
    router.push(redirectUrl);
  };

  const handleContinueAsGuest = () => {
    localStorage.setItem('userStatus', 'guest');
    router.push('/');
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-[280px] mx-auto"
      >
        {/* Close button with enhanced glow effect */}
        {onClose && (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute -right-2 -top-2 p-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-all duration-300 z-50 group"
          >
            <X className="h-3.5 w-3.5 text-[#fcba28] opacity-80 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute inset-0 bg-[#fcba28]/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </motion.button>
        )}

        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-3"
        >
          {/* Brand Header */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-0.5"
          >
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#fcba28] via-[#fcba28]/90 to-[#fcba28]/70 bg-clip-text text-transparent">
              InterviewMaster.ai
            </h1>
            <p className="text-xs text-muted-foreground/80">Your path to success</p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={authFlow}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -10 }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {authFlow === "signIn" ? (
                <SignInCard setState={setAuthFlow} />
              ) : (
                <SignUpCard setState={setAuthFlow} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};