import Parser from 'rss-parser';
import appConfig from '../public/config/config.json' assert { type: "json" };
const parser = new Parser();

export default async function fetchFeeds() {
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