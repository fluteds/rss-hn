# Hacker News

My take on an RSS feed reader that's styled like [Hacker News](https://news.ycombinator.com/news).

| ![Light Mode](/img/frontpage-light.png) | ![Dark Mode](/img/frontpage-dark.png) |
|-----------------------------------------|---------------------------------------|
| Light Mode                              | Dark Mode                             |

Plus some more Rosé Pine inspired themes.

## How it works

- Scrapes a list of RSS feeds in `/config/feeds.json`.
- Formats them into a Hacker News style page sorted by newest first.
- Uses a serverless backend to regenerate posts and also uses a in browser caching mechanism to store fetched RSS feed data temporarily, reducing the time to reload.

## Configuration

Currently, the application does not use a single configuration file. All settings, such as themes, feed item numbers to fetch, and cache refresh rates, are hardcoded in their respective files. Here’s what you can configure and where:

- Feeds List:  
  - `/config/feeds.json`  
    - Add, remove, or edit RSS feeds to be aggregated.

- Frontend Settings:  
  - `/public/index.html` (inside the `<script>` tag, `config` object)  
    - `cacheExpirationMs`: Cache expiration time (ms)
    - `refreshIntervalMs`: How often the UI checks for cache expiry (ms)
    - `postsPerPage`: Number of posts per page
    - `refreshApiEndpoint`: API endpoint for refreshing feeds
    - `faviconProvider`: Logic for generating favicons for feed items
    - `themes`: Theme options and default theme
    - `toastDuration`: Duration for toast messages (ms)
    - `pagination.maxVisibleButtons`: Max number of pagination buttons

- Backend Settings:  
  - `/api/fetchFeeds.js`  
    - `MAX_ITEMS_PER_FEED`: Number of posts fetched from each feed

All changes are applied on the next push to the repo, triggering an automatic build and deployment process. For more details on how the build system works, refer to [Vercel's deployment documentation](https://vercel.com/docs/concepts/deployments).

Support for a config file may be added in the future to allow for a simpler way to customise default themes, cache refresh intervals, and other options instead of having each setting hardcoded in its own script. But for now, this is how it works.

## Setup

- Clone the repo
- Install dependencies with `npm install`
- Ensure you have [Vercel CLI](https://vercel.com/docs/cli) installed (e.g., `npm install -g vercel`) and configured
- Use Vercel to setup locally with `vercel dev`
