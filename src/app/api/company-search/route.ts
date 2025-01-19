import { NextResponse } from 'next/server';
import { geminiService } from '@/services/gemini';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Use Gemini to get company information
    const prompt = `Search for companies matching "${query}" and return information in this JSON format:
    [
      {
        "name": "Company Name",
        "industry": "Industry",
        "size": "Company Size (e.g., '1000-5000 employees')",
        "location": "Headquarters Location",
        "salaryRange": {
          "min": number,
          "max": number,
          "currency": "USD"
        }
      }
    ]
    Limit to 5 most relevant results.`;

    const response = await geminiService.getResponse(prompt);
    const companies = JSON.parse(response);

    return NextResponse.json(companies);
  } catch (error) {
    console.error('Error searching companies:', error);
    return NextResponse.json(
      { error: 'Failed to search companies' },
      { status: 500 }
    );
  }
}
