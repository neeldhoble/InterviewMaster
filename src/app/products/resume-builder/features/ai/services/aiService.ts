interface AIPromptTemplates {
  summary: string;
  experience: string;
  education: string;
  skills: string;
}

const promptTemplates: AIPromptTemplates = {
  summary: `Create a professional summary for a {role} with {years} years of experience in {industry}. 
Focus on: {focus}. Style: {style}`,

  experience: `Generate a detailed job description for a {role} position at {company}.
Duration: {duration}
Key achievements should focus on: {focus}
Include quantifiable metrics where possible.
Style: {style}`,

  education: `Create an education description for {degree} in {field} from {school}.
Duration: {duration}
Focus on: {focus}
Include relevant coursework and achievements.
Style: {style}`,

  skills: `Suggest relevant technical and soft skills for a {role} position in {industry}.
Experience level: {level}
Focus areas: {focus}
Include trending technologies and methodologies.`,
};

interface AIRequestParams {
  field: keyof AIPromptTemplates;
  context: {
    role?: string;
    years?: string;
    industry?: string;
    company?: string;
    duration?: string;
    focus?: string;
    style?: string;
    degree?: string;
    field?: string;
    school?: string;
    level?: string;
  };
}

export const generateAISuggestion = async ({ field, context }: AIRequestParams): Promise<string> => {
  try {
    let prompt = promptTemplates[field];

    // Replace template variables with context values
    Object.entries(context).forEach(([key, value]) => {
      prompt = prompt.replace(`{${key}}`, value || '');
    });

    // TODO: Replace with actual AI API call
    // For now, returning placeholder responses
    const placeholderResponses = {
      summary: `Results-driven ${context.role} with ${context.years} years of experience in ${context.industry}. 
Proven track record of delivering high-impact solutions and driving innovation. 
Specialized in ${context.focus} with a focus on scalable and maintainable solutions.`,

      experience: `• Led development of mission-critical applications resulting in 40% performance improvement
• Managed team of 5 developers, delivering projects 15% ahead of schedule
• Implemented automated testing framework reducing bug reports by 60%
• Architected microservices solution handling 1M+ daily requests`,

      education: `Completed ${context.degree} in ${context.field} with focus on ${context.focus}.
Key achievements:
• Dean's List for academic excellence
• Led research project on emerging technologies
• Published paper in international conference`,

      skills: `Technical Skills:
• Programming: JavaScript, TypeScript, Python
• Frameworks: React, Node.js, Express
• Cloud: AWS, Azure, GCP
• Tools: Docker, Kubernetes, Jenkins

Soft Skills:
• Team Leadership
• Project Management
• Problem Solving
• Communication`,
    };

    return placeholderResponses[field];
  } catch (error) {
    console.error('Error generating AI suggestion:', error);
    throw new Error('Failed to generate AI suggestion');
  }
};

export const enhanceText = async (text: string, style: string): Promise<string> => {
  try {
    // TODO: Replace with actual AI API call
    // For now, returning slightly modified input
    return `${text} [Enhanced with ${style} style]`;
  } catch (error) {
    console.error('Error enhancing text:', error);
    throw new Error('Failed to enhance text');
  }
};

export const analyzeResume = async (resumeData: any): Promise<{
  score: number;
  suggestions: string[];
}> => {
  try {
    // TODO: Replace with actual AI API call
    return {
      score: 85,
      suggestions: [
        'Add more quantifiable achievements in your experience section',
        'Consider adding relevant certifications',
        'Expand on leadership experiences',
        'Include more industry-specific keywords',
      ],
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume');
  }
};

export const generateKeywords = async (role: string, industry: string): Promise<string[]> => {
  try {
    // TODO: Replace with actual AI API call
    return [
      'agile methodology',
      'team leadership',
      'project management',
      'strategic planning',
      'digital transformation',
      'innovation',
    ];
  } catch (error) {
    console.error('Error generating keywords:', error);
    throw new Error('Failed to generate keywords');
  }
};
