# Hacker News

My take on an RSS feed reader that's styled like [Hacker News](https://news.ycombinator.com/news).

| ![Light Mode](/img/frontpage-light.png) | ![Dark Mode](/img/frontpage-dark.png) |
|-----------------------------------------|---------------------------------------|
| Light Mode                              | Dark Mode                             |

Plus some more Rosé Pine inspired themes.

## How it works

- Scrapes a [list of RSS feeds](https://github.com/fluteds/rss-hn/blob/main/api/fetchFeeds.js)
- Formats them into a Hacker News style page sorted by newest first
- Uses a serverless backend to regenerate posts

## Setup

- Clone the repo
- Install dependencies with `npm install`
- Ensure you have [Vercel CLI](https://vercel.com/docs/cli) installed (e.g., `npm install -g vercel`) and configured
- Use Vercel to setup locally with `vercel dev` (this starts a local development server for testing your application)
