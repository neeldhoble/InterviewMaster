"use client";
import { useState } from "react";
import { AuthFlow } from "@/features/auth/lib/types";
import { useAuthActions } from "@convex-dev/auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SignInCardProps {
    setState: (state: AuthFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions();
    const [account, setAccount] = useState({
        email: "",
        password: ""
    });
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const signInByOAuth = async (provider: "github" | "google") => {
        try {
            setPending(true);
            setError(null);
            await signIn(provider);
        } catch (err) {
            setError(`Failed to sign in with ${provider}. Please try again or use email.`);
        } finally {
            setPending(false);
        }
    }

    const signInByEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!account.email || !account.password) {
            setError("Please fill in all fields");
            return;
        }
        
        try {
            setPending(true);
            setError(null);
            await signIn("password", {
                email: account.email,
                password: account.password,
                flow: "signIn",
            });
        } catch (err) {
            setError("Invalid credentials. Please try again or continue without login.");
        } finally {
            setPending(false);
        }
    }

    return (
        <Card className="border border-white/10 shadow-lg bg-black/40 backdrop-blur-sm">
            <CardContent className="space-y-3 p-3">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-1.5 p-1.5 text-[11px] text-red-500/90 bg-red-500/10 rounded-md border border-red-500/20"
                    >
                        <TriangleAlert className="h-3 w-3 flex-shrink-0 mt-0.5" />
                        <p>{error}</p>
                    </motion.div>
                )}

                <form onSubmit={signInByEmail} className="space-y-2">
                    <div className="space-y-1.5">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={account.email}
                            onChange={(e) => setAccount({ ...account, email: e.target.value })}
                            className="h-8 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300"
                        />
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={account.password}
                                onChange={(e) => setAccount({ ...account, password: e.target.value })}
                                className="h-8 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#fcba28]/70 hover:text-[#fcba28] transition-colors"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={pending}
                        className="w-full h-8 text-sm bg-[#fcba28] hover:bg-[#fcba28]/90 text-background font-medium transition-all duration-300"
                    >
                        {pending ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase">
                        <span className="px-2 bg-background text-[#fcba28]/70">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => signInByOAuth("google")}
                        disabled={pending}
                        className="h-8 text-xs bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                        <FcGoogle className="h-3.5 w-3.5 mr-1.5" />
                        Google
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => signInByOAuth("github")}
                        disabled={pending}
                        className="h-8 text-xs bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                        <FaGithub className="h-3.5 w-3.5 mr-1.5" />
                        GitHub
                    </Button>
                </div>

                <div className="text-center text-[11px]">
                    <span className="text-muted-foreground">
                        Don't have an account?{" "}
                    </span>
                    <button
                        type="button"
                        onClick={() => setState("signUp")}
                        className="text-[#fcba28] hover:text-[#fcba28]/80 font-medium transition-colors"
                    >
                        Sign up
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};