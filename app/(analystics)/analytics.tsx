import { useState, useEffect } from 'react';
import { BarChart3, Mail, MousePointer, TrendingUp, Users, AlertTriangle, CheckCircle, Eye, Loader2 } from 'lucide-react';

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

  // Simulate Firebase data loading
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Mock data for demonstration
      const mockEmails: EmailData[] = [
        { id: '1', campaignId: 'camp-001', messageId: 'msg-001', to: 'user1@example.com', subject: 'Welcome!', sentAt: '2024-01-15', status: 'sent' },
        { id: '2', campaignId: 'camp-001', messageId: 'msg-002', to: 'user2@example.com', subject: 'Welcome!', sentAt: '2024-01-15', status: 'sent' },
        { id: '3', campaignId: 'camp-002', messageId: 'msg-003', to: 'user3@example.com', subject: 'Newsletter', sentAt: '2024-01-16', status: 'sent' },
      ];
      
      const mockEvents: EventData[] = [
        { id: '1', messageId: 'msg-001', event: 'open', email: 'user1@example.com', timestamp: 1705123456 },
        { id: '2', messageId: 'msg-001', event: 'click', email: 'user1@example.com', timestamp: 1705123460 },
        { id: '3', messageId: 'msg-002', event: 'open', email: 'user2@example.com', timestamp: 1705123500 },
        { id: '4', messageId: 'msg-003', event: 'bounce', email: 'user3@example.com', timestamp: 1705123600 },
      ];
      
      setEmails(mockEmails);
      setEvents(mockEvents);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ElementType;
    color: string;
    trend?: 'up' | 'down' | 'neutral';
  }) => (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${color} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend === 'up' ? 'bg-green-100 text-green-700' :
              trend === 'down' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              <TrendingUp className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
              {trend === 'up' ? '+12%' : trend === 'down' ? '-5%' : '0%'}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section id="analytics" className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Analytics</h2>
          <p className="text-gray-600">Fetching your campaign data...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="analytics" className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Email Campaign Analytics
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track your email campaign performance with detailed insights and real-time metrics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Sent"
            value={stats.totalSent.toLocaleString()}
            subtitle="Emails delivered"
            icon={Mail}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            trend="up"
          />
          <StatCard
            title="Open Rate"
            value={`${stats.openRate}%`}
            subtitle={`${stats.totalOpens} opens`}
            icon={Eye}
            color="bg-gradient-to-r from-green-500 to-green-600"
            trend="up"
          />
          <StatCard
            title="Click Rate"
            value={`${stats.clickRate}%`}
            subtitle={`${stats.totalClicks} clicks`}
            icon={MousePointer}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            trend="neutral"
          />
          <StatCard
            title="Bounce Rate"
            value={`${stats.bounceRate}%`}
            subtitle={`${stats.totalBounces} bounces`}
            icon={AlertTriangle}
            color="bg-gradient-to-r from-red-500 to-red-600"
            trend="down"
          />
        </div>

        {/* Campaign Performance */}
        {stats.campaignStats.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Campaign Performance</h2>
              </div>
              
              <div className="space-y-4">
                {stats.campaignStats.map((campaign, index) => (
                  <div
                    key={campaign.campaignId}
                    className="group p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{campaign.campaignId}</h3>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-gray-600">
                          {campaign.sent} sent
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{campaign.uniqueOpenRate}%</div>
                        <div className="text-xs text-gray-500">Open Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{campaign.uniqueClickRate}%</div>
                        <div className="text-xs text-gray-500">Click Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{campaign.bounceRate}%</div>
                        <div className="text-xs text-gray-500">Bounce Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{campaign.uniqueOpens + campaign.uniqueClicks}</div>
                        <div className="text-xs text-gray-500">Total Engagements</div>
                      </div>
                    </div>
                    
                    {/* Progress Bars */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-16">Opens</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(campaign.uniqueOpenRate, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-12">{campaign.uniqueOpenRate}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-16">Clicks</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(campaign.uniqueClickRate, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-12">{campaign.uniqueClickRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No Data State */}
        {stats.totalSent === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
              <BarChart3 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Campaign Data</h3>
            <p className="text-gray-500">Start sending campaigns to see your analytics here.</p>
          </div>
        )}
      </div>
    </section>
  );
}