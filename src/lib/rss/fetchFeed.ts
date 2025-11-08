import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedUrl: string) {
    const resp = await fetch(feedUrl, {
      headers: {
        "User-Agent": "gator",
        accept: "application/rss+xml",
      },
    });

    if (!resp.ok) {
      throw new Error(`failed to fetch feed: ${resp.status} ${resp.statusText}`)
    }
    
    const xml = await resp.text();
    const parser = new XMLParser();
    let result = parser.parse(xml);

    const channel = result.rss?.channel;
    if (!channel) {
      throw new Error(`failed to parse channel`)
    }

    if (
      !channel ||
      !channel.title ||
      !channel.link ||
      !channel.description ||
      !channel.item
    ) {
      throw new Error('failed to parse channel')
    }

    const items: any[] = Array.isArray(channel.item) ? channel.item : [channel.item];

    const rssItems: RSSItem[] = [];
    
    items.forEach(item => {
      if (item.title && item.link && item.description && item.pubDate) {
        rssItems.push({
          title: item.title,
          link: item.link,
          description: item.description,
          pubDate: item.pubDate
        })
      } 
    })

    const rss: RSSFeed = {
      channel: {
        title: channel.title,
        link: channel.link,
        description: channel.description,
        item: rssItems
      }
    }

    return rss;
}