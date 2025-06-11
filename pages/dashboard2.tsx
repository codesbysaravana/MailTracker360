// pages/dashboard.tsx
"use client"
import { useState } from 'react';

interface FormData {
  campaignId: string;
  emails: string; // Comma-separated emails
  subject: string;
  content: string; // HTML content for the email
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Email Campaign Dashboard</h1>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
            <input
              type={key === 'emails' || key === 'content' ? 'textarea' : 'text'}
              value={value}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                height: key === 'content' ? '200px' : 'auto'
              }}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={sending}
          style={{
            padding: '10px 20px',
            backgroundColor: sending ? '#ccc' : '#007cba',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: sending ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {sending ? 'Sending...' : 'Send Campaign'}
        </button>
      </form>
      {message && (
        <p style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: message.includes('Error') ? '#f8d7da' : '#d4edda',
          color: message.includes('Error') ? '#721c24' : '#155724',
          borderRadius: '4px',
          border: `1px solid ${message.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`
        }}>
          {message}
        </p>
      )}
      <div>
        <a href="#analytics">Analytics</a>
      </div>
    </div>
  );
}