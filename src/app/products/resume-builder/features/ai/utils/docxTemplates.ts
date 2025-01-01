import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  convertInchesToTwip,
  PageOrientation,
  IDocumentOptions,
} from "docx";
import { saveAs } from "file-saver";
import { ResumeData } from "../context/ResumeContext";

// Common styles
const styles = {
  page: {
    margin: {
      top: convertInchesToTwip(1),
      right: convertInchesToTwip(1),
      bottom: convertInchesToTwip(1),
      left: convertInchesToTwip(1),
    },
  },
  heading1: {
    size: 32,
    bold: true,
    color: "2E3440",
  },
  heading2: {
    size: 24,
    bold: true,
    color: "3B4252",
  },
  heading3: {
    size: 20,
    bold: true,
    color: "434C5E",
  },
  normal: {
    size: 16,
    color: "4C566A",
  },
};

// Base template generator
const createBaseDocument = (options: Partial<IDocumentOptions> = {}) => {
  return new Document({
    sections: [{
      properties: {
        page: {
          ...styles.page,
          orientation: PageOrientation.PORTRAIT,
        },
      },
      children: [],
    }],
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 24,
            color: "333333",
          },
          paragraph: {
            spacing: {
              line: 360,
              before: 240,
              after: 240,
            },
          },
        },
      },
    },
    ...options,
  });
};

// Modern template
export const generateModernTemplate = (data: ResumeData) => {
  const doc = createBaseDocument();
  const children: (Paragraph | Table)[] = [];

  // Header with contact info
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 240,
      },
      children: [
        new TextRun({
          text: data.personalInfo.fullName,
          ...styles.heading1,
          break: 2,
        }),
        new TextRun({
          text: `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`,
          ...styles.normal,
          break: 1,
        }),
      ],
    })
  );

  // Summary
  if (data.personalInfo.summary) {
    children.push(
      new Paragraph({
        spacing: {
          before: 240,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Professional Summary",
            ...styles.heading2,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: data.personalInfo.summary,
            ...styles.normal,
          }),
        ],
      })
    );
  }

  // Experience section
  if (data.experiences.length > 0) {
    children.push(
      new Paragraph({
        spacing: {
          before: 360,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Experience",
            ...styles.heading2,
          }),
        ],
      })
    );

    data.experiences.forEach((exp) => {
      children.push(
        new Paragraph({
          spacing: {
            before: 240,
          },
          children: [
            new TextRun({
              text: exp.company,
              ...styles.heading3,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.position} | ${exp.startDate} - ${exp.endDate}`,
              ...styles.normal,
              italics: true,
            }),
          ],
        }),
        new Paragraph({
          spacing: {
            after: 240,
          },
          children: [
            new TextRun({
              text: exp.description,
              ...styles.normal,
            }),
          ],
        })
      );
    });
  }

  // Education section
  if (data.education.length > 0) {
    children.push(
      new Paragraph({
        spacing: {
          before: 360,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Education",
            ...styles.heading2,
          }),
        ],
      })
    );

    data.education.forEach((edu) => {
      children.push(
        new Paragraph({
          spacing: {
            before: 240,
          },
          children: [
            new TextRun({
              text: edu.institution,
              ...styles.heading3,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree} in ${edu.field} | ${edu.startDate} - ${edu.endDate}`,
              ...styles.normal,
              italics: true,
            }),
          ],
        })
      );
    });
  }

  // Skills section
  if (data.skills.length > 0) {
    children.push(
      new Paragraph({
        spacing: {
          before: 360,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Skills",
            ...styles.heading2,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: data.skills.join(" • "),
            ...styles.normal,
          }),
        ],
      })
    );
  }

  doc.addSection({
    children: children,
  });

  return doc;
};

// Function to generate and download the document
export const generateAndDownloadResume = async (template: string, data: ResumeData) => {
  let doc;
  try {
    doc = generateModernTemplate(data);
    const blob = await doc.save("blob");
    saveAs(blob, `${data.personalInfo.fullName.replace(/\s+/g, "_")}_resume.docx`);
    return true;
  } catch (error) {
    console.error("Error generating resume:", error);
    return false;
  }
};

// Function to generate preview HTML
export const generatePreviewHtml = (template: string, data: ResumeData): string => {
  const commonStyles = `
    .preview-container {
      font-family: 'Calibri', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      color: #2E3440;
    }
    .header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .section {
      margin-bottom: 2rem;
    }
    .section-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #3B4252;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #E5E9F0;
    }
    .experience-item, .education-item {
      margin-bottom: 1.5rem;
    }
    .company, .institution {
      font-weight: bold;
      color: #434C5E;
    }
    .position, .degree {
      font-style: italic;
      color: #4C566A;
    }
    .dates {
      color: #4C566A;
      font-size: 0.9rem;
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .skill {
      background: #E5E9F0;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.9rem;
    }
  `;

  return `
    <style>${commonStyles}</style>
    <div class="preview-container">
      <div class="header">
        <h1>${data.personalInfo.fullName}</h1>
        <p>${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}</p>
      </div>

      ${data.personalInfo.summary ? `
        <div class="section">
          <h2 class="section-title">Professional Summary</h2>
          <p>${data.personalInfo.summary}</p>
        </div>
      ` : ''}

      ${data.experiences.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Experience</h2>
          ${data.experiences.map(exp => `
            <div class="experience-item">
              <div class="company">${exp.company}</div>
              <div class="position">${exp.position}</div>
              <div class="dates">${exp.startDate} - ${exp.endDate}</div>
              <p>${exp.description}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.education.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Education</h2>
          ${data.education.map(edu => `
            <div class="education-item">
              <div class="institution">${edu.institution}</div>
              <div class="degree">${edu.degree} in ${edu.field}</div>
              <div class="dates">${edu.startDate} - ${edu.endDate}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.skills.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Skills</h2>
          <div class="skills">
            ${data.skills.map(skill => `
              <span class="skill">${skill}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
};
