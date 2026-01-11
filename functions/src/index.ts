import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { Resend } from 'resend';

initializeApp();

const db = getFirestore();

// Define secrets
const resendApiKey = defineSecret('RESEND_API_KEY');

// Configuration
const NOTIFICATION_EMAIL = 'kenneth@aprio.one';
const FROM_EMAIL = 'Converge <notifications@converge.zone>';

interface DemoRequest {
  name: string;
  email: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function sendNotificationEmail(
  resend: Resend,
  request: { name: string; email: string; id: string }
): Promise<void> {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `New Demo Request: ${request.name}`,
      html: `
        <h2>New Demo Request</h2>
        <p>Someone requested a demo on converge.zone:</p>
        <table style="border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${request.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;">
              <a href="mailto:${request.email}">${request.email}</a>
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
    cors: true,
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

      // Validate email format
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

      console.log(`Demo request stored: ${docRef.id} - ${email}`);

      // Send notification email
      const resend = new Resend(resendApiKey.value());
      await sendNotificationEmail(resend, {
        name: name.trim(),
        email: email.trim(),
        id: docRef.id,
      });

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
