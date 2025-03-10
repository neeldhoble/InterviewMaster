import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface ParsedResume {
  name: string;
  email: string | null;
  phone: string | null;
  skills: string[];
  experience: {
    title: string;
    company: string;
    duration: string;
    highlights: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

export async function parseResumeWithGemini(resumeText: string): Promise<ParsedResume> {
  try {
    // Input validation
    if (!resumeText || resumeText.trim().length < 50) {
      throw new Error('Resume content is too short or empty');
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Create a structured prompt for resume parsing
    const prompt = `
      Analyze this resume text and extract key information in a structured format.
      Be thorough and try to identify all relevant information.

      Resume Text:
      ${resumeText}

      Return the information in this exact JSON format:
      {
        "name": "Full Name",
        "email": "email@example.com or null if not found",
        "phone": "phone number or null if not found",
        "skills": [
          "List all skills found, both technical and soft skills"
        ],
        "experience": [
          {
            "title": "Job Title",
            "company": "Company Name",
            "duration": "Employment Duration",
            "highlights": [
              "Key achievements and responsibilities"
            ]
          }
        ],
        "education": [
          {
            "degree": "Degree Name",
            "institution": "Institution Name",
            "year": "Graduation Year"
          }
        ]
      }

      Important:
      1. Include ALL skills mentioned
      2. List ALL work experiences
      3. Include ALL educational qualifications
      4. Extract as much detail as possible
      5. If a section is empty, use an empty array []
      6. If a required field is not found, use null or "Not specified"
      
      Return ONLY the JSON object, no additional text.
    `;

    // Generate content using Gemini AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response
    try {
      const parsedData = JSON.parse(text);
      
      // Validate the parsed data
      if (!isValidResumeData(parsedData)) {
        throw new Error('Invalid resume structure detected');
      }

      return parsedData;
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      throw new Error('Failed to extract information from resume');
    }

  } catch (error: any) {
    console.error('Resume parsing error:', error);
    
    // Provide specific error messages based on the error type
    if (error.message.includes('too short')) {
      throw new Error('Resume content is too brief. Please provide a more detailed resume.');
    }
    
    if (error.message.includes('Invalid resume structure')) {
      throw new Error('Could not identify standard resume sections. Please ensure your resume is properly formatted.');
    }

    if (error.message.includes('API key')) {
      throw new Error('AI service configuration error. Please check your API key.');
    }

    // Default error message
    throw new Error('Failed to parse resume. Please ensure your resume:\n' +
      '1. Is properly formatted and readable\n' +
      '2. Contains sections for experience, education, and skills\n' +
      '3. Has sufficient detail in each section\n' +
      '4. Is in a standard resume format');
  }
}

// Helper function to validate the parsed resume data
function isValidResumeData(data: any): data is ParsedResume {
  try {
    // Basic structure validation
    if (typeof data !== 'object' || data === null) return false;

    // Required arrays
    if (!Array.isArray(data.skills)) return false;
    if (!Array.isArray(data.experience)) return false;
    if (!Array.isArray(data.education)) return false;

    // Experience validation
    for (const exp of data.experience) {
      if (!exp.title || !exp.company || !Array.isArray(exp.highlights)) {
        return false;
      }
    }

    // Education validation
    for (const edu of data.education) {
      if (!edu.degree || !edu.institution) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

// Function to clean and prepare resume text
export function cleanResumeText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[^\w\s.,;:()\-&@]/g, ' ') // Remove special characters but keep important ones
    .replace(/\.{2,}/g, '.') // Replace multiple periods with single period
    .replace(/,{2,}/g, ',') // Replace multiple commas with single comma
    .replace(/\s+([.,;:])/g, '$1') // Clean up spaces around punctuation
    .replace(/[\r\n]+/g, '\n') // Normalize line breaks
    .replace(/\n\s+/g, '\n') // Remove extra spaces after line breaks
    .trim(); // Remove leading/trailing whitespace
}
