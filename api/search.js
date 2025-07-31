export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { query, maxResults = 10 } = req.body;
    
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${process.env.YOUTUBE_API_KEY}&maxResults=${maxResults}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API responded with status ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('YouTube API Error:', error);
    return res.status(500).json({ message: error.message || 'Failed to fetch from YouTube API' });
  }
}