// pages/api/sendEmail.ts
import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '../../lib/config';
import { database } from '../../lib/firebase'; // Adjust path if firebase.ts is in a different location
import { ref, push } from 'firebase/database';
import { NextApiRequest, NextApiResponse } from 'next';

// Set your SendGrid API key using an environment variable
sgMail.setApiKey(SENDGRID_API_KEY as string);

interface EmailRequestBody {
  to: string;
  subject: string;
  content: string;
  campaignId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { to, subject, content, campaignId }: EmailRequestBody = req.body;

  if (!to || !subject || !content || !campaignId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const msg = {
      to,
      from: 'c.saravanapriyan@gmail.com', // IMPORTANT: Use your VERIFIED SENDER EMAIL HERE
      subject,
      html: content,
      trackingSettings: {
        clickTracking: { enable: true },
        openTracking: { enable: true }
      }
    };

    const response = await sgMail.send(msg);
    
    // Extract SendGrid's message ID
    const messageId = response[0].headers['x-message-id'];

    // Log the email send event to Firebase
    const emailLog = {
      campaignId,
      to,
      subject,
      sentAt: new Date().toISOString(),
      messageId,
      status: 'sent'
    };

    // Push the log to Firebase
    await push(ref(database, 'emails'), emailLog);

    res.status(200).json({ success: true, messageId });
  } catch (error: any) {
    console.error('SendGrid Error:', error.response ? error.response.body : error);
    res.status(500).json({ error: error.message || 'Error sending email' });
  }
}