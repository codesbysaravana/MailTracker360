import { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { ref, onValue } from 'firebase/database';

interface EmailData {
  id: string;
  campaignId: string;
  messageId: string;
  to: string;
  subject: string;
  sentAt: string;
  status: string;
}

interface EventData {
  id: string;
  messageId: string;
  event: string;
  email: string;
  timestamp: number;
  url?: string;
  ip?: string;
  userAgent?: string;
  campaignId?: string;
}

interface CampaignStats {
  campaignId: string;
  sent: number;
  opens: number;
  clicks: number;
  bounces: number;
  uniqueOpens: number;
  uniqueClicks: number;
  uniqueOpenRate: number;
  uniqueClickRate: number;
  bounceRate: number;
}

interface Stats {
  totalSent: number;
  totalOpens: number;
  totalClicks: number;
  totalBounces: number;
  totalDelivered: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  campaignStats: CampaignStats[];
}

export default function Analytics() {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalSent: 0,
    totalOpens: 0,
    totalClicks: 0,
    totalBounces: 0,
    totalDelivered: 0,
    openRate: 0,
    clickRate: 0,
    bounceRate: 0,
    campaignStats: []
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const emailsRef = ref(database, 'emails');
    const eventsRef = ref(database, 'events');

    const unsubscribeEmails = onValue(
      emailsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const emailsArray = Object.entries(data).map(([key, value]) => ({
            ...(value as Omit<EmailData, 'id'>),
            id: key
          }));
          setEmails(emailsArray);
        } else {
          setEmails([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching emails:', error);
        setLoading(false);
      }
    );

    const unsubscribeEvents = onValue(
      eventsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const eventsArray = Object.entries(data).map(([key, value]) => ({
            ...(value as Omit<EventData, 'id'>),
            id: key
          }));
          setEvents(eventsArray);
        } else {
          setEvents([]);
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

    return () => {
      unsubscribeEmails();
      unsubscribeEvents();
    };
  }, []);

  useEffect(() => {
    const totalSent = emails.length;
    const totalOpens = events.filter((e) => e.event === 'open').length;
    const totalClicks = events.filter((e) => e.event === 'click').length;
    const totalBounces = events.filter((e) => e.event === 'bounce').length;
    const totalDelivered = events.filter((e) => e.event === 'delivered').length;

    const campaignStats: Record<string, CampaignStats> = {};

    emails.forEach((email) => {
      if (!campaignStats[email.campaignId]) {
        campaignStats[email.campaignId] = {
          campaignId: email.campaignId,
          sent: 0,
          opens: 0,
          clicks: 0,
          bounces: 0,
          uniqueOpens: 0,
          uniqueClicks: 0,
          uniqueOpenRate: 0,
          uniqueClickRate: 0,
          bounceRate: 0
        };
      }
      campaignStats[email.campaignId].sent++;
    });

    events.forEach((event) => {
      const sentEmail = emails.find((e) => e.messageId === event.messageId);
      if (sentEmail && campaignStats[sentEmail.campaignId]) {
        const campaign = campaignStats[sentEmail.campaignId];
        if (event.event === 'open') {
          campaign.opens++;
          campaign.uniqueOpens++;
        } else if (event.event === 'click') {
          campaign.clicks++;
          campaign.uniqueClicks++;
        } else if (event.event === 'bounce') {
          campaign.bounces++;
        }
      }
    });

    const detailedCampaignStats = Object.values(campaignStats).map((stats) => ({
      ...stats,
      uniqueOpenRate: stats.sent > 0 ? Number(((stats.uniqueOpens / stats.sent) * 100).toFixed(2)) : 0,
      uniqueClickRate: stats.sent > 0 ? Number(((stats.uniqueClicks / stats.sent) * 100).toFixed(2)) : 0,
      bounceRate: stats.sent > 0 ? Number(((stats.bounces / stats.sent) * 100).toFixed(2)) : 0
    }));

    setStats({
      totalSent,
      totalOpens,
      totalClicks,
      totalBounces,
      totalDelivered,
      openRate: totalSent ? Number(((totalOpens / totalSent) * 100).toFixed(2)) : 0,
      clickRate: totalSent ? Number(((totalClicks / totalSent) * 100).toFixed(2)) : 0,
      bounceRate: totalSent ? Number(((totalBounces / totalSent) * 100).toFixed(2)) : 0,
      campaignStats: detailedCampaignStats
    });
  }, [emails, events]);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading analytics...</div>;
  }

  return (
    <section id='analytics'>
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Email Campaign Analytics</h1>
      <p>Total Sent: {stats.totalSent}</p>
      <p>Open Rate: {stats.openRate}%</p>
      <p>Click Rate: {stats.clickRate}%</p>
      <p>Bounce Rate: {stats.bounceRate}%</p>
    </div>
    </section>
  );
}
