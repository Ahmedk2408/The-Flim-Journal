// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.VITE_SUPABASE_URL,
//   process.env.VITE_SUPABASE_ANON_KEY
// );

// const BASE_URL = 'https://www.thefilmjournal.in';
// const DEFAULT_IMAGE = `${BASE_URL}/assets/Official_logo.png`;
// const SITE_NAME = 'The Film Journal';

// function escapeHtml(str) {
//   return String(str || '')
//     .replace(/&/g, '&amp;')
//     .replace(/"/g, '&quot;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;');
// }

// function getSafeImage(image) {
//   if (!image) return DEFAULT_IMAGE;
//   if (image.startsWith('data:')) return DEFAULT_IMAGE;
//   if (image.startsWith('http')) return image;
//   return DEFAULT_IMAGE;
// }

// export default async function handler(req, res) {
//   const slug = req.query.slug;

//   let title = SITE_NAME;
//   let description = 'Authoritative. Independent. Cinematic. Premium film reviews, interviews, and entertainment news.';
//   let image = DEFAULT_IMAGE;
//   let url = slug ? `${BASE_URL}/article/${slug}` : BASE_URL;

//   if (slug) {
//     try {
//       const { data: post } = await supabase
//         .from('posts')
//         .select('title, excerpt, image, slug')
//         .eq('slug', slug)
//         .eq('status', 'Published')
//         .single();

//       if (post) {
//         title = `${post.title} | ${SITE_NAME}`;
//         description = post.excerpt || description;
//         image = getSafeImage(post.image);
//       }
//     } catch (e) {
//       // Fall through to defaults
//     }
//   }

//   const html = `<!doctype html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <title>${escapeHtml(title)}</title>
//   <meta name="description" content="${escapeHtml(description)}" />
//   <meta property="og:type" content="article" />
//   <meta property="og:site_name" content="${SITE_NAME}" />
//   <meta property="og:title" content="${escapeHtml(title)}" />
//   <meta property="og:description" content="${escapeHtml(description)}" />
//   <meta property="og:url" content="${escapeHtml(url)}" />
//   <meta property="og:image" content="${escapeHtml(image)}" />
//   <meta property="og:image:width" content="1200" />
//   <meta property="og:image:height" content="630" />
//   <meta name="twitter:card" content="summary_large_image" />
//   <meta name="twitter:title" content="${escapeHtml(title)}" />
//   <meta name="twitter:description" content="${escapeHtml(description)}" />
//   <meta name="twitter:image" content="${escapeHtml(image)}" />
//   <meta http-equiv="refresh" content="0; url=${escapeHtml(url)}" />
//   <script>window.location.href = "${escapeHtml(url)}";</script>
// </head>
// <body>
//   <p>Redirecting to <a href="${escapeHtml(url)}">${escapeHtml(title)}</a>...</p>
// </body>
// </html>`;

//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
//   res.status(200).send(html);
// }

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
);

const BASE_URL = "https://www.thefilmjournal.in";
const DEFAULT_IMAGE = `${BASE_URL}/assets/Official_logo.png`;
const SITE_NAME = "The Film Journal";

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getSafeImage(image) {
  if (!image) return DEFAULT_IMAGE;
  if (image.startsWith("data:")) return DEFAULT_IMAGE;
  if (image.startsWith("http")) return image;
  return DEFAULT_IMAGE;
}

export default async function handler(req, res) {
  const slug = req.query.slug;

  let title = SITE_NAME;
  let description =
    "Authoritative. Independent. Cinematic. Premium film reviews, interviews, and entertainment news.";
  let image = DEFAULT_IMAGE;
  let url = slug ? `${BASE_URL}/article/${slug}` : BASE_URL;

  if (slug) {
    try {
      const { data: post } = await supabase
        .from("posts")
        .select("title, excerpt, image, slug")
        .eq("slug", slug)
        .eq("status", "Published")
        .single();

      if (post) {
        title = `${post.title} | ${SITE_NAME}`;
        description = post.excerpt || description;
        image = getSafeImage(post.image);
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
  <meta name="twitter:site" content="@thefilmjournal" />
  <meta name="twitter:creator" content="@thefilmjournal" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />
  <meta name="twitter:image:src" content="${escapeHtml(image)}" />
  <meta http-equiv="refresh" content="0; url=${escapeHtml(url)}" />
  <script>window.location.href = "${escapeHtml(url)}";</script>
</head>
<body>
  <p>Redirecting to <a href="${escapeHtml(url)}">${escapeHtml(title)}</a>...</p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).send(html);
}
