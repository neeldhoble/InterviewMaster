import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // Fetch the content from the URL
    const response = await fetch(url);
    const html = await response.text();

    // Parse the HTML content
    const $ = cheerio.load(html);

    // Remove scripts and styles
    $('script').remove();
    $('style').remove();

    let extractedContent = '';

    if (url.includes('linkedin.com')) {
      // LinkedIn specific extraction
      extractedContent = extractLinkedInContent($);
    } else if (url.includes('github.com')) {
      // GitHub specific extraction
      extractedContent = extractGitHubContent($);
    } else {
      // Generic content extraction
      extractedContent = extractGenericContent($);
    }

    return NextResponse.json({ content: extractedContent });
  } catch (error) {
    console.error('Error scraping URL:', error);
    return NextResponse.json(
      { error: 'Failed to scrape URL content' },
      { status: 500 }
    );
  }
}

function extractLinkedInContent($: cheerio.CheerioAPI): string {
  const content = [];

  // Extract profile headline
  const headline = $('.top-card-layout__headline').text().trim();
  if (headline) content.push(`Headline: ${headline}`);

  // Extract current position
  const position = $('.experience-item__title').first().text().trim();
  if (position) content.push(`Current Position: ${position}`);

  // Extract skills
  const skills = $('.skills-section .skill-pill')
    .map((_, el) => $(el).text().trim())
    .get()
    .join(', ');
  if (skills) content.push(`Skills: ${skills}`);

  return content.join('\\n');
}

function extractGitHubContent($: cheerio.CheerioAPI): string {
  const content = [];

  // Extract bio
  const bio = $('.user-profile-bio').text().trim();
  if (bio) content.push(`Bio: ${bio}`);

  // Extract pinned repositories
  const pinnedRepos = $('.pinned-item-list-item')
    .map((_, el) => {
      const name = $(el).find('.repo').text().trim();
      const description = $(el).find('.pinned-item-desc').text().trim();
      return `${name}: ${description}`;
    })
    .get()
    .join('\\n');
  if (pinnedRepos) content.push(`Pinned Repositories:\\n${pinnedRepos}`);

  // Extract contribution activity
  const contributions = $('.js-yearly-contributions').text().trim();
  if (contributions) content.push(`Activity: ${contributions}`);

  return content.join('\\n');
}

function extractGenericContent($: cheerio.CheerioAPI): string {
  // Extract main content from common content areas
  const contentSelectors = [
    'main',
    'article',
    '.content',
    '#content',
    '.main-content',
    '#main-content',
  ];

  for (const selector of contentSelectors) {
    const content = $(selector).text().trim();
    if (content) {
      return content.substring(0, 1000); // Limit content length
    }
  }

  // Fallback to body text if no content found
  return $('body').text().trim().substring(0, 1000);
}
