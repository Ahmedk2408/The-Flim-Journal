import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const BASE_URL = 'https://www.thefilmjournal.in';
const DEFAULT_IMAGE = `${BASE_URL}/assets/Official_logo.png`;
const SITE_NAME = 'The Film Journal';

// Bot user agents that read OG tags (WhatsApp, Facebook, Twitter, Telegram etc.)
const BOT_AGENTS = [
  'whatsapp', 'facebookexternalhit', 'twitterbot', 'telegrambot',
  'linkedinbot', 'slackbot', 'discordbot', 'googlebot', 'bingbot',
  'applebot', 'pinterest', 'instagram', 'snapchat'
];

function isBot(userAgent = '') {
  const ua = userAgent.toLowerCase();
  return BOT_AGENTS.some(bot => ua.includes(bot));
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  const slug = req.query.slug;
  const userAgent = req.headers['user-agent'] || '';

  // Real browser — just serve the normal React index.html
  if (!isBot(userAgent)) {
    try {
      const indexPath = join(process.cwd(), 'dist', 'index.html');
      const html = readFileSync(indexPath, 'utf-8');
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    } catch (e) {
      return res.status(200).send('<html><body><div id="root"></div></body></html>');
    }
  }

  // Bot — fetch article from Supabase and return dynamic OG tags
  let title = SITE_NAME;
  let description = 'Authoritative. Independent. Cinematic. Premium film reviews, interviews, and entertainment news.';
  let image = DEFAULT_IMAGE;
  let url = slug ? `${BASE_URL}/article/${slug}` : BASE_URL;

  if (slug) {
    try {
      const { data: post } = await supabase
        .from('posts')
        .select('title, excerpt, image, slug')
        .eq('slug', slug)
        .eq('status', 'Published')
        .single();

      if (post) {
        title = `${post.title} | ${SITE_NAME}`;
        description = post.excerpt || description;
        image = post.image || DEFAULT_IMAGE;
      }
    } catch (e) {
      // Fall through to defaults
    }
  }

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />
</head>
<body></body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).send(html);
}
