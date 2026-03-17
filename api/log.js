import Redis from 'ioredis';

// Use REDIS_URL from Vercel environment
const redis = new Redis(process.env.REDIS_URL);

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
      id: Date.now() + Math.random().toString(36).substring(2),
      mood,
      timestamp: new Date().toISOString(),
    };

    // Store in a list, keep last 100
    // We stringify the object for Redis list storage
    await redis.lpush('mood_history', JSON.stringify(entry));
    await redis.ltrim('mood_history', 0, 99);

    return response.status(200).json({ success: true, entry });
  } catch (error) {
    console.error('Error logging mood:', error);
    return response.status(500).json({ 
      error: 'Failed to log mood', 
      details: error.message 
    });
  }
}
