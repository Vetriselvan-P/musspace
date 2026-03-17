import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawHistory = await redis.lrange('mood_history', 0, 99);
    // Parse the stringified objects back to JSON
    const history = rawHistory.map(item => JSON.parse(item));
    
    return response.status(200).json({ history });
  } catch (error) {
    console.error('Error fetching history:', error);
    return response.status(500).json({ 
      error: 'Failed to fetch history', 
      details: error.message 
    });
  }
}
