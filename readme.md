# Hacker News

My take on an RSS feed reader that's styled like [Hacker News](https://news.ycombinator.com/news).

| ![Light Mode](/img/frontpage-light.png) | ![Dark Mode](/img/frontpage-dark.png) |
|-----------------------------------------|---------------------------------------|
| Light Mode                              | Dark Mode                             |

Plus some more Rosé Pine inspired themes.

## How it works

- Aggregates a list of RSS feeds defined in a single config file.
- Formats them into a Hacker News style page sorted by newest first.
- Uses a serverless backend to regenerate posts and an in-browser caching mechanism to store fetched RSS feed data temporarily, reducing reload times.

## Configuration

All settings are now in a single file:

- `/public/config/config.json`  
  - `feeds`: List of RSS feeds to aggregate.
  - `frontend`: UI settings (cache, refresh, themes, pagination, etc).
  - `backend`: Backend settings (max items per feed, etc).

Edit this file to change feeds, UI options, or backend limits.

The default theme is set via the config file (`themes.default`), and is currently set to `auto`, which follows your OS settings but you can override this with the dropdown.

## Setup

- Clone the repo
- Install dependencies with `npm install`
- Ensure you have [Vercel CLI](https://vercel.com/docs/cli) installed (e.g., `npm install -g vercel`) and configured
- Use Vercel to setup locally with `vercel dev`
