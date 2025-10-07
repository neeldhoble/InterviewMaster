"use client";

import { useState } from "react";
import { AuthFlow } from "@/features/auth/lib/types";
import { SignInCard } from "./SignInCard";
import { SignUpCard } from "./SignUpCard";


export const AuthScreen = () => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>("signIn"); 

  return (
    <section className="h-full flex items-center justify-center bg-background">
      <aside className="md:h-auto md:w-[420px]">
        {authFlow === "signIn" ? <SignInCard setState={setAuthFlow} /> : <SignUpCard setState={setAuthFlow} />}
      </aside>
    </section>
  );
};