// This API route is used to refresh the feeds.json file by fetching the latest feeds.
import { writeFile } from 'fs/promises';
import path from 'path';
import fetchFeeds from './fetchFeeds.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const feeds = await fetchFeeds(); // Fetch feeds
    return res.status(200).json({ success: true, feeds }); // Return feeds directly
  } catch (err) {
    console.error('Refresh error:', err);
    return res.status(500).json({ success: false, error: 'Failed to refresh feeds' });
  }
}
