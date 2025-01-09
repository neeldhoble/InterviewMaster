"use client";
import { useState } from "react";
import { AuthFlow } from "@/features/auth/lib/types";
import { useAuthActions } from "@convex-dev/auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";

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

interface SignUpCardProps {
  setState: (state: AuthFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpByOAuth = (provider: "github" | "google") => {
    setPending(true);
    signIn(provider).finally(() => setPending(false));
  };

  const signUpByEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (account.password !== account.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setPending(true);
    signIn("password", {
      name: account.name,
      email: account.email,
      password: account.password,
      flow: "signUp",
    })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => setPending(false));
  };

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

        <form onSubmit={signUpByEmail} className="space-y-2">
          <div className="space-y-1.5">
            <Input
              type="text"
              placeholder="Full name"
              value={account.name}
              onChange={(e) => setAccount({ ...account, name: e.target.value })}
              className="h-8 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300"
            />
            <Input
              type="email"
              placeholder="Email"
              value={account.email}
              onChange={(e) => setAccount({ ...account, email: e.target.value })}
              className="h-8 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300"
            />
            <Input
              type="password"
              placeholder="Password"
              value={account.password}
              onChange={(e) => setAccount({ ...account, password: e.target.value })}
              className="h-8 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300"
            />
            <Input
              type="password"
              placeholder="Confirm password"
              value={account.confirmPassword}
              onChange={(e) => setAccount({ ...account, confirmPassword: e.target.value })}
              className="h-8 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300"
            />
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="w-full h-8 text-sm bg-[#fcba28] hover:bg-[#fcba28]/90 text-background font-medium transition-all duration-300"
          >
            {pending ? "Creating account..." : "Create account"}
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
            onClick={() => signUpByOAuth("google")}
            disabled={pending}
            className="h-8 text-xs bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <FcGoogle className="h-3.5 w-3.5 mr-1.5" />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => signUpByOAuth("github")}
            disabled={pending}
            className="h-8 text-xs bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <FaGithub className="h-3.5 w-3.5 mr-1.5" />
            GitHub
          </Button>
        </div>

        <div className="text-center text-[11px]">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <button
            type="button"
            onClick={() => setState("signIn")}
            className="text-[#fcba28] hover:text-[#fcba28]/80 font-medium transition-colors"
          >
            Sign in
          </button>
        </div>
      </CardContent>
    </Card>
  );
};