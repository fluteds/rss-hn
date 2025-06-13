import Parser from 'rss-parser';
import { readFile } from 'fs/promises';
import path from 'path';
const parser = new Parser();

export default async function fetchFeeds() {
  // Dynamically load config
  const configPath = path.join(process.cwd(), 'public', 'config', 'config.json');
  const configRaw = await readFile(configPath, 'utf8');
  const appConfig = JSON.parse(configRaw);

  const allItems = [];
  const MAX_ITEMS_PER_FEED = appConfig.backend.maxItemsPerFeed;
  const feeds = appConfig.feeds;

  await Promise.all(
    feeds.map(async (feed) => {
      try {
        const parsedFeed = await parser.parseURL(feed.url);
        const items = parsedFeed.items
          .slice(0, MAX_ITEMS_PER_FEED)
          .map(item => {
            if (!item.pubDate) return null;
            const pubDate = new Date(item.pubDate);
            if (isNaN(pubDate.getTime())) return null;

            let siteBaseUrl;
            try {
              siteBaseUrl = new URL(feed.url).hostname;
              siteBaseUrl = siteBaseUrl.replace(/^(www\.|feed\.)/, '');
            } catch (e) {
              siteBaseUrl = '';
            }

            return {
              guid: item.guid || item.id || item.link || '',
              title: item.title || '',
              link: item.link || '',
              pubDate: pubDate.toISOString(),
              source: feed.name || '',
              siteUrl: feed.url || '',
              siteBaseUrl,
            };
          })
          .filter(item => item !== null);

        allItems.push(...items);
      } catch (error) {
        console.error(`Error fetching feed: ${feed.name}`, error);
      }
    })
  );

  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  console.log(`Fetched ${allItems.length} items`);
  return allItems;
}