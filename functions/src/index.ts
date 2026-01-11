import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret, defineString } from 'firebase-functions/params';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { Resend } from 'resend';

initializeApp();

const db = getFirestore();

// Define secrets and configuration
const resendApiKey = defineSecret('RESEND_API_KEY');
const notificationEmail = defineString('NOTIFICATION_EMAIL', {
  default: 'notifications@converge.zone',
  description: 'Email address to receive demo request notifications',
});

// Constants
const FROM_EMAIL = 'Converge <notifications@converge.zone>';
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5;

// In-memory rate limiting (resets on cold start, but provides basic protection)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

interface DemoRequest {
  name: string;
  email: string;
}

// RFC 5322 compliant email regex (simplified but robust)
function isValidEmail(email: string): boolean {
  if (email.length > MAX_EMAIL_LENGTH) return false;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

// HTML escape for email templates
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Rate limiting check
function checkRateLimit(clientIp: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(clientIp);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true };
}

async function sendNotificationEmail(
  resend: Resend,
  request: { name: string; email: string; id: string },
  recipientEmail: string
): Promise<void> {
  try {
    const safeName = escapeHtml(request.name);
    const safeEmail = escapeHtml(request.email);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: recipientEmail,
      subject: `New Demo Request: ${safeName}`,
      html: `
        <h2>New Demo Request</h2>
        <p>Someone requested a demo on converge.zone:</p>
        <table style="border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;">
              <a href="mailto:${safeEmail}">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Request ID</td>
            <td style="padding: 8px; border: 1px solid #ddd; font-family: monospace;">${request.id}</td>
          </tr>
        </table>
        <p style="color: #666; font-size: 12px;">
          View all requests in <a href="https://console.firebase.google.com/project/converge-369ad/firestore/databases/-default-/data/~2Fdemo-requests">Firebase Console</a>
        </p>
      `,
      text: `New Demo Request\n\nName: ${request.name}\nEmail: ${request.email}\nRequest ID: ${request.id}`,
    });
    console.log(`Notification email sent for request ${request.id}`);
  } catch (error) {
    console.error('Failed to send notification email:', error);
    // Don't throw - we don't want email failures to break the request
  }
}

export const demoRequest = onRequest(
  {
    cors: ['https://converge.zone', 'https://www.converge.zone', 'https://converge-369ad.web.app'],
    region: 'us-central1',
    secrets: [resendApiKey],
  },
  async (req, res) => {
    // Handle preflight
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
      res.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    // Rate limiting
    const clientIp = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      res.set('Retry-After', String(rateCheck.retryAfter));
      res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
      });
      return;
    }

    try {
      const { name, email } = req.body as DemoRequest;

      // Validate required fields
      if (!name?.trim() || !email?.trim()) {
        res.status(400).json({
          success: false,
          message: 'Name and email are required',
        });
        return;
      }

      // Validate name length
      if (name.trim().length > MAX_NAME_LENGTH) {
        res.status(400).json({
          success: false,
          message: `Name must be ${MAX_NAME_LENGTH} characters or less`,
        });
        return;
      }

      // Validate email format and length
      if (!isValidEmail(email.trim())) {
        res.status(400).json({
          success: false,
          message: 'Invalid email format',
        });
        return;
      }

      // Store demo request in Firestore
      const docRef = await db.collection('demo-requests').add({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        createdAt: FieldValue.serverTimestamp(),
        status: 'pending',
        source: 'website',
      });

      // Log without PII
      console.log(`Demo request stored: ${docRef.id}`);

      // Send notification email
      const resend = new Resend(resendApiKey.value());
      await sendNotificationEmail(
        resend,
        {
          name: name.trim(),
          email: email.trim(),
          id: docRef.id,
        },
        notificationEmail.value()
      );

      res.status(200).json({
        success: true,
        message: 'Demo request received',
        id: docRef.id,
      });
    } catch (error) {
      console.error('Error processing demo request:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
);
