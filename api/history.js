import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const history = await kv.lrange('mood_history', 0, 99);
    return response.status(200).json({ history });
  } catch (error) {
    console.error('Error fetching history:', error);
    return response.status(500).json({ 
      error: 'Failed to fetch history', 
      details: error.message,
      code: error.code 
    });
  }
}
