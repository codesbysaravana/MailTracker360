"use client"
import { useState } from 'react';
import { Send, Mail, Users, BarChart3, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
interface FormData {
  campaignId: string;
  emails: string;
  subject: string;
  content: string;
}

export default function Dashboard() {
  const [formData, setFormData] = useState<FormData>({
    campaignId: '',
    emails: '',
    subject: '',
    content: ''
  });
  const [sending, setSending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string>('');

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    setSending(true);
    setMessage('');

    const emailList: string[] = formData.emails.split(',').map(email => email.trim()).filter(email => email !== '');

    if (emailList.length === 0) {
      setMessage('Please enter at least one recipient email.');
      setSending(false);
      return;
    }

    try {
      for (const email of emailList) {
        await fetch('/api/sendEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject: formData.subject,
            content: formData.content,
            campaignId: formData.campaignId
          })
        });
      }
      setMessage('Campaign sent successfully!');
      setFormData({ campaignId: '', emails: '', subject: '', content: '' });
    } catch (error: unknown) {
        console.error('Error sending campaign:', error);
        if (error instanceof Error) {
            setMessage(`Error sending campaign: ${error.message}`);
        } else {
            setMessage('Error sending campaign: Unknown error');
        }
    } finally {
      setSending(false);
    }
  };

  const getFieldIcon = (key: string) => {
    switch (key) {
      case 'campaignId': return <Mail className="w-5 h-5" />;
      case 'emails': return <Users className="w-5 h-5" />;
      case 'subject': return <Send className="w-5 h-5" />;
      case 'content': return <BarChart3 className="w-5 h-5" />;
      default: return null;
    }
  };

  const getFieldLabel = (key: string) => {
    const labels = {
      campaignId: 'Campaign ID',
      emails: 'Recipient Emails',
      subject: 'Email Subject',
      content: 'Email Content'
    };
    return labels[key as keyof typeof labels] || key;
  };

  const getFieldPlaceholder = (key: string) => {
    const placeholders = {
      campaignId: 'Enter your campaign identifier...',
      emails: 'email1@example.com, email2@example.com...',
      subject: 'Your compelling email subject...',
      content: 'Craft your email content here...'
    };
    return placeholders[key as keyof typeof placeholders] || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Email Campaign Dashboard
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create and send beautiful email campaigns with ease. Reach your audience effectively with our intuitive dashboard.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="space-y-6">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="group">
                    <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 mb-3">
                      <div className={`p-2 rounded-lg transition-colors duration-200 ${
                        focusedField === key 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                      }`}>
                        {getFieldIcon(key)}
                      </div>
                      {getFieldLabel(key)}
                    </label>
                    <div className="relative">
                      {key === 'content' ? (
                        <textarea
                          value={value}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          onFocus={() => setFocusedField(key)}
                          onBlur={() => setFocusedField('')}
                          placeholder={getFieldPlaceholder(key)}
                          required
                          rows={8}
                          className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-300 resize-none focus:outline-none focus:ring-0 ${
                            focusedField === key
                              ? 'border-blue-500 bg-blue-50/50 shadow-lg transform scale-[1.02]'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                          }`}
                        />
                      ) : (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          onFocus={() => setFocusedField(key)}
                          onBlur={() => setFocusedField('')}
                          placeholder={getFieldPlaceholder(key)}
                          required
                          className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-0 ${
                            focusedField === key
                              ? 'border-blue-500 bg-blue-50/50 shadow-lg transform scale-[1.02]'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                          }`}
                        />
                      )}
                      {focusedField === key && (
                        <div className="absolute inset-0 bg-blue-500/5 rounded-xl pointer-events-none animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={sending}
                    className={`w-full relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                      sending
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] cursor-pointer'
                    } text-white shadow-lg`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {sending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending Campaign...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Campaign
                        </>
                      )}
                    </div>
                    {!sending && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    )}
                  </button>
                </div>
              </div>

              {/* Message Display */}
              {message && (
                <div className={`mt-6 p-4 rounded-xl border-2 transition-all duration-500 transform ${
                  message.includes('Error')
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-green-50 border-green-200 text-green-800'
                } animate-in slide-in-from-top-2 fade-in`}>
                  <div className="flex items-center gap-3">
                    {message.includes('Error') ? (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    <p className="font-medium">{message}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Analytics Link */}
          <div className="mt-8 text-center">
            <Link href="/analytics" className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 text-gray-700 font-medium hover:bg-white/80 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <BarChart3 className="w-5 h-5" />
                View Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}