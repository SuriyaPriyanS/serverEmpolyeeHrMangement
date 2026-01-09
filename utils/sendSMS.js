import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const sendSMS = async (to, message) => {
  if (!process.env.TWILIO_SID || !process.env.TWILIO_TOKEN || !process.env.TWILIO_PHONE) {
    console.warn('Twilio credentials missing. SMS not sent.');
    return;
  }

  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

  try {
    const msg = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE, // Sender details
      to: to,
    });
    console.log(`SMS sent: ${msg.sid}`);
    return msg;
  } catch (error) {
    console.error('Error sending SMS:', error);
    // throw error;
  }
};

export default sendSMS;
