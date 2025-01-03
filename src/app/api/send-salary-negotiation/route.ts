import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Configure nodemailer with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL, // Using the admin email as sender
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Salary Negotiation Request from ${data.name}`,
      html: `
        <h2>New Salary Negotiation Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Current Salary:</strong> ${data.currentSalary}</p>
        <p><strong>Target Salary:</strong> ${data.targetSalary}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Industry:</strong> ${data.industry}</p>
        <p><strong>Experience:</strong> ${data.experience}</p>
        <p><strong>Job Level:</strong> ${data.jobLevel}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Work Mode:</strong> ${data.workMode.join(', ')}</p>
        <p><strong>Benefits to Negotiate:</strong> ${data.benefits.join(', ')}</p>
        <p><strong>Additional Services:</strong> ${data.additionalServices.join(', ')}</p>
        <p><strong>Consultation Type:</strong> ${data.type}</p>
        <p><strong>Preferred Date:</strong> ${data.date}</p>
        <p><strong>Preferred Time:</strong> ${data.time}</p>
        <p><strong>Urgency Level:</strong> ${data.urgency}</p>
        <p><strong>Notes:</strong> ${data.notes}</p>
      `,
    };

    // Email to client
    const clientMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: data.email,
      subject: 'Your Salary Negotiation Consultation Request - InterviewMaster.ai',
      html: `
        <h2>Thank you for your Salary Negotiation Consultation Request</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your salary negotiation consultation request. Our team will review your information and get back to you shortly to confirm your appointment.</p>
        <h3>Your Request Details:</h3>
        <p><strong>Consultation Type:</strong> ${data.type}</p>
        <p><strong>Preferred Date:</strong> ${data.date}</p>
        <p><strong>Preferred Time:</strong> ${data.time}</p>
        <p>If you need to make any changes to your appointment or have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The InterviewMaster.ai Team</p>
      `,
    };

    // Send emails
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
