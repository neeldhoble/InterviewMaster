"use client";

import { useResume } from "../../context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileSignature } from "lucide-react";

export function Declaration() {
  const { resumeData, updatePersonalInfo } = useResume();
  const [declaration, setDeclaration] = useState(resumeData.personalInfo?.declaration || "");

  const handleSave = () => {
    if (!resumeData.personalInfo) return;
    updatePersonalInfo({
      ...resumeData.personalInfo,
      declaration,
    });
  };

  const handleDeclarationChange = (value: string) => {
    setDeclaration(value);
    // Debounced save
    const timeoutId = setTimeout(() => {
      if (!resumeData.personalInfo) return;
      updatePersonalInfo({
        ...resumeData.personalInfo,
        declaration: value,
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const sampleDeclarations = [
    {
      title: "Professional Standard",
      text: "I hereby declare that all the information stated above is true and correct to the best of my knowledge and belief. I understand that any willful misstatement described herein may lead to disqualification or dismissal."
    },
    {
      title: "Detailed Version",
      text: "I declare that the information provided in this resume is accurate and truthful. I am aware that any false statements may result in the rejection of my application or termination of employment if discovered after hiring."
    },
    {
      title: "Simple Version",
      text: "I confirm that all information presented in this resume is true and accurate to the best of my knowledge. I understand the importance of honesty in the application process."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20 w-fit">
        <FileSignature className="w-5 h-5 text-[#fcba28]" />
        <span className="text-sm font-medium">Declaration Section</span>
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Add Your Declaration</h1>
        <p className="text-muted-foreground">
          A professional declaration adds credibility to your resume by affirming the truthfulness of your information.
        </p>
      </div>

      <Card className="bg-white/5 border border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Declaration Statement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="declaration">Your Declaration</Label>
            <Textarea
              id="declaration"
              placeholder="I hereby declare that all the information stated above is true and correct to the best of my knowledge and belief..."
              value={declaration}
              onChange={(e) => handleDeclarationChange(e.target.value)}
              className="min-h-[150px] bg-white/5 border border-white/10"
            />
          </div>

          <div className="space-y-4">
            <div className="text-sm space-y-2">
              <p className="font-medium text-muted-foreground">Tips for a Professional Declaration:</p>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                <li>Keep it concise and professional</li>
                <li>Include a statement about the truthfulness of your information</li>
                <li>Mention your understanding of the consequences of false information</li>
                <li>The date and your name will be automatically added to the declaration in the resume</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Declarations */}
      <Card className="bg-white/5 border border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Sample Declarations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sampleDeclarations.map((sample, index) => (
            <button
              key={index}
              className="w-full p-4 rounded-lg border border-white/10 cursor-pointer hover:bg-white/5 transition-colors text-left"
              onClick={() => handleDeclarationChange(sample.text)}
            >
              <p className="text-sm font-medium mb-2">{sample.title}</p>
              <p className="text-sm text-muted-foreground">{sample.text}</p>
            </button>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
