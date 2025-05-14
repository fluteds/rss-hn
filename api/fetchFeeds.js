const Parser = require('rss-parser');
const fs = require('fs');
const parser = new Parser();

const feeds = [
  { name: 'Hacker News', url: 'https://hnrss.org/frontpage' },
  { name: 'Lobsters', url: 'https://lobste.rs/rss' },
  { name: 'BBC Tech', url: 'http://feeds.bbci.co.uk/news/technology/rss.xml' },
  { name: 'BBC News', url: 'http://newsrss.bbc.co.uk/rss/newsonline_world_edition/front_page/rss.xml' },
  { name: 'New York Times', url: 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml' },
  { name: 'The Economist', url: 'http://www.economist.com/rss/finance_and_economics_rss.xml' },
  { name: 'SkySports F1', url: 'http://www.skysports.com/rss/0,20514,12433,00.xml' },
  { name: 'The Verge', url: 'http://www.theverge.com/rss/full.xml' },
  { name: '@leekduck on Twitter', url: 'https://rsshub.app/twitter/user/leekduck/exclude_rts_replies=1&forceWebApi=1' },
  { name: 'Flightradar24 Blog', url: 'http://www.flightradar24.com/blog/feed/' },
  { name: 'Cosmic Voyage', url: 'https://cosmic.voyage/rss.xml' },
  { name: 'BBC News - World', url: 'http://feeds.bbci.co.uk/news/world/rss.xml' },
  { name: 'Hacker News Front Page', url: 'https://hnrss.org/frontpage' },
  { name: 'maia blog', url: 'https://maia.crimew.gay/feed.xml' },
  { name: 'Xe Iaso\'s blog', url: 'https://xeiaso.net/blog.rss' },
  { name: '4chan', url: 'https://raw.githubusercontent.com/fluteds/4chan-rss/refs/heads/master/rss.xml' },
  { name: 'sizeof(cat)', url: 'https://sizeof.cat/index.xml' },
  { name: 'the soap zone', url: 'https://soap.systems/rss.xml' },
  { name: 'Retro Handhelds', url: 'https://retrohandhelds.gg/feed/' },
  { name: 'Ersei \'n Notes', url: 'https://ersei.net/en/notes.atom' },
  { name: 'Ersei \'n Stuff', url: 'https://ersei.net/en/blog.atom' },
  { name: 'Autosport.com - Formula 1', url: 'https://www.autosport.com/rss/feed/f1' },
  { name: 'Fluted\'s Blog', url: 'https://fluted.omg.lol/rss.xml' },
  { name: 'Clear the Lobby', url: 'https://kill-the-newsletter.com/feeds/73nlirv0zvuev6n3iuol.xml' }
];

export default async function fetchFeeds() {
  const allItems = [];

  await Promise.all(
    feeds.map(async (feed) => {
      try {
        const parsedFeed = await parser.parseURL(feed.url);
        const items = parsedFeed.items.map(item => {
          const pubDate = new Date(item.pubDate);
          if (isNaN(pubDate)) return null;

          let siteBaseUrl = new URL(feed.url).hostname;
          siteBaseUrl = siteBaseUrl.replace(/^(www\.|feed\.)/, '');

          return {
            title: item.title,
            link: item.link,
            pubDate: pubDate.toISOString(),
            source: feed.name,
            siteUrl: feed.url,
            siteBaseUrl,
          };
        }).filter(item => item !== null);

        allItems.push(...items);
      } catch (error) {
        console.error(`Error fetching feed: ${feed.name}`, error);
      }
    })
  );

  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  console.log(`Fetched ${allItems.length} items`);
  return allItems; // Return the feeds instead of writing to a file
}
