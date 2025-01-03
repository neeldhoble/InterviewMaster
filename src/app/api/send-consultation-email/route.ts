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
      subject: `New Consultation Request from ${data.name}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
        <p><strong>Job Title:</strong> ${data.jobTitle || 'N/A'}</p>
        <p><strong>Consultation Type:</strong> ${data.consultationType}</p>
        <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
        <p><strong>Experience:</strong> ${data.experience}</p>
        <p><strong>Goals:</strong> ${data.goals.join(', ')}</p>
        <p><strong>Heard From:</strong> ${data.heardFrom}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,
    };

    // Email to client
    const clientMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: data.email,
      subject: 'Your Consultation Request - InterviewMaster.ai',
      html: `
        <h2>Thank you for your Consultation Request</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your consultation request. Our team will review your information and get back to you shortly to confirm your appointment.</p>
        <h3>Your Request Details:</h3>
        <p><strong>Consultation Type:</strong> ${data.consultationType}</p>
        <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
        <p>If you need to make any changes to your appointment or have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The InterviewMaster.ai Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
