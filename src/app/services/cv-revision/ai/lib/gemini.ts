import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function analyzeCV(cvText: string): Promise<any> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `As an expert CV/Resume analyzer, provide a comprehensive analysis of the following CV. Focus on specific, actionable feedback.

CV Content:
${cvText}

Please provide a detailed analysis in exactly this format:

1. ATS COMPATIBILITY SCORE
- Overall Score: [Score out of 100]
- Format Score: [Score out of 100]
- Keyword Score: [Score out of 100]
- Relevance Score: [Score out of 100]
- Readability Score: [Score out of 100]

2. PRIORITY IMPROVEMENTS

Critical:
- [First critical improvement with specific solution]
- [Second critical improvement with specific solution]
- [Third critical improvement with specific solution]

Important:
- [First important improvement with actionable step]
- [Second important improvement with actionable step]
- [Third important improvement with actionable step]

Recommended:
- [First recommended improvement with suggestion]
- [Second recommended improvement with suggestion]
- [Third recommended improvement with suggestion]

3. SKILLS ANALYSIS

Technical Skills:
- [Technical skill 1] - [Proficiency level] - [Where demonstrated]
- [Technical skill 2] - [Proficiency level] - [Where demonstrated]
- [Technical skill 3] - [Proficiency level] - [Where demonstrated]

Missing Critical Skills:
- [Missing skill 1] - [Why it's important for the role]
- [Missing skill 2] - [Why it's important for the role]

4. EXPERIENCE ANALYSIS

[Most Recent Position]:
Company: [Company Name]
Duration: [Time Period]
Key Achievements:
- [Specific achievement with metrics]
- [Specific achievement with metrics]

[Previous Position]:
Company: [Company Name]
Duration: [Time Period]
Key Achievements:
- [Specific achievement with metrics]
- [Specific achievement with metrics]

5. MARKET INSIGHTS

Industry Trends:
- [Specific trend 1 and its relevance]
- [Specific trend 2 and its relevance]
- [Specific trend 3 and its relevance]

Keyword Analysis:
- [Key skill/keyword 1] - [Number of occurrences] - [Importance level]
- [Key skill/keyword 2] - [Number of occurrences] - [Importance level]
- [Key skill/keyword 3] - [Number of occurrences] - [Importance level]

6. ACTION PLAN

Immediate Actions (24-48 hours):
- [Specific immediate action 1]
- [Specific immediate action 2]
- [Specific immediate action 3]

Short-term Goals (1-2 weeks):
- [Specific short-term goal 1]
- [Specific short-term goal 2]
- [Specific short-term goal 3]

Long-term Development (1-3 months):
- [Specific long-term goal 1]
- [Specific long-term goal 2]
- [Specific long-term goal 3]

Ensure each point is specific to the CV content, includes metrics where possible, and provides actionable recommendations. Do not use any placeholders - all content should be based on actual analysis of the CV.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Process the text response into sections
    const sections = text.split(/\d+\.\s+/).filter(Boolean).map(section => {
      const [title, ...content] = section.split('\n');
      return {
        title: title.trim(),
        content: content
          .filter(line => line.trim())
          .map(line => line.trim())
          .join('\n')
      };
    });

    // Extract ATS scores
    const atsSection = sections[0];
    const atsScores = {};
    if (atsSection) {
      const scoreLines = atsSection.content.split('\n');
      scoreLines.forEach(line => {
        const [name, scoreStr] = line.split(':').map(s => s.trim());
        if (name && scoreStr) {
          const score = parseInt(scoreStr.replace(/[^0-9]/g, ''));
          if (!isNaN(score)) {
            atsScores[name.toLowerCase().replace(/\s+/g, '_').replace('score', '')] = score;
          }
        }
      });
    }

    // Structure the improvements
    const improvementsSection = sections.find(s => s.title.toLowerCase().includes('priority improvements'));
    const improvements = {
      critical: [],
      important: [],
      recommended: []
    };

    if (improvementsSection) {
      let currentCategory = null;
      improvementsSection.content.split('\n').forEach(line => {
        line = line.trim();
        if (line.toLowerCase().includes('critical:')) {
          currentCategory = 'critical';
        } else if (line.toLowerCase().includes('important:')) {
          currentCategory = 'important';
        } else if (line.toLowerCase().includes('recommended:')) {
          currentCategory = 'recommended';
        } else if (currentCategory && line.startsWith('-')) {
          const improvement = line.substring(1).trim();
          improvements[currentCategory].push({
            point: improvement,
            solution: improvement.includes('-') ? improvement.split('-')[1].trim() : ''
          });
        }
      });
    }

    // Structure the skills
    const skillsSection = sections.find(s => s.title.toLowerCase().includes('skills analysis'));
    const skills = {
      technical: [],
      missing: []
    };

    if (skillsSection) {
      let currentSkillType = null;
      skillsSection.content.split('\n').forEach(line => {
        line = line.trim();
        if (line.toLowerCase().includes('technical skills:')) {
          currentSkillType = 'technical';
        } else if (line.toLowerCase().includes('missing critical skills:')) {
          currentSkillType = 'missing';
        } else if (currentSkillType && line.startsWith('-')) {
          const parts = line.substring(1).trim().split('-').map(p => p.trim());
          if (currentSkillType === 'technical' && parts.length >= 2) {
            skills.technical.push({
              name: parts[0],
              proficiency: parts[1],
              context: parts[2] || ''
            });
          } else if (currentSkillType === 'missing' && parts.length >= 2) {
            skills.missing.push({
              name: parts[0],
              importance: parts[1]
            });
          }
        }
      });
    }

    // Structure the experience
    const experienceSection = sections.find(s => s.title.toLowerCase().includes('experience'));
    const experience = [];

    if (experienceSection) {
      let currentPosition = null;
      experienceSection.content.split('\n').forEach(line => {
        line = line.trim();
        if (line.endsWith(':')) {
          currentPosition = {
            title: line.replace(':', '').trim(),
            company: '',
            duration: '',
            achievements: []
          };
          experience.push(currentPosition);
        } else if (currentPosition && line.startsWith('Company:')) {
          currentPosition.company = line.replace('Company:', '').trim();
        } else if (currentPosition && line.startsWith('Duration:')) {
          currentPosition.duration = line.replace('Duration:', '').trim();
        } else if (currentPosition && line.startsWith('-')) {
          currentPosition.achievements.push(line.substring(1).trim());
        }
      });
    }

    // Structure the action plan
    const actionSection = sections.find(s => s.title.toLowerCase().includes('action plan'));
    const actionPlan = {
      immediate: [],
      shortTerm: [],
      longTerm: []
    };

    if (actionSection) {
      let currentTimeframe = null;
      actionSection.content.split('\n').forEach(line => {
        line = line.trim();
        if (line.toLowerCase().includes('immediate actions')) {
          currentTimeframe = 'immediate';
        } else if (line.toLowerCase().includes('short-term')) {
          currentTimeframe = 'shortTerm';
        } else if (line.toLowerCase().includes('long-term')) {
          currentTimeframe = 'longTerm';
        } else if (currentTimeframe && line.startsWith('-')) {
          actionPlan[currentTimeframe].push({
            action: line.substring(1).trim(),
            priority: currentTimeframe === 'immediate' ? 'high' : 
                     currentTimeframe === 'shortTerm' ? 'medium' : 'low'
          });
        }
      });
    }

    return {
      type: 'detailed',
      atsScores,
      sections,
      improvements,
      skills,
      experience,
      actionPlan,
      rawContent: text
    };

  } catch (error) {
    console.error('Error analyzing CV with Gemini:', error);
    throw error;
  }
}
