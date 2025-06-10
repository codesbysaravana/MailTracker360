// config.ts
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;

if (!SENDGRID_API_KEY) {
  throw new Error('Missing SENDGRID_API_KEY in environment variables');
}