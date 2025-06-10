// pages/api/export.ts
import { database } from '../../lib/firebase';
import { ref, get } from 'firebase/database';
import { NextApiRequest, NextApiResponse } from 'next';

interface EmailData {
  campaignId?: string;
  messageId: string;
  to: string;
  subject: string;
  sentAt: string;
}

interface EventData {
  messageId: string;
  event: string; // e.g., 'open', 'click', 'bounce', 'delivered'
  email: string;
  timestamp: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const emailsSnapshot = await get(ref(database, 'emails'));
    const eventsSnapshot = await get(ref(database, 'events'));

    const emails: Record<string, EmailData> = emailsSnapshot.val() || {};
    const events: Record<string, EventData> = eventsSnapshot.val() || {};

    // Prepare data for CSV: Join emails with their corresponding events
    const dataForCsv: Array<Record<string, string | number>> = [];

Object.values(emails).forEach((emailData) => {
  const emailMessageId = emailData.messageId;
  const relatedEvents = Object.values(events).filter(event => event.messageId === emailMessageId);

  const opens = relatedEvents.filter(e => e.event === 'open').length;
  const clicks = relatedEvents.filter(e => e.event === 'click').length;
  const bounces = relatedEvents.filter(e => e.event === 'bounce').length;
  const delivered = relatedEvents.filter(e => e.event === 'delivered').length;

  const lastOpenTimestamp = Math.max(...relatedEvents.filter(e => e.event === 'open').map(e => e.timestamp), 0);
  const lastClickTimestamp = Math.max(...relatedEvents.filter(e => e.event === 'click').map(e => e.timestamp), 0);

  dataForCsv.push({
    campaignId: emailData.campaignId || 'N/A',
    recipientEmail: emailData.to,
    subject: emailData.subject,
    sentAt: new Date(emailData.sentAt).toLocaleString(),
    delivered: delivered > 0 ? 'Yes' : 'No',
    opensCount: opens,
    clicksCount: clicks,
    bouncesCount: bounces,
    lastOpenTime: lastOpenTimestamp > 0 ? new Date(lastOpenTimestamp * 1000).toLocaleString() : 'N/A',
    lastClickTime: lastClickTimestamp > 0 ? new Date(lastClickTimestamp * 1000).toLocaleString() : 'N/A'
  });
});

    // Generate CSV string
    const headers = [
      'Campaign ID', 'Recipient Email', 'Subject', 'Sent At', 'Delivered',
      'Opens Count', 'Clicks Count', 'Bounces Count', 'Last Open Time', 'Last Click Time'
    ];
    let csvContent = headers.join(',') + '\n';

    dataForCsv.forEach(row => {
      const values = headers.map(header => {
        const key = header.replace(/\s/g, ''); // Remove spaces for object key lookup
        const formattedKey = key.charAt(0).toLowerCase() + key.slice(1); // Convert 'Campaign ID' to 'campaignId'
        let value = row[formattedKey];

        if (typeof value === 'string') {
          // Escape commas and newlines in string values
          value = `"${value.replace(/"/g, '""').replace(/\n/g, '\\n')}"`;
        }
        return value;
      });
      csvContent += values.join(',') + '\n';
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=email_analytics.csv');
    res.status(200).send(csvContent);
  } catch (error: unknown) {
    console.error('Error generating CSV:', error);

    if (error instanceof Error) {
      res.status(500).json({ error: error.message || 'Error generating CSV' });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}