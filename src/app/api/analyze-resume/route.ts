import { NextResponse } from 'next/server';
import { geminiService } from '@/services/gemini';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('resume') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No resume file provided' },
        { status: 400 }
      );
    }

    // Read the file content
    const fileContent = await file.text();

    // Use Gemini to analyze the resume
    const prompt = `Analyze this resume and extract the following information in JSON format:
    - currentRole
    - yearsOfExperience (as a number)
    - skills (as an array of strings)
    - highestEducation
    - certifications (as an array of strings)
    - recentAccomplishments (as an array of strings)
    - preferredIndustries (as an array of strings)
    - keyStrengths (as an array of strings)

    Resume content:
    ${fileContent}`;

    const response = await geminiService.getResponse(prompt);
    const analysisResult = JSON.parse(response);

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}
