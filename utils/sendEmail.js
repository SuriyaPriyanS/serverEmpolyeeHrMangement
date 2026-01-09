import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (options) => {
  // Create transporter (configure with your SMTP provider in .env)
  // For dev: usage with Mailtrap or similar is recommended.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io', // Default/Fallback
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Message object
  const message = {
    from: `${process.env.FROM_NAME || 'NexusHR'} <${process.env.FROM_EMAIL || 'noreply@nexushr.com'}>`, // Sender details
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Optional HTML content
  };

  try {
    const info = await transporter.sendMail(message);
    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    // In production, you might want to throw this error or handle it more gracefully
    // throw error; 
  }
};

export default sendEmail;
