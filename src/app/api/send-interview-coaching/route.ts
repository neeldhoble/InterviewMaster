import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Configure nodemailer with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Interview Coaching Request from ${data.name}`,
      html: `
        <h2>New Interview Coaching Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Package:</strong> ${data.package}</p>
        <p><strong>Interview Type:</strong> ${data.interviewType}</p>
        <p><strong>Target Position:</strong> ${data.targetPosition}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Industry:</strong> ${data.industry}</p>
        <p><strong>Experience Level:</strong> ${data.experienceLevel}</p>
        <p><strong>Preferred Date:</strong> ${data.date}</p>
        <p><strong>Preferred Time:</strong> ${data.time}</p>
        <p><strong>Specific Areas:</strong> ${data.specificAreas?.join(', ') || 'N/A'}</p>
        <p><strong>Additional Notes:</strong> ${data.notes}</p>
      `,
    };

    // Email to client
    const clientMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: data.email,
      subject: 'Your Interview Coaching Request - InterviewMaster.ai',
      html: `
        <h2>Thank you for your Interview Coaching Request</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your interview coaching request. Our team will review your information and get back to you shortly to confirm your session.</p>
        <h3>Your Request Details:</h3>
        <p><strong>Package Selected:</strong> ${data.package}</p>
        <p><strong>Interview Type:</strong> ${data.interviewType}</p>
        <p><strong>Preferred Date:</strong> ${data.date}</p>
        <p><strong>Preferred Time:</strong> ${data.time}</p>
        <p>If you need to make any changes to your appointment or have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The InterviewMaster.ai Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}
