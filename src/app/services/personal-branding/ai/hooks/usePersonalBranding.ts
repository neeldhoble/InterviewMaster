import { useState } from 'react';

interface BrandingFormData {
  name: string;
  title: string;
  industry: string;
  experience: string;
  linkedin: string;
  twitter: string;
  github: string;
  bio: string;
  goals: string[];
  targetAudience: string;
  uniqueValue: string;
  interests: string[];
}

interface BrandingAnalysis {
  brandIdentity: {
    coreBrandMessage: string;
    valueProposition: string;
    brandPersonality: string[];
    targetAudienceInsights: string[];
  };
  socialMediaAnalyses: Array<{
    platform: string;
    analysis: {
      profileStrength: string;
      recommendations: string[];
      metrics: {
        contentQuality: string;
        engagementRate: string;
        postingFrequency: string;
        networkGrowth: string;
      };
    };
  }>;
  contentStrategy: {
    topics: string[];
    contentTypes: string[];
    postingSchedule: string;
    voiceTone: string[];
  };
  visualBranding: {
    colorPalette: string[];
    visualStyle: string;
    imageGuidelines: string[];
  };
  growthStrategy: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  industryPositioning: {
    nicheFocus: string;
    thoughtLeadership: string[];
    competitiveAdvantage: string;
  };
  networkingStrategy: {
    targetConnections: string[];
    engagementTactics: string[];
    communityBuilding: string[];
  };
  metadata: {
    timestamp: string;
    version: string;
    industry: string;
    experienceLevel: string;
  };
}

export const usePersonalBranding = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BrandingAnalysis | null>(null);
  const [progress, setProgress] = useState(0);

  const analyzePersonalBrand = async (formData: BrandingFormData) => {
    try {
      setLoading(true);
      setError(null);
      setProgress(10);

      // Validate form data
      if (!formData.name || !formData.industry || !formData.bio) {
        throw new Error('Please fill in all required fields');
      }

      setProgress(30);

      const response = await fetch('/api/personal-branding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setProgress(60);

      if (!response.ok) {
        throw new Error('Failed to analyze personal brand');
      }

      setProgress(80);

      const data = await response.json();
      setResult(data);
      setProgress(100);

    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const exportAnalysis = () => {
    if (!result) return;

    const exportData = {
      ...result,
      exportDate: new Date().toISOString(),
      version: '2.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personal-branding-analysis-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    analyzePersonalBrand,
    resetAnalysis,
    exportAnalysis,
    loading,
    error,
    result,
    progress
  };
};

export type { BrandingFormData, BrandingAnalysis };
