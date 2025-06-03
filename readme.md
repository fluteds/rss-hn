# Hacker News

My take on an RSS feed reader that's styled like [Hacker News](https://news.ycombinator.com/news).

| ![Screenshot of Light Mode](/img/frontpage-light.png) | ![Screenshot of Dark Mode](/img/frontpage-dark.png) |
|------------------------------------------------------|----------------------------------------------------|
| Light Mode                                           | Dark Mode                                          |

Plus some more Rosé Pine inspired themes.

## How it works

- Aggregates a list of RSS feeds defined in a single config file.
- Formats them into a Hacker News style page sorted by newest first.
- Uses a serverless backend to regenerate posts and an in-browser caching mechanism to store fetched RSS feed data temporarily, reducing reload times.

### Why is it showing older "new" posts?

The reader displays posts sorted by newest first, based on the data provided by each RSS feed. Sometimes, you may notice older posts appearing as "new" or resurfacing at the top. This happens because some feed providers update the unique identifier (`guid`) or the published date of existing posts, causing them to be treated as new entries by the reader.

This behavior is determined by the feed provider, not the reader itself. The reader simply reflects the latest state of the feed as published by the source. It's annoying but there's not a lot I can do.

## Configuration

All settings are managed in a single file `/public/config/config.json`.

This file contains the following sections:

- `feeds`:  
  An array of RSS feed objects. Each feed has:
  - `name`: Display name for the feed.
  - `url`: The RSS feed URL.
  - `enabled`: Boolean to include/exclude the feed.

- `frontend`:  
  UI and client-side settings, such as:
  - `cacheExpirationMs`: How long (in milliseconds) to cache fetched feed data in the browser.
  - `refreshIntervalMs`: How often (in milliseconds) the frontend checks for new posts.
  - `postsPerPage`: Number of posts to show per page.
  - `refreshApiEndpoint`: API endpoint to refresh feeds.
  - `showNewPostsSeparator`: Show a divider line before old posts if there are new posts (`true`/`false`).
  - `showUpdatedPosts`: Show a section for updated posts (`true`/`false`).
  - `showUpdatedPostsSeparator`: Show a divider line before old posts if there are updated posts (`true`/`false`).
  - `themes`:  
    - `default`: The default theme (`auto`, `light`, `dark`, or a Rosé Pine/Gruvbox variant).
    - `options`: List of selectable themes (e.g., `["light", "dark", "rosepine-dawn", ...]`).
  - `toastDuration`: Duration for toast notifications in milliseconds.
  - `pagination`:  
    - `maxVisibleButtons`: Maximum number of visible pagination buttons.

- `backend`:  
  Server-side settings, including:
  - `maxItemsPerFeed`: Maximum number of items to fetch from each feed.

## Setup

- Clone the repo
- Install dependencies with `npm install`
- Ensure you have [Vercel CLI](https://vercel.com/docs/cli) installed (e.g., `npm install -g vercel`) and configured
- Use Vercel to setup locally with `vercel dev`
