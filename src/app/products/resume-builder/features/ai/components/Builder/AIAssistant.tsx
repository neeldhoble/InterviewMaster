"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send } from 'lucide-react';

interface AIAssistantProps {
  resumeData: any;
  onUpdate: (data: any) => void;
}

export function AIAssistant({ resumeData, onUpdate }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement AI suggestions
      // This would connect to your AI backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example response
      const suggestions = {
        skills: ['Leadership', 'Problem Solving', 'Communication'],
        experience: 'Consider adding more quantitative results...'
      };
      
      // Update resume data with AI suggestions
      onUpdate({
        ...resumeData,
        suggestions
      });
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };

  return (
    <Card className="bg-[#141C23]/80 border-[#2A3441]/50 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
      </div>
      
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask for suggestions or improvements..."
        className="min-h-[100px] bg-[#1A2430] border-[#2A3441] text-white placeholder:text-gray-400"
      />
      
      <Button
        onClick={handleSubmit}
        disabled={isLoading || !prompt}
        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
      >
        {isLoading ? (
          'Generating suggestions...'
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Get AI Suggestions
          </>
        )}
      </Button>
    </Card>
  );
}
