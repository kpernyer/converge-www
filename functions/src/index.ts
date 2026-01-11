import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

initializeApp();

const db = getFirestore();

// CORS headers for api.converge.zone
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

interface DemoRequest {
  name: string;
  email: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const demoRequest = onRequest(
  {
    cors: true,
    region: 'us-central1',
  },
  async (req, res) => {
    // Handle preflight
    if (req.method === 'OPTIONS') {
      res.set(corsHeaders);
      res.status(204).send('');
      return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
      res.set(corsHeaders);
      res.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    try {
      const { name, email } = req.body as DemoRequest;

      // Validate required fields
      if (!name?.trim() || !email?.trim()) {
        res.set(corsHeaders);
        res.status(400).json({
          success: false,
          message: 'Name and email are required',
        });
        return;
      }

      // Validate email format
      if (!isValidEmail(email.trim())) {
        res.set(corsHeaders);
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

      res.set(corsHeaders);
      res.status(200).json({
        success: true,
        message: 'Demo request received',
        id: docRef.id,
      });
    } catch (error) {
      console.error('Error processing demo request:', error);
      res.set(corsHeaders);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
);
