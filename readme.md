# Hacker News

My take on an RSS feed reader that's styled like [Hacker News](https://news.ycombinator.com/news).

| ![Light Mode](/img/frontpage-light.png) | ![Dark Mode](/img/frontpage-dark.png) |
|-----------------------------------------|---------------------------------------|
| Light Mode                              | Dark Mode                             |

Plus some more Rosé Pine inspired themes.

## How it works

- Scrapes a list of RSS feeds in `/config/feeds.js`.
- Formats them into a Hacker News style page sorted by newest first.
- Uses a serverless backend to regenerate posts and also uses a in browser caching mechanism to store fetched RSS feed data temporarily, reducing the time to reload.

## Configuration

The application uses a configuration file to manage settings such as theme preferences, RSS feed sources, and user-specific options. This file is located in the `config` directory and is loaded during application startup. Users can modify this file to:

- Add or remove RSS feed URLs.
- Set a default theme for the application.
- Enable or disable specific features like offline mode or user authentication.

Changes to the configuration file are automatically applied on the next application restart, making it easy to customize the behavior of the RSS reader.

## Setup

- Clone the repo
- Install dependencies with `npm install`
- Ensure you have [Vercel CLI](https://vercel.com/docs/cli) installed (e.g., `npm install -g vercel`) and configured
- Use Vercel to setup locally with `vercel dev`
