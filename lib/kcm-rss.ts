import Parser from 'rss-parser';

export const KCM_RSS_URL = 'https://www.keepingcurrentmatters.com/feed/';

const parser = new Parser({
  customFields: {
    item: ['creator', 'content', 'content:encoded', 'category'],
  },
});

export function extractFirstImageUrl(html: string | undefined): string | undefined {
  if (!html) {
    return undefined;
  }
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imgMatch?.[1]?.trim();
}

export async function fetchKcmFeed() {
  const response = await fetch(KCM_RSS_URL, {
    headers: {
      Accept: 'application/rss+xml, application/xml, text/xml, */*',
      'User-Agent': 'EmersonEstatesHomes/1.0 (+https://emersone-etates-homes.vercel.app)',
    },
  });

  if (!response.ok) {
    throw new Error(`KCM RSS fetch failed with status ${response.status}`);
  }

  const xml = await response.text();
  if (!xml.includes('<rss') && !xml.includes('<feed')) {
    throw new Error('KCM RSS response was not XML (feed URL may have moved)');
  }

  return parser.parseString(xml);
}

export type KcmRssItem = Parser.Item & {
  creator?: string;
  'dc:creator'?: string;
  'content:encoded'?: string;
};
