import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Currency mapping based on location
const getCurrencyByLocation = (location: string): string => {
  const locationMap: { [key: string]: string } = {
    'United States': 'USD',
    'India': 'INR',
    'United Kingdom': 'GBP',
    'Canada': 'CAD',
    'Australia': 'AUD',
    'Germany': 'EUR',
    'France': 'EUR',
    'Japan': 'JPY',
    'Singapore': 'SGD',
    // Add more mappings as needed
  };

  // Check for country names in the location string
  for (const [country, currency] of Object.entries(locationMap)) {
    if (location.toLowerCase().includes(country.toLowerCase())) {
      return currency;
    }
  }
  return 'USD'; // Default to USD
};

const cleanJsonString = (text: string): string => {
  // Remove markdown code block syntax
  text = text.replace(/```json\n/g, '').replace(/```/g, '');
  
  // Remove any leading/trailing whitespace
  text = text.trim();
  
  // Handle potential line breaks and formatting
  try {
    // First try parsing as is
    JSON.parse(text);
    return text;
  } catch {
    // If that fails, try to clean up the string more aggressively
    text = text.replace(/\\n/g, ' ')
               .replace(/\n/g, ' ')
               .replace(/\r/g, '')
               .replace(/\t/g, '')
               .replace(/\s+/g, ' ')
               .trim();
    
    // If the string doesn't start with {, try to find the first {
    if (!text.startsWith('{')) {
      const startIndex = text.indexOf('{');
      if (startIndex !== -1) {
        text = text.slice(startIndex);
      }
    }
    
    // If the string doesn't end with }, try to find the last }
    if (!text.endsWith('}')) {
      const endIndex = text.lastIndexOf('}');
      if (endIndex !== -1) {
        text = text.slice(0, endIndex + 1);
      }
    }
    
    return text;
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      role,
      industry,
      location,
      experience,
      education,
      skills,
      companySize,
      workMode,
      employmentType,
      currentSalary,
      benefits,
      certifications,
      languages,
      managementLevel,
      projectCount,
      teamSize,
    } = body;

    const currency = getCurrencyByLocation(location);

    const prompt = `You are a salary prediction expert. Based on the following information, provide a detailed salary analysis in JSON format. Focus on accuracy and current market rates for ${location}. Consider local market conditions, cost of living, and industry standards.

Role: ${role}
Industry: ${industry}
Location: ${location}
Experience: ${experience}
Education: ${education}
Skills: ${skills}
Company Size: ${companySize}
Work Mode: ${workMode}
Employment Type: ${employmentType}
Current Salary: ${currentSalary || 'Not provided'}
Benefits: ${benefits?.join(', ') || 'Not specified'}
Certifications: ${certifications?.join(', ') || 'None'}
Languages: ${languages?.join(', ') || 'Not specified'}
Management Level: ${managementLevel || 'Not specified'}
Project Count: ${projectCount || 'Not specified'}
Team Size: ${teamSize || 'Not specified'}

Return ONLY a JSON object in this exact format (no markdown, no explanation):
{
  "salaryRange": {
    "min": number,
    "average": number,
    "max": number
  },
  "currency": "${currency}",
  "keyFactors": ["factor1", "factor2", ...],
  "marketInsights": ["insight1", "insight2", ...],
  "negotiationTips": ["tip1", "tip2", ...],
  "benefitsAnalysis": ["benefit1", "benefit2", ...]
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    try {
      // Clean and parse the response
      const cleanedText = cleanJsonString(text);
      const parsedData = JSON.parse(cleanedText);
      
      // Validate the required fields
      if (!parsedData.salaryRange || !parsedData.currency || !parsedData.keyFactors) {
        throw new Error('Invalid response structure');
      }
      
      return NextResponse.json(parsedData);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return NextResponse.json({ 
        error: 'Failed to parse salary prediction. Please try again.' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Salary prediction error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate salary prediction. Please try again.' 
    }, { status: 500 });
  }
}
