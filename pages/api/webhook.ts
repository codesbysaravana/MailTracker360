// pages/api/webhook.ts
import { database } from '../../lib/firebase'; // Adjust path if firebase.ts is in a different location
import { ref, push } from 'firebase/database';
import { NextApiRequest, NextApiResponse } from 'next';

interface SendGridEvent {
  sg_message_id: string;
  event: string; // e.g., 'open', 'click', 'bounce', 'delivered'
  email: string;
  timestamp: number; // Unix timestamp
  url?: string; // For click events, the URL that was clicked
  ip?: string; // IP address of the recipient
  useragent?: string; // User-Agent string
  campaignId?: string; // Custom campaign identifier
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const events: SendGridEvent[] = req.body; // SendGrid sends an array of event objects

    if (!Array.isArray(events)) {
      console.warn('Received non-array payload for webhook:', events);
      return res.status(400).json({ message: 'Expected an array of events' });
    }

    for (const event of events) {
      // Extract and structure event data
      const eventData = {
        messageId: event.sg_message_id,
        event: event.event,
        email: event.email,
        timestamp: event.timestamp,
        url: event.url || null,
        ip: event.ip || null,
        userAgent: event.useragent || null,
        campaignId: event.campaignId || null
      };

      // Push the event data to Firebase
      await push(ref(database, 'events'), eventData);
    }

    res.status(200).json({ success: true });
  } catch (error: unknown) {
        console.error('Webhook processing error:', error);
            if (error instanceof Error) {
                res.status(500).json({ error: error.message || 'Error processing webhook' });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
    }
}