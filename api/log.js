import { kv } from '@vercel/kv';
import crypto from 'crypto';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { mood } = request.body;
  if (!mood) {
    return response.status(400).json({ error: 'Mood is required' });
  }

  try {
    const entry = {
      id: crypto.randomUUID(),
      mood,
      timestamp: new Date().toISOString(),
    };

    // Store in a list, keep last 100
    await kv.lpush('mood_history', entry);
    await kv.ltrim('mood_history', 0, 99);

    return response.status(200).json({ success: true, entry });
  } catch (error) {
    console.error('Error logging mood:', error);
    return response.status(500).json({ error: 'Failed to log mood' });
  }
}
